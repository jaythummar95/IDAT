import React from 'react';
import {observer} from 'mobx-react-lite';
import {Box} from '../Box';
import {Text} from '../Text';
import {fonts} from '../../style/Fonts';

export interface NewModuleIDAssignProps {
  label: string;
  fontSize?: number;
  txtColor?: boolean;
}
export const NewModuleLabel: React.FC<NewModuleIDAssignProps> = observer(
  ({label, fontSize, txtColor}: NewModuleIDAssignProps) => {
    return (
      <Box>
        <Text
          textAlign={'center'}
          fontFamily={fonts.semiBold}
          color={txtColor ? 'green' : 'black'}
          fontSize={fontSize ?? 20}>
          {label}
        </Text>
      </Box>
    );
  },
);
