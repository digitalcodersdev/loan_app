import {StyleSheet} from 'react-native';
import R from 'resources/R';

const styles = StyleSheet.create({
  helpText: {
    fontSize: 22,
    marginTop: 12,
    fontFamily: R.fonts.Bold,
    textAlign: 'center',
    color: R.colors.PRIMARI_DARK,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  supportText: {
    fontSize: 12,
    marginTop: 24,
    fontFamily: R.fonts.Semi_Bold,
    color: R.colors.PRIMARI_DARK,
  },
  contactText: {
    fontSize: 12,
    marginTop: 24,
    color: R.colors.LIGHTBLUE,
    fontFamily: R.fonts.Semi_Bold,
  },
  faqText: {
    fontSize: 12,
    marginTop: 8,
    fontFamily: R.fonts.Semi_Bold,
    textAlign: 'center',
    color: R.colors.PRIMARI_DARK,
  },
  secondary: {
    marginTop: 32,
    flexDirection: 'column',
  },
  mapText: {
    fontSize: R.fontSize.L,
    marginBottom: 15,
    textAlign: 'left',
    color: R.colors.PRIMARI_DARK,
  },
  mainContainer: {
    alignSelf: 'center',
    flexDirection: 'column',
    width: '90%',
  },
  searchContainer: {width: '100%', alignItems: 'center', marginVertical: 10},
  input: {
    width: '85%',
    color: R.colors.PRIMARI_DARK,
    fontFamily: R.fonts.Medium,
    height: '100%',
    fontSize: 13,
    padding: 0,
    marginLeft: 6,
  },
  searchWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    height: 45,
    elevation: 5,
    backgroundColor: '#F8F8FC',
    background: '#F8F8FC',
    borderRadius: 4,
    marginTop: 12,
  },
  ansContainer: {
    borderWidth: 1,
    backgroundColor: R.colors.GRAY,
  },
  ans: {
    fontSize: R.fontSize.M,
    color: R.colors.PRIMARI_DARK,
    marginVertical: 5,
  },
});

export default styles;
