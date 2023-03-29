import {refNumberGenerator} from './RefNumberGenerator';
import {binaryToHex, decimalToBinary, getTimeZoneOffset} from './Utils';
import moment from 'moment/moment';

class FrameCreator {
  /**
   * @param timeZone eg. +05:30;
   */
  private getTimeZoneBinary(timeZone: string): string {
    const timeZoneSign = timeZone.charAt(0);
    const timeZoneHours = timeZone.substring(1, 3);
    const timeZoneMinutes = timeZone.substring(4, 6);

    const timeZoneSignBinary = timeZoneSign === '+' ? 1 : 0;
    const timeZoneHoursBinary = decimalToBinary(parseInt(timeZoneHours, 10), 5);
    let timeZoneMinutesBinary = '';
    switch (timeZoneMinutes) {
      case '00':
        timeZoneMinutesBinary = '00';
        break;
      case '15':
        timeZoneMinutesBinary = '01';
        break;
      case '30':
        timeZoneMinutesBinary = '10';
        break;
      case '45':
        timeZoneMinutesBinary = '11';
        break;
      default:
        timeZoneMinutesBinary = '00';
        break;
    }
    return `${timeZoneSignBinary}${timeZoneHoursBinary}${timeZoneMinutesBinary}`;
  }

  private getDateBinary(date: string): string {
    const dateSplit = date.split('/');
    const day = dateSplit[0];
    const month = dateSplit[1];
    const year = dateSplit[2];

    const dayBinary = decimalToBinary(parseInt(day, 10), 6);
    const monthBinary = decimalToBinary(parseInt(month, 10), 4);
    const yearBinary = decimalToBinary(parseInt(year, 10), 5);
    return `${dayBinary}${monthBinary}${yearBinary}`;
  }

  private getTimeBinary(time: string): string {
    const timeSplit = time.split(':');
    const hour = timeSplit[0];
    const minute = timeSplit[1];
    const seconds = timeSplit[2];

    const hourBinary = decimalToBinary(parseInt(hour, 10), 5);
    const minuteBinary = decimalToBinary(parseInt(minute, 10), 6);
    const secondsBinary = decimalToBinary(parseInt(seconds, 10), 6);
    return `${hourBinary}${minuteBinary}${secondsBinary}`;
  }

  private getTimeStamp(): string {
    const timeZone = getTimeZoneOffset();
    const date = moment().format('DD/MM/YY');
    const time = moment().format('HH:mm:ss');

    console.log('TIMEZONE', timeZone);
    console.log('DATE', date);
    console.log('TIME', time);

    const timeZoneBinary = this.getTimeZoneBinary(timeZone);
    const dateBinary = this.getDateBinary(date);
    const timeBinary = this.getTimeBinary(time);

    console.log('TIME_ZONE_BINARY', timeZoneBinary);
    console.log('DATE_BINARY', dateBinary);
    console.log('TIME_BINARY', timeBinary);

    const timeStampBinary = `${timeZoneBinary}${dateBinary}${timeBinary}`;

    console.log('TIME_STAMP_BINARY', timeStampBinary);

    const fiveSplitOfTimeStampBinary = timeStampBinary.match(/.{1,8}/g) ?? [];
    console.log('FIVE_TIME_STAMP_BINARY', fiveSplitOfTimeStampBinary);

    const bin1 = fiveSplitOfTimeStampBinary[0];
    const bin2 = fiveSplitOfTimeStampBinary[1];
    const bin3 = fiveSplitOfTimeStampBinary[2];
    const bin4 = fiveSplitOfTimeStampBinary[3];
    const bin5 = fiveSplitOfTimeStampBinary[4];

    console.log('BIN_1', bin1);
    console.log('BIN_2', bin2);
    console.log('BIN_3', bin3);
    console.log('BIN_4', bin4);
    console.log('BIN_5', bin5);

    // @ts-ignore
    const bin1Hex = binaryToHex(bin1);
    const bin2Hex = binaryToHex(bin2);
    const bin3Hex = binaryToHex(bin3);
    const bin4Hex = binaryToHex(bin4);
    const bin5Hex = binaryToHex(bin5);

    console.log('BIN_1_HEX', bin1Hex);
    console.log('BIN_2_HEX', bin2Hex);
    console.log('BIN_3_HEX', bin3Hex);
    console.log('BIN_4_HEX', bin4Hex);
    console.log('BIN_5_HEX', bin5Hex);

    const finalTimeStampHex = `${bin1Hex}${bin2Hex}${bin3Hex}${bin4Hex}${bin5Hex}`;
    console.log('finalTimeStampHex', finalTimeStampHex);
    return finalTimeStampHex;
  }

  private getLockBackTimeHex(lockBackTime: number): string {
    const lockBackTimeDecimal = lockBackTime * 100;
    const lockBackTimeDecimalBinary = decimalToBinary(lockBackTimeDecimal, 16);
    const fourSplitToLockBackTimeBinary =
      lockBackTimeDecimalBinary.match(/.{1,8}/g) ?? [];
    console.log('lockBackTimeDecimalBinary', lockBackTimeDecimalBinary);

    const bin1 = fourSplitToLockBackTimeBinary[0];
    const bin2 = fourSplitToLockBackTimeBinary[1];

    // @ts-ignore
    const bin1Hex = binaryToHex(bin1);
    const bin2Hex = binaryToHex(bin2);

    const finalLockBackHex = `${bin1Hex}${bin2Hex}`;
    console.log('finalLockBackHex', finalLockBackHex);
    return finalLockBackHex;
  }

  private getNoOfMotorRunTime(noOfMotorRunTime: number): string {
    const noOfMotorRunTimeDecimal = noOfMotorRunTime * 100;
    const noOfMotorRunTimeBinary = decimalToBinary(noOfMotorRunTimeDecimal, 16);
    const fourSplitToNoOfMotorRunTimeBinary =
      noOfMotorRunTimeBinary.match(/.{1,8}/g) ?? [];
    console.log('noOfMotorRunTimeBinary', noOfMotorRunTimeBinary);

    const bin1 = fourSplitToNoOfMotorRunTimeBinary[0];
    const bin2 = fourSplitToNoOfMotorRunTimeBinary[1];

    // @ts-ignore
    const bin1Hex = binaryToHex(bin1);
    const bin2Hex = binaryToHex(bin2);

    const finalNoOfMotorRunTimeHex = `${bin1Hex}${bin2Hex}`;
    console.log('finalNoOfMotorRunTimeHex', finalNoOfMotorRunTimeHex);
    return finalNoOfMotorRunTimeHex;
  }

  /**
   *  UNLOCK REQUEST FRAME
   *
   *  Unlock Request Frame of Firmware ID = 1
   *  if ((firmware_id==1)AND(requestFrameType==unlockRequestFrame))
   *  {
   * 		/[start:1Byte] [Ref No.:2Bytes] [KeyUserFlag:1Byte] [KeyID:4Bytes] [DateTimeValidityFlag:1Byte] [KeyString:8Bytes] [KeyType:1Byte] [usageTimeStamp:5Bytes] [Identifier:1Byte] [End:1Byte] [Padding:7Bytes]/
   * 		start = "89";//FIXED VALUE: 1 byte start of the frame identifier;
   * 		refNo = "1234";//generate incrementally cyclically from 0x0000 to 0xffff from local management.
   * 		keyUserFlag = "55";//FIXED VALUE for IDAT app
   * 		keyID = "00000000";//FIXED VALUE for IDAT app
   * 		dateTimeValidityFlag = "55"; //FIXED VALUE for IDAT app
   * 		keyString = "0123456789ABCDEF"; //to be extracted from nvm_variables
   * 		keyType = "00" OR "55"; //depending on need as per IDAT app flow; 00 if deadbolt override access is No, 55 if Yes
   * 		usageTimeStamp = //5 Bytes DateTime value to be made. Read Note below. Explanation Given.
   * 		identifier = "01"//FIXED VALUE: 1 Byte identifier for type of frame to be used by firmware.
   * 		end = "69";//FIXED VALUE: 1 byte end.
   * 		padding = "00000000000000"; //FIXED VALUE: 14 zeroes. 7 Bytes.
   * 		//Example: 891111559999999955CCCCCCCCCCCCCCCC55AAAAAAAAAA016900000000000000 (32 Bytes or 64 Characters)
   *
   * 		//Note for making 5 Bytes value of usageTimeStamp:
   * 		//8 bits: Timezone value of hotel: 1 bit for + or - , 5 bits hour offset, 2 bits minutes offset (00 for 00, 01 for 15, 10 for 30, 11 for 45)
   * 		//6 bits: Year Value: 0 to 63: Means year 2000 to 2063
   * 		//4 bits: Month Value: 0 to 15: Actual months are only 1 to 12
   * 		//5 bits: Date Value: 0 to 31: Actual dates are only 1 to 31
   * 		//5 bits: Hour value: 0 to 31: Actual hours are only 0 to 23
   * 		//6 bits: Minutes Value: 0 to 63: Actual minutes are only 0 to 59
   * 		//6 bits: Seconds Value: 0 to 63: Actual seconds are only 0 to 59
   *
   *
   * 		prepare frame
   * 		send to BLE
   *
   * 	}
   * @param keyString
   */
  unlockRequestFrame(keyString: string): string {
    //89 1248 55 69AEBCAB 55 FFFFFFFFFFFFFFFF 00 0102030405 01 69
    /** [start:1Byte] [Ref No.:2Bytes] [KeyUserFlag:1Byte] [KeyID:4Bytes] [DateTimeValidityFlag:1Byte] [KeyString:8Bytes] [KeyType:1Byte] [usageTimeStamp:5Bytes] [Identifier:1Byte] [End:1Byte] [Padding:7Bytes]*/
    const start = 89;
    const refNo = refNumberGenerator.geRefNumber();
    const keyUserFlag = 55;
    const keyID = '00000000';
    const dateTimeValidityFlag = '55';
    const keyType = '00';
    const usageTimeStamp = this.getTimeStamp();
    const identifier = '01';
    const end = '69';
    const padding = '00000000000000';

    const unlockRequestFrame = `${start}${refNo}${keyUserFlag}${keyID}${dateTimeValidityFlag}${keyString}${keyType}${usageTimeStamp}${identifier}${end}${padding}`;
    console.log('UNLOCK_FRAME', unlockRequestFrame);
    return unlockRequestFrame;
  }

  /**
   *  KEY STRING CHANGE REQUEST FRAME
   *
   *  Key String Change Request Frame of Firmware ID = 1
   *  if ((firmware_id==1)AND(requestFrameType==keyStringChangeRequestFrame))
   *  {
   * 		/[start:1Byte] [Ref No.:2Bytes] [ExistingKeyString:8Bytes] [NewKeyString:8Bytes] [Identifier:1Byte] [End:1Byte] [padding:11Bytes]/
   * 		start = "69";//FIXED VALUE: 1 byte start
   * 		refNo = "1234";//copied from the request frame
   * 		existingKeyString = "0123456789ABCDEF"//to be extracted from nvm_variables
   * 		newKeyString = "FEDCBA9876543210"; //to be generated randomly from app (0-to-9 and A-to-F only to be used).
   * 		identifier = "02"//FIXED VALUE: 1 Byte identifier for type of frame to be used by firmware.
   * 		end = "89"; //FIXED VALUE: 1 byte end of the frame identifier.
   * 		padding = "0000000000000000000000"; //FIXED VALUE: 11 Bytes means 22 zeroes.
   *
   * 		Example: 691111CCCCCCCCCCCCCCCCDDDDDDDDDDDDDDDD02890000000000000000000000
   *
   * 		prepare frame
   * 		send to BLE
   * 	}
   * @param existingKeyString
   * @param newKeyString
   */
  keyStringChangeRequestFrame(
    existingKeyString: string,
    newKeyString: string,
  ): string {
    /**
     * [start:1Byte] [Ref No.:2Bytes] [ExistingKeyString:8Bytes] [NewKeyString:8Bytes] [Identifier:1Byte] [End:1Byte] [padding:11Bytes]
     */
    const start = 69;
    const refNo = refNumberGenerator.geRefNumber();
    const identifier = '02';
    const end = 89;
    const padding = '0000000000000000000000';
    return `${start}${refNo}${existingKeyString}${newKeyString}${identifier}${end}${padding}`;
  }

  /**
   *  LOCK BACK TIME CHANGE REQUEST FRAME
   *  Lock Back Time Change Request Frame of Firmware ID = 1
   *  if ((firmware_id==1)AND(requestFrameType==lockBackTimeChangeRequestFrame))
   *  {
   * 		/[start:1Byte] [Ref No.:2Bytes] [KeyString:8Bytes] [NewLockBackTime:2Bytes] [Identifier:1Byte] [End:1Byte] [padding:1Byte]/
   * 		start = "69";//FIXED VALUE: 1 byte start
   * 		refNo = "1234";//generate incrementally cyclically from 0x0000 to 0xffff from local management.
   * 		KeyString = "0123456789ABCDEF"; //to be extracted from nvm_variables
   * 		newLockBackTime = "03E8"; //4 Bytes: IF "X" is the required seconds, then first calculate X*100 in decimal and then convert it to hex. Do padding for MSBs if required for smaller values to achieve 4bytes.
   * 		identifier = "03"//FIXED VALUE: 1 Byte identifier for type of frame to be used by firmware.
   * 		end = "89"; //FIXED VALUE: 1 byte end of the frame identifier.
   * 		padding = "00"; //FIXED VALUE: 1 Byte means 2 zeroes.
   * 		//Example: 691111CCCCCCCCCCCCCCCC1111038900 (32 characters or 16 Bytes)
   *
   * 		prepare frame
   * 		send to BLE
   * 	}
   */
  lockBackChangeRequest(keyString: string, lockBackTime: number) {
    const start = 69;
    const refNo = refNumberGenerator.geRefNumber();
    const newLockBackTime = this.getLockBackTimeHex(lockBackTime);
    const identifier = '03';
    const end = '89';
    const padding = '00';
    const lockBackCRFrame = `${start}${refNo}${keyString}${newLockBackTime}${identifier}${end}${padding}`;
    console.log('LOCK_BACK_TIME_CHANGE_REQUEST', lockBackCRFrame);
    return lockBackCRFrame;
  }

  /**
   *  BLOCKED KEY IDs CHANGE REQUEST FRAME
   *  Blocked Key IDs Change Request Frame of Firmware ID = 1
   *  if ((firmware_id==1)AND(requestFrameType==blockedKeyIDchangeRequestFrame))
   *  {
   * 		/[start:1Byte] [Ref No.:2Bytes] [KeyString:8Bytes] [keyID1:4Bytes] [keyID2:4Bytes] [Identifier:1Byte] [End:1Byte] [padding:11Bytes]/
   * 		start = "69";//FIXED VALUE: 1 byte start
   * 		refNo = "1234";//generate incrementally cyclically from 0x0000 to 0xffff from local management.
   * 		KeyString = "0123456789ABCDEF"; //to be extracted from nvm_variables
   * 		keyID1 = "12345678"; // 4 Bytes: to be generated from form input values.
   * 		keyID2 = "12345678"; //4 Bytes: to be generated from form input values.
   * 		identifier = "04";//FIXED VALUE: 1 Byte identifier for type of frame to be used by firmware.
   * 		end = "89"; //FIXED VALUE: 1 byte end of the frame identifier.
   * 		padding = "0000000000000000000000"; //FIXED VALUE: 11 Bytes means 22 zeroes.
   * 		//Example: 691111CCCCCCCCCCCCCCCC888888887777777704890000000000000000000000 (32 Bytes or 64 Characters)
   *
   * 		prepare frame
   * 		send to BLE
   * 	}
   */

  blockKeyIdChangeRequestFrame(
    keyString: string,
    keyId1: string,
    keyId2: string,
  ) {
    /**
     * [start:1Byte] [Ref No.:2Bytes] [KeyString:8Bytes] [keyID1:4Bytes] [keyID2:4Bytes] [Identifier:1Byte] [End:1Byte] [padding:11Bytes]
     */
    const start = 69;
    const refNo = refNumberGenerator.geRefNumber();
    const identifier = '04';
    const end = 89;
    const padding = '0000000000000000000000';
    const blockKeyIdChangeRequest = `${start}${refNo}${keyString}${identifier}${keyId1}${keyId2}${end}${padding}`;
    console.log('BLOCK_KEY_ID_CHANGE_REQUEST', blockKeyIdChangeRequest);
    return blockKeyIdChangeRequest;
  }

  /**
   *  /MOTOR RUN TIME CHANGE REQUEST FRAME/
   *  //Motor Run Time Change Request Frame of Firmware ID = 1
   *  if ((firmware_id==1)AND(requestFrameType==motorRunTimeChangeRequestFrame))
   *  {
   * 		/[start:1Byte] [Ref No.:2Bytes] [KeyString:8Bytes] [NewMotorRunTime:2Bytes] [Identifier:1Byte] [End:1Byte] [padding:1Byte]/
   * 		start = "69";//FIXED VALUE: 1 byte start
   * 		refNo = "1234";//generate incrementally cyclically from 0x0000 to 0xffff from local management.
   * 		KeyString = "0123456789ABCDEF"; //to be extracted from nvm_variables
   * 		newMotorRunTime = "01F4"; //4 Bytes: IF "X" is the required seconds, then first calculate X*100 in decimal and then convert it to hex. Do padding for MSBs if required for smaller values to achieve 4bytes.
   * 		identifier = "05";//FIXED VALUE: 1 Byte identifier for type of frame to be used by firmware.
   * 		end = "89"; //FIXED VALUE: 1 byte end of the frame identifier.
   * 		padding = "00"; //FIXED VALUE: 1 Byte means 2 zeroes.
   * 		//Example: 691111CCCCCCCCCCCCCCCC1111058900 (16 Bytes or 32 Characters)
   *
   * 		prepare frame
   * 		send to BLE
   * 	}
   */
  motorRunTimeChangeRequest(keyString: string, motorRunTime: number): string {
    /**
     * [start:1Byte] [Ref No.:2Bytes] [KeyString:8Bytes] [NewMotorRunTime:2Bytes] [Identifier:1Byte] [End:1Byte] [padding:1Byte]
     * */
    const start = 69;
    const refNo = refNumberGenerator.geRefNumber();
    const identifier = '05';
    const noOfMotorRunTime = this.getNoOfMotorRunTime(motorRunTime);
    const end = 89;
    const padding = '00';
    const motorRunTimeCr = `${start}${refNo}${keyString}${identifier}${noOfMotorRunTime}${end}${padding}`;
    console.log('MOTOR_RUN_TIME_CHANGE_REQUEST', motorRunTimeCr);
    return motorRunTimeCr;
  }

  /**
   *  AES KEY CHANGE REQUEST FRAME
   *  AES Key Change Request Frame of Firmware ID = 1
   *  NOTE: confirm from Krishna whether the response comes with new AES key or old?
   *  if ((firmware_id==1)AND(requestFrameType==AESkeyChangeRequestFrame))
   *  {
   * 		/[start:1Byte] [Ref No.:2Bytes] [KeyString:8Bytes] [NewAESkey:16Bytes] [Identifier:1Byte] [End:1Byte] [padding:3Bytes]/
   * 		start = "69";//FIXED VALUE: 1 byte start
   * 		refNo = "1234";//generate incrementally cyclically from 0x0000 to 0xffff from local management.
   * 		KeyString = "0123456789ABCDEF"; //to be extracted from nvm_variables
   * 		newAESkey = "00112233445566778899AABBCCDDEEFF"; //to be generated randomly AND REMEMBER temporarily
   * 		identifier = "06"//FIXED VALUE: 1 Byte identifier for type of frame to be used by firmware.
   * 		end = "89"; //FIXED VALUE: 1 byte end of the frame identifier.
   * 		padding = "000000"; //FIXED VALUE: 3 Bytes means 6 zeroes.
   * 		//691111CCCCCCCCCCCCCCCCFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF0689000000 (32 Bytes or 64 Characters)
   *
   * 		prepare frame
   * 		send to BLE
   * 	}
   */
  aesKeyChangeRequestFrame(keyString: string, newAESKey: string): string {
    /**
     * [start:1Byte] [Ref No.:2Bytes] [KeyString:8Bytes] [NewAESkey:16Bytes] [Identifier:1Byte] [End:1Byte] [padding:3Bytes]
     */
    const start = 69;
    const refNo = refNumberGenerator.geRefNumber();
    const identifier = '06';
    const end = 89;
    const padding = '000000';
    const aesKeyChangeReqestFrame = `${start}${refNo}${keyString}${newAESKey}${identifier}${end}${padding}`;
    console.log('AES_KEY_CHANGE_REQUEST_FRAME', aesKeyChangeReqestFrame);
    return aesKeyChangeReqestFrame;
  }

  /**
   *  ACCESS LOG INITIATION REQUEST FRAME
   *  Access Log Initiation Request Frame of Firmware ID = 1
   *  if ((firmware_id==1)AND(requestFrameType==accessLogInitiationRequestFrame))
   *  {
   * 		/[start:1Byte] [Ref No.:2Bytes] [KeyString:8Bytes] [Identifier:1Byte] [End:1Byte] [padding:3Bytes]/
   * 		start = "69";//FIXED VALUE: 1 byte start
   * 		refNo = "1234";//generate incrementally cyclically from 0x0000 to 0xffff from local management.
   * 		KeyString = "0123456789ABCDEF"; //to be extracted from nvm_variables
   * 		identifier = "07";//FIXED VALUE: 1 Byte identifier for type of frame to be used by firmware.
   * 		end = "89"; //FIXED VALUE: 1 byte end of the frame identifier.
   * 		padding = "000000"; //FIXED VALUE: 3 Bytes, 6 zeroes.
   * 		//Example: 691111CCCCCCCCCCCCCCCC0789000000 (16 Bytes or 32 Characters)
   *
   * 		prepare frame
   * 		send to BLE
   * 	}
   */
  accessLogInitiationRequestFrame(keyString: string): string {
    /**
     * [start:1Byte] [Ref No.:2Bytes] [KeyString:8Bytes] [Identifier:1Byte] [End:1Byte] [padding:3Bytes]
     */
    const start = 69;
    const refNo = refNumberGenerator.geRefNumber();
    const identifier = '07';
    const end = 89;
    const padding = '000000';
    const accessLogIniRequestFrame = `${start}${refNo}${keyString}${identifier}${end}${padding}`;
    console.log('ACCESS_LOG_INIT_REQUEST_FRAME', accessLogIniRequestFrame);
    return accessLogIniRequestFrame;
  }

  /**
   *  ACCESS LOG REQUEST FRAME
   *  Access Log Request Frame of Firmware ID = 1
   *  if ((firmware_id==1)AND(requestFrameType==accessLogRequestFrame))
   *  {
   * 		/[start:1Byte] [Ref No.:2Bytes] [RecordNumber:1Byte] [Identifier:1Byte] [End:1Byte] [padding:9Bytes]/
   * 		start = "69";//FIXED VALUE: 1 byte start
   * 		refNo = "1234";//generate incrementally cyclically from 0x0000 to 0xffff from local management.
   * 		//this field omitted from this frame: KeyString = "0123456789ABCDEF"; //to be extracted from nvm_variables
   * 		recordNumber = "1234"//Address or recordNumber for which the access log has to be accessed out of MaxRecords number of records available in the access log.
   * 		identifier = "08";//FIXED VALUE: 1 Byte identifier for type of frame to be used by firmware.
   * 		end = "89"; //FIXED VALUE: 1 byte end of the frame identifier.
   * 		padding = "000000000000000000"; //FIXED VALUE: 9 Bytes, 18 zeroes.
   * 		//Example: 69111122220889000000000000000000
   *
   * 		prepare frame
   * 		send to BLE
   * 	}
   */
  accessLogRequestFrame(): string {
    /**
     * [start:1Byte] [Ref No.:2Bytes] [RecordNumber:1Byte] [Identifier:1Byte] [End:1Byte] [padding:9Bytes]
     */
    const start = 69;
    const refNo = refNumberGenerator.geRefNumber();
    const recordNumber = '';
    const identifier = '08';
    const end = 89;
    const padding = '000000000000000000';
    const accessLogRequestFrame = `${start}${refNo}${recordNumber}${identifier}${end}${padding}`;
    console.log('ACCESS_LOG_REQUEST_FRAMR', accessLogRequestFrame);
    return accessLogRequestFrame;
  }
}

export const frameCreator = new FrameCreator();

/**
 sendRequestFrame(firmware_id, requestFrameType, nvmVariables)
 {
	/UNLOCK REQUEST FRAME/
	//Unlock Request Frame of Firmware ID = 1
	if ((firmware_id==1)AND(requestFrameType==unlockRequestFrame))
	{
		/[start:1Byte] [Ref No.:2Bytes] [KeyUserFlag:1Byte] [KeyID:4Bytes] [DateTimeValidityFlag:1Byte] [KeyString:8Bytes] [KeyType:1Byte] [usageTimeStamp:5Bytes] [Identifier:1Byte] [End:1Byte] [Padding:7Bytes]/
		start = "89";//FIXED VALUE: 1 byte start of the frame identifier;
		refNo = "1234";//generate incrementally cyclically from 0x0000 to 0xffff from local management.
		keyUserFlag = "55";//FIXED VALUE for IDAT app
		keyID = "00000000";//FIXED VALUE for IDAT app
		dateTimeValidityFlag = "55"; //FIXED VALUE for IDAT app
		keyString = "0123456789ABCDEF"; //to be extracted from nvm_variables
		keyType = "00" OR "55"; //depending on need as per IDAT app flow; 00 if deadbolt override access is No, 55 if Yes
		usageTimeStamp = //5 Bytes DateTime value to be made. Read Note below. Explanation Given.
		identifier = "01"//FIXED VALUE: 1 Byte identifier for type of frame to be used by firmware.
		end = "69";//FIXED VALUE: 1 byte end.
		padding = "00000000000000"; //FIXED VALUE: 14 zeroes. 7 Bytes.
		//Example: 891111559999999955CCCCCCCCCCCCCCCC55AAAAAAAAAA016900000000000000 (32 Bytes or 64 Characters)

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

	}


	/KEY STRING CHANGE REQUEST FRAME/
	//Key String Change Request Frame of Firmware ID = 1
	if ((firmware_id==1)AND(requestFrameType==keyStringChangeRequestFrame))
	{
		/[start:1Byte] [Ref No.:2Bytes] [ExistingKeyString:8Bytes] [NewKeyString:8Bytes] [Identifier:1Byte] [End:1Byte] [padding:11Bytes]/
		start = "69";//FIXED VALUE: 1 byte start
		refNo = "1234";//copied from the request frame
		existingKeyString = "0123456789ABCDEF"//to be extracted from nvm_variables
		newKeyString = "FEDCBA9876543210"; //to be generated randomly from app (0-to-9 and A-to-F only to be used).
		identifier = "02"//FIXED VALUE: 1 Byte identifier for type of frame to be used by firmware.
		end = "89"; //FIXED VALUE: 1 byte end of the frame identifier.
		padding = "0000000000000000000000"; //FIXED VALUE: 11 Bytes means 22 zeroes.
		//Example: 691111CCCCCCCCCCCCCCCCDDDDDDDDDDDDDDDD02890000000000000000000000

		prepare frame
		send to BLE
	}


	/LOCK BACK TIME CHANGE REQUEST FRAME/
	//Lock Back Time Change Request Frame of Firmware ID = 1
	if ((firmware_id==1)AND(requestFrameType==lockBackTimeChangeRequestFrame))
	{
		/[start:1Byte] [Ref No.:2Bytes] [KeyString:8Bytes] [NewLockBackTime:2Bytes] [Identifier:1Byte] [End:1Byte] [padding:1Byte]/
		start = "69";//FIXED VALUE: 1 byte start
		refNo = "1234";//generate incrementally cyclically from 0x0000 to 0xffff from local management.
		KeyString = "0123456789ABCDEF"; //to be extracted from nvm_variables
		newLockBackTime = "03E8"; //4 Bytes: IF "X" is the required seconds, then first calculate X*100 in decimal and then convert it to hex. Do padding for MSBs if required for smaller values to achieve 4bytes.
		identifier = "03"//FIXED VALUE: 1 Byte identifier for type of frame to be used by firmware.
		end = "89"; //FIXED VALUE: 1 byte end of the frame identifier.
		padding = "00"; //FIXED VALUE: 1 Byte means 2 zeroes.
		//Example: 691111CCCCCCCCCCCCCCCC1111038900 (32 characters or 16 Bytes)

		prepare frame
		send to BLE
	}


	/BLOCKED KEY IDs CHANGE REQUEST FRAME/
	//Blocked Key IDs Change Request Frame of Firmware ID = 1
	if ((firmware_id==1)AND(requestFrameType==blockedKeyIDchangeRequestFrame))
	{
		/[start:1Byte] [Ref No.:2Bytes] [KeyString:8Bytes] [keyID1:4Bytes] [keyID2:4Bytes] [Identifier:1Byte] [End:1Byte] [padding:11Bytes]/
		start = "69";//FIXED VALUE: 1 byte start
		refNo = "1234";//generate incrementally cyclically from 0x0000 to 0xffff from local management.
		KeyString = "0123456789ABCDEF"; //to be extracted from nvm_variables
		keyID1 = "12345678"; // 4 Bytes: to be generated from form input values.
		keyID2 = "12345678"; //4 Bytes: to be generated from form input values.
		identifier = "04";//FIXED VALUE: 1 Byte identifier for type of frame to be used by firmware.
		end = "89"; //FIXED VALUE: 1 byte end of the frame identifier.
		padding = "0000000000000000000000"; //FIXED VALUE: 11 Bytes means 22 zeroes.
		//Example: 691111CCCCCCCCCCCCCCCC888888887777777704890000000000000000000000 (32 Bytes or 64 Characters)

		prepare frame
		send to BLE
	}


	/MOTOR RUN TIME CHANGE REQUEST FRAME/
	//Motor Run Time Change Request Frame of Firmware ID = 1
	if ((firmware_id==1)AND(requestFrameType==motorRunTimeChangeRequestFrame))
	{
		/[start:1Byte] [Ref No.:2Bytes] [KeyString:8Bytes] [NewMotorRunTime:2Bytes] [Identifier:1Byte] [End:1Byte] [padding:1Byte]/
		start = "69";//FIXED VALUE: 1 byte start
		refNo = "1234";//generate incrementally cyclically from 0x0000 to 0xffff from local management.
		KeyString = "0123456789ABCDEF"; //to be extracted from nvm_variables
		newMotorRunTime = "01F4"; //4 Bytes: IF "X" is the required seconds, then first calculate X*100 in decimal and then convert it to hex. Do padding for MSBs if required for smaller values to achieve 4bytes.
		identifier = "05";//FIXED VALUE: 1 Byte identifier for type of frame to be used by firmware.
		end = "89"; //FIXED VALUE: 1 byte end of the frame identifier.
		padding = "00"; //FIXED VALUE: 1 Byte means 2 zeroes.
		//Example: 691111CCCCCCCCCCCCCCCC1111058900 (16 Bytes or 32 Characters)

		prepare frame
		send to BLE
	}


	/AES KEY CHANGE REQUEST FRAME/
	//AES Key Change Request Frame of Firmware ID = 1
	//NOTE: confirm from Krishna whether the response comes with new AES key or old?
	if ((firmware_id==1)AND(requestFrameType==AESkeyChangeRequestFrame))
	{
		/[start:1Byte] [Ref No.:2Bytes] [KeyString:8Bytes] [NewAESkey:16Bytes] [Identifier:1Byte] [End:1Byte] [padding:3Bytes]/
		start = "69";//FIXED VALUE: 1 byte start
		refNo = "1234";//generate incrementally cyclically from 0x0000 to 0xffff from local management.
		KeyString = "0123456789ABCDEF"; //to be extracted from nvm_variables
		newAESkey = "00112233445566778899AABBCCDDEEFF"; //to be generated randomly AND REMEMBER temporarily
		identifier = "06"//FIXED VALUE: 1 Byte identifier for type of frame to be used by firmware.
		end = "89"; //FIXED VALUE: 1 byte end of the frame identifier.
		padding = "000000"; //FIXED VALUE: 3 Bytes means 6 zeroes.
		//691111CCCCCCCCCCCCCCCCFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF0689000000 (32 Bytes or 64 Characters)

		prepare frame
		send to BLE
	}


	/ACCESS LOG INITIATION REQUEST FRAME/
	//Access Log Initiation Request Frame of Firmware ID = 1
	if ((firmware_id==1)AND(requestFrameType==accessLogInitiationRequestFrame))
	{
		/[start:1Byte] [Ref No.:2Bytes] [KeyString:8Bytes] [Identifier:1Byte] [End:1Byte] [padding:3Bytes]/
		start = "69";//FIXED VALUE: 1 byte start
		refNo = "1234";//generate incrementally cyclically from 0x0000 to 0xffff from local management.
		KeyString = "0123456789ABCDEF"; //to be extracted from nvm_variables
		identifier = "07";//FIXED VALUE: 1 Byte identifier for type of frame to be used by firmware.
		end = "89"; //FIXED VALUE: 1 byte end of the frame identifier.
		padding = "000000"; //FIXED VALUE: 3 Bytes, 6 zeroes.
		//Example: 691111CCCCCCCCCCCCCCCC0789000000 (16 Bytes or 32 Characters)

		prepare frame
		send to BLE
	}


	/ACCESS LOG REQUEST FRAME/
	//Access Log Request Frame of Firmware ID = 1
	if ((firmware_id==1)AND(requestFrameType==accessLogRequestFrame))
	{
		/[start:1Byte] [Ref No.:2Bytes] [RecordNumber:1Byte] [Identifier:1Byte] [End:1Byte] [padding:9Bytes]/
		start = "69";//FIXED VALUE: 1 byte start
		refNo = "1234";//generate incrementally cyclically from 0x0000 to 0xffff from local management.
		//this field omitted from this frame: KeyString = "0123456789ABCDEF"; //to be extracted from nvm_variables
		recordNumber = "1234"//Address or recordNumber for which the access log has to be accessed out of MaxRecords number of records available in the access log.
		identifier = "08";//FIXED VALUE: 1 Byte identifier for type of frame to be used by firmware.
		end = "89"; //FIXED VALUE: 1 byte end of the frame identifier.
		padding = "000000000000000000"; //FIXED VALUE: 9 Bytes, 18 zeroes.
		//Example: 69111122220889000000000000000000

		prepare frame
		send to BLE
	}


	/MASTER RESET REQUEST FRAME/
	//Master Reset Request Frame of Firmware ID = 1
	if ((firmware_id==1)AND(requestFrameType==masterResetRequestFrame))
	{
		/[Pre-defined Master Reset Frame: 16Bytes]/
		frame = "CE05628968DAAF90ECB535B060D7D8D9";

		prepare frame
		send to BLE
	}

}
}*/
