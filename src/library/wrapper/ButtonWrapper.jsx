import React from 'react';
import {Text, View, Pressable, ActivityIndicator} from 'react-native';
/*
 * This function is used to create the button wrapper
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const ButtonWrapper = ({
  title,
  loading,
  disabled = false,
  onPress,
  style,
  textStyle,
  indicatorColor = 'white',
}) => {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        android_ripple={{color: 'gray', borderless: true}}>
        {!loading ? (
          <Text style={textStyle}>{title}</Text>
        ) : (
          <View>
            <ActivityIndicator size="large" color={indicatorColor} />
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default ButtonWrapper;
