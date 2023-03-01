import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import ScreenWrapper from 'library/wrapper/ScreenWrapper';
import NavItem from 'library/commons/NavItem';
import CheckBox from 'library/commons/CheckBox';
import R from 'resources/R';
import styles from './styles'
const optionsItems = [
  {screen: '', title: 'Messages'},
  {screen: '', title: 'Someone applies to your job'},
  {screen: '', title: 'Payment request'},
];

/*
 * This function is used to create Manage Notificatiosn
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const HelpSupport = ({navigation, route}) => {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.heading}>Manage Notifications</Text>
        {optionsItems.map((item, index) => (
          <NavItem
            key={index.toString()}
            title={item.title}
            index={index}
            avatar={<CheckBox defaultChecked={true} />}
          />
        ))}
      </View>
    </ScreenWrapper>
  );
};

export default HelpSupport;