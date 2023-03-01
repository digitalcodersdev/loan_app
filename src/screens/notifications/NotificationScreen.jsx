import moment from 'moment';
import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import styles from './styles';
import {DeleteIcon} from '../../assets';
import ChatlistCard from 'library/containers/chatsContainers/ChatlistCard';
import LongPressModal from 'library/containers/chatsContainers/LongPressModal';
import ScreensNameEnum from '../../constants/ScreensNameEnum';
import strings from '../../strings';
import {addCheckFunction, CheckRecordFunc} from '../../helpers/checkBoxHandler';
import ScreenWrapper from 'library/wrapper/ScreenWrapper';
import R from 'resources/R';
import manImg from '../../assets/images/man.png';
/*
 * This function is used to create Notification screen
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const NotificationScreen = ({navigation, route}) => {
  const [chatlist, setChatList] = useState([
    'Notification One',
    'Notification Two',
    'Notification Three',
  ]);
  const tapOptions = [strings.mute, strings.delete];
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [hideArr, setHideArr] = useState([]);
  const [pinArr, setPinArr] = useState([]);
  const navTo = (screenName, params) => {
    setActiveIndex(null);
  };
  const TapAndHoldVoid = index => () => {
    setActiveIndex(index);
  };
  const setAction = pushItem => item => {
    [strings.mute, strings.unmute].includes(item)
      ? addCheckFunction(pushItem, hideArr, setHideArr)
      : chatlist.splice(chatlist.indexOf(pushItem), 1);
    setActiveIndex(null);
  };
  const renderItem = ({item, index}) => (
    <View
      style={{
        zIndex: -111,
      }}
      key={index.toString()}>
      {activeIndex == index ? (
        <LongPressModal
          hide={CheckRecordFunc(item, hideArr)}
          activeIndex={activeIndex}
          data={tapOptions}
          setAction={setAction(item)}
          setActiveIndex={setActiveIndex}
        />
      ) : null}
      <ChatlistCard
        onLongPress={TapAndHoldVoid(index)}
        avatar={manImg}
        title={item}
        description={"You've to be here"}
        time={moment(new Date()).format('DD MMM YYYY')}
        onPress={() => navTo(ScreensNameEnum.Messages)}
        pinned={CheckRecordFunc(item, pinArr) ? true : false}
        hide={CheckRecordFunc(item, hideArr) ? true : false}
        index={index}
        cardStyle={{
          ...styles,
          backgroundColor: activeIndex == index ? '#e6e6e6' : '#fff',
        }}
      />
    </View>
  );
  const deleteAction = index => {
    chatlist.splice(index, 1);
    setChatList([...chatlist]);
  };
  const renderHiddenItem = ({item, index}) => {
    return (
      <Pressable
        onPress={() => deleteAction(index)}
        style={[styles.backRightBtn, styles.backRightBtnRight]}>
        <DeleteIcon size={25} color={R.colors.RED} />
      </Pressable>
    );
  };

  return (
    <ScreenWrapper>
      <SwipeListView
        renderHiddenItem={renderHiddenItem}
        style={{backgroundColor: '#fff'}}
        disableRightSwipe
        leftOpenValue={75}
        rightOpenValue={-75}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        // stickyHeaderIndices={false}
        refreshing={isLoading}
        ListHeaderComponent={
          <Text
            style={{
              fontSize: 22,
              marginTop: 12,
              textAlign: 'center',
              fontFamily: R.fonts.Medium,
            }}>
            {route.name}
          </Text>
        }
        // onRefresh={onRefresh}
        data={chatlist}
        renderItem={renderItem}
      />
    </ScreenWrapper>
  );
};

export default NotificationScreen;
