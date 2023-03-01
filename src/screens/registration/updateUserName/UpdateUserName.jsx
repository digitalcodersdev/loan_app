import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import Button from 'library/commons/Button';
import ScreenWrapper from 'library/wrapper/ScreenWrapper';
import BTextInput from 'library/commons/BTextInput';
import ScreensNameEnum from '../../../constants/ScreensNameEnum';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {updateUser} from '../../../store/actions/userActions';
import Loader from 'library/commons/Loader';
import styles from './styles';
/*
 * This function Component is used to render update user name screen
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const UpdateUserName = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const inputRef = React.useRef(null);
  let {params} = props.route;
  const userNew = useSelector(state => state?.user?.user);
  const [firstName, setFirstName] = useState(userNew.firstName);
  const [lastName, setLastName] = useState(userNew.lastName);
  const [isNextDisabled, setNextDisabled] = useState(true);
  const [isLoading, setLoading] = useState(false);
  // console.log(props, 'name setLastName');
  useEffect(() => {
    if (firstName && lastName) {
      setNextDisabled(false);
    } else {
      setNextDisabled(true);
    }
  }, [firstName, lastName]);
  const handleOnSubmit = async () => {
    setLoading(true);
    let payload = {
      firstName: firstName,
      lastName: lastName,
    };
    const res = await dispatch(updateUser(payload));

    if (res.meta.requestStatus) {
      setLoading(false);
      if (params?.edit) {
        navigation.goBack();
      } else {
        navigation.navigate(ScreensNameEnum.UPDATE_PROFILE_PICTURE);
      }
    } else {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (inputRef) {
      setTimeout(() => inputRef.current.focus(), 1000);
    }
  }, []);
  return (
    <ScreenWrapper header={params?.edit ? true : false}>
      <View style={styles.container}>
        <View style={styles.inputBlock}>
          <Text style={styles.label}>
            <Text style={styles.screenTitle}>Your Name</Text>
          </Text>
          <View style={styles.nameContainer}>
            <View style={styles.leftName}>
              <BTextInput
                placeholder="First name"
                style={styles.textInput}
                value={firstName}
                onChangeText={text => {
                  setFirstName(text);
                }}
                maxLength={30}
                ref={inputRef}
              />
            </View>
            <View style={styles.rightName}>
              <BTextInput
                style={styles.textInput}
                placeholder="Last name"
                value={lastName}
                onChangeText={text => {
                  setLastName(text);
                }}
                maxLength={30}
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
      <Loader message="11"loading={isLoading} />
    </ScreenWrapper>
  );
};
export default UpdateUserName;
