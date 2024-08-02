import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import StackNavigator from './src/navigation/stackNav/stackNavigator';



export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <StackNavigator />
    </NavigationContainer>
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
