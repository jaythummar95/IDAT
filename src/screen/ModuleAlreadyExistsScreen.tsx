import React from 'react';
import {observer} from 'mobx-react-lite';
import {Box} from '../component/Box';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackParamList} from '../navigation/AppNavigator';
import {ModuleAlreadyExists} from '../component/NewModuleAssignment/ModuleAlreadyExists';
import {StackNavigationProp} from '@react-navigation/stack';
import {Text} from '../component/Text';
import {fonts} from '../style/Fonts';
import {Pressable} from '../component/Pressable';
import {NewModuleLabel} from '../component/NewModuleAssignment/NewModuleLabel';
import {HomeHeader} from '../component/HomeHeader/HomeHeader';

export const ModuleAlreadyExistsScreen: React.FC = observer(() => {
  const route =
    useRoute<RouteProp<StackParamList, 'ModuleAlreadyExistsScreen'>>();
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
          <ModuleAlreadyExists
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
            onPressGotIt={() => {}}
          />
        </Box>
        <Box marginHorizontal={'r'} alignItems={'center'} marginTop={'m'}>
          <Pressable onPress={() => {}}>
            <Text fontFamily={fonts.bold} color={'black'} fontSize={18}>
              {'[Okay, Got it  ->]'}
            </Text>
          </Pressable>
        </Box>
      </Box>
      <Box>
        <Box marginVertical={'r'}>
          <NewModuleLabel label={'New Module ID Assignment:'} fontSize={20} />
        </Box>
      </Box>
    </Box>
  );
});
