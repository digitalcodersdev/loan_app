import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
// import {JobCard, PersonalCard} from '../../containers';
import ScreenWrapper from 'library/wrapper/ScreenWrapper';
import {useSelector, useDispatch} from 'react-redux';
import {getMyJobs} from '../../../store/actions/jobActions';
import {selectJobById, selectJobIds} from '../../../store/slices/job/job.slice';
import ScreensNameEnum from '../../../constants/ScreensNameEnum';
import {currentUserSelector} from '../../../store/slices/user/user.slice';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import moment from 'moment';
import Loader from 'library/commons/Loader';
import {getCardById} from '../../../store/slices/user/cardSlice';
import {getCards} from '../../../store/actions/userActions';
import visaImg from '../../../assets/images/visa.png';
import mastercardImg from '../../../assets/images/mastercard.png';
/*
 * This function is used to create all jobs list Screen
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const AllJobsScreen = ({props}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const user = useSelector(state => currentUserSelector(state));

  useEffect(() => {
    setLoading(true);
    if (user) {
      dispatch(getMyJobs(user.id));
      dispatch(getCards());
    }
    setLoading(false);
  }, []);

  const jobs = useSelector(selectJobIds);
  return (
    <>
      <ScreenWrapper>
        <View style={{flexDirection: 'column', flex: 1}}>
          <Text style={styles.heading}>My Jobs</Text>
          <View style={styles.list}>
            <FlatList
              data={jobs}
              renderItem={({item, index}) => <JobCard item={item} />}
              keyExtractor={item => `${item}_item`}
            />
          </View>
        </View>
      </ScreenWrapper>
      <Loader loading={loading} />
    </>
  );
};
const JobCard = ({item}) => {
  const navigation = useNavigation();
  const jobDetail = useSelector(state => selectJobById(state, item));
  const card = useSelector(state =>
    getCardById(state, jobDetail.paymentMethod),
  );
  const month = moment(jobDetail.createdAt).format('MMM DD');
  const number = card?.cardNumber?.slice(12, 16);
  return (
    <>
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() =>
          navigation.navigate(ScreensNameEnum.PAYMENT_OVERVIEW, {
            job: jobDetail,
          })
        }>
        <View style={{padding: 5}}>
          <View style={styles.statusContainer}>
            <View style={styles.titleView}>
              <Text style={styles.title}>Furniture Assembly</Text>
              <Text style={styles.createdAt}>{month}</Text>
            </View>
            {/* <Text
            style={{
              color:
                jobDetail.status === 'cancelled' ? R.colors.RED : R.colors.GREEN,
              fontSize: R.fontSize.L,
            }}>
            {jobDetail.status}
          </Text> */}
          </View>
          <View style={styles.cardNumber}>
            {card?.cardType === 'visa' ? (
              <Image
                style={styles.img}
                source={visaImg}
                resizeMode={'contain'}
              />
            ) : (
              <Image
                style={styles.img}
                source={mastercardImg}
                resizeMode={'contain'}
              />
            )}
            <Text style={styles.text}>{`ending in ${number} `}</Text>
          </View>
          <View style={styles.date}>
            <Text style={styles.jobId}>{`Job #${jobDetail?.id}`}</Text>
            <Text style={styles.price}>${jobDetail?.price.toFixed(2)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default AllJobsScreen;
