import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';
import R from 'resources/R';
import visaImg from '../../assets/images/visa.png';
/*
 * This function Component is used to render Payment Status
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const PaymentStatusModal = ({
  isVisible,
  onModalClose,
  page,
  cardDetails,
  onPaymnetComplete,
  feedback,
}) => {
  const navigation = useNavigation();
  // useEffect(() => {
  //   // console.log(isVisible, page)
  //   if (isVisible && page === 'success') {
  //     setTimeout(() => {
  //       onPaymnetComplete && onPaymnetComplete();
  //     }, 3000);
  //   }
  // }, [isVisible]);
  if (page === 'block') {
    return (
      <Modal
        isVisible={isVisible}
        swipeDirection="down"
        onSwipeComplete={e => {
          onModalClose(false);
        }}
        backdropOpacity={0.2}
        onBackdropPress={e => {
          onModalClose(false);
        }}
        style={styles.modalContainer}>
        <View style={styles.modalInnerContainer}>
          <View style={styles.modelButton}></View>
          <View style={styles.container}>
            <View style={styles.textBlock}>
              <Text style={styles.Text}>Payment Unsuccessful </Text>
            </View>
            <View style={styles.iconBlock}>
              <View>
                <Icon name="block" size={200} color="#E80909" />
              </View>
              <View style={styles.cardContainer}>
                <View style={styles.imgContainer}>
                  <Image
                    source={visaImg}
                    style={styles.image}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.text}>ending in 102</Text>
                <TouchableOpacity onPress={() => onModalClose('change-card')}>
                  <Text style={styles.changeText}>change</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  } else {
    return (
      <Modal
        isVisible={isVisible}
        // swipeDirection="down"
        // onSwipeComplete={e => {
        //   onModalClose(false);
        // }}
        // onBackdropPress={e => {
        //   onModalClose(false);
        // }}
        style={styles.modalContainer}>
        <View
          style={
            page === 'success' || feedback
              ? styles.modalInnerContainerfull
              : styles.modalInnerContainer
          }>
          <View style={styles.modelButton}></View>
          <View style={styles.container}>
            <View style={styles.textBlock}>
              <Text style={styles.Text}>
                {cardDetails
                  ? 'Payment Successful'
                  : feedback
                  ? feedback
                  : 'Job Posted'}
              </Text>
            </View>
            <View style={styles.iconBlock}>
              <View style={styles.iconCircle}>
                <Icon
                  name="check"
                  size={110}
                  color="#2ECC71"
                  style={{left: 30}}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
};
export default PaymentStatusModal;

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 20,
    overflow: 'hidden',
    margin: 0,
  },
  modalInnerContainer: {
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 10,
    flexDirection: 'column',
  },
  modalInnerContainerfull: {
    backgroundColor: 'white',
    minHeight: '100%',

    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 10,
    flexDirection: 'column',
  },
  container: {
    flexDirection: 'column',
  },
  textBlock: {
    display: 'flex',
    height: '50%',
  },
  Text: {
    top: 100,
    textAlign: 'center',
    color: R.colors.PRIMARI_DARK,
    fontSize: R.fontSize.XXXL,
    marginHorizontal: 50,
    fontFamily: R.fonts.Bold,
  },
  iconBlock: {
    flexDirection: 'column',
    alignItems: 'center',
    // height: '30%',
  },
  iconCircle: {
    borderWidth: 15,
    justifyContent: 'center',
    height: 200,
    width: 200,
    borderRadius: 120,
    borderColor: '#2ECC71',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgContainer: {
    height: 40,
    width: 40,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  text: {
    color: R.colors.PRIMARI_DARK,
    fontSize: R.fontSize.L,
    marginLeft: 10,
  },
  changeText: {
    color: R.colors.SKY_BLUE,
    fontSize: R.fontSize.L,
    marginLeft: 10,
  },
  modelButton: {
    alignSelf: 'center',
    marginVertical: 0,
    width: 70,
    height: 4,
    backgroundColor: R.colors.LIGHTGRAY_1,
    borderRadius: 10,
  },
});
