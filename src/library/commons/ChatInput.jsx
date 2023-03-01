import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
/*
 * This function is used to create our chatInput for message screen and modal 
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const ChatInput = ({onSabmit, onAttachmentPress}) => {
  const [chatText, setText] = useState('');
  const onSubmitPress = () => {
    if (chatText) {
      onSabmit(chatText);
    }
    setText('');
  };
  return (
    <View style={styles.sendContainer}>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={onAttachmentPress}
          style={styles.buttonStyle}>
          <Icon name={'add'} color={'black'} size={20} />
        </TouchableOpacity>
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder={'Type your message here...'}
          value={chatText}
          onChangeText={setText}
          multiline
        />
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={onSubmitPress} style={styles.buttonStyle}>
          <Icon name={'send'} color={'black'} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ChatInput;
const styles = StyleSheet.create({
  sendContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 40,
    width: Dimensions.get('screen').width - 40,
    alignSelf: 'center',
    borderColor: '#E2E8F0',
    marginVertical: 30,
  },
  textInputContainer: {},
  textInput: {width: Dimensions.get('screen').width - 120},
  iconContainer: {width: 40, alignItems: 'center', justifyContent: 'center'},
  buttonStyle: {padding: 10},
});
