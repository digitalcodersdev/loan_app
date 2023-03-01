import {StyleSheet} from 'react-native';
import R from 'resources/R';

const styles = StyleSheet.create({
  innerContainer: {paddingHorizontal: 20},
  buttonContainer: {margin: 20},
  button: {width: '100%'},
  text1: {
    fontSize: 20,
    color: R.colors.PRIMARI_DARK,
    fontFamily: R.fonts.Bold,
    textAlign: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  text2: {
    color: R.colors.PRIMARI_DARK,
    fontSize: 14,
    marginBottom: 10,
  },
});

export default styles;
