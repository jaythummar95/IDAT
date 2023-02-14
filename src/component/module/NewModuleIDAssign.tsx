import React from 'react';
import {observer} from 'mobx-react-lite';
import {Box} from '../Box';
import {Text} from '../Text';
import {fonts} from '../../style/Fonts';

export interface NewModuleIDAssignProps {
  label: string;
  fontSize?: boolean;
}
export const NewModuleIDAssign: React.FC<NewModuleIDAssignProps> = observer(
  ({label, fontSize}: NewModuleIDAssignProps) => {
    return (
      <Box>
        <Text
          textAlign={'center'}
          fontFamily={fonts.semiBold}
          color={'black'}
          fontSize={fontSize ? 15 : 20}>
          {label}
        </Text>
      </Box>
    );
  },
);
