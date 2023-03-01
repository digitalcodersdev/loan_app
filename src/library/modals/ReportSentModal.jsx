import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Modal from 'react-native-modal';
import R from 'resources/R';
import Button from '../commons/Button';
import Icon from 'react-native-vector-icons/MaterialIcons';
/*
 * This function is used to create the Contact options for the job Dispute
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const ReportSentModal = ({isVisible, onModalClose}) => {
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
      backdropOpacity={0.2}
      style={styles.modalContainer}>
      <View style={styles.modalInnerContainer}>
        <View style={styles.modelButton}></View>
        <View style={{flex: 1}}>
          <Text style={styles.headerText}>Report Sent</Text>
          <Text style={styles.text}>
            Report Sent Thank you for reporting and trying to keep KindaJobs as
            safe and positive as possible!
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default ReportSentModal;

const styles = StyleSheet.create({
  modalContainer: {
    margin: 20,
    overflow: 'hidden',
    margin: 0,
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  modalInnerContainer: {
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
    minHeight: '25%',
  },
  headerText: {
    color: R.colors.PRIMARI_DARK,
    fontSize: R.fontSize.L,
    fontFamily: R.fonts.Bold,
    alignSelf: 'center',
  },
  item: {
    color: R.colors.PRIMARI_DARK,
    fontSize: R.fontSize.L,
    alignSelf: 'center',
    borderColor: R.colors.RED,
    marginVertical: 10,
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  listContainer: {
    marginTop: 30,
  },
  text: {
    textAlign: 'center',
    color: R.colors.PRIMARI_DARK,
    fontSize: R.fontSize.M,
    marginTop: 10,
  },
  modelButton: {
    alignSelf: 'center',
    marginVertical: 0,
    width: 70,
    height: 4,
    backgroundColor: R.colors.LIGHTGRAY_1,
    borderRadius: 10,
    marginBottom: 30,
  },
});
