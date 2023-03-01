import {StyleSheet,Dimensions} from 'react-native';
import R from 'resources/R'
const styles = StyleSheet.create({
  cardContainer: {
    width: Dimensions.get('window').width * 0.95,
    alignSelf: 'center',
    backgroundColor: "#fff",
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: "#e6e6e6",
    height: 70,
    // justifyContent: 'space-between',
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
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
  imageRow: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  textHead: {
    marginLeft: 12,
    width: '70%',
    fontFamily: R.fonts.Medium,
    lineHeight: 14,
    color: "#000",
  },
  desc: {
    marginLeft: 12,
    lineHeight: 12,
    fontSize: 11,
    marginTop: 4,
    fontFamily: R.fonts.Medium,
    color: R.colors.headingColor,
  },
  dateTime: {
    color: "#000",
    fontSize: 11,
    fontFamily: R.fonts.Semi_Bold,
  },
});
export default styles;
