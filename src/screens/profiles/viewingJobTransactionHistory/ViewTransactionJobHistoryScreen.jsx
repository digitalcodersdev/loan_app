import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Button from 'library/commons/Button';
import Profile from 'library/commons/Profile';
import AddPicture from 'library/commons/AddPicture';
import ScreenWrapper from 'library/wrapper/ScreenWrapper';
import {useNavigation} from '@react-navigation/native';
import ScreensNameEnum from '../../../constants/ScreensNameEnum';
import R from 'resources/R';
import MessagingModal from 'library/modals/MessagingModal';
import {useSelector, useDispatch} from 'react-redux';
import DisputeModal from 'library/modals/DisputeModal';
import {selectJobById} from '../../../store/slices/job/job.slice';
import {currentUserSelector} from '../../../store/slices/user/user.slice';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import Stars from 'react-native-stars';
import ReviewModal from 'library/modals/ReviewModal';
import {jobReportSelector} from '../../../store/slices/job/job.slice';
import ReportCandidate from 'library/modals/ReportCandidate';
import userImg from '../../../resources/images/user.jpg';
/*
 * This function is used to create View Job Transaction History Screen
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const ViewTransactionJobHistoryScreen = props => {
  const jobReport = useSelector(jobReportSelector);
  const id = props.route.params.id;
  const jobDetail = useSelector(state => selectJobById(state, id));
  const navigation = useNavigation();
  const user = useSelector(state => currentUserSelector(state));
  const [isVisible, setModalVisible] = useState(false);
  const [dispute, setDispute] = useState('');
  const [isReviewModal, setReviewModal] = useState(false);
  const [reportModalVisible, setReportModal] = useState(false);
  const onModalClose = () => {
    setModalVisible(false);
  };
  const [isDisputeVisible, setDisputeModalVisible] = useState(false);
  const onDisputeModalClose = () => {
    setDisputeModalVisible(false);
  };
  const onConfirm = data => {
    setDispute(data);
  };
  const {reviewCounts, rating} = user;
  return (
    <>
      <ScreenWrapper>
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            {dispute ? (
              <Button
                title={'Cancel Dispute'}
                onPress={() => setDispute('')}
                backgroundColor={R.colors.LIGHTGRAY_1}
                textColor={R.colors.PRIMARI_DARK}
              />
            ) : (
              <Button
                title={'Start Dispute'}
                onPress={() => setDisputeModalVisible(true)}
                backgroundColor={R.colors.LIGHTGRAY_1}
                textColor={R.colors.PRIMARI_DARK}
              />
            )}
          </View>
          {user.userImage ? (
            <Image style={styles.image} source={{uri: user.userImage}} />
          ) : (
            <Image
              style={styles.image}
              source={userImg}
            />
          )}
          <View style={styles.profileContainer}>
            {/* <Profile user={user} /> */}
            <View style={styles.profileFirst}>
              <Text style={styles.price}>$150</Text>
              <Text style={styles.date}>August 1,2020</Text>
            </View>
            <View style={styles.profileSecond}>
              {/* <View style={styles.image}> */}

              <Text style={styles.name}>
                {user.firstName} {user.lastName}
              </Text>
              <View style={styles.ratingsContiner}></View>
              {/* <Icon name="star" color="#FFAA00" size={15} /> */}

              <Stars
                disabled
                display={user ? rating : 0}
                spacing={1}
                count={5}
                starSize={20}
                fullStar={
                  <Icon name={'star'} style={[styles.myStarStyle]} size={20} />
                }
                emptyStar={
                  <Icon
                    name={'star-outline'}
                    style={[styles.myStarStyle, styles.myEmptyStarStyle]}
                    size={20}
                  />
                }
                halfStar={
                  <Icon
                    name={'star-half'}
                    style={[styles.myStarStyle]}
                    size={20}
                  />
                }
              />

              <Text style={styles.userRating}>{rating} stars</Text>
              <TouchableOpacity
                onPress={() => {
                  setReviewModal(true);
                }}>
                <Text style={styles.reviewCount}>{reviewCounts} reviews</Text>
              </TouchableOpacity>
              {/* </View> */}
            </View>
            <View style={styles.profileThird}>
              {!jobReport ? (
                <TouchableOpacity onPress={() => setReportModal(true)}>
                  <Icon name={'outlined-flag'} size={25} />
                </TouchableOpacity>
              ) : (
                <Icon name={'flag'} size={25} />
              )}
            </View>
          </View>
          <View style={styles.messageContainer}>
            <Button
              title={'Message'}
              backgroundColor={R.colors.SKY_BLUE}
              onPress={() => setModalVisible(true)}
            />
          </View>
          <View style={styles.skillContainer}>
            <Text style={styles.skill}>
              Required Skill <Text style={styles.skillValue}> Roofer</Text>
            </Text>
            <Text style={styles.toolsRequired}>Hammer Required</Text>
          </View>
          <View style={styles.imgContainer}>
            <AddPicture editable={false} images={jobDetail.images} />
          </View>
          <View style={styles.descriptionContainer}>
            {jobDetail.description && (
              <Text style={styles.description}>
                {jobDetail.description}
                <TouchableOpacity>
                  <Text style={styles.seeMore}> ...See more</Text>
                </TouchableOpacity>
              </Text>
            )}
            <Text style={styles.timeText}>
              {`${jobDetail.duration} ${jobDetail.durationUnit} job`}
            </Text>
            {/* <Text style={styles.distanceText}>10 miles away</Text> */}
          </View>
          <Button
            title={'Payment Overview'}
            onPress={() => {
              navigation.navigate(ScreensNameEnum.PAYMENT_OVERVIEW);
            }}
          />
        </View>
      </ScreenWrapper>
      <MessagingModal isVisible={isVisible} onModalClose={onModalClose} />
      {isDisputeVisible && (
        <DisputeModal
          isVisible={isDisputeVisible}
          onModalClose={onDisputeModalClose}
          onConfirm={onConfirm}
          defaultDispute={dispute}
        />
      )}
      <ReviewModal isVisible={isReviewModal} onModalClose={setReviewModal} />
      <ReportCandidate
        isVisible={reportModalVisible}
        onModalClose={setReportModal}
        jobId={jobDetail.id}
        // reportedTo={applicant.idUser}
        // onJobReported={handleReport}
      />
    </>
  );
};

export default ViewTransactionJobHistoryScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '94%',
  },
  buttonContainer: {
    width: '45%',
    alignSelf: 'center',
  },
  messageContainer: {width: '45%', alignSelf: 'center'},
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skill: {
    color: R.colors.PRIMARI_DARK,
    fontSize: R.fontSize.L,
    fontFamily: R.fonts.Bold,
    alignSelf: 'center',
  },
  skillValue: {
    color: R.colors.LIGHTBLUE,
  },
  toolsRequired: {
    color: R.colors.PRIMARI_DARK,
    fontSize: R.fontSize.L,
    fontFamily: R.fonts.Bold,
    alignSelf: 'center',
  },
  imgContainer: {
    marginHorizontal: 30,
    marginVertical: 20,
  },
  description: {
    color: R.colors.PRIMARI_DARK,
    fontSize: R.fontSize.M,
    alignSelf: 'center',
    width: '60%',
  },
  seeMore: {
    color: R.colors.PRIMARI_DARK,
    fontSize: R.fontSize.M,
    fontFamily: R.fonts.Bold,
  },
  timeText: {
    color: R.colors.PRIMARI_DARK,
    fontSize: R.fontSize.L,
    fontFamily: R.fonts.Bold,
    alignSelf: 'center',
  },
  distanceText: {
    color: R.colors.PRIMARI_DARK,
    fontSize: R.fontSize.L,
    fontFamily: R.fonts.Bold,
    alignSelf: 'center',
  },
  profileFirst: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileSecond: {
    flexDirection: 'column',
    flex: 1,
  },
  profileThird: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  price: {
    color: R.colors.PRIMARI_DARK,
    fontFamily: R.fonts.Bold,
    fontSize: R.fontSize.XXL,
    alignItems: 'center',
  },
  date: {
    color: R.colors.PRIMARI_DARK,
    fontFamily: R.fonts.Bold,
    fontSize: R.fontSize.M,
  },
  image: {
    height: 100,
    width: 100,
    borderWidth: 1,
    borderRadius: 120,
    borderColor: R.colors.LIGHTGRAY_1,
    alignSelf: 'center',
  },
  name: {
    color: R.colors.PRIMARI_DARK,
    fontFamily: R.fonts.Bold,
    fontSize: R.fontSize.L,
    alignSelf: 'center',
    marginBottom: 5,
  },
  icon: {alignSelf: 'center'},
  ratingsContiner: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  myStarStyle: {
    color: R.colors.primary,
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowOffset: {width: 0.5, height: 0.5},
    textShadowRadius: 1,
  },
  myEmptyStarStyle: {
    color: 'white',
  },
  userRating: {
    color: R.colors.PRIMARI_DARK,
    textAlign: 'center',
    fontFamily: R.fonts.Bold,
    fontSize: R.fontSize.M,
    marginVertical: 5,
  },
  reviewCount: {
    color: '#3366FF',
    textAlign: 'center',
  },
});
