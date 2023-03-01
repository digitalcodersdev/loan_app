import PropTypes from 'prop-types';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {AntDesign} from '../../assets';
/*
 * This is the Header components that is used in ScreenWrapper
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const UserHeader = ({title, normal, message}) => {
  const navigation = useNavigation();
  return navigation.canGoBack() ? (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
      android_ripple={{
        color: '#eee',
      }}
      style={styles.btnCont}>
      <AntDesign name="back" size={22} color={'#000'} />
    </TouchableOpacity>
  ) : null;
};

const styles = StyleSheet.create({
  normalHeader: {
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    zIndex: 99999,
    borderWidth: 1,
  },
  btnCont: {
    width: 50,
    height: 50,
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    zIndex: 99999,
  },
});

UserHeader.propTypes = {
  title: PropTypes.string.isRequired,
  back: PropTypes.bool,
};

export default UserHeader;
