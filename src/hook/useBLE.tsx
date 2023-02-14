import {PermissionsAndroid, Platform} from 'react-native';
import {BleManager, Device} from 'react-native-ble-plx';
import {useState} from 'react';
import DeviceInfo from 'react-native-device-info';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import CryptoJS from 'crypto-js/core';
import {AES} from 'crypto-js';
import {Buffer} from 'buffer';

type PermissionCallback = (result: boolean) => void;

const bleManager = new BleManager();

interface BluetoothLowEnergyApi {
  requestPermissions(callBack: PermissionCallback): Promise<void>;
  scanForDevice(): void;
  connectToDevice(device: Device): Promise<void>;
  disConnectFromDevice(device: Device): Promise<void>;
  allDevices: Device[];
  deviceConnected: Device | null;
}

export default function useBLE(): BluetoothLowEnergyApi {
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [deviceConnected, setConnected] = useState<Device | null>(null);

  const requestPermissions = async (callback: PermissionCallback) => {
    if (Platform.OS === 'android') {
      const apiLevel = await DeviceInfo.getApiLevel();
      if (apiLevel < 31) {
        const grandStatus = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            buttonNegative: 'Cancel',
            buttonNeutral: 'Maybe Later',
            buttonPositive: 'Ok',
            message: 'Bluetooth Low Energy required location permission',
            title: 'Location permission',
          },
        );
        callback(grandStatus === PermissionsAndroid.RESULTS.GRANTED);
      } else {
        const result = await requestMultiple([
          PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
          PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ]);

        const isAllPermissionGranted =
          result['android.permission.BLUETOOTH_SCAN'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.BLUETOOTH_CONNECT'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.ACCESS_FINE_LOCATION'] ===
            PermissionsAndroid.RESULTS.GRANTED;

        return callback(isAllPermissionGranted);
      }
    } else {
      callback(true);
    }
  };

  const isDuplicateDevice = (devices: Device[], nextDevice: Device) =>
    devices.findIndex(device => nextDevice.id === device.id) > -1;

  const scanForDevice = async () => {
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error);
      } else {
        if (device) {
          setAllDevices(prevState => {
            if (!isDuplicateDevice(prevState, device)) {
              return [...prevState, device];
            }
            return prevState;
          });
        }
      }
    });
    setTimeout(() => {
      bleManager.stopDeviceScan();
    }, 3000);
  };

  const connectToDevice = async (device: Device) => {
    try {
      const deviceConnection = await bleManager.connectToDevice(device.id, {
        requestMTU: 256,
      });
      setConnected(deviceConnection);
      bleManager.stopDeviceScan();
      bleManager
        .discoverAllServicesAndCharacteristicsForDevice(device.id)
        .then(deviceResponse => {
          deviceResponse.services().then(services => {
            services?.map(service => {
              // console.log('SERVICE: ', service.id);
              // console.log('\n');
              // console.log('CHARACTERISTICS');
              // console.log('\n');
              service.characteristics().then(characteristics => {
                // console.log(JSON.stringify(characteristics, '', 4));
                const charWriteWithoutResponse = characteristics.find(
                  characteristicItem =>
                    characteristicItem.uuid ===
                    '5a87b4ef-3bfa-76a8-e642-92933c31434f',
                );

                if (charWriteWithoutResponse) {
                  setTimeout(() => {
                    writeChar(
                      '8912485569AEBCAB55FFFFFFFFFFFFFFFF0001020304050169',
                      'FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
                      deviceResponse?.id?.toString(),
                      charWriteWithoutResponse.serviceUUID,
                      charWriteWithoutResponse.uuid,
                    );
                  }, 1000);
                }
              });
              console.log('\n');
              console.log('\n');
              console.log('\n');
            });
            console.log('DeviceConnected', deviceConnection.isConnected());
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const disConnectFromDevice = async (device: Device) => {
    try {
      await bleManager.cancelDeviceConnection(device.id);
      setConnected(null);
      console.log('DeviceDisConnected');
    } catch (error) {
      console.log(error);
    }
  };

  const hexToByteArray = (str: string) => {
    const ByteBuffer = require('bytebuffer');
    const bb = ByteBuffer.fromHex(str);
    // console.log(JSON.stringify(bb, '', 4));
    return bb.view;
  };

  const byteArrayToHexString = (byteArray: Uint8Array) => {
    var hexString = '';
    for (var i = 0; i < byteArray.length; i++) {
      var hex = byteArray[i].toString(16);
      if (hex.length === 1) {
        hex = '0' + hex;
      }
      hexString += hex;
    }
    return hexString;
  };

  const Uint8ArrayToWordArray = (u8Array: Uint8Array) => {
    var words = [];
    for (var i = 0; i < u8Array.length; i += 4) {
      words.push(
        (u8Array[i] << 24) |
          (u8Array[i + 1] << 16) |
          (u8Array[i + 2] << 8) |
          u8Array[i + 3],
      );
    }

    return CryptoJS.lib.WordArray.create(words, u8Array.length);
  };

  const wordArrayToUint8Array = (wordArray: CryptoJS.lib.WordArray) => {
    var len = wordArray.words.length;
    var u8_array = new Uint8Array(len << 2);
    var offset = 0;
    for (var i = 0; i < len; i++) {
      var word = wordArray.words[i];
      u8_array[offset++] = word >> 24;
      u8_array[offset++] = (word >> 16) & 0xff;
      u8_array[offset++] = (word >> 8) & 0xff;
      u8_array[offset++] = word & 0xff;
    }
    return u8_array;
  };

  const concat = (...arrays: Uint8Array[]): Uint8Array => {
    let totalLength = 0;
    for (let array of arrays) {
      totalLength += array.length;
    }
    let result = new Uint8Array(totalLength);
    let currentIndex = 0;
    for (let array of arrays) {
      result.set(array, currentIndex);
      currentIndex += array.length;
    }
    return result;
  };

  const encrypt = (strToEncrypt: Uint8Array, secret_key: Uint8Array) => {
    try {
      let key = Uint8ArrayToWordArray(secret_key);
      let input = Uint8ArrayToWordArray(strToEncrypt);

      let ciphertext = AES.encrypt(input, key, {
        iv: Uint8ArrayToWordArray(
          new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
        ),
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      });

      console.log(
        'ENCRYPTED_ARRAY',
        wordArrayToUint8Array(ciphertext.ciphertext),
      );

      return byteArrayToHexString(
        wordArrayToUint8Array(ciphertext.ciphertext),
      ).toUpperCase();
    } catch (e) {
      console.error(e);
    }

    return null;
  };

  const writeChar = async (
    hexString: string,
    secret: string,
    deviceId: string,
    serviceUUID: string,
    characteristicUUID: string,
  ) => {
    const byteArrayOfChar: Uint8Array = hexToByteArray(hexString);
    const byteArrayOfAesKey: Uint8Array = hexToByteArray(secret);
    const encryptedString = await encrypt(byteArrayOfChar, byteArrayOfAesKey);

    const split = encryptedString!!.length / 32;

    console.log('byteArrayOfChar', byteArrayOfChar);
    console.log('byteArrayOfAesKey', byteArrayOfAesKey);
    console.log('encrypTedString', encryptedString);
    console.log('split', split);

    let concatValue: Uint8Array = new Uint8Array();
    if (split === 4) {
      const hex1 = hexToByteArray(encryptedString!!.slice(0, 32).toString());
      const hex2 = hexToByteArray(encryptedString!!.slice(32, 64).toString());
      const hex3 = hexToByteArray(encryptedString!!.slice(64, 96).toString());
      concatValue = concat(hex1, hex2, hex3);
      console.log('CONCAT_VALUE', concatValue);
    } else if (split === 3) {
      const hex1 = hexToByteArray(encryptedString!!.slice(0, 32).toString());
      const hex2 = hexToByteArray(encryptedString!!.slice(32, 64).toString());
      const hex3 = hexToByteArray(encryptedString!!.slice(64, 96).toString());
      concatValue = concat(hex1, hex2, hex3);
      console.log('CONCAT_VALUE', concatValue);
    } else if (split === 2) {
      const hex1 = hexToByteArray(encryptedString!!.slice(0, 32).toString());
      const hex2 = hexToByteArray(encryptedString!!.slice(32, 64).toString());
      concatValue = concat(hex1, hex2);
      console.log('CONCAT_VALUE', concatValue);
    } else if (split === 1) {
      const hex1 = hexToByteArray(encryptedString!!.slice(0, 32).toString());
      concatValue = concat(hex1);
      console.log('CONCAT_VALUE', concatValue);
    }

    const base64Value = Buffer.from(concatValue).toString('base64');

    console.log('BASE_64', base64Value);

    bleManager.monitorCharacteristicForDevice(
      deviceId,
      serviceUUID,
      characteristicUUID,
      listener => {
        console.log('LISTENER', JSON.stringify(listener, '', 4));
      },
    );

    bleManager
      .writeCharacteristicWithoutResponseForDevice(
        deviceId,
        serviceUUID,
        characteristicUUID,
        base64Value,
      )
      .then(response => {
        console.log('DEVICE==>', response);
      })
      .catch(error => {
        console.log(JSON.stringify(error, "", 4));
      });
  };

  return {
    requestPermissions,
    scanForDevice,
    connectToDevice,
    disConnectFromDevice,
    allDevices,
    deviceConnected,
  };
}
