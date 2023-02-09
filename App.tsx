/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {
  backgroundColor,
  color,
  ThemeProvider,
  useTheme,
} from '@shopify/restyle';
import React from 'react';
import theme from './src/style/Theme';
import {AppNavigator} from './src/navigation/AppNavigator';
import { SafeAreaView, StatusBar } from "react-native";
import {Theme} from '@react-navigation/native';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={{flex: 1}}>
        <AppNavigator />
      </SafeAreaView>
    </ThemeProvider>
  );
};

export default App;
