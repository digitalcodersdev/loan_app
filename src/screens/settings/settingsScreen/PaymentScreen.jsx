import React from 'react';
import {View, Text} from 'react-native';
import {Feather} from '../../../assets';
import PersonalCard from 'library/containers/profileContainers/PersonalCard';
import ScreenWrapper from 'library/wrapper/ScreenWrapper';
import ScreensNameEnum from '../../../constants/ScreensNameEnum';
import styles from './styles';
/*
 * This function is used to create payment Screen
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const PaymentScreen = ({navigation, route}) => {
  const icon = <Feather name={'chevron-right'} size={25} />;
  const linkOptions = [
    {screen: ScreensNameEnum.SELECT_A_CARD_SCREEN, title: 'Payment'},
  ];
  const handleNavigation = screen => {
    navigation.navigate(screen);
  };
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.headerText}>Payments</Text>
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

export default PaymentScreen;
