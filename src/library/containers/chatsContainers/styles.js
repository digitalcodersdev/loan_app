import {StyleSheet, Dimensions} from 'react-native';
import R from 'resources/R';
const styles = StyleSheet.create({
  cardContainer: {
    width: Dimensions.get('window').width * 0.95,
    alignSelf: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#e6e6e6',
    height: 70,
    // justifyContent: 'space-between',
  },
  imageRow: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  textHead: {
    marginLeft: 12,
    width: '70%',
    fontFamily: R.fonts.Bold,
    lineHeight: 14,
    color: R.colors.PRIMARI_DARK,
  },
  desc: {
    marginLeft: 12,
    lineHeight: 12,
    fontSize: 11,
    marginTop: 4,
    fontFamily: R.fonts.Bold,
    color: R.colors.headingColor,
  },
  dateTime: {
    color: R.fonts.Bold,
    fontSize: 11,
    fontFamily: R.fonts.Semi_Bold,
  },
});

export default styles;
