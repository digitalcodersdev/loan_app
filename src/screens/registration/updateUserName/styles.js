import {StyleSheet} from 'react-native';
import R from 'resources/R';

const styles = StyleSheet.create({
  label: {
    color: R.colors.PRIMARI_DARK,
    textAlign: 'center',
    fontSize: 20,
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 50,
  },
  textInput: {
    fontFamily: R.fonts.Regular,
    fontSize: 18,
    paddingHorizontal: 10,
    width: '100%',
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
  btn: {
    paddingVertical: 10,
    textAlign: 'center',
    backgroundColor: '#E3AB1A',
    borderRadius: 35,
    marginTop: 40,
    marginHorizontal: 30,
  },
  btnText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  leftName: {
    flex: 1,
    marginRight: 5,
  },
  rightName: {
    flex: 1,
    marginLeft: 5,
  },
  btnContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});

export default styles;
