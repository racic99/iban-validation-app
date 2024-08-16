import { FC } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';

type IbanValidationDisplayProps = {
  isValid: boolean;
};

const IbanValidationDisplay: FC<IbanValidationDisplayProps> = ({ isValid }) => {
  return (
    <View style={styles.container}>
      <Icon
        name={isValid ? 'check-circle' : 'times-circle'}
        color={isValid ? 'green' : 'red'}
        size={120}
      />
      <Text style={styles.text}>
        {isValid ? 'IBAN is Valid' : 'IBAN is Invalid'}
      </Text>
    </View>
  );
};

export default IbanValidationDisplay;
