import React from 'react';
import {observer} from 'mobx-react';
import {Box} from '../Box';
import {Text} from '../Text';
import {fonts} from '../../style/Fonts';
import {Input} from '../Input';
import {Image} from '../Image';
import { DeviceHelper } from "../../helper/DeviceHelper";
import { Images } from "../../assets";

export interface EditTextProps {
  textLabel: string;
  value: string;
  placeholder: string;
  onChangeValue: (text: string) => void;
  isTextArea?: boolean;
  disabled?: boolean;
}

export const EditText: React.FC<EditTextProps> = observer(
  ({textLabel, value, onChangeValue, placeholder}: EditTextProps) => {
    return (
      <Box flex={1}>
        <Text
          marginVertical={'r'}
          marginTop={'r'}
          fontFamily={fonts.poppinsRegular}
          color={'black'}
          fontSize={17}>
          {textLabel}
        </Text>
        <Box flex={0.5}>
          <Input
            isBottomMargin={false}
            placeholder={placeholder}
            keyboardType={'default'}
            value={value}
            isIcon={true}
            leftComponent={true}
            autoCapitalize={'none'}
            onChangeText={onChangeValue}
          />
        </Box>
      </Box>
    );
  },
);
