import {StyleSheet} from 'react-native';
import R from '../../../resources/R';
const styles = StyleSheet.create({
  label: {
    fontSize: 22,
    fontFamily: R.fonts.Medium,
    marginBottom: 30,
    textAlign: 'center',
    color: R.colors.PRIMARI_DARK,
  },
  input: {
    fontSize: 15,
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 46,
    borderWidth: 0.5,
    width: 160,
    height: 52,
    paddingLeft: 15,
    borderTopcolor: R.colors.PRIMARI_DARK,
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  inputBlock: {
    display: 'flex',
    flexDirection: 'column',
  },
  btn: {
    paddingVertical: 10,
    textAlign: 'center',
    backgroundColor: '#E3AB1A',
    borderRadius: 35,
    marginTop: 40,
    marginHorizontal: 30,
    width: 186,
  },
  btnSkip: {
    paddingVertical: 10,
    textAlign: 'center',
    backgroundColor: '#E5E5E5',
    borderRadius: 35,
    marginTop: 40,
    marginHorizontal: 30,
    width: 186,
  },

  btnText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },
  skipBtnText: {
    textAlign: 'center',
    fontSize: 20,
    color: R.colors.PRIMARI_DARK,
  },
  nameContainer: {
    background: '#E5E5E5',
    display: 'flex',
    flexDirection: 'row',
    width: 234,
    height: 234,
    borderWidth: 1,
    backgroundColor: '#E5E5E',
    borderRadius: 120,
    alignSelf: 'center',
    boxSizing: 'border-box',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    overflow: 'hidden',
  },
  imageStyle: {
    height: 400,
    width: 400,
    alignSelf: 'center',
  },
  imgDesc: {
    display: 'flex',
    flexDirection: 'column',
  },
  imgText: {
    color: R.colors.PRIMARI_DARK,
    textAlign: 'center',
    paddingTop: 10,
    fontSize: 14,
  },
  imgTextAfter: {
    color: R.colors.PRIMARI_DARK,
    textAlign: 'center',
    paddingTop: 10,
    fontSize: 14,
    marginTop: 50,
  },
  txtPoints: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 10,
  },
  points: {
    color: R.colors.PRIMARI_DARK,
    paddingVertical: 5,
    fontSize: 14,
  },
  final: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 40,
  },
  preview: {
    height: 233,
    width: 233,
  },
  takePicture: {
    flex: 1,
    margin: 5,
  },
  customButton: {
    backgroundColor: '#F8F8FC',
    color: R.colors.PRIMARI_DARK,
  },
});
export default styles;
