import React from 'react';
import {View, Text} from 'react-native';
import {Feather} from '../../../assets';
import PersonalCard from 'library/containers/profileContainers/PersonalCard';
import strings from '../../../strings';
import ScreenWrapper from 'library/wrapper/ScreenWrapper';
import ScreensNameEnum from '../../../constants/ScreensNameEnum';
import styles from './styles';

/*
 * This function is used to create Settings Screen
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */

const SettingsScreen = ({navigation, route}) => {
  const icon = <Feather name={'chevron-right'} size={25} />;
  const linkOptions = [
    {screen: ScreensNameEnum.USER_PROFILE, title: 'Profile'},
    {screen: ScreensNameEnum.NOTIFICATION_SCREEN, title: 'Notifications'},
    {screen: ScreensNameEnum.WORK_WITH_US, title: 'Work With Us'},
    {screen: ScreensNameEnum.LEGAL_SCREEN, title: 'Legal'},
    {screen: ScreensNameEnum.ABOUT_US, title: 'About KindaJobs'},
  ];
  const handleNavigation = screen => {
    navigation.navigate(screen);
  };
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.headerText}>{strings.settings}</Text>
        {linkOptions.map((item, index) => (
          <PersonalCard
            key={index.toString()}
            onPress={() => handleNavigation(item.screen)}
            title={item.title}
            avatar={icon}
          />
        ))}
      </View>
    </ScreenWrapper>
  );
};

export default SettingsScreen;
