import IbanValidationDisplay from '@/components/IbanValidationDisplay';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './styles';
import navigatorUtil from '@/utils/navigator-util';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch } from 'react-redux';
import { Validation, updateValidations } from '@/store/Validation';
import moment from 'moment';

const MONTENEGRO_IBAN_VALID_LENGTH = 22;

const Validator = () => {
  const [isIbanValidSoFar, setIsIbanValidSoFar] = useState(false);
  const [isIbanValid, setIsIbanValid] = useState(false);
  const [inputText, setInputText] = useState('');
  const [suggestedIban, setSuggestedIban] = useState('');
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const handleOnChange = (text: string) => {
    setInputText(text);
    validateIban(text);
    generateValidIbanSuggestion(text);
  };

  const handleNavigateToValidationList = () => {
    navigatorUtil.navigate('ValidationList');
  };

  const validateIban = (text: string) => {
    text = text.replace(/[\s]/g, '').toUpperCase();

    // Montenegro IBAN length should start with 'ME'
    if (text.startsWith('ME')) {
      setIsIbanValidSoFar(true);
    } else {
      setIsIbanValidSoFar(false);
      return;
    }

    if (text.length < MONTENEGRO_IBAN_VALID_LENGTH) {
      setSuggestedIban('');
      setIsIbanValidSoFar(true);
    }

    if (text.length > MONTENEGRO_IBAN_VALID_LENGTH) {
      setIsIbanValidSoFar(false);
    }

    const rearrangedIban = text.slice(4) + text.slice(0, 4);

    const expandedIban = rearrangedIban.replace(/[A-Z]/g, function (match) {
      return (match.charCodeAt(0) - 55).toString();
    });

    // Perform modulo 97 operation
    let remainder = expandedIban;
    while (remainder.length > 2) {
      const block = remainder.slice(0, 9);
      remainder =
        (parseInt(block, 10) % 97).toString() + remainder.slice(block.length);
    }
    const ibanCheckResult = parseInt(remainder, 10) % 97;

    const validation: Validation = {
      iban: text,
      dateTime: moment().format('DD/MM/YYYY | HH:mm:ss'),
      valid: true,
    };

    // Montenegro IBAN length should be 22
    if (text.length === MONTENEGRO_IBAN_VALID_LENGTH) {
      if (ibanCheckResult === 1) {
        dispatch(updateValidations(validation));
        setIsIbanValid(true);
      } else {
        dispatch(updateValidations({ ...validation, valid: false }));
        setIsIbanValid(false);
      }
    } else {
      setIsIbanValid(false);
    }
  };

  const generateValidIbanSuggestion = (iban: string) => {
    if (iban.length !== 22 || !iban.startsWith('ME')) {
      return;
    }

    // Assume the IBAN format is correct but check digits might be wrong
    const bankCodeAndAccount = iban.slice(4); // Extract the bank and account part
    const correctCheckDigits = calculateCheckDigits(
      'ME00' + bankCodeAndAccount,
    );
    const suggestedIban = `ME${correctCheckDigits}${bankCodeAndAccount}`;
    setSuggestedIban(suggestedIban);
  };

  const calculateCheckDigits = (ibanWithoutCheckDigits: string) => {
    const rearrangedIban =
      ibanWithoutCheckDigits.slice(4) + ibanWithoutCheckDigits.slice(0, 4);
    const expandedIban = rearrangedIban.replace(/[A-Z]/g, function (match) {
      return (match.charCodeAt(0) - 55).toString();
    });

    let remainder = expandedIban;
    while (remainder.length > 2) {
      const block = remainder.slice(0, 9);
      remainder =
        (parseInt(block, 10) % 97).toString() + remainder.slice(block.length);
    }
    const checkDigits = (98 - (parseInt(remainder, 10) % 97))
      .toString()
      .padStart(2, '0');
    return checkDigits;
  };

  const handleUseSuggestedIban = () => {
    setInputText(suggestedIban);
    validateIban(suggestedIban);
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom + 16,
        },
      ]}
    >
      <View style={styles.topContainer}>
        {inputText.length !== MONTENEGRO_IBAN_VALID_LENGTH &&
          inputText.length > 0 && (
            <Icon
              name={isIbanValidSoFar ? 'check-circle' : 'times-circle'}
              color={isIbanValidSoFar ? 'green' : 'red'}
              size={24}
              style={styles.validationSoFarIcon}
            />
          )}
        <TextInput
          placeholder="Type your IBAN..."
          value={inputText}
          onChangeText={handleOnChange}
          style={styles.input}
        />
      </View>
      <View style={styles.bottomContainer}>
        <View>
          {inputText.length === MONTENEGRO_IBAN_VALID_LENGTH ? (
            <IbanValidationDisplay isValid={isIbanValid} />
          ) : (
            <View />
          )}
          {!isIbanValid &&
            inputText.length === MONTENEGRO_IBAN_VALID_LENGTH && (
              <View style={styles.validIbanSuggestionContainer}>
                <Text style={styles.validIbanSuggestionText}>Valid IBAN</Text>
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={styles.validIbanSuggestionButton}
                  onPress={handleUseSuggestedIban}
                >
                  <Text style={styles.validIbanSuggestionButtonText}>
                    {suggestedIban}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
        </View>
        <TouchableOpacity
          onPress={handleNavigateToValidationList}
          activeOpacity={0.6}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Validation List</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Validator;
