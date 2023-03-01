/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import ScreenWrapper from 'library/wrapper/ScreenWrapper';
import {View, Image} from 'react-native';
import Button from 'library/commons/Button';
import ScreenNameEnum from '../../../constants/ScreensNameEnum';
import {useSelector} from 'react-redux';
import styles from './styles';
import logoImg from '../../../resources/images/logo.png';
/*
 * This function Component is used to render  splash screen
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const SplashScreen = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state?.user?.user);

  useEffect(() => {
    if (user) {
      if (user.emailVerifyStatus === '0') {
        navigation.navigate(ScreenNameEnum.EMAIL_SCREEN);
      } else if (!user.profileStatus.includes('name')) {
        navigation.navigate(ScreenNameEnum.UPDATE_USER_NAME);
      } else if (!user.profileStatus.includes('picture')) {
        navigation.navigate(ScreenNameEnum.UPDATE_PROFILE_PICTURE);
      } else {
        navigation.reset({
          index: 0,
          routes: [{name: 'DRAWER_ROUTES'}],
        });
      }
    }
  }, [user]);

  const handleOnPress = () => {
    navigation.navigate(ScreenNameEnum.LOGIN_SCREEN, {edit: false});
  };
  return (
    <ScreenWrapper header={false}>
      <View style={styles.container}>
        <Image
          source={logoImg}
          style={styles.imageStyle}
          resizeMode={'contain'}
        />
      </View>
      {!user ? (
        <View style={styles.btncontainer}>
          <Button title={'Get started'} onPress={handleOnPress} />
        </View>
      ) : null}
    </ScreenWrapper>
  );
};
export default SplashScreen;
