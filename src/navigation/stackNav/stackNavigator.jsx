import { SafeAreaView, StyleSheet, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Settings from '../../pages/Settings';
import HomeScreen from '../../pages/HomeScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  navigatorContainer: {
    flex: 1,
  },
});

export default StackNavigator;
