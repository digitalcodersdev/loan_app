import React, {useState} from 'react';
import Modal from 'react-native-modal';
import moment from 'moment';
import {
  FlatList,
  Linking,
  Platform,
  RefreshControl,
  View,
  StyleSheet,
  Text,
  Pressable,
  Image,
  Dimensions,
} from 'react-native';
import MsgChat from 'library/containers/chatsContainers/msgChat';
import OptionPickerChat from 'library/modals/OptionPickerChat';
import ChatInput from 'library/commons/ChatInput';
import Icons from 'react-native-vector-icons/MaterialIcons';
import R from 'resources/R';
import manImg from '../../assets/images/man.png';
import ChatView from 'library/commons/ChatView';

/*
 * This function is used to create chatModal
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */

const MessagingModal = ({isVisible, onModalClose}) => {
  const [isOptionModal, setOptionModal] = useState(false);
  const [isLoading] = useState(false);
  const [messageList, setMessageList] = useState([
    {sender_type_id: 2, text: 'Yes, Sure', timestamp: new Date()},
    {
      sender_type_id: 1,
      text:
        'Hey, could you work for me? I am verified and I really like you skills',
      timestamp: new Date(),
    },

    {sender_type_id: 2, text: 'Hi, Marco', timestamp: new Date()},
    {sender_type_id: 1, text: 'Hi, Devid', timestamp: new Date()},
  ]);

  const user = {id: 1};

  return (
    <>
      <Modal
        isVisible={isVisible}
        swipeDirection="down"
        backdropOpacity={0.2}
        onSwipeComplete={e => {
          onModalClose(false);
        }}
        onBackdropPress={e => {
          onModalClose(false);
        }}
        style={styles.modalContainer}>
        <View style={styles.modalInnerContainer}>
          <View style={styles.modelButton}></View>
          <ChatView />
          {/* <FlatList
            inverted={true}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={() => (
              <View style={{marginVertical: 20}}>
                <View style={styles.container}>
                  <Text style={styles.nameText}>Messaging Vic</Text>
                  <Icons
                    name={'call'}
                    size={25}
                    color={R.colors.PRIMARI_DARK}
                    style={styles.icon}
                  />
                </View>
                <View style={styles.secondContainer}>
                  <Text style={styles.dateText}>
                    {moment(new Date()).format('DD MMM YYYY')}
                  </Text>
                  <Image
                    style={styles.image}
                    source={manImg}
                  />
                </View>
              </View>
            )}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                colors={[
                  R.colors.primary,
                  R.colors.LIGHTBLUE,
                  R.colors.primary,
                ]}
                refreshing={isLoading}
              />
            }
            scrollEnabled={true}
            data={messageList}
            contentContainerStyle={styles.contentContainerStyle}
            renderItem={({item, index, separators}) => (
              <Pressable
                onLongPress={() => setOptionModal(true)}
                style={{
                  width: Dimensions.get('window').width * 0.95,
                  marginBottom: 20,
                  flexDirection: 'row',
                  justifyContent:
                    user?.id == item?.sender_type_id
                      ? 'flex-end'
                      : 'flex-start',
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
            onAttachmentPress={() => {}} */}
          {/* /> */}
          {/* <OptionPickerChat
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
          /> */}
        </View>
      </Modal>
    </>
  );
};

export default MessagingModal;

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
    // borderRadius: 20,
    overflow: 'hidden',
  },
  modalInnerContainer: {
    backgroundColor: 'white',
    // maxHeight: '90%',
    minHeight: '90%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent: 'space-between',
    padding: 10,
    // flex: 1,
  },

  container: {
    flexDirection: 'row',
    // alignItems: 'center',
    width: '100%',
    justifyContent: 'space-around',
  },
  nameText: {
    fontSize: R.fontSize.XXL,
    textAlign: 'right',
    color: R.colors.PRIMARI_DARK,
    fontFamily: R.fonts.Bold,
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
    width: 100,
    marginTop: 8,
    height: 100,
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
  modelButton: {
    alignSelf: 'center',
    marginVertical: 0,
    width: 70,
    height: 4,
    backgroundColor: R.colors.LIGHTGRAY_1,
    borderRadius: 10,
    marginBottom: 20,
  },
  icon: {flex: 0.3, marginLeft: '10%'},
});
