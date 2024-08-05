import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import StackNavigator from './src/navigation/stackNav/stackNavigator';
import { Provider } from 'react-redux';
import { store } from './src/state/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist'


let persistor = persistStore(store)


export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
          <StackNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
