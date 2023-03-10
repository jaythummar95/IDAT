import React, {useEffect, useState} from 'react';
import {Box} from '../component/Box';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {Screen} from '../component/Screen';
import {HomeHeader} from '../component/HomeHeader/HomeHeader';
import {goBack, StackParamList} from '../navigation/AppNavigator';
import {RouteProp, useRoute} from '@react-navigation/native';

export const ScanQrCodeScreen: React.FC = () => {
  const route = useRoute<RouteProp<StackParamList, 'ScanQrCodeScreen'>>();
  const {onScanComplete} = route.params;
  const [loadView, setLoadView] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoadView(true);
    }, 1000);
  }, []);

  const onSuccess = (result: any) => {
    onScanComplete(result);
  };

  return (
    <Screen>
      <Box flex={1} backgroundColor={'black'}>
        <HomeHeader
          label={'Scan QR'}
          onBackPress={() => {
            goBack();
          }}
        />
        {loadView && (
          <QRCodeScanner
            onRead={onSuccess}
            cameraStyle={{height: '100%'}}
            flashMode={RNCamera.Constants.FlashMode.torch}
          />
        )}
      </Box>
    </Screen>
  );
};
