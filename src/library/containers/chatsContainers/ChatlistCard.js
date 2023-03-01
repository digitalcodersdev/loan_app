/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Pressable, View, Image, Text} from 'react-native';
import R from 'resources/R';
import {NotificationsIcon, PinIcon} from '../../../assets';
import styles from './styles';
const iconProps = {
  style: {
    width: 35,
    height: 35,
    borderRadius: 360,
  },
};

/*
 * This function is used to create ChatListCard
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
export default ({
  title,
  onPress,
  cardStyle,
  description,
  onLongPress,
  time,
  avatar,
  pinned,
  hide = false,
}) => (
  <Pressable
    onLongPress={onLongPress}
    onPress={onPress}
    style={[styles.cardContainer, cardStyle]}>
    <View style={styles.imageRow}>
      <Image source={avatar} {...iconProps} />
      <View
        style={{
          width: '100%',
        }}>
        <Text numberOfLines={2} style={styles.textHead}>
          {title}
        </Text>
        <Text
          numberOfLines={2}
          style={{
            marginLeft: 12,
            width: '70%',
            lineHeight: 14,
            color: R.colors.PRIMARI_DARK,
          }}></Text>
        <Text style={styles.desc}>{description}</Text>
      </View>
    </View>
    <View style={{alignItems: 'center'}}>
      <Text style={styles.dateTime}>{time}</Text>
      {hide ? (
        <NotificationsIcon
          size={16}
          style={{marginTop: 4}}
          color={R.colors.PRIMARI_DARK}
        />
      ) : null}
    </View>
    {pinned ? (
      <PinIcon
        style={{marginLeft: 8}}
        size={23}
        color={R.colors.PRIMARI_DARK}
      />
    ) : null}
  </Pressable>
);
