/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import React, {useState, useEffect} from 'react';
import {Pressable, TouchableWithoutFeedback, Text} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Feather} from '../../../assets';
import ScreensNameEnum from '../../../constants/ScreensNameEnum';
import OptionPickerChat from 'library/modals/OptionPickerChat';
import ChatlistCard from 'library/containers/chatsContainers/ChatlistCard';
import ScreenWrapper from 'library/wrapper/ScreenWrapper';
import R from 'resources/R';
import manImg from '../../../assets/images/man.png';
// import styles from './styles';
import styles from './styles';

/*
 * This function is used to create All chat List component
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const Chats = ({navigation, route}) => {
  const [isOptionModal, setOptionModal] = useState(false);
  const [chatId, setChatId] = useState();
  const [chatlist, setChatList] = useState([
    {
      id: 1,
      name: 'Larry One',
      userImage: manImg,
      message: 'Hlo are You there?',
      pinned: false,
    },
    {
      id: 2,
      name: 'Larry Two',
      userImage: manImg,
      message: 'Hlo how are you?',
      pinned: false,
    },
    {
      id: 3,
      name: 'Larry Three',
      userImage: manImg,
      message: 'How you doing?',
      pinned: false,
    },
    {
      id: 4,
      name: 'Larry Four',
      userImage: manImg,
      message: 'Can we talk now?',
      pinned: false,
    },
    {
      id: 5,
      name: 'Larry Five',
      userImage: manImg,
      message: 'is your job done?',
      pinned: false,
    },
    {
      id: 6,
      name: 'Larry Six',
      userImage: manImg,
      message: 'Hlo are You there?',
      pinned: false,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1);
  const [pinnedChats, setPinnedChats] = useState([]);
  useEffect(() => {
    sortChat();
  }, [pinnedChats]);
  const sortChat = () => {
    const pinned = chatlist.filter(item => {
      if (pinnedChats.includes(item.id)) {
        return item;
      }
    });
    const unPinned = chatlist.filter(item => {
      if (!pinnedChats.includes(item.id)) {
        return item;
      }
    });
    setChatList([...pinned, ...unPinned]);
  };
  const navTo = (screenName, params) => {
    setActiveIndex(null);
    navigation.navigate('MESSAGE_SCREEN', params);
  };

  const handlePinChat = chatId => {
    setPinnedChats([...pinnedChats, chatId]);
  };
  const onHideChat = chatId => {
    const res = chatlist.filter(item => {
      if (!item.id === chatId) {
        return item;
      }
    });
    // console.log(res);
    // setChatList(res);
  };
  const renderItem = ({item, index}) => {
    return (
      <ChatlistCard
        onLongPress={() => {
          setChatId(item.id);
          setOptionModal(true);
        }}
        key={index.toString()}
        avatar={item.userImage}
        title={item.name}
        description={item.message}
        time={moment(new Date()).format('DD MMM YYYY')}
        onPress={() => navTo(ScreensNameEnum.Messages)}
        index={index}
        styles={styles}
        pinned={pinnedChats.includes(item.id) ? true : false}
      />
    );
  };
  const deleteAction = index => {
    chatlist.splice(index, 1);
    setChatList([...chatlist]);
  };
  const renderHiddenItem = ({item, index}) => {
    return (
      <Pressable
        onPress={() => deleteAction(index)}
        style={{
          width: 50,
          height: '100%',
          alignSelf: 'flex-end',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Feather name={'trash-2'} size={25} color={'red'} />
      </Pressable>
    );
  };
  return (
    <ScreenWrapper header={true}>
      {/* <SafeSimpleView> */}
      {/* <ModalComp
          closeBtnDisabled
          mainStyle={{
            justifyContent: 'flex-end',
          }}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}>
          <MyText
            style={styles.txt}
            text={'Are you sure you want to delete this chat with Vic?'}
          />

          <View style={styles.chatsContainer}>
            <MyBtn
              onPress={() => setModalVisible(false)}
              text={strings.cancel}
              textStyle={{
                color: "#000",
              }}
              style={{width: '40%', backgroundColor: config.backgroundColor}}
            />
            <MyBtn
              onPress={() => {
                chatlist.splice(activeIndex, 1);
                setModalVisible(false);
              }}
              text={strings.confirm}
              textStyle={{
                color: config.white,
              }}
              style={{width: '40%', backgroundColor: R.colors.primary}}
            />
          </View>
        </ModalComp> */}
      <TouchableWithoutFeedback>
        <SwipeListView
          renderHiddenItem={renderHiddenItem}
          keyExtractor={(item, index) => index.toString()}
          style={{backgroundColor: '#fff'}}
          contentContainerStyle={{
            paddingBottom: 50,
          }}
          disableRightSwipe
          leftOpenValue={75}
          rightOpenValue={-75}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          ListEmptyComponent={<EmptyData value={'No Chatlist Found'} />}
          // stickyHeaderIndices={[0]}
          refreshing={isLoading}
          ListHeaderComponent={<Text style={styles.txt1}>{'Messages'}</Text>}
          // onRefresh={onRefresh}
          data={chatlist}
          renderItem={renderItem}
        />
      </TouchableWithoutFeedback>
      {/* </SafeSimpleView> */}
      <OptionPickerChat
        isVisible={isOptionModal}
        options={[
          {value: 'pin', label: 'Pin', icon: 'push-pin'},
          {value: 'hide', label: 'Hide', icon: 'visibility-off'},
          {
            value: 'delete',
            label: 'Delete',
            icon: 'delete-outline',
            color: 'red',
          },
        ]}
        chatId={chatId}
        onModalClose={setOptionModal}
        onDelete={deleteAction}
        onPinChat={handlePinChat}
        onHideChat={onHideChat}
      />
    </ScreenWrapper>
  );
};

export default Chats;
const EmptyData = ({value, style}) => (
  <Text
    style={{
      textAlign: 'center',
      width: '100%',
      color: R.colors.headingColor,
      marginTop: 12,
      fontFamily: R.fonts.Medium,
      ...style,
    }}>
    {value}
  </Text>
);
