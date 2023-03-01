import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import MapInput from 'library/commons/MapInput';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import ScreensNameEnum from '../../../constants/ScreensNameEnum';
import ScreenWrapper from 'library/wrapper/ScreenWrapper';
import Button from 'library/commons/Button';
import {updateUser} from '../../../store/actions/userActions';
import styles from './styles';
/*
 * This function is used to create user Location Screen for Work with us
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const UserLocation = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isNextDisable, setNextDisable] = useState(false);
  const [location, setLocation] = useState(null);
  const [cordinate, setCordinate] = useState(null);

  useEffect(() => {
    if (location && cordinate) {
      setNextDisable(false);
    } else {
      setNextDisable(true);
    }
  }, [location, cordinate]);

  const handleOnSubmit = async () => {
    //api call
    const payload = {
      location: {
        lat: cordinate?.latitude,
        long: cordinate?.longitude,
      },
    };
    await dispatch(updateUser(payload));
    navigation.navigate(ScreensNameEnum.workWithUs);
  };
  const onChangeAddress = addressObj => {
    setLocation(addressObj);
  };
  const onChangeCoords = coords => {
    if (coords) {
    }
    // setLat(coords.latitude);
    // setLong(coords.longitude);
    setCordinate(coords);
  };
  // console.log(lat, long);
  return (
    <ScreenWrapper header={true}>
      <View style={styles.container}>
        <View style={styles.inputBlock}>
          <Text style={styles.label}>
            <Text style={styles.screenTitle}>Location</Text>
          </Text>
          <View style={styles.nameContainer}>
            <MapInput
              defaultAddress={location}
              defaultCoords={cordinate}
              onChangeAddress={onChangeAddress}
              onChangeCoords={onChangeCoords}
            />
          </View>
        </View>
        <View style={styles.btnContainer}>
          <Button
            title={'Continue'}
            onPress={handleOnSubmit}
            disabled={isNextDisable}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};
export default UserLocation;
