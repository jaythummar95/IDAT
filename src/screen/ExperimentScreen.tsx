import {Box} from '../component/Box';
import {Text} from '../component/Text';
import React, {useState} from 'react';
import {refNumberGenerator} from '../helper/RefNumberGenerator';
import {Button} from '../component/Button';

export const ExperimentScreen: React.FC = () => {
  const [refNo, setREfNo] = useState<number>(1);
  return (
    <Box>
      <Button
        label={'Get Ref NUmber'}
        onPress={() => {
          setREfNo(refNumberGenerator.geRefNumber());
        }}
      />
      <Text>{refNo}</Text>
    </Box>
  );
};
