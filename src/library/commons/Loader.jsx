import React from 'react';
import {View, Text, Modal, StyleSheet, ActivityIndicator} from 'react-native';
import R from 'resources/R';
/*
 * This function is used to create Loader
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const Loader = ({loading, message}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={loading}>
      <View style={styles.modalContainer}>
        <ActivityIndicator size="large" color="white" />
        {message && message.length > 5 ? (
          <Text style={styles.messageText}>{message}</Text>
        ) : null}
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  messageText: {
    fontSize: 20,
    marginBottom: 20,
    fontFamily: R.fonts.LatoBold,
  },
});
