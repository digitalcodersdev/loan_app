import {StyleSheet, Platform, Dimensions} from 'react-native';
import R from 'resources/R';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '55%',
    justifyContent: 'space-between',
    alignSelf: 'center',
    flex: 2,
  },
  nameText: {
    fontSize: 22,
    textAlign: 'center',
    color: R.colors.PRIMARI_DARK,
    fontFamily: R.fonts.Semi_Bold,
    flex: 1,
  },
  secondContainer: {width: '100%', alignItems: 'center'},
  dateText: {
    marginTop: 12,
    backgroundColor: R.colors.backgroundColor,
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 12,
    fontSize: 9,
    fontFamily: R.fonts.Medium,
  },
  image: {
    width: 60,
    marginTop: 8,
    height: 60,
  },
  thirdContainer: {
    bottom: Platform.OS == 'ios' ? 70 : 50,
    height: Dimensions.get('window').height * 0.8,
    alignSelf: 'center',
  },
  contentContainerStyle: {
    width: '100%',
    paddingBottom: 12,
  },
});

export default styles;
