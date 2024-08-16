import ValidationList from '@/screens/ValidationList';
import Validator from '@/screens/Validator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';

const MainStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator initialRouteName="Validator">
        <>
          <Stack.Screen
            name="Validator"
            component={Validator}
            options={{
              headerTitle: 'IBAN Validator',
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen
            name="ValidationList"
            component={ValidationList}
            options={{
              headerTitle: 'IBAN Validation List',
              headerBackTitleVisible: false,
            }}
          />
        </>
      </Stack.Navigator>
    </View>
  );
};

export default MainStack;
