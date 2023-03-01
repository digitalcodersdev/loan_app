import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import R from 'resources/R';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../commons/Button';
import BLocationInput from 'library/commons/BLocationInput';
import OptionPickerModal from './OptionPickerModal';
import DescriptionAndPhotosPicker from './DescriptionAndPhotosPicker';
import AddCardModal from './AddCardModal';
import PostAndPaymentMethod from './PostAndPaymentMethod';
import {createJob, updateJob} from '../../store/actions/jobActions';
import {useDispatch, useSelector} from 'react-redux';
import PaymenStatusModal from 'library/modals/PaymentStatusModal';
import {selectAllJob} from '../../store/slices/job/job.slice';
import {getMyJobs} from '../../store/actions/jobActions';
import {currentUserSelector} from '../../store/slices/user/user.slice';
/*
 * This function is used to create job Post Modal
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const JobPostModal = ({
  isVisible,
  onModalClose,
  onConfirm,
  skill,
  edit = false,
  editJob,
}) => {
  let imgs;
  if (edit) {
    if (editJob.images) {
      imgs = editJob.images.split(',');
    }
  }
  const user = useSelector(currentUserSelector);
  const allJobs = useSelector(selectAllJob);
  const dispatch = useDispatch();
  const [location, setLocation] = useState(
    edit
      ? {
          coords: {
            latitude: editJob?.location?.lat,
            longitude: editJob?.location?.long,
          },
        }
      : null,
  );
  const [address, setAddress] = useState(edit ? editJob.jobAddress : '');
  const [priceAmount, setPriceAmount] = useState(edit ? editJob.totalPrice : 0);
  const [optionIsVisible, setOptionModalClose] = useState(false);
  const [editLocation, setEditLocation] = useState(false);
  const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);
  const [addCardModalVisible, setAddCardModalVisible] = useState(false);
  const [images, setImages] = useState(edit ? imgs : []);
  const [error, setError] = useState({});
  const [postAndPaymentMethod, setPostAndPaymentMethod] = useState(false);
  const [selectedOption, setSelectedOptions] = useState(null);
  const [selectedSkills, setSkill] = useState(edit ? editJob.skills : []);
  const [paymentStatusVisible, setPaymentStatusVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(
    edit ? editJob.paymentMethod : null,
  );
  const [currentLocation, setCurrentLocation] = useState(
    edit ? editJob.currentLocation : '1',
  );
  const [description, setDescription] = useState(
    edit ? editJob.description : '',
  );
  useEffect(() => {
    if (user) {
      dispatch(getMyJobs(user.id));
    }
  }, []);
  useEffect(() => {
    if (edit) {
      const sSkills = editJob?.skills?.map(item => item.skillId);
      let formattedSkill = [];
      skill.skill?.forEach(_item => {
        _item.skill &&
          _item.skill?.forEach(child => {
            // console.log( sSkills,child);
            if (sSkills?.includes(child.id)) {
              formattedSkill.push({
                skillId: child.id,
                parentSkill: child.parentId,
                price: child.price,
                title: child.title,
              });
            }
          });
      });

      setSkill([
        ...formattedSkill,
        {
          skillId: skill.id,
          parentSkill: null,
          price: skill.price,
          title: skill.title,
        },
      ]);
      setPriceAmount(editJob.totalPrice);
    } else {
      setSkill([
        {
          skillId: skill.id,
          parentSkill: null,
          price: skill.price,
          title: skill.title,
        },
      ]);
    }
  }, []);

  useEffect(() => {
    const totalPrice = selectedSkills?.reduce(function (
      accumulator,
      currentValue,
    ) {
      return accumulator + currentValue.price;
    },
    0);
    console.log(totalPrice, selectedSkills);
    setPriceAmount(totalPrice);
  }, [selectedSkills]);
  const onValueChange = skillsObj => {
    const filteredSkill = selectedSkills.filter(_item => {
      return _item.parentSkill != selectedOption.id;
    });
    setSkill([...filteredSkill, ...skillsObj]);
  };

  const OnDescriptiontModalClose = () => {
    setDescriptionModalVisible(false);
  };
  const onAddCardModalClose = () => {
    setAddCardModalVisible(false);
  };
  const onPostAndPaymentModalClose = paymentMethodId => {
    jobCreate(paymentMethodId);
  };
  const handleCreateJob = () => {
    if (validateJob()) {
      setPostAndPaymentMethod(true);
    }
  };
  const handleImagesAndDescription = ({imageUrl, jobDescription}) => {
    setImages([...imageUrl]);
    setDescription(jobDescription);
  };
  const onPaymentStatusModalClose = data => {
    setPaymentStatusVisible(false);
    if (data === 'change-card') {
      setPaymentStatusVisible(false);
      setPaymentMethod(true);
    } else {
      onModalClose();
      onConfirm && onConfirm();
    }
  };

  const jobCreate = async paymentMethodId => {
    if (validateJob()) {
      let job = {
        price: priceAmount,
        description: description,
        skills: selectedSkills,
        priorityPosting: false,
        duration: 3,
        durationUnit: 'hour',
        jobAddress: address,
        toolsRequired: true,
        currentLocation: currentLocation,
        images: images,
        isFirst: allJobs.length,
        paymentMethod: edit ? editJob.paymentMethod : paymentMethodId,
        location: {
          lat: location.coords.latitude,
          long: location.coords.longitude,
        },
      };
      // console.log(job);
      if (edit) {
        const update = dispatch(updateJob({job: job, jobId: editJob.id}));
        if (update) {
          onModalClose(false);
        }
      } else {
        const res = dispatch(createJob({job, skill}));
        if (res) {
          setPaymentStatusVisible(true);
          setTimeout(() => onPaymentStatusModalClose(false), 3000);
        }
      }
    }
  };
  const validateJob = () => {
    let valid = true;
    let error = {};
    if (!address || !location.coords) {
      error['location'] = 'Location is required';
      valid = false;
    }
    skill.skill.forEach(_item => {
      if (selectedSkills.filter(s => s.parentSkill === _item.id).length <= 0) {
        error[_item.id] = `${_item.title} is required`;
        valid = false;
      }
    });
    console.log('error', error);
    setError(error);
    return valid;
  };
  const getSelectedSkillTitle = (parent, _selectedSkills) => {
    let title = '';
    title = _selectedSkills
      ?.filter(item => item.parentSkill === parent)
      .map(item => item.title)
      .join(', ');
    return title;
  };

  return (
    <>
      <Modal
        isVisible={isVisible}
        swipeDirection="down"
        onSwipeComplete={e => {
          onModalClose();
        }}
        backdropOpacity={0.2}
        style={styles.modalContainer}>
        <View style={styles.modalInnerContainer}>
          <View>
            <View style={styles.modelButton}></View>
            <View style={styles.locationContainer}>
              {!edit || editLocation || editJob?.currentLocation === '1' ? (
                <BLocationInput
                  defaultAddress={null}
                  defaultCoords={null}
                  onChangeAddress={setAddress}
                  onChangeCoords={location => {
                    setLocation(location);
                    setCurrentLocation(location.locationType ? '1' : '0');
                  }}
                  edit={edit}
                />
              ) : editJob.currentLocation === '0' ? (
                <View>
                  <Text style={styles.locationHeaderext}>Job Location</Text>
                  <TouchableOpacity onPress={() => setEditLocation(true)}>
                    <View style={{flexDirection: 'row'}}>
                      <View>
                        <Text style={styles.text1}>{editJob.jobAddress}</Text>
                      </View>
                      <View>
                        <Icon name="edit" size={20} color={R.colors.DARKGRAY} />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : null}
              {/* {!editJob?.currentLocation ? (
                <View>
                  <Text style={styles.locationHeaderext}>Job Location</Text>
                  <TouchableOpacity onPress={() => setEditLocation(true)}>
                    <View style={{flexDirection: 'row'}}>
                      <View>
                        <Text style={styles.text1}>{editJob.jobAddress}</Text>
                      </View>
                      <View>
                        <Icon name="edit" size={20} color={R.colors.DARKGRAY} />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : null} */}
            </View>
            <View style={styles.details}>
              <Pressable style={styles.textContainer}>
                <Text style={styles.skillText}>{skill.title} </Text>
              </Pressable>
              {skill?.skill?.map((item, index) => (
                <View style={styles.skillContainer} id={`${item.id}_skill`}>
                  <TouchableOpacity
                    style={styles.textContainer}
                    onPress={() => {
                      setSelectedOptions(item);
                      setOptionModalClose(true);
                    }}>
                    <Text
                      style={error[item.id] ? styles.textError : styles.text1}>
                      {item.title}
                    </Text>
                    <Text>
                      {getSelectedSkillTitle(item.id, selectedSkills)}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity
                style={styles.textContainer}
                onPress={() => setDescriptionModalVisible(true)}>
                <Text style={styles.text1}>Description & Photos </Text>
              </TouchableOpacity>
              <Text style={styles.textDescription}>{description}</Text>
            </View>
          </View>

          {images && (
            <View style={styles.imageContainer}>
              {images.map(item => (
                <Image source={{uri: item}} style={styles.image} />
              ))}
            </View>
          )}
          <View>
            <View style={styles.innerLast}>
              <Text style={styles.fees}> Approximate Price </Text>
              <Text style={styles.fees}>
                ${parseFloat(priceAmount ? priceAmount : 0).toFixed(2)}
              </Text>
            </View>
            {!edit ? (
              <View style={styles.final}>
                <View style={styles.buttons}>
                  <Button
                    title={'Cancel'}
                    onPress={() => onModalClose()}
                    backgroundColor={R.colors.PRIMARY_LIGHT}
                    textColor={R.colors.SECONDRY_DARK}
                  />
                </View>
                <View style={styles.buttons}>
                  <Button title={'Submit'} onPress={handleCreateJob} />
                </View>
              </View>
            ) : (
              <View style={styles.final}>
                <View style={styles.buttons}>
                  <Button
                    title={'Cancel'}
                    onPress={() => onModalClose()}
                    backgroundColor={R.colors.PRIMARY_LIGHT}
                    textColor={R.colors.SECONDRY_DARK}
                  />
                </View>
                <View style={styles.buttons}>
                  <Button title={'Save'} onPress={jobCreate} />
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>

      {selectedOption && (
        <OptionPickerModal
          isVisible={optionIsVisible}
          onModalClose={setOptionModalClose}
          options={selectedOption.skill}
          isMultiSelect={selectedOption.multi_select}
          defultValues={[]}
          onValueChange={onValueChange}
        />
      )}
      <DescriptionAndPhotosPicker
        isVisible={descriptionModalVisible}
        onModalClose={OnDescriptiontModalClose}
        jobData={handleImagesAndDescription}
        images={images}
        description={description}
      />
      {addCardModalVisible && (
        <AddCardModal
          isVisible={addCardModalVisible}
          onModalClose={onAddCardModalClose}
        />
      )}
      {postAndPaymentMethod && (
        <PostAndPaymentMethod
          isVisible={postAndPaymentMethod}
          onModalClose={() => setPostAndPaymentMethod(false)}
          onConfirm={onPostAndPaymentModalClose}
          title={skill.title}
          price={priceAmount}
        />
      )}
      {paymentStatusVisible && (
        <PaymenStatusModal
          isVisible={paymentStatusVisible}
          onModalClose={onPaymentStatusModalClose}
          page={'success'}
          // cardDetails={card}
        />
      )}
    </>
  );
};

export default JobPostModal;

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
    overflow: 'hidden',
  },
  modalInnerContainer: {
    backgroundColor: 'white',
    maxHeight: '90%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    minHeight: '80%',
    justifyContent: 'space-between',
    padding: 10,
  },
  details: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  innerLast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    alignSelf: 'center',
  },
  fees: {
    color: R.colors.PRIMARI_DARK,
    textAlign: 'center',
    fontFamily: R.fonts.Bold,
    marginBottom: 20,
  },
  final: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttons: {
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  text1: {
    color: R.colors.black,
    fontFamily: R.fonts.Semi_Bold,
    marginBottom: 3,
  },
  textError: {
    color: R.colors.RED,
    // fontFamily: R.fonts.Bold,
  },
  textContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'column',
  },
  skillText: {
    color: R.colors.PRIMARI_DARK,
    fontSize: R.fontSize.L,
    fontFamily: R.fonts.Bold,
  },
  locationHeaderext: {
    color: R.colors.PRIMARI_DARK,
    fontSize: R.fontSize.M,
    fontFamily: R.fonts.Bold,
  },
  locationContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  modelButton: {
    alignSelf: 'center',
    marginVertical: 0,
    width: 70,
    height: 4,
    backgroundColor: R.colors.LIGHTGRAY_1,
    borderRadius: 10,
    marginBottom: 30,
  },
  skillContainer: {},
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textDescription: {
    textAlign: 'left',
    marginHorizontal: 20,
    color: R.colors.PRIMARI_DARK,
    fontSize: R.fontSize.S,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 100,
  },
});
