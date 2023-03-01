import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import Button from 'library/commons/Button';
import ScreenWrapper from 'library/wrapper/ScreenWrapper';
import R from 'resources/R';
import styles from './styles'
/*
 * This function is used to create Work with us screen
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const WorkWithUs = () => {
  return (
    <ScreenWrapper>
      <View style={styles.innerContainer}>
        <Text style={styles.text1}>
          You've started the process to greatness!
        </Text>
        <Text style={styles.text2}>
          Working with kindajobs is an effective and simple way to make lots
          money with doing things that you are good at.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={'Download the job app'}
          backgroundColor={'#E3AB1A'}
          style={styles.button}
        />
      </View>
    </ScreenWrapper>
  );
};
export default WorkWithUs;