import { Validation } from '@/store/Validation';
import { FC } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';

type ValidationCardProps = {
  validation: Validation;
};

const ValidationCard: FC<ValidationCardProps> = ({ validation }) => {
  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <Text style={styles.iban}>{validation.iban}</Text>
        <Text style={styles.dateTime}>{validation.dateTime}</Text>
      </View>
      <Icon
        name={validation.valid ? 'check-circle' : 'times-circle'}
        color={validation.valid ? 'green' : 'red'}
        size={30}
      />
    </View>
  );
};

export default ValidationCard;
