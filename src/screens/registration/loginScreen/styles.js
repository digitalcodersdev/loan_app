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
    flexDirection: 'row',
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
    paddingVertical: 20,
    paddingHorizontal: 20,
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
  tagline: {
    color: R.colors.PRIMARI_DARK,
    textAlign: 'center',
    fontSize: 12,
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 30,
  },
  btn: {
    textAlign: 'center',
    backgroundColor: '#E3AB1A',
    paddingVertical: 20,
    borderRadius: 35,
    marginTop: 40,
    marginHorizontal: 30,
  },
  btnText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },
  inputContainer: {
    paddingVertical: 20,
  },
  otpInput: {
    borderBottomWidth: 1,
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
  textInput: {
    fontFamily: R.fonts.Regular,
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: '100%',
  },
  screenTitle: {
    fontFamily: R.fonts.Bold,
    fontSize: 22,
  },
  mobileContainer: {
    width: '80%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  btnContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});

export default styles;
