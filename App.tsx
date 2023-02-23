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
import React, {useEffect, useState} from 'react';
import theme from './src/style/Theme';
import {AppNavigator} from './src/navigation/AppNavigator';
import {SafeAreaView, StatusBar} from 'react-native';
import {NoBlueTootEnabledFullScreen} from './src/component/NoBlueTootEnabledFullScreenProps';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
import {DeviceHelper} from './src/helper/DeviceHelper';

const App = () => {
  const [blueToothEnabled, setBlueToothEanbaled] = useState(false);
  useEffect(() => {
    if (DeviceHelper.isAndroid()) {
      BluetoothStateManager.enable();
      setBlueToothEanbaled(true);
    } else {
      //TODO:: Add code for ios top enabled bluetooth
      setBlueToothEanbaled(true);
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar backgroundColor={'#6B61DD'} />
        <NoBlueTootEnabledFullScreen onTryAgain={() => {}}>
          {blueToothEnabled && <AppNavigator />}
        </NoBlueTootEnabledFullScreen>
      </SafeAreaView>
    </ThemeProvider>
  );
};

export default App;
