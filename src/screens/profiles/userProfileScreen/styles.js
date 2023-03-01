import {StyleSheet} from 'react-native';
import R from 'resources/R';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  menuContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  imageEditBtn: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: R.colors.PRIMARI_DARK,
    marginBottom: 20,
    textAlign: 'center',
  },
  profileContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    width: '30%',
    height: '30%',
    marginBottom: 10,
  },
  iconContainer: {
    backgroundColor: '#FFAA00',
    alignItems: 'center',
    borderRadius: 20,
    padding: 5,
  },
  detailsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  starContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 120,
    borderColor: '#FFAA00',
    overflow: 'hidden',
  },
  icon: {
    alignSelf: 'center',
    height: 100,
    width: 100,
    // right: 5,
    // bottom: 5,
    borderRadius: 120,
  },
  txtContainer: {
    flexDirection: 'row',
  },
  detailTxt: {
    fontSize: 14,
    color: R.colors.PRIMARI_DARK,
  },
  detailTxtValue: {
    fontSize: 14,
    color: R.colors.PRIMARI_DARK,
    marginLeft: 5,
  },
  reviewCount: {
    color: '#3366FF',
    top: 5,
  },
  name: {
    color: R.colors.PRIMARI_DARK,
    fontSize: 18,
    top: 5,
  },
  nameContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  myStarStyle: {
    color: R.colors.primary,
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowOffset: {width: 0.5, height: 0.5},
    textShadowRadius: 1,
  },
  myEmptyStarStyle: {
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-around',
    width: '50%',
    alignSelf: 'center',
  },
  buttonInner: {
    width: '50%',
    marginHorizontal: 10,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  starCount: {
    color: R.colors.PRIMARI_DARK,
  },
  reviewCount: {
    color: R.colors.LIGHTBLUE,
    fontSize: R.fontSize.M,
    marginLeft: 10,
  },
});

export default styles;
