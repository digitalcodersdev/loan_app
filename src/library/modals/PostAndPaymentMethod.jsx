import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import R from 'resources/R';
import Button from 'library/commons/Button';
import SelectACardModal from './SelectACardModal';
import ConfirmationModal from './ConfirmationModal';
import JobDescription from './JobDescription';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PaymentStatusModal from './PaymentStatusModal';
import Loader from 'library/commons/Loader';
import {getDefaultCard} from '../../store/slices/user/cardSlice';
import {getCards} from '../../store/actions/userActions';
import {useSelector, useDispatch} from 'react-redux';
import toolsImg from '../../assets/images/tools.png';
import visaImg from '../../assets/images/visa.png';
import mastercardImg from '../../assets/images/mastercard.png';
// import SelectACardScreen from '../../screens/payment/selectACardScreen/SelectACardScreen';
/*
 * This function is used to create post and paymentMethod
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const PostAndPaymentMethod = ({
  isVisible,
  onModalClose,
  onConfirm,
  title,
  price,
}) => {
  const dispatch = useDispatch();
  const defaultCard = useSelector(getDefaultCard);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [card, setCard] = useState();
  const [confirmationVisible, setConfirmModalVisibility] = useState(false);
  const [jobDescriptionVis, setJobDescriptionVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cardId, setCardId] = useState('');
  useEffect(() => {
    if (defaultCard) {
      setCard(defaultCard);
    } else {
      dispatch(getCards());
    }
  }, []);
  const onConfirmaionModalClose = () => {
    setConfirmModalVisibility(false);
  };
  const handleOnConfirm = data => {
    if (data === 'confirm') {
      onConfirm && onConfirm(cardId);
      onModalClose(false);
      setConfirmModalVisibility(false);
    } else {
      setConfirmModalVisibility(false);
      onModalClose(false);
    }
  };
  const handleConfirm = () => {
    setConfirmModalVisibility(true);
  };
  const onSelectACardClose = () => {
    setPaymentMethod(false);
  };
  const onJobDescriptionModalClose = () => {
    setJobDescriptionVisibility(false);
  };
  const handleCardChange = data => {
    if (data) {
      setCard(data);
      setCardId(data.cardId);
    }
  };
  const number = card?.cardNumber?.slice(12, 16);
  return (
    <>
      <Modal
        isVisible={isVisible}
        swipeDirection="down"
        onSwipeComplete={e => {
          onModalClose(false);
        }}
        onBackdropPress={e => {
          onModalClose(false);
        }}
        backdropOpacity={0.2}
        style={styles.modalContainer}>
        <View style={styles.modalInnerContainer}>
          <View style={styles.modelButton}></View>
          <View style={styles.imageContainer}>
            <Image
              style={styles.img}
              source={toolsImg}
              resizeMode={'contain'}
            />
          </View>
          <View style={styles.textContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.text}>{title}</Text>
              <Text style={styles.text}>${parseFloat(price).toFixed(2)}</Text>
            </View>

            {/* <Text style={styles.text2}>Arrival estimated 7:25 AM</Text> */}
            <View style={styles.descContainer}>
              <Text style={styles.text2}>Getting work done fast </Text>
              <TouchableOpacity
                onPress={() => setJobDescriptionVisibility(true)}>
                <Icon name={'info'} size={20} color={'#ccc'} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.modalFooterText}>
            {!card ? (
              <TouchableOpacity
                onPress={() => setPaymentMethod(true)}
                style={styles.card}>
                <Text style={styles.paymentText}>
                  {'Select a payment method '}
                </Text>
                <Icon name={'chevron-right'} size={25} color={'black'} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.card}
                onPress={() => setPaymentMethod(true)}>
                <View style={styles.cardImageContainer}>
                  {card?.cardType === 'visa' ? (
                    <Image
                      style={styles.img}
                      source={visaImg}
                      resizeMode={'contain'}
                    />
                  ) : (
                    <Image
                      style={styles.img}
                      source={mastercardImg}
                      resizeMode={'contain'}
                    />
                  )}
                </View>
                <Text style={styles.text3}>{`ending in ${number} `}</Text>
                <Icon name={'chevron-right'} size={25} color={'black'} />
              </TouchableOpacity>
            )}
            <Button
              disabled={card ? false : true}
              title={'Confirm'}
              onPress={handleConfirm}
              buttonStyle={styles.buttonText}
              backgroundColor={R.colors.LIGHT_GREEN}
            />
          </View>
        </View>
        <Loader message="2" loading={loading} />
      </Modal>
      <SelectACardModal
        isVisible={paymentMethod}
        onModalClose={onSelectACardClose}
        onCardChange={handleCardChange}
        card={card}
      />
      {confirmationVisible && (
        <ConfirmationModal
          isVisible={confirmationVisible}
          onModalClose={onConfirmaionModalClose}
          confirmationText={
            'There are not a lot of people to take your request at this time so you may not get your job done at the moment.'
          }
          onConfirm={handleOnConfirm}
        />
      )}
      {jobDescriptionVis && (
        <JobDescription
          isVisible={jobDescriptionVis}
          onModalClose={onJobDescriptionModalClose}
        />
      )}
    </>
  );
};

export default PostAndPaymentMethod;

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
    margin: 0,
  },
  modalInnerContainer: {
    backgroundColor: 'white',
    // minHeight: 150,
    borderRadius: 20,
    justifyContent: 'space-between',
    padding: 10,
    flexDirection: 'column',
  },
  modalFooterText: {
    flexDirection: 'column',
    flex: 1,
    borderTopWidth: 1,
    borderColor: R.colors.CGRAY,
    justifyContent: 'space-between',
    padding: 20,
  },
  buttonText: {
    marginHorizontal: 5,
    // backgroundColor: R.colors.LIGHT_GREEN,
    alignSelf: 'center',
  },
  sureText: {
    color: R.colors.PRIMARI_DARK,
    fontFamily: R.fonts.Bold,
    fontSize: R.fontSize.L,
    textAlign: 'center',
    marginVertical: 10,
  },
  imageContainer: {
    width: '10%',
    height: '20%',
    borderRadius: 30,
    alignSelf: 'center',
    marginVertical: 10,
  },
  img: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
  },
  textContainer: {
    flexDirection: 'column',
    alignSelf: 'center',
    paddingHorizontal: 20,
    width: '100%',
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: R.colors.PRIMARI_DARK,
    fontFamily: R.fonts.Bold,
    fontSize: R.fontSize.L,
  },
  text2: {
    marginVertical: 10,
  },
  paymentText: {
    alignSelf: 'center',
    fontSize: R.fontSize.L,
    color: R.colors.PRIMARI_DARK,
  },
  card: {
    flexDirection: 'row',
    flex: 1,
    // width: '50%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImageContainer: {height: '60%', width: '25%'},
  text3: {
    marginVertical: 10,
    color: R.colors.PRIMARI_DARK,
    fontSize: R.fontSize.M,
  },
  modelButton: {
    alignSelf: 'center',
    marginVertical: 0,
    width: 70,
    height: 4,
    backgroundColor: R.colors.LIGHTGRAY_1,
    borderRadius: 10,
  },
  descContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
