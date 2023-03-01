import {StyleSheet} from 'react-native';
import R from 'resources/R';
const styles = StyleSheet.create({
  container: {
    backgroundColor: R.colors.backgroundColor,
    position: 'absolute',
    padding: 4,
    elevation: 2,
    alignSelf: 'center',
    top: 24,
    zIndex: 11111,
    width: 160,
    borderRadius: 4,
  },
  innerContainer: {
    flexDirection: 'row',
    height: 26,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txt: {
    fontSize: 13,
    width: '80%',
    textAlign: 'center',
  },
  chatsContainer: {
    flexDirection: 'row',
    marginTop: 12,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  txt1: {
    fontSize: 22,
    textAlign: 'center',
    fontFamily: R.fonts.Medium,
    marginBottom: 10,
    color: R.colors.PRIMARI_DARK,
  },
});

export default styles;
