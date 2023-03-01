import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import R from 'resources/R';
/*
 * This function is used to create PersonalCard
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const HelpSupport = ({title, avatar, headingStyle, style, onPress}) => {
  return (
    <Pressable onPress={onPress} style={[styles.item, style]}>
      <Text style={[styles.itemText, headingStyle]}>{title}</Text>

      {avatar}
    </Pressable>
  );
};
export default HelpSupport;
const styles = StyleSheet.create({
  item: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 8,
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 17,
    fontFamily: R.fonts.Medium,
    color: R.colors.PRIMARI_DARK,
  },
});
