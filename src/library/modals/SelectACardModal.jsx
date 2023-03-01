import React, {useState, useEffect} from 'react';
import Modal from 'react-native-modal';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import Button from 'library/commons/Button';
import RadioButton from 'library/commons/RadioButton';
import {useNavigation} from '@react-navigation/native';
import {SwipeListView} from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/MaterialIcons';
import R from 'resources/R';
import AddCardModal from './AddCardModal';
import ConfirmationModal from './ConfirmationModal';
import {getCards, setDefaultCard} from '../../store/actions/userActions';
import {useSelector, useDispatch} from 'react-redux';
import visaImg from '../../assets/images/visa.png';
import mastercardImg from '../../assets/images/mastercard.png';
/*
 * This function Component is used to render  Select A Card  Screen
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const SelectACardModal = ({isVisible, onModalClose, onCardChange, card}) => {
  const dispatch = useDispatch();
  const cards = useSelector(state => state.card.card);
  //   const selectCard = route?.params?.selectCard || false;
  const [addCardModalVisible, setAddCardModalVisible] = useState(false);

  useEffect(() => {
    if (!cards) {
      dispatch(getCards());
    }
  }, []);
  const deleteAction = index => {
    // delete card action will be dispatch here
  };
  const onAddCardModalClose = () => {
    setAddCardModalVisible(false);
  };
  const renderItem = (data, index) => {
    let {item} = data;
    const handleSelectCard = async card => {
      // setLoading(true);
      // const res = await dispatch(setDefaultCard(cardId));
      // if (res) {
      //   setLoading(false);
      // }
      onModalClose(false);
      onCardChange && onCardChange(card);
    };
    const number = item?.cardNumber?.slice(13, 16);
    return (
      <TouchableWithoutFeedback
        key={index.toString()}
        onPress={() => handleSelectCard(item)}
        style={styles.itemContainer}>
        <View style={styles.cardContainer}>
          <View style={styles.cardInnerContainer}>
            <View style={styles.imgContainer}>
              {item.cardType === 'visa' ? (
                <Image
                  source={visaImg}
                  resizeMode={'contain'}
                  style={styles.image}
                />
              ) : (
                <Image
                  source={mastercardImg}
                  resizeMode={'contain'}
                  style={styles.image}
                />
              )}
            </View>
            <Text style={styles.cardDetail}>ending in {number}</Text>
            {/* <Text style={styles.cardDetail}>{item.cardHolder}</Text> */}
            <Text style={styles.cardDetail}>
              {item.expiryMonth}/{item.expiryYear}
            </Text>
            <RadioButton
              key={`${item.id}`}
              checked={item.cardId === card?.cardId ? true : false}
              handleOnPress={() => handleSelectCard(item)}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  const renderHiddenItem = ({item, index}) => {
    return (
      <Pressable
        onPress={() => deleteAction(index)}
        style={{
          width: 50,
          height: '100%',
          alignSelf: 'flex-end',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon name="delete" size={25} color="red" />
      </Pressable>
    );
  };
  // const handleConfirm = () => {
  //   onModalClose('confirm');
  // };
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
        <View style={styles.modalInnerContainer}>
          <View style={styles.modelButton}></View>
          <View style={styles.mainContainer}>
            <View>
              <View style={styles.txtContainer}>
                <Text style={styles.headerText}>Select a Card</Text>
              </View>
              <View style={{marginTop: 20}}>
                {cards.length > 0 ? (
                  <SwipeListView
                    data={cards}
                    renderItem={(item, index) => renderItem(item, index)}
                    renderHiddenItem={renderHiddenItem}
                    disableRightSwipe
                    leftOpenValue={55}
                    rightOpenValue={-55}
                    // previewRowKey={'0'}
                    previewOpenValue={-40}
                    // previewOpenDelay={3000}
                  />
                ) : (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text>Add a payment method for your job</Text>
                  </View>
                )}
              </View>
            </View>
            <View style={styles.lastContainerStyle}>
              {/* {selectCard ? (
              <View style={styles.btnContainer}>
                <Button
                  title={'Continue'}
                  buttonStyle={styles.Button}
                  onPress={() =>
                    navigation.navigate(ScreensNameEnum.OPEN_JOB_SCREEN)
                  }
                />
              </View>
            ) : ( */}
              <View style={styles.btnContainer}>
                <Button
                  title={'Add New'}
                  onPress={() => setAddCardModalVisible(true)}
                  buttonStyle={styles.Button}
                />
              </View>
              {/* )} */}
            </View>
          </View>
        </View>
      </Modal>
      {addCardModalVisible && (
        <AddCardModal
          isVisible={addCardModalVisible}
          onModalClose={onAddCardModalClose}
        />
      )}
    </>
  );
};

export default SelectACardModal;

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
    maxHeight: '80%',
    minHeight: '60%',
    borderRadius: 20,
    justifyContent: 'space-between',
    padding: 10,
    flexDirection: 'column',
  },
  mainContainer: {
    flexDirection: 'column',
    padding: 20,
    justifyContent: 'space-between',
    flex: 1,
  },
  itemContainer: {marginBottom: 20, borderWidth: 1, borderColor: 'red'},
  txtContainer: {
    justifyContent: 'center',
  },
  headerText: {
    textAlign: 'center',
    fontSize: R.fontSize.XL,
    fontFamily: R.fonts.Bold,
    color: R.colors.PRIMARI_DARK,
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
    flex: 1,
  },
  cardDetail: {
    color: R.colors.PRIMARI_DARK,
    fontSize: R.fontSize.M,
    fontFamily: R.fonts.Regular,
  },
  lastContainerStyle: {
    flexDirection: 'column',
  },
  isChecked: {
    // flex: 0.2,
  },
  Button: {},
  btnContainer: {
    // paddingVertical: 20,
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
  imgContainer: {
    height: '100%',
    width: '10%',
  },
  image: {
    height: '100%',
    width: '100%',
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
