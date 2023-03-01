import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import Button from 'library/commons/Button';
import R from 'resources/R';
import CheckBox from 'library/commons/CheckBox';
import AcceptedCandidateModal from './AcceptedCandidateModal';
import Modal from 'react-native-modal';
/*
 * This function is used to create Payment OverView Modal
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const PaymentOverviewModel = ({isVisible, onModalClose}) => {
  let [prioritiyPosting, setPriorityPosting] = useState(false);
  const [isAcceptedModalVis, setAcceptedModalVis] = useState(false);
  const handleAcceptModalClose = () => {
    setAcceptedModalVis(false);
    onModalClose();
  };
  return (
    <>
      <Modal
        isVisible={isVisible}
        // swipeDirection="down"
        // onSwipeComplete={e => {
        //   onModalClose(false);
        // }}
        onBackdropPress={e => {
          onModalClose(false);
        }}
        style={styles.modalContainer}>
        <View style={styles.modalInnerContainer}>
          <View style={styles.container1}>
            {/* <Pressable style={{height: 25}}>
              <Text style={styles.detail}>How are fees calculated?</Text>
            </Pressable> */}
            <Text style={styles.label}>Payment Overview</Text>
          </View>
          <View style={styles.container2}>
            <View style={styles.items}>
              <Text style={styles.labels}>Base job</Text>
              <Text style={styles.labelsValue}>$150</Text>
            </View>
            <View style={styles.items}>
              <Text style={styles.labels}>Posting fee</Text>
              <Text style={styles.labels}>+$0.25</Text>
            </View>
            <View style={styles.items}>
              <Text style={styles.labels}>40 mi x $0.20/mi</Text>
              <Text style={styles.labels}>+$8</Text>
            </View>
            <View style={styles.items}>
              <Text style={styles.labels}>Service fee</Text>
              <Text style={styles.labels}>+$4.60</Text>
            </View>
            <View style={styles.items}>
              <Text style={styles.labels}>Sales tax</Text>
              <Text style={styles.labels}>+$11.25</Text>
            </View>
            <View style={styles.items}>
              <Text style={styles.total}>Estimated total</Text>
              <Text style={styles.total}>+$1174.10</Text>
            </View>
            <View style={styles.visaContainer}>
              <Text style={styles.visaText}>Visa ending in 102</Text>
              <Text style={styles.changeText}>Change</Text>
            </View>
            <Text style={styles.priorityFeesText}>
              For card verification, we will place the estimated total in
              escrow, until the job is completed, or you cancel the job.
            </Text>
          </View>
          {/* <View style={styles.priorityFees}>
            <CheckBox
              defaultChecked={prioritiyPosting}
              onCheck={setPriorityPosting}
            />
            <Text style={styles.priorityPosting}>Priority posting</Text>
          </View> */}
          <View style={styles.btn}>
            <Button
              title={'Confirm'}
              buttonStyle={styles.button}
              onPress={() => setAcceptedModalVis(true)}
            />
          </View>
        </View>
      </Modal>
      {isAcceptedModalVis && (
        <AcceptedCandidateModal
          isVisible={isAcceptedModalVis}
          onModalClose={handleAcceptModalClose}
        />
      )}
    </>
  );
};

export default PaymentOverviewModel;

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
    borderRadius: 20,
    overflow: 'hidden',
    // height: '70%',
  },
  modalInnerContainer: {
    backgroundColor: 'white',
    maxHeight: '90%',
    minHeight: '90%',
    borderRadius: 20,
    justifyContent: 'space-between',
    padding: 10,
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  container1: {
    alignItems: 'center',
  },
  detail: {
    color: R.colors.PRIMARI_DARK,
    fontSize: 15,
    flex: 1,
    marginLeft: 250,
  },
  label: {
    color: R.colors.PRIMARI_DARK,
    fontSize: 25,
    marginVertical: 30,
  },
  labels: {
    color: R.colors.PRIMARI_DARK,
    fontSize: 15,
    flex: 1,
    // textAlign: 'center',
  },
  labelsValue: {
    color: R.colors.PRIMARI_DARK,
    fontSize: 15,
    flex: 1,
    // justifyContent: 'flex-end',
  },
  total: {
    color: R.colors.PRIMARI_DARK,
    fontSize: 17,
    flex: 1,
  },
  container2: {
    flexDirection: 'column',
    marginHorizontal: 20,
  },
  container3: {
    flexDirection: 'column',
  },
  items: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  priorityFees: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
  },
  priorityFeesText: {
    textAlign: 'center',
    paddingHorizontal: 20,
    // fontSize:R.fontSize.L
  },
  button: {
    backgroundColor: R.colors.LIGHT_GREEN,
    alignSelf: 'flex-end',
  },
  btn: {
    width: '85%',
    height: '10%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  visaContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  visaText: {},
  changeText: {
    color: R.colors.LIGHTBLUE,
    fontSize: R.fontSize.M,
    marginLeft: 20,
  },
  priorityPosting: {
    fontSize: R.fontSize.L,
    color: R.colors.PRIMARI_DARK,
    marginLeft: 10,
  },
});
