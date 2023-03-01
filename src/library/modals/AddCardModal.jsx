import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BTextInput from 'library/commons/BTextInput';
import Button from 'library/commons/Button';
import {useNavigation} from '@react-navigation/native';
import R from 'resources/R';
import PaymentStatusModal from './PaymentStatusModal';
// import ConfirmationModal from './ConfirmationModal';
import {addCard} from '../../store/actions/userActions';
import {useDispatch, useSelector} from 'react-redux';
import Loader from 'library/commons/Loader';
// import styles from './styles';

/*
 * This Component is used to add a card modal
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const AddCardModal = ({isVisible, onModalClose, route}) => {
  const dispatch = useDispatch();
  const isFirstCard = route?.params?.isFirstCard || false;
  const yearRef = useRef(null);
  const [cardNumber, setCardNumber] = useState();
  const [expiryMonth, setExpiryMonth] = useState();
  const [expiryYear, setExpiryYear] = useState();
  const [cvv, setCvv] = useState('');
  const [paymentStatusVisible, setPaymentStatusVisible] = useState(false);
  const [cardHolderName, setCardHolderName] = useState('');
  const [loading, setLoading] = useState(false);
  // const [confirmationVisible, setConfirmModalVisibility] = useState(false);
  const [disableSave, setDisableSave] = useState(true);

  useEffect(() => {
    const validRes = validate({cardNumber, expiryYear, expiryMonth, cvv});
    // console.log(validRes);
    if (
      validRes.card &&
      validRes.expiryMonth &&
      validRes.cvv &&
      validRes.expiryYear
    ) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [cvv, expiryMonth, expiryYear, cardNumber]);

  const validate = ({cardNumber, expiryYear, expiryMonth, cvv}) => {
    // console.log(cvv, cardNumber, expiryYear, expiryMonth, 'validation Method');
    const res = {};
    if (cardNumber && cardNumber.length > 0 && cardNumber.length === 16) {
      res.card = true;
    }
    if (expiryMonth && expiryMonth.length > 0 && expiryMonth.length === 2) {
      res.expiryMonth = true;
    }
    if (
      expiryYear &&
      expiryYear.toString().length > 0 &&
      expiryYear.toString().length === 2
    ) {
      res.expiryYear = true;
    }
    if (cvv && cvv.length > 0 && cvv.length === 3) {
      res.cvv = true;
    }
    return res;
  };

  const handleAddJob = job => {
    setLoading(true);
    let data = {
      cardHolderName: '',
      cardNumber: cardNumber,
      expiryMonth: expiryMonth,
      expiryYear: expiryYear,
    };
    const res = dispatch(addCard(data));
    setLoading(false);
    if (res) {
      onModalClose();
    }

    // setConfirmModalVisibility(true);
    // isFirstCard ? navigation.navigate(ScreensNameEnum.PAYMENT_STATUS) : void 0;
  };
  const onPaymentStatusModalClose = () => {
    setPaymentStatusVisible(false);
    onModalClose();
  };
  // const onConfirmaionModalClose = data => {
  //   if (data === 'cancel') {
  //     setConfirmModalVisibility(false);
  //   } else {
  //     setConfirmModalVisibility(false);
  //     setPaymentStatusVisible(true);
  //   }
  // };
  const handleChange = text => {
    let currentMonth = new Date().getMonth() + 1;
    if (currentMonth < 10) {
      currentMonth = `0${currentMonth}`;
    }
    if (text <= 12 && text !== currentMonth) {
      const month = text > 1 && text < 10 ? `0${text}` : text;
      setExpiryMonth(month);
      if (month.length === 2) {
        yearRef && yearRef.current.focus();
      }
    }
  };
  const handleCurrentYearChange = text => {
    let year = new Date().getFullYear().toString();
    const currentYear = year.slice(2);
    if (text.length === 2 && text < parseInt(currentYear)) {
      setExpiryYear('');
    } else {
      setExpiryYear(parseInt(text));
    }
  };
  return (
    <>
      <Modal
        isVisible={isVisible}
        backdropOpacity={0.2}
        swipeDirection="down"
        onSwipeComplete={e => {
          onModalClose(false);
        }}
        onBackdropPress={e => {
          onModalClose(false);
        }}
        style={styles.modalContainer}>
        {/* <ScreenWrapper style={styles.modalInnerContainer}> */}
        <View style={styles.modalInnerContainer}>
          <View style={styles.modalButton}></View>
          <View>
            <Text style={styles.headerText}> Add Card</Text>
            <Text style={styles.ssl}>
              <Icon name="verified-user" size={15} color="#2ECC71" />
              {' Secured with SSL'}
            </Text>
          </View>
          <View style={styles.main}>
            <View style={styles.input1}>
              <Text style={styles.cardText}> Card number</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 30,
                  borderColor: '#ccc',
                  marginBottom: 10,
                  width: '100%',
                  borderWidth: 1,
                }}>
                <Icon
                  name={'credit-card'}
                  size={22}
                  color={R.colors.LIGHTGRAY}
                  style={{
                    borderRadius: 30,
                    left: 20,
                    zIndex: 999,
                  }}
                />
                <BTextInput
                  autoFocus
                  placeholder="0000 0000 0000 0000"
                  style={{
                    fontSize: 18,
                    fontFamily: R.fonts.Regular,
                    width: '100%',
                    letterSpacing: 2,
                  }}
                  containerStyle={{
                    paddingVertical: 5,
                    marginVertical: 0,
                    borderWidth: 0,
                    width: '90%',
                  }}
                  value={cardNumber}
                  onChangeText={text => {
                    setCardNumber(text);
                  }}
                  keyboardType={'numeric'}
                  maxLength={16}
                />
              </View>
              {/* <Text style={styles.cardText}> Card Holder's Name</Text>
              <BTextInput
                autoFocus
                placeholder="Card Holder's Name"
                style={{fontSize: 18, fontFamily: R.fonts.Regular}}
                value={cardHolderName}
                onChangeText={text => {
                  setCardHolderName(text);
                }}
                maxLength={30}
              /> */}
            </View>
            <View style={styles.date}>
              <View style={styles.inputFirst}>
                <Text style={styles.txt}> Expiration date</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderRadius: 40,
                    marginVertical: 10,
                    borderColor: R.colors.LIGHTGRAY,
                    justifyContent: 'center',
                    width: '70%',
                  }}>
                  <BTextInput
                    placeholder="MM"
                    containerStyle={{
                      borderWidth: 0,
                      borderRadius: 0,
                      marginVertical: 0,
                      paddingHorizontal: -20,
                    }}
                    style={{
                      fontSize: 16,
                      fontFamily: R.fonts.Regular,
                      minWidth: 40,
                    }}
                    value={expiryMonth}
                    onChangeText={handleChange}
                    keyboardType={'numeric'}
                    maxLength={2}
                  />
                  <Text style={{fontSize: 18, fontFamily: R.fonts.Regular}}>
                    /
                  </Text>
                  <BTextInput
                    placeholder="YY"
                    containerStyle={{
                      borderWidth: 0,
                      borderRadius: 0,
                      marginVertical: 0,
                      paddingHorizontal: -20,
                    }}
                    style={{fontSize: 16, fontFamily: R.fonts.Regular}}
                    ref={yearRef}
                    value={expiryYear}
                    onChangeText={handleCurrentYearChange}
                    keyboardType={'numeric'}
                    maxLength={2}
                  />
                </View>
              </View>
              <View style={styles.input2}>
                <Text style={styles.txt}> Security code</Text>
                <BTextInput
                  placeholder="CVV"
                  style={styles.in}
                  value={cvv}
                  onChangeText={text => {
                    setCvv(text);
                  }}
                  keyboardType={'numeric'}
                  maxLength={3}
                />
              </View>
            </View>
            {/* <Text style={styles.description}>
              For account verification, we will place a small hold amount on
              your account.This is not a charge and will be released in 24
              hours.
            </Text> */}
          </View>
          <View style={styles.button}>
            <Button
              title={'Add Card'}
              buttonStyle={styles.btn}
              onPress={handleAddJob}
              disabled={disableSave}
            />
          </View>
        </View>
        {/* </ScreenWrapper> */}
      </Modal>
      {/* <ConfirmationModal
        isVisible={confirmationVisible}
        onModalClose={onConfirmaionModalClose}
        confirmationText={
          'There are not a lot of people to take your request at this time so you may not get your job done at the moment.'
        }
      /> */}
      {paymentStatusVisible && (
        <PaymentStatusModal
          isVisible={paymentStatusVisible}
          onModalClose={onPaymentStatusModalClose}
        />
      )}
      <Loader message="1" loading={loading} />
    </>
  );
};

export default AddCardModal;
const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
    overflow: 'hidden',
  },
  main: {
    flexDirection: 'column',
    paddingVertical: 20,
  },
  headerText: {
    textAlign: 'center',
    fontSize: R.fontSize.XL,
    fontFamily: R.fonts.Bold,
    color: R.colors.SECONDARY,
  },
  ssl: {
    textAlign: 'center',
    fontSize: 14,
    color: R.colors.PRIMARI_DARK,
    margin: 5,
  },
  cardText: {
    textAlign: 'left',
    fontSize: R.fontSize.M,
    color: R.colors.PRIMARI_DARK,
    fontFamily: R.fonts.Semi_Bold,
  },
  input1: {paddingHorizontal: 20, paddingVertical: 10},
  date: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  inputFirst: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  input2: {marginLeft: 30},
  in: {
    textAlign: 'center',
    minWidth: 90,
    fontFamily: R.fonts.Regular,
    fontSize: 16,
  },
  description: {
    fontSize: 13,
    color: '#B4B4B4',
    textAlign: 'center',
    marginHorizontal: 20,
    fontFamily: R.fonts.Medium,
    marginTop: 10,
  },
  txt: {
    fontSize: R.fontSize.M,
    color: R.colors.PRIMARI_DARK,
    textAlign: 'left',
    // paddingLeft: 10,
    fontFamily: R.fonts.Semi_Bold,
  },
  button: {marginHorizontal: 20},
  btn: {},
  modalInnerContainer: {
    backgroundColor: 'white',
    maxHeight: '90%',
    minHeight: '70%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent: 'space-between',
    padding: 10,
    paddingVertical: 20,
    width: '100%',
  },
  modalButton: {
    borderBottomWidth: 5,
    borderColor: R.colors.LIGHTGRAY,
    width: '15%',
    alignSelf: 'center',
    marginBottom: 10,
  },
});
