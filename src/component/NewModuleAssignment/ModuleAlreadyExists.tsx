import React from 'react';
import {observer} from 'mobx-react-lite';
import {Box} from '../Box';
import {Text} from '../Text';
import {fonts} from '../../style/Fonts';
import {DeviceHelper} from '../../helper/DeviceHelper';
import {Button} from '../Button';

export interface ModuleAlreadyExistsProps {
  label: string;
  labelModuleDetails: string;
  labelBleMsc: string;
  labelBmuId: string;
  labeBleModule: string;
  version: string;
  installationDetails: string;
  roomNo: string;
  hotelName: string;
  hotelAddress: string;
  onPressGotIt: () => void;
}
export const ModuleAlreadyExists: React.FC<ModuleAlreadyExistsProps> = observer(
  ({
    label,
    labelModuleDetails,
    labelBleMsc,
    labelBmuId,
    labeBleModule,
    version,
    installationDetails,
    roomNo,
    hotelName,
    hotelAddress,
    onPressGotIt,
  }: ModuleAlreadyExistsProps) => {
    const TextView = (txtLabel: string) => {
      return (
        <Box marginHorizontal={'sr'} marginVertical={'es'}>
          <Text fontFamily={fonts.medium} color={'black'} fontSize={14}>
            {txtLabel}
          </Text>
        </Box>
      );
    };
    return (
      <Box marginVertical={'l'}>
        <Text
          textAlign={'center'}
          fontFamily={fonts.semiBold}
          color={'black'}
          fontSize={20}>
          {label}
        </Text>
        <Box
          marginHorizontal={'l'}
          marginTop={'m'}
          backgroundColor={'primary2'}
          borderWidth={1}
          borderRadius={8}
          elevation={4}
          justifyContent={'center'}
          height={DeviceHelper.calculateHeightRatio(200)}
          borderColor={'primary2'}>
          {TextView(labelModuleDetails)}
          {TextView(labelBleMsc)}
          {TextView(labelBmuId)}
          {TextView(labeBleModule)}
          {TextView(version)}
        </Box>

        <Box
          marginHorizontal={'l'}
          marginTop={'r'}
          backgroundColor={'primary2'}
          borderWidth={1}
          borderRadius={8}
          elevation={4}
          justifyContent={'center'}
          height={DeviceHelper.calculateHeightRatio(200)}
          borderColor={'primary2'}>
          {TextView(installationDetails)}
          {TextView(roomNo)}
          {TextView(hotelName)}
          {TextView(hotelAddress)}
        </Box>
        <Box
          marginTop={'sr'}
          alignSelf={'center'}
          marginVertical={'r'}
          paddingHorizontal={'l'}
          width={'100%'}>
          <Button
            label={'Okay, Got It'}
            onPress={onPressGotIt}
            isLight={false}
          />
        </Box>
      </Box>
    );
  },
);
