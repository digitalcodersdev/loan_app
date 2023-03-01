import React from 'react';
import {Image as NativeImage, View, StyleSheet} from 'react-native';
import profileImg from '../../assets/images/profile.png';
/*
 * This function is used to Image View fro MyJobModal
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const Image = props => (
  <View style={[styles.imageContainer, props.style]}>
    <View style={styles.backgroundImage}>
      <NativeImage
        source={profileImg}
        resizeMode="cover"
        style={styles.placeholderStyle}
      />
    </View>
    <NativeImage {...props} />
  </View>
);
export default Image;
const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },
  imageContainer: {
    alignItems: 'center',
  },
  placeholderStyle: {
    height: '100%',
    width: '100%',
  },
});
