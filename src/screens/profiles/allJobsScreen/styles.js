import {StyleSheet} from 'react-native';
import R from 'resources/R';
const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    color: R.colors.PRIMARI_DARK,
    textAlign: 'center',
    fontFamily: R.fonts.Bold,
  },
  list: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 10,
  },
  cardContainer: {
    flexDirection: 'column',
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: 'rgb(255,255,255)',
    borderColor: '#ccc',
    marginHorizontal: 20,
  },
  date: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  createdAt: {
    color: R.colors.PRIMARI_DARK,
    fontSize: R.fontSize.M,
    alignSelf: 'flex-end',
  },
  cardNumber: {
    color: R.colors.PRIMARI_DARK,
    fontSize: R.fontSize.M,
    // marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  jobId: {
    color: R.colors.PRIMARI_DARK,
    fontSize: R.fontSize.M,
  },
  price: {
    color: R.colors.PRIMARI_DARK,
    fontFamily: R.fonts.Bold,
    fontSize: R.fontSize.M,
  },
  statusContainer: {
    flexDirection: 'row',
  },
  img: {
    height: 30,
    width: 30,
  },
  text: {
    fontSize: R.fontSize.M,
    color: R.colors.PRIMARI_DARK,
    marginLeft: 10,
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    color: R.colors.PRIMARI_DARK,
    fontFamily: R.fonts.Bold,
    fontSize: R.fontSize.M,
    flex: 1,
  },
});
export default styles;
