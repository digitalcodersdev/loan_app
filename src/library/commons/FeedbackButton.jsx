import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import R from 'resources/R';
import FeedbackModal from '../modals/FeedbackModal';
/*
 * This function is used to create our app Feedback button
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const FeedbackButton = () => {
  const [isModal, setModalVisible] = useState(false);
  return (
    <>
      <Pressable
        style={styles.fixedBtn}
        onPress={e => {
          setModalVisible(true);
        }}>
        <View style={styles.feedBackButton}>
          <Text style={styles.feedBackText}>F</Text>
        </View>
      </Pressable>
      <FeedbackModal isVisible={isModal} onModalClose={setModalVisible} />
    </>
  );
};
export default FeedbackButton;
const styles = StyleSheet.create({
  feedBackButton: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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
    height: 60,
    width: 60,
    position: 'absolute',
    bottom: 110,
    right: 20,
    backgroundColor: '#000',
    borderRadius: 120,
  },
});
