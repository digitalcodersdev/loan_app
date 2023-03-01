/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useContext} from 'react';
import {View, Text, Alert, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenWrapper from 'library/wrapper/ScreenWrapper';
import R from 'resources/R';
import Button from 'library/commons/Button';
import ConfirmationModal from 'library/modals/ConfirmationModal';
import FeedbackModal from 'library/modals/FeedbackModal';
import {useNavigation} from '@react-navigation/native';
import ScreensNameEnum from '../../../constants/ScreensNameEnum';
import styles from './styles';
import {useSelector, useDispatch} from 'react-redux';
import UserApi from '../../../datalib/services/user.api';
import {restoreBankStore} from '../../../store/slices/user/bank.slice';
import {restoreJobStore} from '../../../store/slices/job/job.slice';
import {restoreUserStore} from '../../../store/slices/user/user.slice';
import {AuthContext} from '../../../store/contexts/AuthContext';
/*
 * This function is used to create delete Account Screen
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const DeleteAccountScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);
  const user = useSelector(state => state.user?.user);
  const [isConfirmModal, setConfirmModal] = useState(false);
  const [isFeedbackModal, setFeedbackModal] = useState(false);
  const [isNextDisabled, setNextDisabled] = useState(false);
  const [fields, setFields] = useState({
    phone: '',
    email: '',
  });
  const [validEmail, setValidEmail] = useState(false);
  const [validPhone, setValidPhone] = useState(false);
  const onDeletePress = () => {
    const email = validateEmail(fields.email);
    const phone = validatePhone(fields.phone);
    if (email && phone) {
      setFeedbackModal(true);
    }
  };
  function validateEmail(_email) {
    if (_email === user?.email) {
      setValidEmail(false);
      return true;
    } else {
      setValidEmail(true);
      return false;
    }
  }
  function validatePhone(_phone) {
    if (_phone === user?.phone) {
      setValidPhone(false);
      return true;
    } else {
      setValidPhone(true);
      return false;
    }
  }
  const onChangeText = index => value => {
    setFields({
      phone: index == 0 ? value : fields.phone,
      email: index == 1 ? value : fields.email,
    });
  };

  const onFeedbackModalClose = () => {
    setFeedbackModal(false);
  };
  const handleConfirmationModalClose = async data => {
    if (data === 'cancel') {
      setConfirmModal(false);
      setFeedbackModal(false);
    } else if (data === 'confirm') {
      const res = new UserApi().deleteAccount();
      if (res) {
        await dispatch(restoreUserStore());
        await dispatch(restoreBankStore());
        await dispatch(restoreJobStore());
        authContext.signOut();
      } else {
        Alert('Something went wrong. Please try again later...');
      }
    }
    setConfirmModal(false);
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View>
          <Text
            style={{
              fontSize: 22,
              fontFamily: R.fonts.Bold,
              textAlign: 'center',
              color: R.colors.PRIMARI_DARK,
            }}>
            Delete Account
          </Text>
          <View style={styles.detailContainer}>
            <Text style={styles.lineItemRed}>
              By deleting your account you will:
            </Text>
            <Text style={styles.lineItem}>
              - Delete all information and profile details
            </Text>
            <Text style={styles.lineItem}>- Delete all job history</Text>
            <Text style={styles.lineItem}>
              - Delete the ability to post jobs
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderRadius: 30,
              borderColor: '#ccc',
              marginBottom: 10,
            }}>
            <TextInput
              autoFocus
              maxLength={10}
              onChangeText={onChangeText(0)}
              value={`${fields.phone}`}
              keyboardType={'numeric'}
              style={{
                // marginTop: 24,
                width: '100%',
                paddingHorizontal: 10,
                color: R.colors.PRIMARI_DARK,
              }}
              headingStyle={{fontSize: 14}}
              placeholder={'Enter your phone'}
            />
            <Icon
              name={'phone-outline'}
              size={22}
              color={R.colors.PRIMARI_DARK}
              style={{
                borderRadius: 30,
                right: 20,
                color: R.colors.PRIMARI_DARK,
                zIndex: 999,
                position: 'absolute',
              }}
            />
          </View>
          <Text style={{color: R.colors.RED}}>
            {validPhone
              ? '  Enter the phone number associated with this account'
              : null}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderRadius: 30,
              borderColor: '#ccc',
            }}>
            <TextInput
              onChangeText={onChangeText(1)}
              value={`${fields.email}`}
              keyboardType={'email-address'}
              style={{
                width: '100%',
                paddingHorizontal: 10,
                color: R.colors.PRIMARI_DARK,
              }}
              headingStyle={{fontSize: 14}}
              placeholder={'Email'}
            />
            <Icon
              name={'email-outline'}
              size={22}
              color={R.colors.PRIMARI_DARK}
              style={{
                borderRadius: 30,
                right: 20,
                color: R.colors.PRIMARI_DARK,
                zIndex: 999,
                position: 'absolute',
              }}
            />
          </View>
          <Text
            style={{
              color: R.colors.RED,
              fontSize: R.fontSize.M,
            }}>
            {validEmail
              ? '  Enter the email address associated with this account'
              : null}
          </Text>

          {/* {!valid.phone ? (
            <Text style={styles.errortext}>
              Enter the phone number associated with this account
            </Text>
          ) : null} */}
          {/* <TextInput
            onChangeText={onChangeText(1)}
            value={`${fields.email}`}
            keyboardType={'email-address'}
            style={{
              marginTop: 24,
              width: '100%',
              borderRadius: 30,
              paddingHorizontal: 10,
            }}
            rightIcon={<Icon name={'email'} size={22} color={"#000"} />}
            headingStyle={{fontSize: 14}}
            placeholder={'Email'}
          /> */}
          {/* {!valid.email ? (
            <Text style={styles.errortext}>
              Enter the email address associated with this account
            </Text>
          ) : null} */}
          <View style={styles.changeInstedContainer}>
            <View style={styles.btn1}>
              <Button
                title={'Change Number Instead'}
                textStyle={{fontSize: R.fontSize.S}}
                backgroundColor={R.colors.LIGHTBLUE}
                onPress={() =>
                  navigation.navigate(ScreensNameEnum.UPDATE_MOBILE, {
                    edit: true,
                  })
                }
              />
            </View>

            <View style={styles.btn1}>
              <Button
                title={'Change Email instead'}
                textStyle={{fontSize: R.fontSize.S}}
                backgroundColor={R.colors.LIGHTBLUE}
                onPress={() =>
                  navigation.navigate(ScreensNameEnum.EMAIL_SCREEN, {
                    edit: true,
                  })
                }
              />
            </View>
          </View>
        </View>

        <View style={styles.deleteButton}>
          <Button
            onPress={onDeletePress}
            backgroundColor={R.colors.RED}
            title={'Delete Account'}
          />
        </View>
      </View>
      <ConfirmationModal
        isVisible={isConfirmModal}
        // confirmationText={'Are you sure you want to delete your account?'}
        onModalClose={() => setFeedbackModal(true)}
        onConfirm={handleConfirmationModalClose}>
        <View style={styles.childerenContainer}>
          <Text style={styles.childrenTextRed}>
            This action is cannot be undone!
          </Text>
          <Text style={styles.childrenText}>
            If you want to come back again
          </Text>
          <Text style={styles.childrenTextBold}>
            your info will not be recovered.
          </Text>
        </View>
      </ConfirmationModal>
      <FeedbackModal
        isVisible={isFeedbackModal}
        onModalClose={onFeedbackModalClose}
        onFeedback={setConfirmModal}
      />
    </ScreenWrapper>
  );
};

export default DeleteAccountScreen;
