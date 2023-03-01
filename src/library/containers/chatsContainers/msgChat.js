/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import React, {useEffect} from 'react';
import {Text, View, Pressable} from 'react-native';
import R from 'resources/R';
import Icon from 'react-native-vector-icons/MaterialIcons';
/*
 * This function is used to create a single message View for chat screen
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const MsgChat = ({navigation, item, usrId}) => {
  return (
    <View
      style={{
        // alignItems: usrId == item?.sender_type_id ? 'flex-end' : 'flex-start',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{}}>
          <Text
            style={{
              borderRadius: 20,
              paddingVertical: 12,
              paddingHorizontal: 20,
              overflow: 'hidden',
              backgroundColor:
                item.sender_type_id == usrId
                  ? R.colors.LIGHTBLUE
                  : R.colors.backgroundColor,
              fontSize: 12,
              color: item.sender_type_id == usrId ? '#fff' : '#000',
            }}>
            {item.text}
          </Text>
        </View>
      </View>
      {item.reported && (
        <Icon
          name={'check-circle-outline'}
          color={R.colors.PRIMARI_DARK}
          size={18}
          style={{position: 'absolute', right: 0, top: 10}}
        />
      )}
      <Text
        style={{
          fontSize: 9,
          alignSelf: 'center',
          color: R.colors.headingColor,
          fontFamily: R.fonts.Bold,
          marginTop: 3,
        }}>
        {moment(new Date(item.timestamp)).format('LT')}
      </Text>
    </View>
  );
};
export default MsgChat;
