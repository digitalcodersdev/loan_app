import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from './Button';
import ReportCandidate from '../modals/ReportCandidate';
import ReviewModal from '../modals/ReviewModal';
import moment from 'moment';
import Stars from 'react-native-stars';
import R from 'resources/R';
import userImg from '../../resources/images/user.jpg';
/*
 * This function is used to create profile that we are using on multiple screens
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const Profile = ({job, user}) => {
  const star = [1];
  const [isReportModal, setReportModal] = useState(false);
  const [isReviewModal, setReviewModal] = useState(false);
  // const {price, createdAt} = job?.job;
  // let startTime = createdAt.slice(11, 19);
  // console.log('Inside profile', job, user);
  const {reviewCounts, rating} = user;
  return (
    <View style={styles.ratingContainer}>
      <View style={styles.imageContainer}>
        <Text style={styles.name}>{'Seddie Jeq'}</Text>
        <Image
          source={userImg}
          style={styles.profileImaeg}
          resizeMode={'cover'}
        />
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.priceContainer}>
          {/* <Text style={styles.price}>${job ? job.price : '0.00'}</Text> */}
          <Text style={styles.time}>30 minutes ago</Text>
        </View>
        <View style={styles.rating}>
          <View style={styles.ratingsContiner}>
            <Icon name="star" color="#FFAA00" size={15} />
            {/* 
            <Stars
              display={user ? useRating : 0}
              spacing={5}
              count={1}
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
            /> */}
            <Text style={styles.userRating}>{rating}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setReviewModal(true);
            }}>
            <Text style={styles.reviewCount}>{reviewCounts} reviews</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.flagConatiner}>
          <Button
            icon={'outlined-flag'}
            layout="circle"
            onPress={() => setReportModal(true)}
            backgroundColor={'white'}
            iconColor={'black'}
          />
        </View>
      </View>
      <ReportCandidate
        isVisible={isReportModal}
        onModalClose={setReportModal}
      />
      <ReviewModal isVisible={isReviewModal} onModalClose={setReviewModal} />
    </View>
  );
};
export default Profile;
const styles = StyleSheet.create({
  ratingContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: 30,
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 20,
  },
  profileImaeg: {
    borderWidth: 1,
    borderRadius: 100,
    height: 100,
    width: 100,
    borderColor: '#ccc',
  },
  priceContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  price: {
    color: R.colors.PRIMARI_DARK,
    fontSize: R.fontSize.XXL,
    fontFamily: R.fonts.Bold,
  },
  time: {
    color: R.colors.PRIMARI_DARK,
    fontSize: 16,
    fontFamily: R.fonts.Bold,
  },
  rating: {
    flexDirection: 'row',
    paddingVertical: 10,
    flex: 1,
    justifyContent: 'space-around',
  },
  name: {
    color: R.colors.PRIMARI_DARK,
    fontSize: R.fontSize.L,
    textAlign: 'center',
    fontFamily: R.fonts.Bold,
    marginBottom: 10,
  },
  userRating: {
    color: R.colors.PRIMARI_DARK,
    textAlign: 'center',
    fontFamily: R.fonts.Bold,
    fontSize: R.fontSize.M,
  },
  reviewCount: {
    color: '#3366FF',
    textAlign: 'center',
  },
  flagConatiner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});
