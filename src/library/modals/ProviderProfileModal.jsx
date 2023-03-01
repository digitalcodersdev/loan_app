import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  TextInput,
  Image,
  Pressable
} from 'react-native';
import Modal from 'react-native-modal';
import R from 'resources/R';
import Rating from '../commons/Rating';
import {useSelector, useDispatch} from 'react-redux';
import {getUserReviews} from '../../store/actions/userActions';
import {userReviewSelector} from '../../store/slices/user/user.slice';
import AddPicture from '../commons/AddPicture';
import BTextInput from '../commons/BTextInput';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from 'library/commons/Button';
import ServiceProviderDetailModal from './ServiceProviderDetailModal';
import manImg from '../../assets/images/man.png';
/*
 * This function is used to create Review modal
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const ProviderProfileModal = ({isVisible, onModalClose, userType}) => {
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState([]);
  const [serviceProviderDetailModal, setServiceProviderDetailModal] = useState(
    false,
  );
  const onImageChange = img => {
    setImageUrl([...img]);
  };
  const onServiceProviderDetailClose = () => {
    setServiceProviderDetailModal(false);
  };
  return (
    <>
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
          <View style={styles.innerContainer}>
            <View style={styles.profileContainer}>
              <Pressable
                onPress={() => {
                  setServiceProviderDetailModal(true);
                }}>
                <Text style={styles.name}>David</Text>
              </Pressable>
              <View style={styles.starContainer}>
                <View style={styles.innerStarContainer}>
                  <Icon name="star" color="#FFAA00" size={15} />
                  <Text style={styles.rating}>4.84</Text>
                </View>
                <Text style={styles.reviewCount}>7 Reviews</Text>
              </View>
            </View>
            <View style={styles.imgContainer}>
              <Image
                source={manImg}
                style={styles.image}
                resizeMode={'contain'}
              />
              <Icon name="flag" size={25} style={styles.icon} />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonInner}>
              <Button
                title={'Message'}
                backgroundColor={R.colors.CGRAY}
                textColor={R.colors.PRIMARI_DARK}
              />
            </View>
            <View style={styles.buttonInner}>
              <Button
                title={'Call'}
                backgroundColor={R.colors.CGRAY}
                textColor={R.colors.PRIMARI_DARK}
              />
            </View>
            <View style={styles.buttonInner}>
              <Button
                title={'Cancel'}
                backgroundColor={R.colors.CGRAY}
                textColor={R.colors.PRIMARI_DARK}
              />
            </View>
          </View>
        </View>
      </Modal>
      <ServiceProviderDetailModal
        isVisible={serviceProviderDetailModal}
        onModalClose={onServiceProviderDetailClose}
      />
    </>
  );
};

export default ProviderProfileModal;

const styles = StyleSheet.create({
  input: {
    // flex: 1,
    height: '90%',
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 40,
    marginVertical: 20,
    borderColor: 'grey',
    textAlignVertical: 'top',
    color: R.colors.PRIMARI_DARK,
    fontSize: 16,
    padding: 10,
  },
  feedback: {
    height: '50%',
  },
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
    borderRadius: 20,
    overflow: 'hidden',
  },
  modalInnerContainer: {
    backgroundColor: 'white',
    maxHeight: '30%',
    borderRadius: 20,
    justifyContent: 'space-around',
    padding: 10,
    flexDirection: 'column',
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  profileContainer: {
    flexDirection: 'column',
  },
  name: {
    fontSize: R.fontSize.XL,
    textAlign: 'center',
    fontFamily: R.fonts.Bold,
    color: R.colors.PRIMARI_DARK,
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  innerStarContainer: {
    flexDirection: 'row',
  },
  rating: {
    color: R.colors.PRIMARI_DARK,
  },
  reviewCount: {
    color: R.colors.LIGHTBLUE,
  },
  imgContainer: {
    flexDirection: 'row',
  },
  image: {
    height: 80,
    width: 80,
    // borderWidth: 1,
  },
  icon: {
    alignSelf: 'center',
    marginLeft: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  buttonInner: {
    flex: 1,
    width: '100%',
    marginHorizontal: 10,
  },
});
