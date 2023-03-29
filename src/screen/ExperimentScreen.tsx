import {Box} from '../component/Box';
import {Text} from '../component/Text';
import React, {useState} from 'react';
import {Button} from '../component/Button';
import {frameCreator} from '../helper/FrameCreator';
import {blockKeyIdGenerator} from '../helper/BlockKeyIdGenerator';

export const ExperimentScreen: React.FC = () => {
  const [unlockFrameRequestFrame, setUnLockFrameRequestFrame] =
    useState<string>('');
  const [keyStringChangeRequestFrame, setKeyStringChangeRequestFrame] =
    useState<string>('');
  const [lockBackTimeChangeRequestFrame, setLockBackTimeChangeRequestFrame] =
    useState('');
  const [noOfMotorRunTimeChangeRequest, setNoOfMotorRunTimeChangeRequest] =
    useState('');
  const [aesKeyChangeRequestFrame, setAesKeyChangeRequestFrame] = useState('');
  const [blockKeyIdChnageRequestFrame, setBlockKeyIdChangeRequestFrame] =
    useState('');
  const [accessLogInitiationRequestFrame, setAccessLogInitiationRequestFrame] =
    useState('');
  const [accessLogRequestFrame, setAccessLogRequestFrame] = useState('');
  return (
    <Box padding={'r'}>
      <Button
        label={'Unlock Frame Request'}
        onPress={() => {
          setUnLockFrameRequestFrame(
            frameCreator.unlockRequestFrame('FFFFFFFFFFFFFFFF'),
          );
          setKeyStringChangeRequestFrame(
            frameCreator.keyStringChangeRequestFrame(
              'FFFFFFFFFFFFFFFF',
              'CCCCCCCCCCCCCCCC',
            ),
          );
          setLockBackTimeChangeRequestFrame(
            frameCreator.lockBackChangeRequest('FFFFFFFFFFFFFFFF', 10),
          );
          setNoOfMotorRunTimeChangeRequest(
            frameCreator.motorRunTimeChangeRequest('FFFFFFFFFFFFFFFF', 10),
          );
          setAesKeyChangeRequestFrame(
            frameCreator.aesKeyChangeRequestFrame(
              'FFFFFFFFFFFFFFFF',
              'CCCCCCCCCCCCCCCC',
            ),
          );
          setBlockKeyIdChangeRequestFrame(
            frameCreator.blockKeyIdChangeRequestFrame(
              'FFFFFFFFFFFFFFFF',
              blockKeyIdGenerator.generateKey4Byte(),
              blockKeyIdGenerator.generateKey4Byte(),
            ),
          );
          setAccessLogInitiationRequestFrame(
            frameCreator.accessLogInitiationRequestFrame('FFFFFFFFFFFFFFFF'),
          );
          setAccessLogRequestFrame(frameCreator.accessLogRequestFrame());
        }}
      />

      <Text color={'primary'} marginVertical={'es'}>
        {'Unlock Request Frame :'}
      </Text>
      <Text>{unlockFrameRequestFrame}</Text>

      <Text color={'primary'} marginVertical={'es'}>
        {'Change Key Request Frame :'}
      </Text>
      <Text>{keyStringChangeRequestFrame}</Text>

      <Text color={'primary'} marginVertical={'es'}>
        {'Lock Back Time Change Request Frame :'}
      </Text>
      <Text>{lockBackTimeChangeRequestFrame}</Text>

      <Text color={'primary'} marginVertical={'es'}>
        {'No Of Motor Run Time Change Request Frame :'}
      </Text>
      <Text>{noOfMotorRunTimeChangeRequest}</Text>

      <Text color={'primary'} marginVertical={'es'}>
        {'AES key Change Request Frame :'}
      </Text>
      <Text>{aesKeyChangeRequestFrame}</Text>

      <Text color={'primary'} marginVertical={'es'}>
        {'Block Key Id Generator Request Frame :'}
      </Text>
      <Text>{blockKeyIdChnageRequestFrame}</Text>

      <Text color={'primary'} marginVertical={'es'}>
        {'Access Log Initiation Request Frame :'}
      </Text>
      <Text>{accessLogInitiationRequestFrame}</Text>

      <Text color={'primary'} marginVertical={'es'}>
        {'Access Log Request Frame :'}
      </Text>
      <Text>{accessLogRequestFrame}</Text>
    </Box>
  );
};
