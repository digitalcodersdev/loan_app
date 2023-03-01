import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import Button from 'library/commons/Button';
import ScreenWrapper from 'library/wrapper/ScreenWrapper';
import {useNavigation} from '@react-navigation/native';
import BTextInput from 'library/commons/BTextInput';
import ScreenNameEnum from '../../../constants/ScreensNameEnum';
import AuthenticationApi from 'datalib/services/user.api';
import Loader from 'library/commons/Loader';
import styles from './styles';
/*
 * This function Component is used to render Verify email otp screen
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const VerifyEmailScreen = props => {
  const navigation = useNavigation();
  const inputRef = React.useRef(null);

  const [email, setEmail] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isNextDisable, setNextDisable] = useState(true);
  const edit = props.route.params?.edit;
  const handleGenerateOtp = async () => {
    setLoading(true);
    const res = await new AuthenticationApi().generateEmailOtp(email);
    if (res) {
      setLoading(false);
      navigation.navigate(ScreenNameEnum.EMAIL_OTP_SCREEN, {email, edit});
    } else {
      setError('Error in sending email');
      setLoading(false);
    }
  };
  useEffect(() => {
    if (validateEmail(email)) {
      setNextDisable(false);
    } else {
      setNextDisable(true);
    }
  }, [email]);
  function validateEmail(_email) {
    return (
      _email &&
      _email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
    );
  }
  useEffect(() => {
    if (inputRef) {
      setTimeout(() => inputRef.current.focus(), 1000);
    }
  }, []);
  console.log(edit);
  return (
    <ScreenWrapper
      header={edit ? true : false}
      backEnabled={edit ? false : true}
      backDisabled={edit ? false : true}>
      <View style={styles.container}>
        <View style={styles.inputBlock}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              <Text style={styles.screenTitle}>
                {edit ? 'Update your email' : 'Email'}
              </Text>
            </Text>
            <Text style={styles.tagline}>
              <Text>We'll send you a code to verify your email</Text>
            </Text>
            <View style={styles.emailContainer}>
              <BTextInput
                placeholder="Email address"
                value={email}
                onChangeText={text => {
                  setEmail(text);
                }}
                autoComplete={'email'}
                style={styles.textInput}
                ref={inputRef}
              />
              {error && <Text style={styles.error}>{error}</Text>}
            </View>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <Button
            title={'Continue'}
            onPress={handleGenerateOtp}
            disabled={isNextDisable}
          />
        </View>
      </View>
      <Loader message="12" loading={isLoading} />
    </ScreenWrapper>
  );
};
export default VerifyEmailScreen;
