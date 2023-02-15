import React from 'react';
import {observer} from 'mobx-react-lite';
import {Box} from '../Box';
import {Text} from '../Text';
import {fonts} from '../../style/Fonts';
import {NewModuleLabel} from '../module/NewModuleLabel';

export interface TestingResultProps {
  resultLabel: string;
  resultDeclaration: string;
}
export const TestingResult: React.FC<TestingResultProps> = observer(
  ({resultLabel, resultDeclaration}: TestingResultProps) => {
    return (
      <Box>
        <Box
          marginVertical={'l'}
          borderRadius={10}
          elevation={5}
          backgroundColor={'primary2'}
          marginHorizontal={'l'}>
          <Box marginVertical={'l'}>
            <Text
              textAlign={'center'}
              fontFamily={fonts.semiBold}
              color={'black'}
              fontSize={18}>
              Received Response Result:
            </Text>
            <Box marginTop={'s'}>
              <Text
                textAlign={'center'}
                fontFamily={fonts.semiBold}
                color={'black'}
                fontSize={40}>
                {resultLabel}
              </Text>
            </Box>
          </Box>
        </Box>
        <Box flexDirection={'row'} justifyContent={'center'}>
          <NewModuleLabel label={'Test Result:'} fontSize={18} />
          <NewModuleLabel
            label={resultDeclaration}
            fontSize={20}
            txtColor={'green'}
          />
        </Box>
      </Box>
    );
  },
);
