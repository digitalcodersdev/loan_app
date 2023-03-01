import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import R from 'resources/R';
import Rating from '../commons/Rating';
import {useSelector, useDispatch} from 'react-redux';
import {getUserReviews} from '../../store/actions/userActions';
import {userReviewSelector} from '../../store/slices/user/user.slice';
import UserApi from '../../datalib/services/user.api';
import Loader from 'library/commons/Loader';
import moment from 'moment';
import currentUserSelector from '../../store/slices/user/user.slice';
/*
 * This function is used to create Review modal
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const ReviewModal = ({isVisible, onModalClose, userType, userId}) => {
  const dispatch = useDispatch();
  const res = useSelector(state => state?.user);
  const user = res.user;
  const [loading, setLoading] = useState(false);
  const [userReviews, setUserReviews] = useState([]);
  let reviews = [];
  if (userType === 'poster') {
    reviews = useSelector(state => userReviewSelector(state));
    // setUserReviews(reviews);
    // setUserReviews(reviews);
  }
  useEffect(() => {
    if (userType && userType === 'poster') {
      getReviews();
    } else {
      getProviderReviews();
    }
  }, []);

  const getReviews = () => {
    let filter = {userId: userId};
    dispatch(getUserReviews(filter));
  };
  const getProviderReviews = async () => {
    setLoading(true);
    let filter = {userId: userId};
    const response = await new UserApi().getUserReviews(filter);
    setLoading(false);
    if (response) {
      setUserReviews(response);
    }
  };

  let {firstJobCreatedDate} = user;
  let postingSince = 'N/A';
  if (firstJobCreatedDate) {
    postingSince = moment(firstJobCreatedDate).format('DD, MMM, YYYY');
  }
  return (
    <Modal
      isVisible={isVisible}
      swipeDirection="down"
      onSwipeComplete={e => {
        onModalClose(false);
      }}
      onBackdropPress={e => {
        onModalClose(false);
      }}
      style={styles.modalContainer}>
      <View style={styles.modalInnerContainer}>
        <View style={styles.backgroundColor}>
          <Text style={styles.modalHeaderText}>Reviews</Text>
          <View>
            <View style={styles.userName}>
              <Text style={styles.nametext}>Candidate:</Text>
              <Text
                style={
                  styles.nametextValue
                }>{`${user.firstName} ${user.lastName}`}</Text>
            </View>
            {userType === 'serviceProvider' ? (
              <View style={styles.userName}>
                <Text style={styles.nametext}>Working since:</Text>
                <Text style={styles.nametextValue}>{postingSince}</Text>
              </View>
            ) : (
              <View style={styles.userName}>
                <Text style={styles.nametext}>Posting Since:</Text>
                <Text style={styles.nametextValue}>{postingSince}</Text>
              </View>
            )}

            <View style={styles.userName}>
              <Text style={styles.nametext}>Positive Feedback total:</Text>
              <Text style={styles.nametextValue}>
                {user.positiveFeedbackTotal ? user.positiveFeedbackTotal : 0}%
              </Text>
            </View>
          </View>
          <ScrollView>
            <View style={styles.listContainer}>
              {userReviews[0] || reviews[0] ? (
                <FlatList
                  data={
                    userType && userType === 'poster' ? reviews : userReviews
                  }
                  scrollEnabled={true}
                  contentContainerStyle={{height: '100%'}}
                  renderItem={({item}) => (
                    <Rating user={user} userReviews={item} />
                  )}
                  keyExtractor={item => `${item}`}
                />
              ) : null}
            </View>
          </ScrollView>
        </View>
      </View>
      <Loader message="4" loading={loading} />
    </Modal>
  );
};

export default ReviewModal;

const styles = StyleSheet.create({
  modalHeaderText: {
    color: R.colors.PRIMARI_DARK,
    textAlign: 'center',
    fontFamily: R.fonts.Bold,
    fontSize: R.fontSize.L,
    paddingVertical: 10,
    marginBottom: 10,
  },
  backgroundColor: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
    flex: 3,
  },
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
    overflow: 'hidden',
  },
  modalInnerContainer: {
    backgroundColor: 'white',
    maxHeight: '80%',
    minHeight: '60%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent: 'space-between',
    padding: 10,
    flexDirection: 'column',
  },
  reportText: {
    textAlign: 'center',
    fontSize: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#E2E8F0',
    color: R.colors.PRIMARI_DARK,
    paddingVertical: 10,
  },
  userName: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  nametext: {
    flex: 1,
    fontSize: 14,
    color: '#475569',
  },
  nametextValue: {
    flex: 1,
    fontSize: 14,
    color: R.colors.PRIMARI_DARK,
    fontFamily: R.fonts.Bold,
  },
  reportItems: {},
  listContainer: {height: '60%'},
});
