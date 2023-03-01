/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, Alert} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Button from 'library/commons/Button';
import BTextInput from 'library/commons/BTextInput';
import Loader from 'library/commons/Loader';
import ScreenWrapper from 'library/wrapper/ScreenWrapper';
import ScreenNameEnum from '../../../constants/ScreensNameEnum';
import styles from './styles';
import R from 'resources/R';
import AuthApi from 'datalib/services/authentication.api';
import {updateUser} from '../../../store/actions/userActions';
/*
 * This function Component is used to render Login Screen
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const LogInScreen = props => {
  const navigation = useNavigation();
  const [edit] = useState(props.route.params.edit);
  const [OTP, setOTP] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isNextDisabled, setNextDisabled] = useState(true);

  useEffect(() => {
    if (mobileNumber.length === 10 && validMobileNumber()) {
      setNextDisabled(false);
    } else {
      setNextDisabled(true);
    }
  }, [mobileNumber]);

  const handleOnSubmit = async () => {
    try {
      setLoading(true);
      // if(edit){
      //   const res = await
      // }
      const res = await new AuthApi().register({
        phone: mobileNumber,
        userType: 2,
      });
      if (res) {
        setLoading(false);
        navigation.navigate(ScreenNameEnum.OTP_SCREEN, {mobileNumber, edit});
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const validMobileNumber = () => {
    return mobileNumber.length >= 10 && !isNaN(parseInt(mobileNumber, 10))
      ? true
      : false;
  };
  return (
    <ScreenWrapper header={edit ? true : false}>
      <View style={styles.container}>
        <View style={styles.inputBlock}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              <Text style={styles.screenTitle}>
                {edit ? 'Update' : 'Verify'} your mobile
              </Text>
            </Text>
            <Text style={styles.tagline}>
              <Text>We'll send you a code to verify your phone</Text>
            </Text>
            <View style={styles.mobileContainer}>
              <BTextInput
                autoFocus
                placeholder="Phone Number"
                value={mobileNumber}
                onChangeText={text => {
                  setMobileNumber(text);
                }}
                keyboardType={'phone-pad'}
                maxLength={15}
                style={styles.textInput}
                autoComplete={'tel'}
              />
            </View>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <Button
            title={'Continue'}
            onPress={handleOnSubmit}
            disabled={isNextDisabled}
          />
        </View>
      </View>
      <Loader message="8"loading={isLoading} />
    </ScreenWrapper>
  );
};
export default LogInScreen;
