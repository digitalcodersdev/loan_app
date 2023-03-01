import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import R from 'resources/R';
import Stars from 'react-native-stars';

/*
 * This function is used to create rating component
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
export default function Rating({user, userReviews}) {
  return (
    <ScrollView>
      <View style={styles.ratingContainer}>
        <View style={styles.innerContainer}>
          <View style={styles.star}>
            <Stars
              default={userReviews?.ratings}
              disabled={true}
              count={5}
              half={true}
              starSize={10}
              fullStar={
                <Icon name={'star'} style={[styles.myStarStyle]} size={30} />
              }
              emptyStar={
                <Icon
                  name={'star-outline'}
                  style={[styles.myStarStyle, styles.myEmptyStarStyle]}
                  size={30}
                />
              }
              halfStar={
                <Icon
                  name={'star-half'}
                  style={[styles.myStarStyle]}
                  size={30}
                />
              }
            />
          </View>
        </View>
        <Text style={styles.description}>{userReviews?.feedback}</Text>
        {/* <Text style={styles.description}>{date}</Text> */}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 140,
  },
  star: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  description: {
    fontSize: R.fontSize.S,
    color: '#475569',
    fontFamily: R.fonts.Regular,
  },
  myStarStyle: {
    color: R.colors.primary,
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowOffset: {width: 0.5, height: 0.5},
    textShadowRadius: 1,
  },
  myEmptyStarStyle: {
    color: 'white',
  },
});
