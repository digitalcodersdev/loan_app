import {StyleSheet} from 'react-native';
import R from 'resources/R';

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {margin: 20},
  button: {width: '100%'},
  text1: {
    fontSize: 20,
    color: R.colors.PRIMARI_DARK,
    fontWeight: 'bold',
    textAlign: 'left',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  text2: {
    color: R.colors.PRIMARI_DARK,
    fontSize: 16,
    textAlign: 'left',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

export default styles;
