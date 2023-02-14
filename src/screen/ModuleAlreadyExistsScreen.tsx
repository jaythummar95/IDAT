import React from 'react';
import {observer} from 'mobx-react-lite';
import {Box} from '../component/Box';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Route, StackParamList} from '../navigation/AppNavigator';
import {MuduleAlreadyExists} from '../component/module/MuduleAlreadyExists';
import {Button} from '../component/Button';
import {StackNavigationProp} from '@react-navigation/stack';
import {Text} from '../component/Text';
import {fonts} from '../style/Fonts';
import { Pressable } from "../component/Pressable";
import { NewModuleIDAssign } from "../component/module/NewModuleIDAssign";
import { HomeHeader } from "../component/HomeHeader/HomeHeader";

export const ModuleAlreadyExistsScreen: React.FC = observer(() => {
  const route =
    useRoute<RouteProp<StackParamList, 'ModuleAlreadyExistsScreen'>>();
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const {goBack} = useNavigation<StackNavigationProp<StackParamList>>();

  const {ip} = route.params;
  return (
    <Box backgroundColor={'pattensBlue'} flex={1}>
      <HomeHeader
        label={'New Modules ID Assignment'}
        onBackPress={() => {
          goBack();
        }}
      />
      <Box>
      <Box marginVertical={'r'}>
        <MuduleAlreadyExists
          label={'Module Already Exists in System:'}
          labelModuleDetails={'BLE Module Details:'}
          labelBleMsc={'BLE MAC: ' + ip}
          labelBmuId={'BMU-ID: 0A5678'}
          labeBleModule={'BLE Module Type ID: 3'}
          version={'Firmware Version: 1.3'}
          installationDetails={'Installation Details:'}
          roomNo={'Installed At: Room No. 103 or Swimming Pool'}
          hotelName={'Biltmore Mayfair LXR Resorts '}
          hotelAddress={'address'}
        />
      </Box>
      <Box marginHorizontal={'r'} alignItems={'center'} marginTop={'m'}>
        <Pressable onPress={()=>{}}>
          <Text fontFamily={fonts.bold} color={'black'} fontSize={18}>
            [Okay, Got it  ->]
          </Text>
        </Pressable>
      </Box>
      </Box>
      <Box>
        <Box marginVertical={'r'}>
        <NewModuleIDAssign label={"New Module ID Assignment:"}/>
        </Box>
      </Box>
    </Box>
  );
});
