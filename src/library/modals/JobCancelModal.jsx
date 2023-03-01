import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import R from 'resources/R';
import Modal from 'react-native-modal';
import Button from 'library/commons/Button';
/*
 * This function is used to create Job Cancel Modal
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const JobCancelModal = ({
  isVisible,
  onModalClose,
  confirmationText,
  onJobCancel,
}) => {
  const [value, setValue] = useState(null);
  const handleClose = data => {
    if (data === 'cancel') {
      onModalClose(false);
    }
    if (data === 'confirm') {
      onModalClose(false);
      onJobCancel && onJobCancel();
    }
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
        <Text style={styles.sureText}>Are you sure?</Text>
        <View style={styles.backgroundColor}>
          <Text style={styles.modalHeaderText}>{confirmationText}</Text>
        </View>
        <View style={styles.modalFooterText}>
          <Button
            title={'Cancel'}
            onPress={() => handleClose('cancel')}
            buttonStyle={styles.buttonText}
          />
          <Button
            title={'Confirm'}
            onPress={() => handleClose('confirm')}
            buttonStyle={styles.buttonText}
            backgroundColor={R.colors.PRIMARY_LIGHT}
            textColor={R.colors.SECONDRY_DARK}
          />
        </View>
      </View>
    </Modal>
  );
};
export default JobCancelModal;
const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
    borderRadius: 20,
    overflow: 'hidden',
  },
  modalInnerContainer: {
    backgroundColor: 'white',
    maxHeight: '30%',
    borderRadius: 20,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  modalBody: {
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  modalHeaderText: {
    color: R.colors.PRIMARI_DARK,
    textAlign: 'center',
    // fontFamily: R.fonts.Bold,
    fontSize: R.fontSize.L,
    marginVertical: 30,
  },
  backgroundColor: {
    paddingVertical: 5,
  },
  modalFooterText: {
    flexDirection: 'row',
  },
  buttonText: {flex: 1, marginHorizontal: 20},
  sureText: {
    textAlign: 'center',
    color: R.colors.PRIMARI_DARK,
    fontFamily: R.fonts.Bold,
    fontSize: R.fontSize.L,
    marginTop: 15,
  },
});
