/* eslint-disable react/jsx-no-duplicate-props */
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import Button from 'library/commons/Button';
import R from 'resources/R';
import ScreenNameEnum from '../../../constants/ScreensNameEnum';
import {useNavigation} from '@react-navigation/native';
import AuthenticationApi from 'datalib/services/user.api';
import ScreenWrapper from 'library/wrapper/ScreenWrapper';
import Loader from 'library/commons/Loader';
import styles from './styles';
import {updateUser} from '../../../store/actions/userActions';
import {useSelector, useDispatch} from 'react-redux';
import {getUserById} from '../../../store/actions/userActions';
import CountDown from 'react-native-countdown-component';
import UserApi from "../../../datalib/services/user.api"
/*
 * This function Component is used to render EmailOtpScreen
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const EmailOtpScreen = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [OTP, setOTP] = useState('');
  const [email] = useState(props.route.params.email || null);
  const edit = props.route.params?.edit;
  const [otpArray, setOtpArray] = useState(['', '', '', '', '', '']);
  const [isLoading, setLoading] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [isNextDisabled, setNextDisabled] = useState(true);
  const firstTextInputRef = useRef(null);
  const secondTextInputRef = useRef(null);
  const thirdTextInputRef = useRef(null);
  const fourthTextInputRef = useRef(null);
  const fifthTextInputRef = useRef(null);
  const sixthTextInputRef = useRef(null);
  useEffect(() => {
    const res = otpArray.join('');
    setOTP(res);
    if (res.length === 6) {
      setNextDisabled(false);
    } else {
      setNextDisabled(true);
    }
  }, [otpArray]);
  useEffect(() => {
    if (firstTextInputRef) {
      setTimeout(() => firstTextInputRef.current.focus(), 1000);
    }
  }, []);
  const onOtpChange = index => {
    return value => {
      if (isNaN(Number(value))) {
        // do nothing when a non digit is pressed
        return;
      }
      const otpArrayCopy = otpArray.concat();
      otpArrayCopy[index] = value;
      setOtpArray(otpArrayCopy);

      // auto focus to next InputText if value is not blank
      if (value !== '') {
        if (index === 0) {
          secondTextInputRef.current.focus();
        } else if (index === 1) {
          thirdTextInputRef.current.focus();
        } else if (index === 2) {
          fourthTextInputRef.current.focus();
        } else if (index === 3) {
          fifthTextInputRef.current.focus();
        } else if (index === 4) {
          sixthTextInputRef.current.focus();
        }
      }
    };
  };
  const onOtpKeyPress = index => {
    return ({nativeEvent: {key: value}}) => {
      // auto focus to previous InputText if value is blank and existing value is also blank
      if (value === 'Backspace' && otpArray[index] === '') {
        if (index === 1) {
          firstTextInputRef.current.focus();
        } else if (index === 2) {
          secondTextInputRef.current.focus();
        } else if (index === 3) {
          thirdTextInputRef.current.focus();
        } else if (index === 4) {
          fourthTextInputRef.current.focus();
        } else if (index === 5) {
          fifthTextInputRef.current.focus();
        }
        /*
         * clear the focused text box as well only on Android because on mweb onOtpChange will be also called
         * doing this thing for us
         * todo check this behaviour on ios
         */
        if (index > 0) {
          const otpArrayCopy = otpArray.concat();
          otpArrayCopy[index - 1] = ''; // clear the previous box which will be in focus
          setOtpArray(otpArrayCopy);
        }
      }
    };
  };
  const refCallback = textInputRef => node => {
    textInputRef.current = node;
  };
  const handleOnSubmit = async () => {
    setLoading(true);
    if (edit) {
      // const res = dispatch(updateUser({email}));
      const res = await new AuthenticationApi().verifyEmailOTP(email, OTP);
      setLoading(false);
      if (res) {
        dispatch(getUserById());
        navigation.navigate(ScreenNameEnum.USER_PROFILE);
      } else {
        setLoading(false);
        Alert.alert('Error', 'Invalid OTP', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
        setLoading(false);
      }
    } else {
      //api call
      const res = await new AuthenticationApi().verifyEmailOTP(email, OTP);
      if (res) {
        setLoading(false);
        navigation.navigate(ScreenNameEnum.UPDATE_USER_NAME, {edit: false});
      } else {
        setLoading(false);
        Alert.alert('Error', 'Invalid OTP', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
        setLoading(false);
      }
    }
    setLoading(false);
  };

  const resendOtp = async () => {
    setLoading(true);
    const res = await new UserApi().generateEmailOtp(email);
    if (res) {
      setLoading(false);
      setShowTimer(true);
    } else {
      setError('Error in sending email');
      setLoading(false);
    }
  };
  // const resendOtp = async () => {
  //   await new AuthApi().generateEmailOtp({
  //     phone: mobileNumber,
  //     userType: 1,
  //   });

  //   //Message to sent otp
  // };
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.inputBlock}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              <Text style={styles.screenTitle}>Verify email</Text>
            </Text>
            <Text style={styles.tagline}>
              <Text>we sent a code to {email}</Text>
            </Text>
            <View style={styles.otpContainer}>
              {[
                firstTextInputRef,
                secondTextInputRef,
                thirdTextInputRef,
                fourthTextInputRef,
                fifthTextInputRef,
                sixthTextInputRef,
              ].map((textInputRef, index) => (
                <TextInput
                  style={styles.otpInput}
                  ref={textInputRef}
                  value={otpArray[index]}
                  onKeyPress={onOtpKeyPress(index)}
                  onChangeText={onOtpChange(index)}
                  keyboardType={'numeric'}
                  maxLength={1}
                  refCallback={refCallback(textInputRef)}
                  key={index}
                  placeholder={`0`}
                  placeholderTextColor={'#7D7D7D'}
                />
              ))}
            </View>
            <View style={styles.resetContainer}>
              {!showTimer ? (
                <Pressable onPress={resendOtp}>
                  <Text style={styles.pressableText}>Resend code</Text>
                </Pressable>
              ) : (
                <>
                  <Text style={styles.pressableTextDisabled}>
                    Resend code in
                  </Text>
                  <CountDown
                    until={90}
                    onFinish={() => setShowTimer(false)}
                    // onPress={() => alert('hello')}
                    size={15}
                    timeToShow={['M', 'S']}
                    digitStyle={styles.timer}
                  />
                </>
              )}
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
      <Loader message="7" loading={isLoading} />
    </ScreenWrapper>
  );
};
export default EmailOtpScreen;
