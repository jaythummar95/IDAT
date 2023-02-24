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
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
export interface NoInternetFullScreenProps {
  onTryAgain: () => void;
  children: React.ReactNode;
}

export const NoInternetFullScreen: React.FC<NoInternetFullScreenProps> = ({
  onTryAgain,
  children,
}: NoInternetFullScreenProps) => {
  const hasInternet = useRef<boolean>();
  const [appState, setAppState] = useState(AppState.currentState);
  const [showConnected, setShowConnected] = useState<boolean>(true);
  const [showLoader, setShowLoader] = useState(false);
  const {colors} = useTheme<Theme>();
  useEffect(() => {}, [showLoader]);

  const connectivityChangeListener = () => {
    NetInfo.addEventListener(state => {
      if (state.isConnected !== null) {
        if (!state.isConnected) {
          hasInternet.current = false;
          setShowConnected(false);
        } else if (
          hasInternet?.current !== undefined &&
          !hasInternet.current &&
          state.isConnected
        ) {
          hasInternet.current = true;
          setShowConnected(true);
        }
      }
    });
  };

  const netInfo = useNetInfo();
  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (appState !== nextAppState) {
      if (
        appState.match(/inactive|background/) &&
        nextAppState === 'active' &&
        Platform.OS === 'ios'
      ) {
        if (netInfo.isConnected !== null) {
          if (!netInfo.isConnected) {
            hasInternet.current = false;
            setShowConnected(false);
          } else if (
            hasInternet?.current !== undefined &&
            !hasInternet.current &&
            netInfo.isConnected
          ) {
            hasInternet.current = true;
            setShowConnected(true);
          }
        }
      }
      setAppState(nextAppState);
    }
  };

  useEffect(() => {
    connectivityChangeListener();
    AppState.addEventListener('change', handleAppStateChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {}, [showConnected]);

  if (!showConnected) {
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
          source={Images.no_net}
        />
        <Text
          marginTop="el"
          fontFamily={fonts.regular}
          fontSize={18}
          color="black"
          textAlign="center">
          Your are offline
        </Text>
        <Text
          paddingHorizontal="l"
          fontFamily={fonts.regular}
          fontSize={16}
          color="black"
          textAlign="center">
          Check your internet connection and
        </Text>
        <Box width="100%" paddingHorizontal="m" marginTop={'l'}>
          {showLoader ? (
            <Box height={50} justifyContent="center" alignItems="center">
              <ActivityIndicator color={colors.primary} />
            </Box>
          ) : (
            <Button
              onPress={() => {
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
