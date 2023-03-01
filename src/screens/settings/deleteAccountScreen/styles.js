import {StyleSheet} from 'react-native';
import R from 'resources/R';

const styles = StyleSheet.create({
  errortext: {
    fontFamily: R.fonts.Regular,
    fontSize: R.fontSize.S,
    color: R.colors.RED,
  },
  lineItem: {
    color: R.colors.SECONDRY_DARK,
    fontSize: 14,
    fontFamily: R.fonts.Bold,
  },
  lineItemRed: {
    color: R.colors.RED,
    fontSize: 14,
    fontFamily: R.fonts.Bold,
    marginBottom: 20,
  },
  detailContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  container: {
    justifyContent: 'space-between',
    flex: 1,
    paddingHorizontal: 20,
  },
  childerenContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  childrenTextRed: {
    color: R.colors.RED,
    fontSize: R.fontSize.M,
    fontFamily: R.fonts.Bold,
    marginBottom: 2,
  },
  childrenTextBold: {
    color: R.colors.SECONDRY_DARK,
    fontSize: R.fontSize.M,
    fontFamily: R.fonts.Bold,
    marginBottom: 2,
  },
  childrenText: {
    color: R.colors.PRIMARY_TEXT,
    fontSize: R.fontSize.M,
    fontFamily: R.fonts.Regular,
    marginBottom: 2,
  },
  deleteButton: {
    marginBottom: 30,
  },
  changeInstedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  btn1: {
    width: '100%',
    flex: 1,
    marginHorizontal: 5,
  },
});
export default styles;
