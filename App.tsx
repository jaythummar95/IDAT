/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {ThemeProvider} from '@shopify/restyle';
import React from 'react';
import theme from './src/style/Theme';
import {AppNavigator} from './src/navigation/AppNavigator';
import {SafeAreaView, StatusBar} from 'react-native';
import {NoBlueTootEnabledFullScreen} from './src/component/NoBlueTootEnabledFullScreenProps';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar backgroundColor={'#6B61DD'} />
        <NoBlueTootEnabledFullScreen onTryAgain={() => {}}>
          <AppNavigator />
        </NoBlueTootEnabledFullScreen>
      </SafeAreaView>
    </ThemeProvider>
  );
};

export default App;
