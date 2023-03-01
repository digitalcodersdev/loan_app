import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Pressable,
  TouchableWithoutFeedback,
  Image,
  ActivityIndicator,
} from 'react-native';
import Button from 'library/commons/Button';
import RadioButton from 'library/commons/RadioButton';
import ScreenWrapper from 'library/wrapper/ScreenWrapper';
import {SwipeListView} from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import AddCardModal from 'library/modals/AddCardModal';
import {useSelector, useDispatch} from 'react-redux';
import {
  getCards,
  deleteCard,
  setDefaultCard,
} from '../../../store/actions/userActions';
import Loader from 'library/commons/Loader';
import ConfirmationModal from 'library/modals/ConfirmationModal';
import visaImg from '../../../assets/images/visa.png';
import mastercardImg from '../../../assets/images/mastercard.png';
/*
 * This function Component is used to render  Select A Card  Screen
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */

const SelectACardScreen = ({route}) => {
  const dispatch = useDispatch();
  const cards = useSelector(state => state.card.card);
  const selectCard = route?.params?.selectCard || false;
  const [isVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isConfirmationVisible, setConfirmationModalVisible] = useState();
  const [deleteCardId, setDeleteCardId] = useState('');
  const [defaultCardId, setDefaultCardId] = useState();
  useEffect(() => {
    dispatch(getCards());
  }, []);
  const deleteAction = () => {
    // delete card action will be dispatch here
    // setLoading(true);
    dispatch(deleteCard(deleteCardId));
    // if (res) {
    //   setLoading(false);
    // }
  };
  const onAddCardModalClose = () => {
    setModalVisible(false);
  };
  const onConfirmaionModalClose = data => {
    if (data === 'cancel') {
      setConfirmationModalVisible(false);
    }
    setConfirmationModalVisible(false);
  };
  const renderItem = (data, index) => {
    let {item} = data;
    const handleDefault = async cardId => {
      const defaultCard = cards.filter(item => {
        if (item.default) {
          return item.cardId;
        }
      });
      if (defaultCard[0].cardId === cardId) {
      } else {
        setDefaultCardId(cardId);
        const res = await dispatch(setDefaultCard(cardId));
        // setLoading(false);
      }
    };
    const number = item?.cardNumber?.slice(13, 16);
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          handleDefault(item.cardId);
        }}
        key={index.toString()}
        style={styles.itemContainer}>
        <View style={styles.cardContainer}>
          <View style={styles.cardInnerContainer}>
            <View style={styles.cardImage}>
              {item.cardType === 'visa' ? (
                <Image
                  source={visaImg}
                  resizeMode={'contain'}
                  style={{height: 30, width: 30}}
                />
              ) : (
                <Image
                  source={mastercardImg}
                  resizeMode={'contain'}
                  style={{height: 30, width: 30}}
                />
              )}
            </View>
            <Text style={styles.cardDetail}>ending in {number}</Text>
            {/* <Text style={styles.cardDetail}>{item.cardHolderName}</Text> */}
            <Text style={styles.cardDetail}>
              {item.expiryMonth}/{item.expiryYear}
            </Text>
            <RadioButton
              key={`${item.id}`}
              checked={item.default || defaultCardId === item.cardId ? true : false}
              handleOnPress={() => void 0}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  const renderHiddenItem = ({item, index}) => {
    return (
      <Pressable
        onPress={() => {
          setDeleteCardId(item.cardId);
          setConfirmationModalVisible(true);
        }}
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
  return (
    <>
      <ScreenWrapper>
        <View style={styles.mainContainer}>
          <View>
            <View style={styles.txtContainer}>
              <Text style={styles.headerText}>Payment Methods</Text>
            </View>
            <View style={{marginTop: 20}}>
              <ActivityIndicator size={'large'} animating={loading} />
              <SwipeListView
                data={cards}
                renderItem={(data, index) => renderItem(data, index)}
                renderHiddenItem={(item, index) =>
                  renderHiddenItem(item, index)
                }
                disableRightSwipe
                leftOpenValue={55}
                rightOpenValue={-55}
                // previewRowKey={'0'}
                previewOpenValue={-40}
                // previewOpenDelay={3000}
              />
            </View>
          </View>
          <View style={styles.lastContainerStyle}>
            {selectCard ? (
              <View style={styles.btnContainer}>
                <Button
                  title={'Continue'}
                  buttonStyle={styles.Button}
                  // onPress={() =>
                  //   navigation.navigate(ScreensNameEnum.OPEN_JOB_SCREEN)
                  // }
                />
              </View>
            ) : (
              <View style={styles.btnContainer}>
                <Button
                  title={'Add New'}
                  onPress={() => setModalVisible(true)}
                  buttonStyle={styles.Button}
                />
              </View>
            )}
          </View>
        </View>
      </ScreenWrapper>
      {isVisible && (
        <AddCardModal
          isVisible={isVisible}
          onModalClose={onAddCardModalClose}
        />
      )}
      <Loader message="5" loading={loading} />
      <ConfirmationModal
        isVisible={isConfirmationVisible}
        onModalClose={onConfirmaionModalClose}
        confirmationText={'You want to remove this card.'}
        onConfirm={deleteAction}
      />
    </>
  );
};
export default SelectACardScreen;
