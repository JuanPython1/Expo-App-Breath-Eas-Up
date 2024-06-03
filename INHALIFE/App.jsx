import { StatusBar } from 'react-native';
import React from 'react';
import AppNavigator from './App/navigator/AppNavigator';

export default function App() {
  return (
    <>
      <StatusBar style="auto" backgroundColor="#00AAE4" />
      <AppNavigator />
    </>
  );
}
