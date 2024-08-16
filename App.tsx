import MainStack from '@/navigation/stacks/MainStack';
import { persistor, store } from '@/store';
import navigatorUtil from '@/utils/navigator-util';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer ref={navigatorUtil.navigationRef}>
            <MainStack />
            <StatusBar style="dark" />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
