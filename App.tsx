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
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
import {DeviceHelper} from './src/helper/DeviceHelper';
import {NoInternetFullScreen} from './src/component/NoInternetFullScreen';
import {initHttpClient} from './src/core/Http';
import {BASE_URL} from './src/api/EndPoint';
import FlashMessage from 'react-native-flash-message';
import {
  FullScreenProgress,
  refFullScreenProgress,
} from './src/component/FullScreenProgress';
import {Box} from './src/component/Box';
import {NoBlueTootEnabledFullScreen} from './src/component/NoBlueTootEnabledFullScreenProps';

const App = () => {
  const [blueToothEnabled, setBlueToothEanbaled] = useState(false);

  /**
   * Enable bluetooth
   */
  const checkAndEnabledBlueTooth = () => {
    if (DeviceHelper.isAndroid()) {
      BluetoothStateManager.enable();
      setBlueToothEanbaled(true);
    } else {
      //TODO:: Add code for ios top enabled bluetooth
      setBlueToothEanbaled(true);
    }
  };

  useEffect(() => {
    checkAndEnabledBlueTooth();
    /**
     * Initialize base url for api call
     */
    initHttpClient(BASE_URL);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box flex={1}>
        <NoBlueTootEnabledFullScreen onTryAgain={() => {}}>
          <NoInternetFullScreen onTryAgain={() => {}}>
            {blueToothEnabled && <AppNavigator />}
            <FlashMessage />
            <FullScreenProgress ref={refFullScreenProgress} />
          </NoInternetFullScreen>
        </NoBlueTootEnabledFullScreen>
      </Box>
    </ThemeProvider>
  );
};

export default App;
