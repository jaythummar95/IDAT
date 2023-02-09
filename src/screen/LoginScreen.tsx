import React, {useState} from 'react';
import {observer} from 'mobx-react-lite';
import {Box} from '../component/Box';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Route, StackParamList} from '../navigation/AppNavigator';
import {EditText} from '../component/EditText/EditText';
import {Button} from '../component/Button';
import {Image} from '../component/Image';
import {DeviceHelper} from '../helper/DeviceHelper';
import {Images} from '../assets';

export const LoginScreen: React.FC = observer(() => {
  const {goBack} = useNavigation<StackNavigationProp<StackParamList>>();
  const [secretKey, setSecretKey] = useState('');
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  return (
    <Box backgroundColor={'pattensBlue'} flex={1}>
      <Box flex={1} justifyContent={'center'} marginHorizontal={'r'}>
        <Box flex={0.3}>
          <Image
            alignSelf={'center'}
            borderRadius={50}
            height={DeviceHelper.calculateHeightRatio(150)}
            width={DeviceHelper.calculateWidthRatio(150)}
            source={Images.logo}
          />
        </Box>

        <Box flex={0.2}>
          <EditText
            textLabel={'Secret Login Key:'}
            value={secretKey}
            placeholder={'Enter Key'}
            onChangeValue={text => {
              setSecretKey(text);
            }}
          />
        </Box>
        <Box flex={0.1} marginTop={'mR'}>
          <Button
            label={'Login to IDAT'}
            onPress={() => {
              navigation.navigate(Route.Dashboard);
            }}
            isLight={false}
          />
        </Box>
      </Box>
    </Box>
  );
});
