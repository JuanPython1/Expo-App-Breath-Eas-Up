import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './App/navigator/AppNavigator';
import "./i18n";

export default function App() {
  return (
    <>
      <StatusBar style="auto" backgroundColor="#00AAE4" />
      <AppNavigator />
    </>
  );
}
