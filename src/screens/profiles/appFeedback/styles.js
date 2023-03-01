import {StyleSheet} from 'react-native';
import R from 'resources/R';

const styles = StyleSheet.create({
  modalHeaderText: {
    textAlign: 'center',
    fontFamily: R.fonts.Bold,
    fontSize: R.fontSize.L,
    color: R.colors.PRIMARI_DARK,
  },
  modalInnerContainer: {
    backgroundColor: 'white',
    height: '94%',
    borderRadius: 20,
    justifyContent: 'space-between',
    padding: 20,
    margin: 0,
  },
  feedBackText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: R.fonts.Medium,
    fontSize: R.fontSize.XXXL,
    alignSelf: 'center',
  },
  fixedBtn: {
    zIndex: 9999,
    height: 50,
    width: 50,
    position: 'absolute',
    bottom: 110,
    right: 20,
    backgroundColor: '#000',
    borderRadius: 120,
  },
  inputContainer: {
    borderRadius: 20,
    height: 200,
    marginVertical: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  modalFooter: {
    paddingVertical: 30,
  },
});

export default styles;
