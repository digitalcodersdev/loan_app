import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import R from 'resources/R';
import Button from '../commons/Button';
/*
 * This function is used to create the Option modal
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const OptionModal = ({
  isVisible,
  confirmationText = '',
  onModalClose,
  onConfirm,
  children,
}) => {
  const handleConfirm = () => {
    onModalClose();
    onConfirm && onConfirm();
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
        <View style={styles.backgroundColor}>
          <Text style={styles.modalHeaderText}>{confirmationText}</Text>
        </View>
        {children}
        <View style={styles.modalFooterText}>
          <Button
            title={'Cancel'}
            onPress={() => onModalClose(false)}
            buttonStyle={styles.buttonText}
            backgroundColor={R.colors.PRIMARY_LIGHT}
            textColor={R.colors.SECONDRY_DARK}
          />
          <Button
            title={'Confirm'}
            onPress={handleConfirm}
            buttonStyle={styles.buttonText}
          />
        </View>
      </View>
    </Modal>
  );
};

export default OptionModal;

const styles = StyleSheet.create({
  modalHeaderText: {
    color: R.colors.PRIMARI_DARK,
    textAlign: 'center',
    fontFamily: R.fonts.Regular,
    fontSize: R.fontSize.S,
    paddingVertical: 10,
    marginBottom: 10,
  },
  backgroundColor: {
    paddingVertical: 5,
  },
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
    borderRadius: 20,
    overflow: 'hidden',
  },
  modalInnerContainer: {
    backgroundColor: 'white',
    minHeight: 150,
    borderRadius: 20,
    justifyContent: 'space-between',
    padding: 10,
  },
  modalFooterText: {
    flexDirection: 'row',
  },
  buttonText: {flex: 1, marginHorizontal: 5},
});
