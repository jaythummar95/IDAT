import React, {useEffect, useState} from 'react';
import {Box} from '../Box';
import {fonts} from '../../style/Fonts';
import {Text} from '../Text';
import {Image} from '../Image';
import {Images} from '../../assets';
import {DeviceHelper} from '../../helper/DeviceHelper';
import {Pressable} from '../Pressable';
import {ActivityIndicator, FlatList, Modal} from 'react-native';
import {MultiSelectedCell} from './MultiSelectedCell';
import {Button} from '../Button';
import {LabelValuePair} from '../Types';
import {Search} from '../Search';

export interface MultiSelectProps {
  title: string;
  placeholder: string;
  bottomSheetLebal: string;
  onPress: () => void;
  onClose: () => void;
  onMultiSelectedButtonClick: () => void;
  visible: boolean;
  items: LabelValuePair[];
  onValueChangeMultiSelect?: (answers: LabelValuePair[]) => void;
  onValueChangeSingleSelect: (answers: LabelValuePair) => void;
  isSingleSelect?: boolean;
  defaultSingleSelectedOption?: string;
  onShow?: () => void;
  fetchMoreData?: () => void;
  isBottomLoading?: boolean;
  disabled?: boolean;
  searchCloseApiCall?: () => void;
  searchApiCall?: () => void;
  onChangeTextSearch?: (text: string) => void;
  infoDetails?: string;
}
export const MultiSelect: React.FC<MultiSelectProps> = ({
  title,
  placeholder,
  bottomSheetLebal,
  onPress,
  visible,
  onClose,
  items,
  onValueChangeMultiSelect,
  onValueChangeSingleSelect,
  onMultiSelectedButtonClick,
  isSingleSelect = false,
  defaultSingleSelectedOption,
  onShow,
  fetchMoreData,
  isBottomLoading = false,
  disabled = false,
  searchCloseApiCall,
  searchApiCall,
  onChangeTextSearch,
}: MultiSelectProps) => {
  const [selectedOptions, setSelectedOptions] = useState<LabelValuePair[]>([]);
  const [selectedOptionsChips, setSelectedOptionsChips] = useState<
    LabelValuePair[]
  >([]);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(false);

  // console.log('bottomSheetLebal ==>', bottomSheetLebal);

  console.log('LABEL', bottomSheetLebal);

  useEffect(() => {
    if (items.length > 0) {
      if (isSingleSelect) {
        console.log('CHECK==>', items);
        console.log('CHECK==>', 'IS SINGLE SELECT');
        if (defaultSingleSelectedOption) {
          console.log('CHECK==>', 'DEFAULT SELECTED OPTION');
          console.log('CHECK==>', defaultSingleSelectedOption);
          const pair = items.find(item => {
            console.log(
              'CHECK_VALUE==>',
              `${item.value} ${defaultSingleSelectedOption} ${
                item.value.toString() === defaultSingleSelectedOption.toString()
              }`,
            );
            return (
              item.value.toString() === defaultSingleSelectedOption.toString()
            );
          });
          if (pair) {
            console.log('CHECK==>', 'FOUND PAIR');
            const pairArray: LabelValuePair[] = [];
            pairArray.push(pair as LabelValuePair);

            setSelectedOptions(pairArray);
            setSelectedOptionsChips(pairArray);
            console.log('UPDATES_SINGLE_SELECT');
          }
        } else {
          console.log('CHECK==>', 'NO DEFAULT SELECTED OPTION');
          setSelectedOptions([]);
          setSelectedOptionsChips([]);
        }
      } else {
        if (defaultSingleSelectedOption) {
          console.log(
            'defaultSingleSelectedOption',
            defaultSingleSelectedOption,
          );
          const splitArray = defaultSingleSelectedOption?.split(',');
          const pairArray: LabelValuePair[] = [];
          splitArray?.map(splitArrayItem => {
            const pair = items.find(
              item => item.value.toString() === splitArrayItem,
            );
            if (pair) {
              pairArray.push(pair as LabelValuePair);
            }
          });
          setSelectedOptions(pairArray);
          setSelectedOptionsChips(pairArray);
        } else {
          setSelectedOptions([]);
          setSelectedOptionsChips([]);
        }
      }
    }
  }, [defaultSingleSelectedOption, isSingleSelect, items, visible]);

  useEffect(() => {}, [selectedOptionsChips, selectedOptions]);

  const renderFooter = () => {
    return (
      <Box>
        {isBottomLoading && <ActivityIndicator size="small" color="#EF5366" />}
      </Box>
    );
  };

  return (
    <Box marginTop={'r'} opacity={disabled ? 0.5 : 1}>
      <Box flexDirection={'row'}>
        <Text
          marginHorizontal={'r'}
          marginVertical={'s'}
          fontSize={17}
          color={'black'}
          fontFamily={fonts.semiBold}>
          {title}
        </Text>
      </Box>
      <Pressable onPress={onPress} disabled={disabled}>
        <Box
          borderWidth={1}
          marginVertical={'es'}
          marginHorizontal={'r'}
          minHeight={50}
          borderRadius={10}
          flexDirection={'row'}
          justifyContent={'space-between'}
          backgroundColor={'white'}
          borderColor={'gray2'}>
          {selectedOptionsChips.length <= 0 ? (
            <Text
              style={{
                alignSelf: 'center',
                marginLeft: 10,
                color: 'black',
                flex: 0.8,
                fontFamily: fonts.regular,
              }}>
              {placeholder}
            </Text>
          ) : (
            <Box
              flexDirection={'row'}
              flexWrap={'wrap'}
              flex={1}
              alignSelf={'center'}
              marginLeft={'s'}>
              {isSingleSelect ? (
                <Box>
                  <Text
                    color={'black'}
                    fontFamily={fonts.regular}
                    fontSize={14}>
                    {selectedOptionsChips[0].label}{' '}
                  </Text>
                </Box>
              ) : (
                selectedOptionsChips.map((item, index) => (
                  <Pressable
                    onPress={() => {
                      const tempOptions: LabelValuePair[] = [
                        ...selectedOptionsChips,
                      ];
                      const indexs = tempOptions.indexOf(item);
                      if (indexs !== -1) {
                        tempOptions.splice(index, 1);
                      }
                      setSelectedOptionsChips(tempOptions);
                      setSelectedOptions(tempOptions);

                      if (onValueChangeMultiSelect) {
                        onValueChangeMultiSelect(tempOptions);
                      }
                    }}>
                    <Box
                      borderWidth={1}
                      alignSelf={'center'}
                      borderRadius={6}
                      flexDirection={'row'}
                      borderColor={'gray2'}
                      backgroundColor={'gray4'}
                      marginHorizontal={'es'}
                      marginVertical={'es'}>
                      <Text
                        style={{
                          margin: 3,
                          fontFamily: fonts.medium,
                          color: 'black',
                        }}>
                        {item.label}
                      </Text>
                      <Image
                        margin={'es'}
                        alignSelf={'center'}
                        source={Images.closeBlack}
                        height={DeviceHelper.calculateHeightRatio(10)}
                        width={DeviceHelper.calculateWidthRatio(10)}
                      />
                    </Box>
                  </Pressable>
                ))
              )}
            </Box>
          )}

          <Image
            flex={0.1}
            source={Images.downArrowBlack}
            resizeMode={'center'}
            marginEnd={'r'}
            marginStart={'sr'}
            alignSelf={'center'}
            height={DeviceHelper.calculateHeightRatio(10)}
            width={DeviceHelper.calculateWidthRatio(20)}
          />
        </Box>
      </Pressable>
      <Modal
        animationType={'fade'}
        visible={visible}
        transparent={true}
        onShow={() => {
          if (selectedOptionsChips.length > 0) {
            setSelectedOptions(selectedOptionsChips);
          }
          if (onShow) {
            onShow();
          }
        }}>
        <Box flex={1} backgroundColor={'transparent'}>
          <Pressable
            flex={0.2} // add Trash then flex 0.4
            onPress={() => {}}
          />
          <Box flex={0.8}>
            <Pressable
              onPress={() => {
                setSelectedOptions([]);
                onClose();
              }}
              height={DeviceHelper.calculateHeightRatio(50)}
              width={DeviceHelper.calculateWidthRatio(50)}
              backgroundColor={'white'}
              marginBottom={'r'}
              alignSelf={'center'}
              justifyContent={'center'}
              borderRadius={25}>
              <Image
                resizeMode={'center'}
                height={DeviceHelper.calculateHeightRatio(15)}
                width={DeviceHelper.calculateWidthRatio(15)}
                alignSelf={'center'}
                source={Images.close}
              />
            </Pressable>
            <Box
              flex={1}
              borderTopLeftRadius={16}
              borderTopRightRadius={16}
              backgroundColor={'white'}>
              <Text
                fontSize={16}
                fontFamily={fonts.bold}
                marginStart={'r'}
                marginTop={'m'}
                color={'black'}>
                {bottomSheetLebal}
              </Text>
              {bottomSheetLebal === 'Select City' ? (
                <Box>
                  <Search
                    onChangeText={text => {
                      if (onChangeTextSearch) {
                        onChangeTextSearch(text);
                      }
                    }}
                    onPress={() => {
                      if (searchApiCall) {
                        searchApiCall();
                      }
                    }}
                    searchCloseApiCall={() => {
                      if (searchCloseApiCall) {
                        searchCloseApiCall();
                      }
                    }}
                    placeholder={'Search City'}
                  />
                </Box>
              ) : null}
              <Box flexDirection={'column'} marginHorizontal={'r'} flex={1}>
                <FlatList
                  onMomentumScrollBegin={() => {
                    setOnEndReachedCalledDuringMomentum(false);
                  }}
                  onEndReachedThreshold={0.1}
                  onEndReached={() => {
                    if (!onEndReachedCalledDuringMomentum) {
                      if (fetchMoreData) {
                        fetchMoreData();
                      } // LOAD MORE DATA
                      setOnEndReachedCalledDuringMomentum(true);
                    }
                  }}
                  ListFooterComponent={() => renderFooter()}
                  data={items}
                  keyExtractor={item => item.label}
                  renderItem={({item}) => (
                    <Box key={item.label}>
                      <MultiSelectedCell
                        key={item.label}
                        onMultiselected={() => {
                          if (isSingleSelect) {
                            const tempOptions: LabelValuePair[] = [];
                            tempOptions.push(item);
                            setSelectedOptions(tempOptions);
                            return;
                          }
                          const tempOptions: LabelValuePair[] = [
                            ...selectedOptions,
                          ];
                          const indexOfItem = tempOptions.findIndex(
                            itemObj => item.value === itemObj.value,
                          );
                          const isItemExist = indexOfItem > -1;

                          if (isItemExist) {
                            tempOptions.splice(indexOfItem, 1);
                          } else {
                            tempOptions.push(item);
                          }
                          setSelectedOptions(tempOptions);
                        }}
                        label={item.label}
                        isSelect={
                          selectedOptions?.findIndex(
                            itemObj => item.value === itemObj.value,
                          ) > -1
                        }
                      />
                    </Box>
                  )}
                />
              </Box>
              <Box
                alignItems={'center'}
                width={'100%'}
                marginBottom={'m'}
                marginTop={'m'}>
                <Box width={DeviceHelper.calculateWidthRatio(250)}>
                  <Button
                    label={'Submit'}
                    onPress={() => {
                      setSelectedOptionsChips(selectedOptions);
                      if (isSingleSelect) {
                        if (onValueChangeSingleSelect) {
                          onValueChangeSingleSelect(selectedOptions[0]);
                        }
                      } else {
                        if (onValueChangeMultiSelect) {
                          onValueChangeMultiSelect(selectedOptions);
                        }
                      }

                      onMultiSelectedButtonClick();
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};
