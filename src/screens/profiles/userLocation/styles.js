import {StyleSheet} from 'react-native';
import R from 'resources/R';

const styles = StyleSheet.create({
  label: {
    color: R.colors.PRIMARI_DARK,
    textAlign: 'center',
    fontSize: 20,
  },
  btnContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: 20,
  },
  inputBlock: {
    flex: 3,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    fontSize: 15,
    flex: 1,
  },
  screenTitle: {
    fontFamily: R.fonts.Regular,
    fontSize: 22,
    marginBottom: 10,
  },
});

export default styles;
