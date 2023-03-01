import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Image,
  ActivityIndicator,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import R from 'resources/R';
import {uploadFile} from 'datalib/services/utility.api';
/*
 * This function is used to select image and then upload
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const AddPicture = ({images = [], onImageChange, editable}) => {
  const [imagePlaces] = useState([1, 2, 3]);
  const [imageUrl, setImage] = useState(images ? images : []);
  const [loading, setLoading] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState(null);
  const takePicture = async index => {
    ImagePicker.openCamera({
      width: 400,
      height: 400,
      cropping: true,
    }).then(async _image => await handleFileUpload(_image, index));
  };
  // useEffect(() => {
  //   setImage(images);
  // }, []);
  const handleFileUpload = async (file, index) => {
    setLoadingIndex(index);
    let response = await uploadFile(file);
    if (response && response.status) {
      imageUrl[index] = response.data.path;
      setImage([...imageUrl]);
      onImageChange(imageUrl);
    } else {
    }
  };
  const handleRemoveImage = index => {
    imageUrl.splice(index, 1);
    setImage([...imageUrl]);
    setLoadingIndex(null);
  };
  return (
    <View style={styles.bottomContainer}>
      {imagePlaces.map((item, index) => (
        <Pressable
          key={`image_${index}`}
          style={styles.imageStyle}
          onPress={() => {
            if (editable && editable === true) {
              takePicture(index);
            }
          }}>
          {imageUrl?.[index] ? (
            <>
              {editable ? (
                <Pressable
                  style={styles.cancelContainer}
                  onPress={() => handleRemoveImage(index)}>
                  <Icon
                    name="close"
                    size={25}
                    color={R.colors.PRIMARI_DARK}
                    style={styles.cancel}
                  />
                </Pressable>
              ) : null}
              {!editable && imageUrl[index] === null ? (
                <>
                  <Text style={styles.imgText}>Add Picture</Text>
                  <Icon
                    name="camera"
                    size={25}
                    color="grey"
                    style={styles.icon}
                  />
                </>
              ) : (
                <Image
                  key={index}
                  source={{uri: imageUrl[index]}}
                  style={styles.imageStyle}
                />
              )}
            </>
          ) : (
            <View key={index} style={styles.imgL}>
              {!loading && index !== loadingIndex ? (
                <>
                  <Text style={styles.imgText}>Add Picture</Text>
                  <Icon
                    name="camera"
                    size={25}
                    color="grey"
                    style={styles.icon}
                  />
                </>
              ) : (
                <ActivityIndicator size="large" color={'black'} />
              )}
            </View>
          )}
        </Pressable>
      ))}
    </View>
  );
};
export default AddPicture;
const styles = StyleSheet.create({
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imgText: {
    paddingTop: 25,
    fontFamily: R.fonts.Regular,
    fontSize: R.fontSize.XS,
    textAlign: 'center',
  },
  imageStyle: {
    height: 80,
    width: 80,
    borderRadius: 120,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  icon: {alignSelf: 'center', marginTop: 10},
  cancelContainer: {
    backgroundColor: '#FFAA00',
    width: '35%',
    height: '35%',
    position: 'absolute',
    zIndex: 999,
    alignSelf: 'flex-end',
    alignItems: 'center',
    borderRadius: 20,
  },
  cancel: {alignSelf: 'center'},
});
