import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  DismissKeyboardView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Button from 'library/commons/Button';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import UserApi from '../../datalib/services/user.api';
import AddPicture from 'library/commons/AddPicture';
import R from 'resources/R';
import {createUserFeedback} from '../../store/actions/jobActions';
import {useSelector, useDispatch} from 'react-redux';
import {jobApplicantSelector} from '../../store/slices/job/job.slice';
/*
 * This function is used to create UserExperience Modal
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const UserExperienceModal = ({isVisible, onModalClose}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const applicant = useSelector(jobApplicantSelector);
  const [feedback, setDescription] = useState('');
  const [rating, setRating] = useState(0);
  const [imageUrl, setImage] = useState([]);
  const [invalid, setInvalid] = useState(false);
  const handleContinue = async () => {
    let data = {
      idUser: applicant.idUser,
      ratings: rating === 0 ? 5 : rating,
      feedback: feedback,
      images: imageUrl,
    };
    const res = dispatch(createUserFeedback(data));
    if (res) {
      onModalClose(false);
    }
  };
  const onImageChange = img => {
    setImage([...img]);
  };
  return (
    <>
      <Modal
        isVisible={isVisible}
        backdropOpacity={0.2}
        swipeDirection="down"
        onSwipeComplete={e => {
          handleContinue();
          // onModalClose(false);
        }}
        onBackdropPress={e => {
          onModalClose(false);
        }}
        style={styles.modalContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.modalInnerContainer}>
            <Text style={styles.label}>Experience</Text>
            <View style={styles.feedback}>
              <TextInput
                autoFocus
                multiline={true}
                maxLength={150}
                placeholder="Leave a review of how your overall experience was!"
                value={feedback}
                style={styles.input}
                onChangeText={text => {
                  // if (feedback.length < 150) {
                  setDescription(text);
                  // }
                }}
              />
              <Text
                style={invalid ? styles.charCountInvalid : styles.charCount}>
                {feedback.length}/150
              </Text>
            </View>
            <View style={styles.imagesContainer}>
              <AddPicture editable={true} onImageChange={onImageChange} />
            </View>
            <View
              style={{
                alignItems: 'center',
                marginHorizontal: 20,
              }}>
              <Stars
                default={rating}
                count={5}
                style={{backgroundColor: 'C5CEE0'}}
                half={true}
                starSize={45}
                spacing={12}
                update={val => {
                  setRating(val);
                }}
                fullStar={
                  <Icon name={'star'} style={[styles.myStarStyle]} size={45} />
                }
                emptyStar={
                  <Icon
                    name={'star'}
                    style={[styles.myStarStyle, styles.myEmptyStarStyle]}
                    size={45}
                  />
                }
                halfStar={
                  <Icon name={'star'} style={[styles.myStarStyle]} size={45} />
                }
              />
            </View>
            <Button
              title={'Continue'}
              disabled={rating ? false : true}
              onPress={handleContinue}
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default UserExperienceModal;

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
    overflow: 'hidden',
  },
  modalInnerContainer: {
    backgroundColor: 'white',
    maxHeight: '95%',
    minHeight: '90%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent: 'space-around',
    padding: 20,
  },
  myStarStyle: {
    color: R.colors.primary,
    textShadowColor: 'black',
    // textShadowOffset: {width: 0.5, height: 0.5},
    textShadowRadius: 1,
  },
  myEmptyStarStyle: {
    color: '#cccccc',
  },
  labelContainer: {
    flexDirection: 'column',
  },
  label: {
    textAlign: 'center',
    fontSize: R.fontSize.XL,
    color: R.colors.PRIMARI_DARK,
    fontWeight: 'bold',
  },
  feedback: {
    height: 120,
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 20,
    borderColor: 'grey',
    flexDirection: 'column',
    color: R.colors.PRIMARI_DARK,
  },
  input: {
    height: '100%',
    textAlignVertical: 'top',
  },
  imagesContainer: {
    width: '85%',
    alignSelf: 'center',
  },
  charCount: {
    position: 'absolute',
    fontSize: R.fontSize.S,
    bottom: 5,
    right: 10,
  },
  charCountInvalid: {
    position: 'absolute',
    fontSize: R.fontSize.S,
    bottom: 5,
    right: 10,
    color: R.colors.RED,
  },
  invalidText: {
    color: R.colors.RED,
    marginTop: 5,
  },
});
