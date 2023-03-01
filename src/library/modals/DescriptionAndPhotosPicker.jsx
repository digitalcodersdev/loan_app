import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import Modal from 'react-native-modal';
import R from 'resources/R';
import AddPicture from '../commons/AddPicture';
import Button from '../commons/Button';
/*
 * This function is used to create Description And Photos Selection
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const DescriptionAndPhotosPicker = ({
  isVisible,
  onModalClose,
  jobData,
  images,
  description,
}) => {
  const [jobDescription, setDescription] = useState(
    description ? description : '',
  );
  const [imageUrl, setImageUrl] = useState(images ? images : []);
  const onImageChange = img => {
    setImageUrl([...img]);
  };
  // console.log('XXXXXXXXXXXXXx', jobDescription, imageUrl);
  const handleModalClose = () => {
    onModalClose(false);
    jobData && jobData({imageUrl, jobDescription});
  };
  return (
    <Modal
      isVisible={isVisible}
      swipeDirection="down"
      onSwipeComplete={() => onModalClose(false)}
      onBackdropPress={e => {
        onModalClose(false);
      }}
      style={styles.modalContainer}>
      <View style={styles.modalInnerContainer}>
        <View style={styles.imgContainer}>
          <AddPicture
            images={imageUrl}
            onImageChange={onImageChange}
            editable={true}
          />
        </View>
        <View style={styles.feedback}>
          <TextInput
            multiline={true}
            placeholder="Give your job a description so that everyone can know what it's all about!"
            value={jobDescription}
            style={styles.input}
            onChangeText={text => setDescription(text)}
          />
        </View>
        <View style={styles.btncontainer}>
          <View style={styles.btn}>
            <Button
              title={'Cancel'}
              backgroundColor={R.colors.CGRAY}
              textColor={R.colors.PRIMARI_DARK}
              onPress={() => onModalClose(false)}
            />
          </View>
          <View style={styles.btn2}>
            <Button title={'Save'} onPress={handleModalClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DescriptionAndPhotosPicker;

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
    overflow: 'hidden',
  },
  modalInnerContainer: {
    backgroundColor: 'white',
    minHeight: '50%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent: 'space-around',
    padding: 10,
    flexDirection: 'column',
  },
  imgContainer: {
    marginHorizontal: 40,
  },
  btncontainer: {
    flexDirection: 'row',
  },
  btn: {
    width: '45%',
  },
  btn2: {
    width: '45%',
    marginLeft: 20,
  },
});
