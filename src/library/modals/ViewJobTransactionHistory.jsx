import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from 'library/commons/Button';
import R from 'resources/R';
import {useDispatch, useSelector} from 'react-redux';
import {markJobDispute} from '../../store/actions/jobActions';
import {jobDisputeSelector} from '../../store/slices/job/job.slice';
import DisputeModal from './DisputeModal';
import userImg from '../../resources/images/user.jpg';
/*
 * This Component is used for ViewTransactionJobHistory Modal
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const ViewTransactionJobHistory = ({isVisible, onModalClose, jobId}) => {
  const [disputeVisible, setDisputeVisible] = useState(false);
  const dispatch = useDispatch();
  //   const dispute = useSelector(state => jobDisputeSelector(state, jobId));
  //   const dispute = useSelector(state => state.jobs.jobDispute);
  //   console.log('dispute', dispute);
  const handleDisputeJob = async id => {
    const dispute = {
      disputeCode: id,
      jobId: jobId,
    };
    await dispatch(markJobDispute(dispute));
  };
  return (
    <>
      <Modal
        isVisible={isVisible}
        backdropOpacity={0.2}
        swipeDirection="down"
        onSwipeComplete={e => {
          onModalClose(false);
        }}
        onBackdropPress={e => {
          onModalClose(false);
        }}
        style={styles.modalContainer}>
        <View style={styles.modalInnerContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Furniture Assembly</Text>
            <Text style={styles.dateText}>Job Ended at 7:12 PM</Text>
          </View>
          <View style={styles.serviceProviderContainer}>
            <Text style={styles.candidateText}>
              Accepted Candidate: David Ross
            </Text>
            <Image
              source={userImg}
              style={styles.image}
            />
            <View style={styles.ratingContainer}>
              <Icon name={'star'} size={25} color={R.colors.LIGHT_YELLOW} />
              <Text style={styles.ratingText}>4.84</Text>
            </View>
          </View>
          <Text style={styles.equipmentText}>Had no Equipment</Text>
          <View style={styles.serviceProviderContainer}>
            <Text style={styles.candidateText}>Poster: Sadie Jeq</Text>
            <Image
              source={userImg}
              style={styles.image}
            />
            <View style={styles.ratingContainer}>
              <Icon name={'star'} size={25} color={R.colors.LIGHT_YELLOW} />
              <Text style={styles.ratingText}>4.84</Text>
            </View>
            <Text style={styles.jobText}>2 Pieces of Furniture</Text>
          </View>
          <View style={styles.button}>
            <Button
              title={'Dispute'}
              backgroundColor={R.colors.disputeColor}
              textColor={R.colors.PRIMARI_DARK}
              onPress={() => setDisputeVisible(true)}
            />
          </View>
        </View>
      </Modal>
      <DisputeModal
        isVisible={disputeVisible}
        onModalClose={() => setDisputeVisible(false)}
        onDisputeSelect={handleDisputeJob}
      />
    </>
  );
};

export default ViewTransactionJobHistory;
const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
    overflow: 'hidden',
  },
  modalInnerContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    maxHeight: '90%',
    minHeight: '80%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent: 'space-around',
    padding: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  headerText: {
    color: R.colors.PRIMARI_DARK,
    fontFamily: R.fonts.Bold,
    fontSize: R.fontSize.XXL,
    textAlign: 'center',
  },
  dateText: {
    textAlign: 'center',
    marginTop: 10,
    color: R.colors.PRIMARI_DARK,
    fontSize: R.fontSize.M,
  },
  candidateText: {
    textAlign: 'center',
    color: R.colors.PRIMARI_DARK,
    marginBottom: 10,
    fontSize: R.fontSize.L,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 100,
    alignSelf: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    width: '20%',
    alignSelf: 'center',
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingText: {
    color: R.colors.PRIMARI_DARK,
    fontFamily: R.fonts.Bold,
    fontSize: R.fontSize.L,
    alignItems: 'center',
  },
  equipmentText: {
    color: R.colors.RED,
    textAlign: 'center',
    fontFamily: R.fonts.Bold,
    fontSize: R.fontSize.L,
  },
  jobText: {
    color: R.colors.PRIMARI_DARK,
    textAlign: 'center',
    fontSize: R.fontSize.L,
    marginTop: 10,
  },
  button: {},
});
