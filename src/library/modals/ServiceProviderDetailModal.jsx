import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  Flatlist,
} from 'react-native';
import Modal from 'react-native-modal';
import R from 'resources/R';
import Rating from '../commons/Rating';
import {useSelector, useDispatch} from 'react-redux';
import {
  currentJobSelector,
  jobApplicantSelector,
} from '../../store/slices/job/job.slice';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from 'library/commons/Button';
import ReviewModal from 'library/modals/ReviewModal';
import ReportCandidate from './ReportCandidate';
import {
  jobReportSelector,
  getSkillById,
} from '../../store/slices/job/job.slice';
import UserApi from '../../datalib/services/user.api';
import userImg from '../../resources/images/user.jpg';

/*
 * This function is used to create Service Provider Details Modal
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const ServiceProviderDetailModal = ({isVisible, onModalClose}) => {
  const jobReport = useSelector(jobReportSelector);
  const [isReviewModalVisible, setReviewModal] = useState(false);
  const [reportModalVisible, setReportModal] = useState(false);
  const [reported, setReport] = useState(false);
  const [reviews, setReviews] = useState(false);
  const skills = useSelector(state => state.jobs.jobSkills);
  const job = useSelector(currentJobSelector);
  const mainSkill = job.skills.map(item => {
    if (!item.parentSkill) {
      return item.skillId;
    } else {
      return null;
    }
  });

  const applicant = useSelector(jobApplicantSelector);
  const jobSkills = useSelector(state => getSkillById(state, mainSkill[0]));
  // console.log(jobSkills);
  const handleReport = item => {
    if (item) {
      setReport(true);
    }
  };

  useEffect(() => {
    getProviderReviews();
  }, []);

  const getProviderReviews = async () => {
    let filter = {userId: applicant.idUser};
    const response = await new UserApi().getUserReviews(filter);
    if (response) {
      setReviews(response);
    }
  };
  const images = job?.images?.split(',');

  return (
    <>
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
          <View style={styles.innerContainer}>
            <Text style={styles.name}>{applicant?.firstName}</Text>
            {applicant.userImage ? (
              <Image
                source={{uri: applicant.userImage}}
                style={styles.image}
                resizeMode={'contain'}
              />
            ) : (
              <Image
                source={userImg}
                style={styles.image}
                resizeMode={'contain'}
              />
            )}
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonInner}>
              <View style={styles.x}>
                <Icon name={'star'} color="#FFAA00" size={20} />
                <Text style={styles.starCount}>
                  {applicant?.rating ? applicant.rating : 5}
                </Text>
              </View>
              <Pressable onPress={() => setReviewModal(true)}>
                <Text style={styles.reviewCount}>{reviews.length} Reviews</Text>
              </Pressable>
            </View>

            {!jobReport ? (
              <TouchableOpacity onPress={() => setReportModal(true)}>
                <Icon name={'outlined-flag'} size={25} />
              </TouchableOpacity>
            ) : (
              <Icon name={'flag'} size={25} />
            )}
          </View>
          <View style={styles.divider}>
            <View style={styles.locationButton}>
              <Button
                title={'Current Location'}
                backgroundColor={R.colors.SECONDARY}
              />
            </View>
            {/* <View style={styles.descriptionContainer}>
              {job?.skills
                ? job.skills.map((item, index) => {
                    return <Skills item={item} />;
                  })
                : null}
            </View> */}

            <View style={styles.descriptionContainer}>
              <View style={{marginVertical: 10}}>
                <Text style={styles.textDescription}>{job.description}</Text>
              </View>
              {images ? (
                <View style={styles.imageContainer}>
                  {images.map(item => (
                    <Image source={{uri: item}} style={styles.jobImage} />
                  ))}
                </View>
              ) : null}
            </View>
            <Text style={styles.approximateText}>
              Price: <Text style={{}}>{job.totalPrice}</Text>
            </Text>
            {/* </View> */}
          </View>
        </View>
      </Modal>
      {isReviewModalVisible && (
        <ReviewModal
          isVisible={isReviewModalVisible}
          onModalClose={setReviewModal}
          userType={'serviceProvider'}
          userId={applicant.idUser}
        />
      )}
      <ReportCandidate
        isVisible={reportModalVisible}
        onModalClose={setReportModal}
        jobId={job.id}
        reportedTo={applicant.idUser}
        onJobReported={handleReport}
      />
    </>
  );
};

export default ServiceProviderDetailModal;

// const Skills = ({item}) => {
//   const skill = useSelector(state => getSkillById(state, item.skillId));
//   console.log('XXXXXXXXXXXXXXXXXXXXXXXx', item.skillId);
//   return (
//     <Pressable style={styles.textContainer}>
//       {/* {!item.parentSkill ? (
//       <Text style={styles.skillText}>{item.} </Text>
//     ) : null} */}
//       <Text style={styles.text1}>Description & Photos</Text>
//     </Pressable>
//   );
// };

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
    overflow: 'hidden',
  },
  modalInnerContainer: {
    backgroundColor: 'white',
    maxHeight: '90%',
    minHeight: '90%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent: 'space-between',
    padding: 10,
    flexDirection: 'column',
  },
  innerContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  name: {
    fontSize: R.fontSize.XL,
    textAlign: 'center',
    fontFamily: R.fonts.Bold,
    color: R.colors.PRIMARI_DARK,
    marginVertical: 20,
  },
  starCount: {
    color: R.colors.PRIMARI_DARK,
  },
  image: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    borderRadius: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-around',
    width: '60%',
    alignSelf: 'center',
  },
  buttonInner: {
    width: '50%',
    marginHorizontal: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewCount: {
    color: R.colors.LIGHTBLUE,
    fontSize: R.fontSize.M,
    marginLeft: 1,
  },

  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  text: {
    color: R.colors.PRIMARI_DARK,
    fontFamily: R.fonts.Bold,
    marginLeft: 10,
  },
  descriptionContainer: {
    flexDirection: 'column',
    // width: '80%',
    alignSelf: 'center',
    height: '60%',
  },
  text1: {
    color: R.colors.PRIMARI_DARK,
    marginVertical: 10,
  },
  skillText: {
    color: R.colors.PRIMARI_DARK,
    fontSize: R.fontSize.L,
    fontFamily: R.fonts.Bold,
    marginVertical: 20,
  },
  approximateText: {
    alignSelf: 'center',
    color: R.colors.PRIMARI_DARK,
    fontFamily: R.fonts.Bold,
  },
  divider: {
    borderTopWidth: 1.5,
    borderColor: R.colors.LIGHTGRAY_1,
  },
  locationButton: {
    width: '40%',
    alignSelf: 'center',
    marginTop: 30,
  },
  x: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textDescription: {
    textAlign: 'left',
    marginHorizontal: 20,
    color: R.colors.PRIMARI_DARK,
    fontSize: R.fontSize.S,
    marginVertical: 5,
  },
  jobImage: {
    height: 80,
    width: 80,
    borderRadius: 100,
  },
});
