import React, {useState} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import SIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import {uploadFile} from 'datalib/services/utility.api';
import {useSelector, useDispatch} from 'react-redux';
import {updateUser} from '../../../store/actions/userActions';
import ScreensNameEnum from '../../../constants/ScreensNameEnum';
import {useNavigation} from '@react-navigation/native';
import ScreenWrapper from 'library/wrapper/ScreenWrapper';
import NavItem from 'library/commons/NavItem';
import Image from 'library/commons/Image';
import styles from './styles';
import ReviewModal from 'library/modals/ReviewModal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import userImg from '../../../resources/images/user.jpg';
/*
 * This function is used to create user Profile Screen
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const UserProfileScreen = ({}) => {
  const navigation = useNavigation();
  const user = useSelector(state => state?.user.user);
  const dispatch = useDispatch();
  const [reviewModalVis, setReviewModal] = useState(false);
  const [imageUrl, setImage] = useState(
    user && user.userImage ? user.userImage : '',
  );
  var phone = maskify(user?.phone);
  function maskify(cc) {
    return cc?.replace(/.(?=.{2})/g, '*');
  }
  const x = user?.phone.slice(0, 2);

  var maskedEmail = '';
  var myemail = user?.email;
  var index = myemail?.lastIndexOf('@');
  var prefix = myemail?.substring(0, index);
  var postfix = myemail?.substring(index);

  var mask = prefix
    ?.split('')
    .map(function (o, i) {
      if (i == 0 || i == index - 1) {
        return o;
      } else {
        return '*';
      }
    })
    .join('');

  maskedEmail = mask + postfix;

  const linkOptions = [
    {
      screen: ScreensNameEnum.EMAIL_SCREEN,
      title: maskedEmail,
    },
    {screen: ScreensNameEnum.UPDATE_MOBILE, title: `${x + phone}`},
    {screen: ScreensNameEnum.DELETE_ACCOUNT, title: 'Delete account'},
  ];
  const icon = <Feather name={'chevron-right'} size={25} />;
  const [loading, setLoading] = useState(false);
  // const handleFileUpload = async file => {
  const handleFileUpload = async file => {
    // setLoadingIndex(index);
    let response = await uploadFile(file);
    if (response && response.status) {
      const res = dispatch(updateUser({userImage: response.data.path}));
      if (res) {
        setImage(response.data.path);
      } else {
        alert('Something went wrong. Please try again later.');
      }
    } else {
    }
  };
  const uploadPicture = async () => {
    await ImagePicker.openCamera({
      width: 400,
      height: 400,
      cropping: true,
      useFrontCamera: true,
    }).then(async _image => await handleFileUpload(_image));
  };
  const handleUpdateName = async () => {
    navigation.navigate(ScreensNameEnum.UPDATE_USER_NAME, {edit: true});
  };
  const handleNavigation = screen => {
    navigation.navigate(screen, {edit: true});
  };
  const onReviewModalClose = () => {
    setReviewModal(false);
  };
  console.log(user);
  return (
    <>
      <ScreenWrapper>
        <View style={styles.container}>
          <Text style={styles.headerText}>Profile</Text>
          <View style={styles.profileContainer}>
            <View styles={styles.imageContainer}>
              <Pressable onPress={uploadPicture}>
                <Image
                  source={imageUrl ? {uri: imageUrl} : userImg}
                  style={styles.image}
                  resizeMode={'contain'}
                />
              </Pressable>
              <Pressable onPress={uploadPicture} style={styles.imageEditBtn}>
                <View style={styles.iconContainer}>
                  <SIcon name="pencil-outline" size={20} />
                </View>
              </Pressable>
            </View>
            <View style={styles.starContainer}>
              <View style={styles.nameContainer}>
                <Text style={styles.name}>
                  {user ? `${user.firstName} ${user.lastName}` : 0}
                </Text>
                <Pressable onPress={handleUpdateName}>
                  <SIcon name="pencil-outline" size={18} />
                </Pressable>
              </View>
              <View style={{paddingVertical: 10}}>
                <View style={styles.buttonContainer}>
                  <View style={styles.buttonInner}>
                    <Icon name={'star'} color="#FFAA00" size={20} />
                    <Text style={styles.starCount}>
                      {user?.rating === 0 ? 5 : user?.rating}
                    </Text>
                    <Pressable onPress={() => setReviewModal(true)}>
                      <Text style={styles.reviewCount}>
                        {user ? user.reviewCounts : 0} Reviews
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.menuContainer}>
            {linkOptions.map((item, index) => (
              <NavItem
                key={index.toString()}
                onPress={() => handleNavigation(item.screen)}
                title={item.title}
                avatar={icon}
              />
            ))}
          </View>
        </View>
      </ScreenWrapper>
      {reviewModalVis && (
        <ReviewModal
          isVisible={reviewModalVis}
          onModalClose={onReviewModalClose}
          userId={user.id}
          userType={'poster'}
        />
      )}
    </>
  );
};

export default UserProfileScreen;
