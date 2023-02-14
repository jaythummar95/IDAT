import React from 'react';
import {observer} from 'mobx-react-lite';
import {Box} from '../Box';
import {Text} from '../Text';
import {fonts} from '../../style/Fonts';
import {DeviceHelper} from '../../helper/DeviceHelper';

export interface MuduleAlreadyExistsProps {
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
}
export const MuduleAlreadyExists: React.FC<MuduleAlreadyExistsProps> = observer(
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
  }: MuduleAlreadyExistsProps) => {
    const TextView = (txtLabel: string) => {
      return (
        <Box marginHorizontal={'sr'} marginVertical={'es'}>
          <Text fontFamily={fonts.bold} color={'black'} fontSize={16}>
            {txtLabel}
          </Text>
        </Box>
      );
    };
    return (
      <Box>
        <Text
          textAlign={'center'}
          fontFamily={fonts.semiBold}
          color={'black'}
          fontSize={20}>
          {label}
        </Text>
        <Box
          marginHorizontal={'l'}
          marginTop={'ls'}
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
          marginTop={'ls'}
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
      </Box>
    );
  },
);
