import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  AppState,
  AppStateStatus,
  Platform,
} from 'react-native';
import {useTheme} from '@shopify/restyle';
import {Theme} from '../style/Theme';
import {Box} from './Box';
import {Image} from './Image';
import {DeviceHelper} from '../helper/DeviceHelper';
import {Images} from '../assets';
import {fonts} from '../style/Fonts';
import {Text} from './Text';
import {Button} from './Button';
import BluetoothStateManager, {
  BluetoothState,
} from 'react-native-bluetooth-state-manager';

export interface NoBlueTootEnabledFullScreenProps {
  onTryAgain: () => void;
  children: React.ReactNode;
}

export const NoBlueTootEnabledFullScreen: React.FC<
  NoBlueTootEnabledFullScreenProps
> = ({onTryAgain, children}: NoBlueTootEnabledFullScreenProps) => {
  const hasInternet = useRef<boolean>();
  const [appState, setAppState] = useState(AppState.currentState);
  const [showEnabled, setShowEnabled] = useState<boolean>(true);
  const [showLoader, setShowLoader] = useState(false);
  const {colors} = useTheme<Theme>();
  useEffect(() => {}, [showLoader]);

  const connectivityChangeListener = () => {
    BluetoothStateManager.onStateChange((state: BluetoothState) => {
      switch (state) {
        case 'Unknown':
        case 'Resetting':
        case 'Unsupported':
        case 'Unauthorized':
        case 'PoweredOff':
          hasInternet.current = false;
          setShowEnabled(false);
          break;
        case 'PoweredOn':
          hasInternet.current = true;
          setShowEnabled(true);
          break;
      }
    }, true);
  };

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (appState !== nextAppState) {
      if (
        appState.match(/inactive|background/) &&
        nextAppState === 'active' &&
        Platform.OS === 'ios'
      ) {
        BluetoothStateManager.getState().then(bluetoothState => {
          switch (bluetoothState) {
            case 'Unknown':
            case 'Resetting':
            case 'Unsupported':
            case 'Unauthorized':
            case 'PoweredOff':
              hasInternet.current = false;
              setShowEnabled(false);
              break;
            case 'PoweredOn':
              hasInternet.current = true;
              setShowEnabled(true);
              break;
          }
        });
      }
      setAppState(nextAppState);
    }
  };

  useEffect(() => {
    connectivityChangeListener();
    AppState.addEventListener('change', handleAppStateChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {}, [showEnabled]);

  if (!showEnabled) {
    return (
      <Box
        position="absolute"
        backgroundColor="white"
        height="100%"
        width="100%"
        justifyContent="center"
        alignItems="center">
        <Image
          width={DeviceHelper.width() / 1.5}
          height={DeviceHelper.width() / 1.5}
          source={Images.bluetooth}
        />
        <Text
          marginTop="el"
          fontFamily={fonts.regular}
          fontSize={18}
          color="black"
          textAlign="center">
          Your Bluetooth is not enabled.
        </Text>
        <Text
          paddingHorizontal="l"
          fontFamily={fonts.regular}
          fontSize={16}
          color="black"
          textAlign="center">
          Power on your bluetooth and try again.
        </Text>
        <Box width="100%" paddingHorizontal="m" marginTop={'l'}>
          {showLoader ? (
            <Box height={50} justifyContent="center" alignItems="center">
              <ActivityIndicator color={colors.primary} />
            </Box>
          ) : (
            <Button
              onPress={() => {
                if (DeviceHelper.ios()) {
                  BluetoothStateManager.openSettings();
                } else {
                  BluetoothStateManager.enable();
                }
                setShowLoader(true);
                onTryAgain();
                setTimeout(() => {
                  setShowLoader(false);
                }, 4000);
              }}
              label={'Try aging'}
            />
          )}
        </Box>
      </Box>
    );
  } else {
    return <Box flex={1}>{children}</Box>;
  }
};
