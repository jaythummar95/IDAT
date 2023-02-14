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
      <Box marginHorizontal={'r'} flex={1} justifyContent={'center'}>
        <Image
          marginBottom={'el'}
          alignSelf={'center'}
          borderRadius={50}
          source={Images.logo}
          height={DeviceHelper.calculateHeightRatio(150)}
          width={DeviceHelper.calculateWidthRatio(150)}
        />
        <EditText
          textLabel={'Secret Login Key:'}
          value={secretKey}
          placeholder={'Enter Key'}
          onChangeValue={text => {
            setSecretKey(text);
          }}
        />
        <Box marginVertical={'r'}>
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
