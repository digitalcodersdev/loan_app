import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import ScreenWrapper from 'library/wrapper/ScreenWrapper';
import FeedbackButton from 'library/commons/FeedbackButton';
import Button from 'library/commons/Button';
import R from 'resources/R';
import styles from './styles';
import ViewJobTransactionHistory from 'library/modals/ViewJobTransactionHistory';

/*
 * This function Component is used to render Payemnt Overview Screen
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
export default function PaymentOverviewScreen(props) {
  const job = props.route.params.job;
  const [isVisible, setModalVisible] = useState(false);
  return (
    <>
      <ScreenWrapper>
        <View style={styles.container}>
          <View style={styles.container1}>
            {/* <Pressable style={{height: 25}}>
            <Text style={styles.detail}>How are fees calculated?</Text>
          </Pressable> */}
            <Text style={styles.label}>Payment Overview</Text>
          </View>
          <View style={styles.container2}>
            <View style={styles.items}>
              <Text style={styles.labels}>Base job</Text>
              <Text style={styles.labels}>$150</Text>
            </View>
            <View style={styles.items}>
              <Text style={styles.labels}>Service fee</Text>
              <Text style={styles.labels}>+$4.60</Text>
            </View>
            <View style={styles.items}>
              <Text style={styles.total}>Total</Text>
              <Text style={styles.total}>+$1174.10</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title={'Job Details'}
              onPress={() => setModalVisible(true)}
            />
          </View>
        </View>
      </ScreenWrapper>
      <ViewJobTransactionHistory
        isVisible={isVisible}
        onModalClose={() => setModalVisible(false)}
        jobId={job.id}
      />
    </>
  );
}
