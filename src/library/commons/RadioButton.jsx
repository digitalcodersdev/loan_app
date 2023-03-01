import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
/*
 * This function is used to create our universal checkbox
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const RadioButton = ({checked, handleOnPress}) => {
  return (
    <Pressable onPress={handleOnPress}>
      <Icon
        name={checked ? 'radio-button-checked' : 'radio-button-unchecked'}
        size={25}
        color={checked ? '#2ECC71' : '#dddddd'}
      />
    </Pressable>
  );
};
export default RadioButton;
