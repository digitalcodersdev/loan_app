import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import R from 'resources/R';
import Button from '../commons/Button';
/*
 * This function is used to create the confirmation modal
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const ConfirmationModal = ({
  isVisible,
  confirmationText = '',
  onModalClose,
  onConfirm,
  children,
}) => {
  const handleConfirm = () => {
    onModalClose(false);
    onConfirm && onConfirm('confirm');
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
        <View style={styles.modelButton}></View>
        <Text style={!children ? styles.sureText : styles.sureTextChildren}>
          {children
            ? 'Are you sure you want to delete your account?'
            : 'Are you sure?'}
        </Text>
        {confirmationText ? (
          <View style={styles.backgroundColor}>
            <Text style={styles.modalHeaderText}>{confirmationText}</Text>
          </View>
        ) : null}
        {children ? <View style={{}}>{children}</View> : null}
        {/* {children} */}
        <View style={styles.modalFooterText}>
          <Button
            title={'Cancel'}
            onPress={() => {
              onModalClose(false);
              onConfirm && onConfirm('cancel');
            }}
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

export default ConfirmationModal;

const styles = StyleSheet.create({
  modalHeaderText: {
    color: R.colors.PRIMARI_DARK,
    // textAlign: 'center',
    fontFamily: R.fonts.Regular,
    fontSize: R.fontSize.M,
    paddingVertical: 10,
    marginBottom: 10,
  },
  backgroundColor: {
    paddingVertical: 5,
    width: '75%',
    alignSelf: 'center',
  },
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
    margin: 0,
  },
  modalInnerContainer: {
    backgroundColor: 'white',
    minHeight: 150,
    borderRadius: 20,
    justifyContent: 'space-between',
    padding: 20,
  },
  modalFooterText: {
    flexDirection: 'row',
  },
  buttonText: {flex: 1, marginHorizontal: 5},
  sureText: {
    color: R.colors.PRIMARI_DARK,
    fontFamily: R.fonts.Bold,
    fontSize: R.fontSize.L,
    textAlign: 'center',
    marginVertical: 10,
  },
  sureTextChildren: {
    // color: R.colors.PRIMARI_DARK,
    fontFamily: R.fonts.Bold,
    fontSize: R.fontSize.L,
    textAlign: 'center',
    marginVertical: 10,
  },

  modelButton: {
    alignSelf: 'center',
    marginVertical: 0,
    width: 70,
    height: 4,
    backgroundColor: R.colors.LIGHTGRAY_1,
    borderRadius: 10,
  },
  // childerenContainer: {
  //   marginTop: 0,
  //   borderWidth: 1,
  // },
});
