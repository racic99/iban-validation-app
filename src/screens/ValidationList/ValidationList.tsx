import { useAppSelector } from '@/hooks/reduxOverwriteHooks';
import { FlatList } from 'react-native';
import styles from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ValidationCard from '@/components/ValidationCard';

const ValidationList = () => {
  const { validations } = useAppSelector(({ validation }) => validation);
  const insets = useSafeAreaInsets();

  return (
    <FlatList
      contentContainerStyle={[
        styles.container,
        { paddingBottom: insets.bottom + 16 },
      ]}
      data={validations}
      renderItem={({ item }) => <ValidationCard validation={item} />}
    />
  );
};

export default ValidationList;
