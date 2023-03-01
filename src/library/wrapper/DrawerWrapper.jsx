import React, {useContext} from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ScreensNameEnum from '../../constants/ScreensNameEnum';
import drawerRoutes from '../../constants/drawerRoutes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import R from 'resources/R';
import {useSelector} from 'react-redux';
import {AuthContext} from '../../store/contexts/AuthContext';
import {currentUserSelector} from '../../store/slices/user/user.slice';
import feedbackImg from '../../assets/images/Feedback.png';
import workImg from '../../assets/images/work.png';

/*
 * This function is used to create wrapper for drawer
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const DrawerWrapper = props => {
  const navigation = useNavigation();
  const authContext = useContext(AuthContext);
  const handleOnPress = screen => {
    navigation.navigate(screen);
  };
  const user = useSelector(state => state?.user.user);

  const handleLogout = () => {
    navigation.navigate(ScreensNameEnum.WORK_WITH_US);
  };
  const handleFeedback = () => {
    navigation.navigate(ScreensNameEnum.APP_FEEDBACK);
  };
  const handleProfile = () => {
    navigation.navigate(ScreensNameEnum.USER_PROFILE);
  };
  return (
    <DrawerContentScrollView {...props}>
      <TouchableOpacity onPress={handleProfile}>
        <View style={styles.loginSection}>
          <View>
            <Text style={styles.userMsg}>
              {user && user.firstName ? user?.firstName : user?.phone}
            </Text>
            <Text style={styles.profileText}>View Profile</Text>
          </View>
          <View>
            {user?.userImage ? (
              <Image
                source={{uri: user.userImage}}
                style={styles.image}
                resizeMode={'cover'}
              />
            ) : (
              <Icon color={'#ccc'} size={40} name={'account-circle'} />
            )}
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.drawerList}>
        {drawerRoutes.map((item, index) => (
          <DrawerItem
            key={`${index}_routes`}
            icon={({color}) => (
              <Icon color={item.color} size={25} name={item.icon} />
            )}
            label={item.title}
            onPress={() => handleOnPress(item.screen)}
            style={styles.drawerItem}
            labelStyle={styles.drawerItemLabel}
          />
        ))}
      </View>
      <View style={styles.lastItem}>
        <DrawerItem
          label={'Work With Us'}
          onPress={handleLogout}
          style={styles.drawerItem}
          labelStyle={styles.drawerItemLabel}
          icon={({color}) => (
            <View style={styles.logo}>
              <Image
                source={workImg}
                style={styles.image}
                resizeMode={'contain'}
              />
            </View>
          )}
        />
        <DrawerItem
          label={'Feedback'}
          onPress={handleFeedback}
          style={styles.drawerItem}
          labelStyle={styles.drawerItemLabel}
          icon={({color}) => (
            <View style={styles.logo}>
              <Image
                source={feedbackImg}
                style={styles.image}
                resizeMode={'contain'}
              />
            </View>
          )}
        />
      </View>
    </DrawerContentScrollView>
  );
};
export default DrawerWrapper;
const styles = StyleSheet.create({
  loginSection: {
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
  },
  lastItem: {
    margin: -10,
    marginTop: 10,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  loginBtn: {width: 100},
  drawerList: {
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    paddingVertical: 10,
  },
  drawerItem: {
    marginVertical: 0,
    paddingVertical: 0,
  },
  drawerItemLabel: {
    marginVertical: 0,
    paddingVertical: 0,
    fontFamily: R.fonts.Regular,
  },
  userMsg: {
    fontFamily: R.fonts.Medium,
    fontSize: 18,
  },
  profileText: {
    fontFamily: R.fonts.Regular,
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.52)',
  },
});
