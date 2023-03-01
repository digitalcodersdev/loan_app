import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import R from 'resources/R';
import Modal from 'react-native-modal';
/*
 * This function is used to create Message Actions Modal
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const MessageActionstModal = ({
  isVisible,
  onModalClose,
  options,
  msgId,
  onReply,
  onForward,
  onCopy,
  onReport,
}) => {
  const [value, setValue] = useState(null);
  const handleValueChange = (_value, index) => {
    setValue(_value);
    if (_value === 'Report') {
      onReport && onReport(msgId);
    }
    //  else if (_value === 'Forward') {
    //   onPinChat && onPinChat(msgId);
    // } else if (_value === '') {
    //   onHideChat && onHideChat(msgId);
    // }
    onModalClose(false);
  };
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.2}
      onSwipeComplete={e => {
        onModalClose(false);
      }}
      onBackdropPress={e => {
        onModalClose(false);
      }}
      style={styles.modalContainer}>
      <View style={styles.modalInnerContainer}>
        <View style={styles.modalBody}>
          {options.map((item, index) => (
            <View key={`${index}`} style={styles.item}>
              <TouchableOpacity
                onPress={() => handleValueChange(item.label, index)}>
                <View style={styles.itemInner}>
                  {item.icon ? (
                    <View style={styles.itemIcon}>
                      <Icon
                        name={item.icon}
                        color={item.color || 'black'}
                        size={25}
                      />
                    </View>
                  ) : null}
                  <Text style={styles.itemText}> {item.label}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </Modal>
  );
};
export default MessageActionstModal;
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  modalHeaderText: {
    textAlign: 'center',
    fontFamily: R.fonts.Bold,
    fontSize: R.fontSize.L,
  },
  modalContainer: {
    justifyContent: 'flex-end',
    height: '100%',
    width: '100%',
    margin: 0,
  },
  item: {
    marginBottom: 10,
  },
  itemIcon: {
    width: 50,
  },
  modalInnerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderColor: 'white',
  },
  modalBody: {
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  itemText: {
    fontFamily: R.fonts.Medium,
    fontSize: R.fontSize.S,
    paddingVertical: 10,
  },

  itemInner: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemSubtitle: {},
});
