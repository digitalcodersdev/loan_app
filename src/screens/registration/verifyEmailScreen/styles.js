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
    padding: 20,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  inputBlock: {
    flex: 3,
    justifyContent: 'center',
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

  textInput: {
    fontFamily: R.fonts.Regular,
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: '100%',
  },
  emailContainer: {
    width: '80%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
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
});

export default styles;
