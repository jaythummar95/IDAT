import React from 'react';
import {observer} from 'mobx-react';
import {Box} from '../Box';
import {Text} from '../Text';
import {fonts} from '../../style/Fonts';
import {Input} from '../Input';

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
      <Box>
        <Text
          marginVertical={'r'}
          marginTop={'r'}
          fontFamily={fonts.regular}
          color={'black'}
          fontSize={17}>
          {textLabel}
        </Text>
        <Box>
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
