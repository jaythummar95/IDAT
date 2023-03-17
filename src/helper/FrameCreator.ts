class FrameCreator {
  unlockRequestFrame(): string {
    //89 1248 55 69AEBCAB 55 FFFFFFFFFFFFFFFF 00 0102030405 01 69
    return '';
  }
}

export const frameCreator = new FrameCreator();

/**
 sendRequestFrame(firmware_id, requestFrameType, keyData) //key data is the data required to make respective frames.
{
  /UNLOCK REQUEST FRAME/
  //Unlock Request Frame of Firmware ID = 1
  if ((firmware_id==1)AND(requestFrameType==unlockRequestFrame))
  {
    /[start:1Byte] [Ref No.:2Bytes] [KeyUserFlag:1Byte] [KeyID:4Bytes] [DateTimeValidityFlag:1Byte] [KeyString:8Bytes] [KeyType:1Byte] [usageTimeStamp:5Bytes] [Identifier:1Byte] [End:1Byte]/
    start = //1 byte start of the frame identifier;
      refNo = 0x1234;//generate incrementally cyclically from 0x0000 to 0xffff from local management.
    keyUserFlag = 0x55;//prepare value on the basis of active_status. 00 for KeyUser blocked (if active_status = N). 55 for KeyUser not blocked (if active_status = Y).
    keyID = 0x12345678;//ID of the active_key table converted from decimal to hex value, MSB padded with zeroes to make 4 Byte number
    dateTimeValidityFlag = 0x55; //00 means DateTime Invalid. 55 means DateTime valid. To be prepared from current_UserHonestDateTimeInHotelTimeZone
    keyString = 0x0123456789abcdef; //to be extracted from nvm_variables
    keyType = 0x00; //00 if deadbolt_override_access is N, 55 if Y
    usageTimeStamp = //5 Bytes DateTime value to be made from current_UserHonestDateTimeInHotelTimeZone. Read Note below.
      identifier = //1 Byte identifier for type of frame to be used by firmware.
        end = //1 byte end of the frame identifier.

          //Note for making 5 Bytes value of usageTimeStamp:
          //8 bits: Timezone value of hotel: 1 bit for + or - , 5 bits hour offset, 2 bits minutes offset (00 for 00, 01 for 15, 10 for 30, 11 for 45)
          //6 bits: Year Value: 0 to 63: Means year 2000 to 2063
          //4 bits: Month Value: 0 to 15: Actual months are only 1 to 12
          //5 bits: Date Value: 0 to 31: Actual dates are only 1 to 31
          //5 bits: Hour value: 0 to 31: Actual hours are only 0 to 23
          //6 bits: Minutes Value: 0 to 63: Actual minutes are only 0 to 59
          //6 bits: Seconds Value: 0 to 63: Actual seconds are only 0 to 59


          prepare frame
    send to BLE
    send to local memory for later syncing when internet available.
  }


  /KEY STRING CHANGE REQUEST FRAME/
  //Key String Change Request Frame of Firmware ID = 1
  if ((firmware_id==1)AND(requestFrameType==keyStringChangeRequestFrame))
  {
    /[start:1Byte] [Ref No.:2Bytes] [ExistingKeyString:8Bytes] [NewKeyString:8Bytes] [Identifier:1Byte] [End:1Byte]/
    start = 89;//1 byte start of the frame identifier;
    refNo = 0x1234;//generate incrementally cyclically from 0x0000 to 0xffff from local management.
    existingKeyString = 0x0123456789abcdef; //to be extracted from nvm_variables
    newKeyString = 0x0123456789abcdef; //to be generated randomly from app.
    identifier = //1 Byte identifier for type of frame to be used by firmware.
      end = //1 byte end of the frame identifier.

        prepare frame
    send to BLE
    send to local memory for later syncing when internet available.
  }


  /LOCK BACK TIME CHANGE REQUEST FRAME/
  //Lock Back Time Change Request Frame of Firmware ID = 1
  if ((firmware_id==1)AND(requestFrameType==lockBackTimeChangeRequestFrame))
  {
    /[start:1Byte] [Ref No.:2Bytes] [KeyString:8Bytes] [NewLockBackTime:2Bytes] [Identifier:1Byte] [End:1Byte]/
    start = //1 byte start of the frame identifier;
      refNo = 0x1234;//generate incrementally cyclically from 0x0000 to 0xffff from local management.
    KeyString = 0x0123456789abcdef; //to be extracted from nvm_variables
    newLockBackTime = ; //to be generated from form input values.
    identifier = //1 Byte identifier for type of frame to be used by firmware.
      end = //1 byte end of the frame identifier.

        prepare frame
    send to BLE
    send to local memory for later syncing when internet available.

  }


  /BLOCKED KEY IDs CHANGE REQUEST FRAME/
  //Blocked Key IDs Change Request Frame of Firmware ID = 1
  if ((firmware_id==1)AND(requestFrameType==blockedKeyIDchangeRequestFrame))
  {
    /[start:1Byte] [Ref No.:2Bytes] [KeyString:8Bytes] [keyID1:4Bytes] [keyID2:4Bytes] [Identifier:1Byte] [End:1Byte]/
    start = //1 byte start of the frame identifier;
      refNo = 0x1234;//generate incrementally cyclically from 0x0000 to 0xffff from local management.
    KeyString = 0x0123456789abcdef; //to be extracted from nvm_variables
    keyID1= ; //to be generated from form input values.
    keyID2= ; //to be generated from form input values.
    identifier = //1 Byte identifier for type of frame to be used by firmware.
      end = //1 byte end of the frame identifier.

        prepare frame
    send to BLE
    send to local memory for later syncing when internet available.
  }


  /MOTOR RUN TIME CHANGE REQUEST FRAME/
  //Motor Run Time Change Request Frame of Firmware ID = 1
  if ((firmware_id==1)AND(requestFrameType==motorRunTimeChangeRequestFrame))
  {
    /[start:1Byte] [Ref No.:2Bytes] [KeyString:8Bytes] [NewMotorRunTime:2Bytes] [Identifier:1Byte] [End:1Byte]/
    start = //1 byte start of the frame identifier;
      refNo = 0x1234;//generate incrementally cyclically from 0x0000 to 0xffff from local management.
    KeyString = 0x0123456789abcdef; //to be extracted from nvm_variables
    newMotorRunTime = ; //to be generated from form input values.
    identifier = //1 Byte identifier for type of frame to be used by firmware.
      end = //1 byte end of the frame identifier.

        prepare frame
    send to BLE
    send to local memory for later syncing when internet available.

  }


  /AES KEY CHANGE REQUEST FRAME/
  //AES Key Change Request Frame of Firmware ID = 1
  //NOTE: confirm from Krishna whether the response comes with new AES key or old?
  if ((firmware_id==1)AND(requestFrameType==AESkeyChangeRequestFrame))
  {
    /[start:1Byte] [Ref No.:2Bytes] [KeyString:8Bytes] [NewAESkey:16Bytes] [Identifier:1Byte] [End:1Byte]/
    start = //1 byte start of the frame identifier;
      refNo = 0x1234;//generate incrementally cyclically from 0x0000 to 0xffff from local management.
    KeyString = 0x0123456789abcdef; //to be extracted from nvm_variables
    newAESkey = ; //to be generated randomly.
    identifier = //1 Byte identifier for type of frame to be used by firmware.
      end = //1 byte end of the frame identifier.

        prepare frame
    send to BLE
    send to local memory for later syncing when internet available.
  }


  /ACCESS LOG INITIATION REQUEST FRAME/
  //Access Log Initiation Request Frame of Firmware ID = 1
  if ((firmware_id==1)AND(requestFrameType==accessLogInitiationRequestFrame))
  {
    /[start:1Byte] [Ref No.:2Bytes] [KeyString:8Bytes] [Identifier:1Byte] [End:1Byte]/
    start = //1 byte start of the frame identifier;
      refNo = 0x1234;//generate incrementally cyclically from 0x0000 to 0xffff from local management.
    KeyString = 0x0123456789abcdef; //to be extracted from nvm_variables
    identifier = //1 Byte identifier for type of frame to be used by firmware.
      end = //1 byte end of the frame identifier.

        prepare frame
    send to BLE
    send to local memory for later syncing when internet available.
  }


  /ACCESS LOG REQUEST FRAME/
  //Access Log Request Frame of Firmware ID = 1
  if ((firmware_id==1)AND(requestFrameType==accessLogRequestFrame))
  {
    /[start:1Byte] [Ref No.:2Bytes] [KeyString:8Bytes] [RecordNumber:1Byte] [Identifier:1Byte] [End:1Byte]/
    start = //1 byte start of the frame identifier;
      refNo = 0x1234;//generate incrementally cyclically from 0x0000 to 0xffff from local management.
    KeyString = 0x0123456789abcdef; //to be extracted from nvm_variables
    recordNumber = //recordNumber for which the access log has to be accessed out of MaxRecords number of records available in the access log.
      identifier = //1 Byte identifier for type of frame to be used by firmware.
        end = //1 byte end of the frame identifier.

          prepare frame
    send to BLE
    send to local memory for later syncing when internet available.
  }


  /MASTER RESET REQUEST FRAME/
  //Master Reset Request Frame of Firmware ID = 1
  if ((firmware_id==1)AND(requestFrameType==masterResetRequestFrame))
  {
    /[Pre-defined Master Reset Frame: XBytes]??/
    frame = //1 byte start of the frame identifier;

      prepare frame
    send to BLE
    send to local memory for later syncing when internet available.
  }



}*/
