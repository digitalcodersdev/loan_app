import React, {useState, useEffect} from 'react';
import {View, Text, Image, Pressable, Alert} from 'react-native';
import ScreenWrapper from 'library/wrapper/ScreenWrapper';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from 'library/commons/Button';
import Loader from 'library/commons/Loader';
import {useDispatch, useSelector} from 'react-redux';
import {updateUser} from '../../../store/actions/userActions';
import {useNavigation} from '@react-navigation/native';
import {uploadFile} from 'datalib/services/utility.api';
import ScreensNameEnum from '../../../constants/ScreensNameEnum';
import styles from './styles';
/*
 * This function Component is used to render updateProfilePicture Screen
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const UpdateProfilePicture = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userNew = useSelector(state => state?.user?.user);
  const [imageUrl, setImage] = useState(userNew ? userNew.userImage : null);
  const [loading, setLoading] = useState(false);
  const [isNextDisabled, setNextDisabled] = useState(true);
  useEffect(() => {
    if (imageUrl) {
      setNextDisabled(false);
    } else {
      setNextDisabled(true);
    }
  }, [imageUrl]);
  // const uploadPicture = async () => {
  //   const images = await ImagePicker.openPicker({
  //     mediaType: 'photo',
  //     compressImageQuality: 0.4,
  //   });
  //   await handleFileUpload(images);
  // };
  const takePicture = async () => {
    ImagePicker.openCamera({
      width: 400,
      height: 400,
      cropping: true,
      useFrontCamera: true,
    })
      .then(async _image => {
        await handleFileUpload(_image);
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
        Alert.alert('Error', 'Failed to upload image, try again', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      });
  };
  const handleFileUpload = async file => {
    setLoading(true);
    let response = await uploadFile(file);
    setLoading(false);
    if (response && response.status) {
      setImage(response.data.path);
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    dispatch(updateUser({userImage: imageUrl, profileStatus: 3}));
    setLoading(false);
    navigation.reset({
      index: 0,
      routes: [{name: 'DRAWER_ROUTES'}],
    });
  };
  const handleSkipp = () => {
    dispatch(updateUser({userImage: imageUrl, profileStatus: 3}));
    navigation.reset({
      index: 0,
      routes: [{name: 'DRAWER_ROUTES'}],
    });
  };
  return (
    <ScreenWrapper header={true} backEnabled={true} backDisabled={true}>
      <View style={styles.container}>
        <Text style={styles.label}>
          <Text>Profile Picture</Text>
        </Text>
        <View style={styles.inputBlock}>
          {imageUrl ? (
            <Pressable onPress={takePicture}>
              <View style={styles.nameContainer}>
                <Image
                  source={{uri: imageUrl}}
                  style={styles.imageStyle}
                  resizeMode={'contain'}
                />
              </View>
            </Pressable>
          ) : (
            <Pressable onPress={takePicture}>
              <View style={styles.nameContainer}>
                <Icon name="user" size={200} color="#ccc" />
              </View>
            </Pressable>
          )}
          {!imageUrl ? (
            <View style={styles.imgDesc}>
              <Text style={styles.imgText}>
                Make sure you follow these 3 steps:
              </Text>
              <View style={styles.txtPoints}>
                <Text style={styles.points}>
                  1. Your full face must be in the circle
                </Text>
                <Text style={styles.points}>
                  2. The photo needs to be focused, well lit and no glare
                </Text>
                <Text style={styles.points}>
                  3. No pictures of another picture or any alternations
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.imgDesc}>
              {/* <Text style={styles.imgTextAfter}>
                Once you signup your profile picture it cannot be changed
              </Text> */}
            </View>
          )}
        </View>
        <View style={styles.btnContainer}>
          {!imageUrl ? (
            <>
              <View style={styles.takePicture}>
                <Button
                  title={'Skip'}
                  buttonStyle={styles.customButton}
                  onPress={handleSkipp}
                  iconColor={'#000000'}
                  textStyle={{color: '#000'}}
                />
              </View>
              <View style={styles.takePicture}>
                <Button title={'Take Picture'} onPress={takePicture} />
              </View>
            </>
          ) : (
            <>
              <View style={styles.takePicture}>
                <Button
                  title={'Retake'}
                  buttonStyle={styles.customButton}
                  onPress={takePicture}
                  iconColor={'#000000'}
                  textStyle={{color: '#000'}}
                />
              </View>
              <View style={styles.takePicture}>
                <Button
                  title={'Submit'}
                  onPress={handleSubmit}
                  disabled={isNextDisabled}
                />
              </View>
            </>
          )}
        </View>
      </View>
      <Loader message="10" loading={loading} />
    </ScreenWrapper>
  );
};
export default UpdateProfilePicture;
