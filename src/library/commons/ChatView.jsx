/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect} from 'react';
import moment from 'moment';
import {
  FlatList,
  RefreshControl,
  View,
  Text,
  Pressable,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import MsgChat from 'library/containers/chatsContainers/msgChat';
import OptionPickerChat from 'library/modals/OptionPickerChat';
import ChatInput from 'library/commons/ChatInput';
// import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import R from 'resources/R';
import manImg from '../../assets/images/man.png';
import MessageActionstModal from 'library/modals/MessageActionstModal';
import MessageReportOptions from 'library/modals/MessageReportOptions';
/*
 * This function is used to create our Messages Screen or modal Design common for both
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const ChatView = ({userId, route}) => {
  const [isOptionModal, setOptionModal] = useState(false);
  const [isLoading] = useState(false);
  const [otherModal, setOtherModal] = useState(false);
  const [reportModalVisible, setReportModal] = useState(false);
  const [msgId, setMsgId] = useState();
  const [reportMsgIds, setReportMsgIds] = useState([]);
  const [replyText, setReplyText] = useState();
  const [messageList, setMessageList] = useState([
    {
      id: 1,
      sender_type_id: 2,
      text:
        'Yes, Sure.Hey, could you work for me? I am verified and I really like you skills.Hey, could you work for me? I am verified and I really like you skills.Hey, could you work for me? I am verified and I really like you skills.',
      reported: false,
      timestamp: new Date(),
    },
    {
      id: 2,
      sender_type_id: 1,
      reported: false,
      text:
        'Hey, could you work for me? I am verified and I really like you skills.',
      timestamp: new Date(),
    },
    {
      id: 3,
      sender_type_id: 2,
      text: 'Hi, Marco',
      reported: false,
      timestamp: new Date(),
    },
    {
      id: 4,
      sender_type_id: 1,
      text: 'Hi, Devid',
      reported: false,
      timestamp: new Date(),
    },
  ]);

  useEffect(() => {
    getReportedMsgs();
  }, [reportMsgIds]);

  const getReportedMsgs = () => {
    const res = messageList.map(item => {
      reportMsgIds.map(data => {
        if (data === item.id) {
          item.reported = true;
        }
      });
    });
  };
  const user = {id: 1};
  const handleOperations = (item, index) => {
    setMsgId(item.id);
    if (item.sender_type_id === 1) {
      setOptionModal(true);
    } else if (item.sender_type_id === 2) {
      setOtherModal(true);
    }
  };
  const handleReportMessage = msgId => {
    setReportMsgIds([...reportMsgIds, msgId]);
    setReportModal(true);
  };
  return (
    <>
      <View>
        <View
          style={{
            position: 'absolute',
            width: '100%',
            alignSelf: 'center',
            zIndex: 999,
            backgroundColor: 'white',
          }}>
          <View style={styles.container}>
            <Text style={styles.nameText}>Messaging Vic </Text>
            <Icon name={'phone'} size={25} color={R.colors.PRIMARI_DARK} />
          </View>
          <View style={styles.secondContainer}>
            <Text style={styles.dateText}>
              {moment(new Date()).format('DD MMM YYYY')}
            </Text>
            <Image style={styles.image} source={manImg} />
          </View>
        </View>
      </View>
      <FlatList
        keyboardShouldPersistTaps="always"
        inverted={true}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            colors={[R.colors.primary, R.colors.LIGHTBLUE, R.colors.primary]}
            refreshing={isLoading}
          />
        }
        scrollEnabled={true}
        data={messageList}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={({item, index, separators}) => (
          <Pressable
            onLongPress={() => handleOperations(item, index)}
            style={{
              width: Dimensions.get('window').width * 0.95,
              marginBottom: 20,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              // user?.id == item?.sender_type_id ? 'flex-end' : 'flex-start',
              alignSelf: 'center',
            }}>
            <MsgChat usrId={user.id} item={item} />
          </Pressable>
        )}
      />
      <ChatInput
        onSabmit={text =>
          setMessageList([
            {sender_type_id: 1, text: text, timestamp: new Date()},
            ...messageList,
          ])
        }
        onAttachmentPress={() => {}}
      />
      <OptionPickerChat
        isVisible={isOptionModal}
        options={[
          {value: 'reply', label: 'Reply', icon: 'reply'},
          {value: 'forward', label: 'Forward', icon: 'arrow-forward'},
          {value: 'pin', label: 'Pin', icon: 'push-pin'},
          {value: 'hide', label: 'Hide', icon: 'visibility-off'},
          {
            value: 'delete',
            label: 'Delete',
            icon: 'delete-outline',
            color: 'red',
          },
        ]}
        onModalClose={setOptionModal}
      />
      <MessageActionstModal
        isVisible={otherModal}
        onModalClose={setOtherModal}
        options={[
          {value: 'reply', label: 'Reply', icon: 'reply'},
          {value: 'forward', label: 'Forward', icon: 'arrow-forward'},
          {value: 'content-copy', label: 'Copy', icon: 'file'},
          {value: 'report', label: 'Report', icon: 'report'},
        ]}
        msgId={msgId}
        onReport={handleReportMessage}
      />
      <MessageReportOptions
        isVisible={reportModalVisible}
        onModalClose={setReportModal}
      />
    </>
  );
};

export default ChatView;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '55%',
    justifyContent: 'space-between',
    alignSelf: 'center',
    flex: 2,
  },
  nameText: {
    fontSize: 22,
    textAlign: 'center',
    color: R.colors.PRIMARI_DARK,
    fontFamily: R.fonts.Semi_Bold,
    flex: 1,
  },
  secondContainer: {width: '100%', alignItems: 'center'},
  dateText: {
    marginTop: 12,
    backgroundColor: R.colors.backgroundColor,
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 12,
    fontSize: 9,
    fontFamily: R.fonts.Medium,
  },
  image: {
    width: 60,
    marginTop: 8,
    height: 60,
  },
  thirdContainer: {
    bottom: Platform.OS == 'ios' ? 70 : 50,
    height: Dimensions.get('window').height * 0.8,
    alignSelf: 'center',
  },
  contentContainerStyle: {
    width: '100%',
    paddingBottom: 12,
  },
});
