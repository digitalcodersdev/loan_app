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
const ContactOptionsModal = ({isVisible, onModalClose}) => {
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
          <Text style={styles.headerText}>Contact options</Text>
          <Text style={styles.text}>
            If you feel this is an emergency, call 911
          </Text>
        </View>

        <View style={styles.btncontainer}>
          <View style={styles.btn}>
            <Button
              title={'Call'}
              backgroundColor={R.colors.CGRAY}
              textColor={R.colors.PRIMARI_DARK}
            />
          </View>
          <View style={styles.btn2}>
            <Button title={'Message'} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ContactOptionsModal;

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
    maxHeight: '90%',
    minHeight: '30%',
  },
  headerText: {
    color: R.colors.PRIMARI_DARK,
    fontSize: R.fontSize.XXL,
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
    fontSize: R.fontSize.L,
    marginTop: 10,
  },
  btncontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    width: '45%',
  },
  btn2: {
    width: '45%',
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
