import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import R from 'resources/R';
import Button from '../commons/Button';
/*
 * This function is used to create Job description modal
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const JobDescription = ({isVisible, onModalClose}) => {
  const handleConfirm = () => {
    onModalClose('confirm');
    onConfirm && onConfirm();
  };
  return (
    <Modal
      isVisible={isVisible}
      swipeDirection="down"
      backdropOpacity={0.2}
      onSwipeComplete={e => {
        onModalClose(false);
      }}
      onBackdropPress={e => {
        onModalClose(false);
      }}
      style={styles.modalContainer}>
      <View style={styles.modalInnerContainer}>
        <View style={styles.modelButton}></View>
        <View style={styles.modal}>
          <Text style={styles.firstText}>
            For card verification, we will charge a $0.01 payment that will be
            refunded in 24 hours. We place the estimated total in escrow when
            your job is accepted, until the job is completed or the job is
            cancelled. You agree to pay the upfront price. The approximate
            amount may be more or less at the end of a job if the job details
            are edited.
          </Text>
          <View style={styles.priceContainer}>
            <View>
              <View style={styles.detailContainer}>
                <Text style={styles.jobText}>Base Job:</Text>
                <Text style={styles.jobText}>$158</Text>
              </View>
            </View>
            <View>
              <View style={styles.detailContainer}>
                <Text style={styles.jobText}>+Per Mile:</Text>
                <Text style={styles.jobText}>$0.20</Text>
              </View>
            </View>
            <View>
              <View style={styles.detailContainer}>
                <Text style={styles.jobText}>Posting:</Text>
                <Text style={styles.jobText}>$0.25</Text>
              </View>
            </View>
            <View>
              <View style={styles.detailContainer}>
                <Text style={styles.jobText}>Service Fee:</Text>
                <Text style={styles.jobText}>$4.89</Text>
              </View>
            </View>
          </View>

          <Text style={styles.firstText}>
            Additional charges may apply to your job if there is a cancellation
            after the grace period, or depending on weather conditions, time, or
            scarcity of service providers, this approximate price does not
            include sales tax.
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default JobDescription;

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    overflow: 'hidden',
    margin: 0,
  },
  priceContainer: {
    marginVertical: 10,
  },
  modalInnerContainer: {
    backgroundColor: 'white',
    minHeight: '35%',

    justifyContent: 'space-between',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modal: {alignSelf: 'center', justifyContent: 'space-between'},
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  firstText: {
    alignSelf: 'center',
    fontSize: R.fontSize.S,
    color: '#B4B4B4',
  },
  jobText: {
    color: R.colors.PRIMARI_DARK,
    fontSize: R.fontSize.M,
    marginVertical: 5,
  },
  modelButton: {
    alignSelf: 'center',
    marginVertical: 0,
    width: 70,
    height: 4,
    backgroundColor: R.colors.LIGHTGRAY_1,
    borderRadius: 10,
    marginBottom: 20,
  },
});
