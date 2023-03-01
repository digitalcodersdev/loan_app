import {StyleSheet} from 'react-native';
import R from 'resources/R';

const styles = StyleSheet.create({
  label: {
    color: R.colors.PRIMARI_DARK,
    textAlign: 'center',
    fontSize: 20,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: R.fonts.Medium,
    paddingVertical: 20,
  },
  input: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: 20,
    marginHorizontal: 60,
    borderRadius: 46,
    borderWidth: 0.5,
    paddingLeft: 10,
  },
  imageBlock: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    height: 200,
    alignSelf: 'center',
    marginVertical: 50,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  inputBlock: {
    flex: 3,
    justifyContent: 'center',
  },
  pressableText: {
    color: '#3366FF',
    fontSize: 16,
    justifyContent: 'space-between',
    fontFamily: R.fonts.Regular,
  },
  pressableTextDisabled: {
    color: R.colors.PRIMARI_DARK,
    fontSize: 16,
    justifyContent: 'space-between',
    fontFamily: R.fonts.Regular,
  },
  tagline: {
    color: R.colors.PRIMARI_DARK,
    textAlign: 'center',
    fontSize: 12,
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 20,
  },

  inputContainer: {
    paddingVertical: 20,
  },
  otpInput: {
    borderBottomWidth: 5,
    borderColor: '#7D7D7D',
    color: '#000',
    width: 35,
    padding: 10,
    textAlign: 'center',
    marginHorizontal: 5,
    marginBottom: 10,
    fontFamily: R.fonts.Bold,
    fontSize: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  btnContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  screenTitle: {
    fontFamily: R.fonts.Bold,
    fontSize: 22,
  },
  timer: {
    backgroundColor: 'white',
  },
});

export default styles;
