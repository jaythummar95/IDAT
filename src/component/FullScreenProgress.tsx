import {Modal} from 'react-native';
import React from 'react';
import {Box} from './Box';
import {DeviceHelper} from '../helper/DeviceHelper';
import {Text} from './Text';
import {Image} from './Image';
import {fonts} from '../style/Fonts';
import {Images} from '../assets';

export const refFullScreenProgress = React.createRef<FullScreenProgress>();

export const showFullScreenProgress = (): void => {
  if (refFullScreenProgress) {
    refFullScreenProgress?.current?.showModal();
  }
};

export const hideFullScreenProgress = (): void => {
  if (refFullScreenProgress) {
    refFullScreenProgress?.current?.hideModal();
    refFullScreenProgress?.current?.setMessage('');
  }
};

export const setMessageFullScreenProgress = (message: string): void => {
  if (refFullScreenProgress) {
    refFullScreenProgress?.current?.setMessage(message);
  }
};

export class FullScreenProgress extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      modalVisible: false,
      message:
        "Please wait a moment, we're loading the best experience for you!",
    };
  }

  showModal(): void {
    this.setState({
      modalVisible: true,
    });
  }

  hideModal(): void {
    this.setState({
      modalVisible: false,
    });
  }

  setMessage(message: string): void {
    this.setState({message: message});
  }

  render(): React.ReactNode {
    const {modalVisible} = this.state;
    return (
      <Box>
        <Modal
          animationType="fade"
          transparent
          visible={modalVisible}
          onRequestClose={() => {
            this.hideModal();
          }}>
          <Box
            backgroundColor="white"
            borderRadius={5}
            alignItems="center"
            justifyContent="center"
            width={DeviceHelper.width()}
            height={DeviceHelper.height()}>
            <Image
              height={DeviceHelper.calculateHeightRatio(100)}
              width={DeviceHelper.width() / 1.5}
              source={Images.logo}
            />
            <Text
              fontSize={16}
              fontFamily={fonts.regular}
              marginTop={'l'}
              textAlign={'center'}>
              {this.state.message}
            </Text>
          </Box>
        </Modal>
      </Box>
    );
  }
}
