import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Button from 'library/commons/Button';
import BTextInput from 'library/commons/BTextInput';
import styles from './styles';
import ScreenWrapper from 'library/wrapper/ScreenWrapper';
import {useNavigation} from '@react-navigation/native';
import UserApi from '../../../datalib/services/user.api';
import PaymentStatusModal from 'library/modals/PaymentStatusModal';
/*
 * This function is used to create app Feedback Screen
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const FeedbackModal = ({}) => {
  const [feedback, setFedback] = useState('');
  const navigation = useNavigation();
  const [isVisible, onModalClose] = useState(false);
  const [isNextDisabled, setNextDisabled] = useState(true);
  useEffect(() => {
    if (feedback.length > 0) {
      setNextDisabled(false);
    } else {
      setNextDisabled(true);
    }
  }, [feedback]);

  const handleAppFeedback = async () => {
    const data = {feedback: feedback};
    const res = await new UserApi().appFeedback(data);
    if (res) {
      // navigation.goBack();
      onModalClose(true);
      setTimeout(() => {
        onModalClose(false);
        navigation.goBack();
      }, 3000);
    }
  };
  return (
    <>
      <ScreenWrapper>
        <View style={styles.modalInnerContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>Feedback</Text>
          </View>
          <View style={styles.modalBody}>
            <BTextInput
              autoFocus
              placeholder={
                'Give some feedback, it is very helpful, and we appreciate it!'
              }
              containerStyle={styles.inputContainer}
              multiline={true}
              onChangeText={text => setFedback(text)}
            />
          </View>
          <View style={styles.modalFooter}>
            <Button
              title={'Submit'}
              disabled={isNextDisabled}
              onPress={handleAppFeedback}
            />
          </View>
        </View>
      </ScreenWrapper>
      <PaymentStatusModal
        isVisible={isVisible}
        onModalClose={onModalClose}
        feedback={'Feedback Sent'}
      />
    </>
  );
};
export default FeedbackModal;
