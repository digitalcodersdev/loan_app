import React from 'react';
import {Pressable, StyleSheet, View, Text} from 'react-native';
import R from 'resources/R';
/*
 * This function is used to show navItem
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const NavItem = ({title, avatar, index, style, onPress}) => {
  return (
    <Pressable
      onPress={() => onPress && onPress(index)}
      style={[styles.item, style]}>
      <View style={styles.textContainer}>
        <Text numberOfLines={1} onPress={onPress} style={[styles.itemText]}>
          {title}
        </Text>
      </View>
      {avatar}
    </Pressable>
  );
};
export default NavItem;
const styles = StyleSheet.create({
  item: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  itemText: {
    fontSize: 16,
    fontFamily: R.fonts.Regular,
    color: R.colors.PRIMARI_DARK,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
});
