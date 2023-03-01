import React, {useState, useEffect, useRef, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Button from 'library/commons/Button';
import ScreenWrapper from 'library/wrapper/ScreenWrapper';
import AuthApi from 'datalib/services/authentication.api';
import Loader from 'library/commons/Loader';
import {AuthContext} from '../../../store/contexts/AuthContext';
import {updateUser} from '../../../store/actions/userActions';
import {useSelector, useDispatch} from 'react-redux';
import styles from './styles';
import ScreensNameEnum from '../../../constants/ScreensNameEnum';
import CountDown from 'react-native-countdown-component';
/*
 * This function Component is used to render Otp Screen
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const OtpScreen = props => {
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);
  // const user = useSelector(state => state?.user.user.phone);
  const navigation = useNavigation();
  const [mobileNumber, setMobileNumber] = useState(
    props.route.params.mobileNumber,
  );
  const edit = props.route.params.edit;
  const [otpArray, setOtpArray] = useState(['', '', '', '', '', '']);
  const [isLoading, setLoading] = useState(false);
  const [isNextDisabled, setNextDisabled] = useState(true);
  const [otp, setOTP] = useState();
  const [showTimer, setShowTimer] = useState(false);

  const firstTextInputRef = useRef(null);
  const secondTextInputRef = useRef(null);
  const thirdTextInputRef = useRef(null);
  const fourthTextInputRef = useRef(null);
  const fifthTextInputRef = useRef(null);
  const sixthTextInputRef = useRef(null);

  useEffect(() => {
    const OTP = otpArray.join('');
    setOTP(OTP);

    if (OTP.length === 6) {
      setNextDisabled(false);
    } else {
      setNextDisabled(true);
    }
  }, [otpArray]);
  // const validMobileNumber = () => {
  //   return mobileNumber.length === 10 && !isNaN(parseInt(mobileNumber, 10))
  //     ? true
  //     : false;
  // };

  const resendOtp = async () => {
    await new AuthApi().register({
      phone: mobileNumber,
      userType: 1,
    });
    setShowTimer(true);
    //Message to sent otp
  };

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      if (edit) {
        const res = dispatch(updateUser({phone: mobileNumber}));
        setLoading(false);
        if (res) {
          navigation.navigate(ScreensNameEnum.USER_PROFILE);
        }
      } else {
        const res = await new AuthApi().verifyMobileOtp(mobileNumber, otp);
        if (res) {
          setLoading(false);
          authContext.signIn();
        } else {
          setLoading(false);
          Alert.alert('Error', 'Invalid OTP', [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        }
      }
    } catch (e) {
      setLoading(false);
    }
  };
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

  // only backspace key press event is fired on Android
  // to have consistency, using this event just to detect backspace key press and
  // onOtpChange for other digits press
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
  useEffect(() => {
    if (firstTextInputRef) {
      setTimeout(() => firstTextInputRef.current.focus(), 1000);
    }
  }, []);
  const refCallback = textInputRef => node => {
    textInputRef.current = node;
  };

  return (
    <ScreenWrapper header={true}>
      <View style={styles.container}>
        <View style={styles.inputBlock}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              <Text style={styles.screenTitle}>Verify number</Text>
            </Text>
            <Text style={styles.tagline}>
              <Text>we have sent a code to {mobileNumber}</Text>
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
                  // autoFocus={index === 0 ? true : false}
                  refCallback={refCallback(textInputRef)}
                  key={index}
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
            onPress={handleVerifyOtp}
            disabled={isNextDisabled}
          />
        </View>
      </View>
      <Loader message="9" loading={isLoading} />
    </ScreenWrapper>
  );
};
export default OtpScreen;
