import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import Button from 'library/commons/Button';
import R from 'resources/R';
import BTextInput from 'library/commons/BTextInput';
import UserApi from '../../datalib/services/user.api';
/*
 * This function is used to create feedback Modal during delete account 
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const FeedbackModal = ({isVisible, onModalClose, onFeedback}) => {
  const [feedback, setFedback] = React.useState('');

  const handleSubmit = async () => {
    const data = {feedback: feedback, appVersion: '1.0'};
    const res = await new UserApi().appFeedback(data);
    if (res) {
      onModalClose(false);
      onFeedback && onFeedback(true);
    }
  };
  return (
    <Modal
      isVisible={isVisible}
      swipeDirection="down"
      onSwipeComplete={e => {
        onModalClose(false);
      }}
      onBackdropPress={e => {
        onModalClose(false);
      }}
      style={styles.modalContainer}>
      <View style={styles.modalInnerContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalHeaderText}>Too bad you couldn’t stay!</Text>
        </View>
        <View style={styles.modalBody}>
          <BTextInput
            placeholder={
              'Give some feedback, it is very helpful, and we appreciate it!'
            }
            containerStyle={styles.inputContainer}
            multiline={true}
            onChangeText={text => {
              setFedback(text);
            }}
          />
        </View>
        <View style={styles.modalFooter}>
          <View style={styles.ButtonContainer}>
            <Button
              title={'Skip'}
              onPress={e => {
                onFeedback && onFeedback(true);
                onModalClose(false);
              }}
              backgroundColor={R.colors.LIGHTGRAY}
            />
          </View>
          <View style={styles.ButtonContainer}>
            <Button title={'Submit'} onPress={handleSubmit} />
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default FeedbackModal;
const styles = StyleSheet.create({
  modalHeaderText: {
    textAlign: 'center',
    fontFamily: R.fonts.Bold,
    fontSize: R.fontSize.L,
    color: R.colors.PRIMARI_DARK,
  },
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
    overflow: 'hidden',
  },
  modalInnerContainer: {
    backgroundColor: 'white',
    minHeight: 300,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent: 'space-between',
    padding: 20,
    margin: 0,
  },
  feedBackText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: R.fonts.Medium,
    fontSize: R.fontSize.XXXL,
    alignSelf: 'center',
  },
  fixedBtn: {
    zIndex: 9999,
    height: 50,
    width: 50,
    position: 'absolute',
    bottom: 110,
    right: 20,
    backgroundColor: '#000',
    borderRadius: 120,
  },
  inputContainer: {
    borderRadius: 20,
    height: 200,
    marginVertical: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  modalFooter: {
    flexDirection: 'row',
  },
  ButtonContainer: {
    width: '50%',
    paddingHorizontal: 10,
  },
});
