import {StyleSheet} from 'react-native';
import R from 'resources/R';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
  container1: {
    flex: 1,
    alignItems: 'center',
  },
  detail: {
    color: R.colors.PRIMARI_DARK,
    fontSize: 15,
    flex: 1,
    marginLeft: 250,
  },
  label: {
    color: R.colors.PRIMARI_DARK,
    fontSize: 25,
    flex: 1,
    top: 30,
    fontFamily: R.fonts.Bold,
  },
  labels: {
    color: R.colors.PRIMARI_DARK,
    fontSize: 15,
    // flex: 1,
    textAlign: 'center',
  },
  total: {
    color: R.colors.PRIMARI_DARK,
    fontSize: 17,
    textAlign: 'center',
    fontFamily: R.fonts.Bold,
  },
  container2: {
    flex: 3,
    flexDirection: 'column',
  },
  container3: {
    flex: 1,
    flexDirection: 'column',
  },
  items: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  priorityFees: {
    flex: 1,
    flexDirection: 'row',
    top: 40,
    justifyContent: 'center',
  },
  priorityFeesText: {
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#2ECC71',
  },
  btn: {
    marginHorizontal: 20,
  },
  buttonContainer: {
    marginBottom: 20,
  },
});

export default styles;
