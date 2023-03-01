/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect} from 'react';
import ScreenWrapper from 'library/wrapper/ScreenWrapper';
import ChatView from 'library/commons/ChatView';
/*
 * This function is used to create personal chat view
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const Messages = ({navigation, route}) => {
  return (
    <ScreenWrapper header={true}>
      <ChatView />
    </ScreenWrapper>
  );
};
export default Messages;
