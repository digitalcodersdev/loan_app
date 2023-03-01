import {StyleSheet} from 'react-native';
import R from 'resources/R';

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    padding: 20,
    justifyContent: 'space-between',
    flex: 1,
  },
  itemContainer: {marginBottom: 20},
  txtContainer: {
    justifyContent: 'center',
  },
  headerText: {
    textAlign: 'center',
    fontSize: R.fontSize.XL,
    fontFamily: R.fonts.Bold,
    color: R.colors.SECONDARY,
  },
  cardContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingVertical: 15,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  cardInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: R.colors.WHITE,
    alignItems: 'center',
  },
  cardDetail: {
    color: R.colors.PRIMARI_DARK,
    fontSize: R.fontSize.M,
    fontFamily: R.fonts.Regular,
    marginLeft: 20,
  },
  lastContainerStyle: {
    flexDirection: 'column',
  },
  isChecked: {
    // flex: 0.2,
  },
  Button: {},
  btnContainer: {},
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'white',
    right: 0,
  },
  cardImage: {
    height: 30,
    width: 3,
  },
});

export default styles;
