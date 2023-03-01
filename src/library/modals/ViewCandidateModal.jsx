import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Platform,
} from 'react-native';
import Button from 'library/commons/Button';
import Profile from 'library/commons/Profile';
import ReviewModal from 'library/modals/ReviewModal';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import Modal from 'react-native-modal';
import R from 'resources/R';
import PaymentOverviewModel from './PaymentOverviewModal';
import MessagingModal from './MessagingModal';
import PaymentStatusModal from './PaymentStatusModal';
import SelectACardModal from './SelectACardModal';
const ViewCandidateModal = ({isVisible, onModalClose, onConfirm, children}) => {
  const navigation = useNavigation();
  const user = useSelector(state => state?.user.user);
  const [hasEquipment, setEquipment] = useState(true);
  const [reviewModalVis, setReviewModal] = useState(false);
  const [messagingModal, setMessagingModal] = useState(false);
  // const [paymentOverviewVisible, setPaymentOverviewVisible] = useState(false);
  const [paymentStatusVisible, setPaymentStatusVisible] = useState(false);
  const [selectACardModal, setSelectACardModal] = useState(false);
  function handleModalClose() {
    setReviewModal(false);
  }
  // const handlePaymentOverviewClose = () => {
  //   setPaymentOverviewVisible(false);
  //   onModalClose();
  // };
  const onMessagingModalClose = () => {
    setMessagingModal(false);
  };
  // const onPaymentStatusModalClose = data => {
  //   if (data === 'change-card') {
  //     setSelectACardModal(true);
  //   }
  //   setPaymentStatusVisible(false);
  // };
  // const onSelectACardModalClose = () => {
  //   setPaymentStatusVisible(true);
  //   setSelectACardModal(false);
  // };
  const height = Dimensions.get('window').height;
  return (
    <>
      <Modal
        isVisible={isVisible}
        // swipeDirection="down"
        // onSwipeComplete={e => {
        //   onModalClose(false);
        // }}
        backdropOpacity={0.2}
        onBackdropPress={e => {
          onModalClose(false);
        }}
        style={styles.modalContainer}>
        <View style={styles.modalInnerContainer}>
          {/* <View style={{flexDirection: 'column', flex: 1}}> */}
          {/* <View style={{padding: 10}}> */}
          <View style={styles.modelButton}></View>
          <FlatList
            data={[1, 2, 3, 4, 5]}
            keyExtractor={item => `${item}`}
            pagingEnabled={true}
            contentContainerStyle={{}}
            showsVerticalScrollIndicator={false}
            renderItem={item => (
              <View style={styles.slidContainer}>
                <View style={styles.headerContainer}>
                  <Text style={styles.countText}>1 of 5</Text>
                  <Text style={styles.headerText}>Candidate</Text>
                </View>

                <View style={styles.labelcontainer}>
                  <Profile user={user} setReviewModal={setReviewModal} />
                </View>

                <View style={styles.msgContainer}>
                  <Button
                    title={'Messgae'}
                    onPress={() => setMessagingModal(true)}
                    buttonStyle={styles.buttonStyle}
                  />
                </View>

                <View style={styles.txtContainer}>
                  <Text style={styles.skillsText}>
                    Similar projects completed: 10
                  </Text>
                  <Text style={styles.skillsText}>
                    Work Pace:
                    <Text style={styles.averageText}>Below average</Text>
                  </Text>
                  <Text
                    style={
                      hasEquipment
                        ? styles.equipmentText
                        : styles.equipmentTextSecond
                    }>
                    Has Equipment
                  </Text>
                  <Text style={styles.skillsText}>
                    Est. arrival time: 7:45 pm
                  </Text>
                  <Text style={styles.skillsText}>50 Miles Away</Text>
                </View>
                <View style={styles.finalButton}>
                  <Button
                    title={'Accept'}
                    buttonStyle={{backgroundColor: '#1730B1'}}
                    onPress={() => onModalClose(false)}
                  />
                </View>
              </View>
            )}
          />
        </View>
      </Modal>
      {reviewModalVis && (
        <ReviewModal
          isVisible={reviewModalVis}
          onModalClose={handleModalClose}
        />
      )}
      {/* {paymentOverviewVisible && (
        <PaymentOverviewModel
          isVisible={paymentOverviewVisible}
          onModalClose={handlePaymentOverviewClose}
        />
      )} */}
      {messagingModal && (
        <MessagingModal
          isVisible={messagingModal}
          onModalClose={onMessagingModalClose}
        />
      )}
      {/* {paymentStatusVisible && (
        <PaymentStatusModal
          isVisible={paymentStatusVisible}
          onModalClose={onPaymentStatusModalClose}
          page={'success'}
          cardDetails={'dvej'}
        />
      )} */}
      {/* {selectACardModal && (
        <SelectACardModal
          isVisible={selectACardModal}
          onModalClose={onSelectACardModalClose}
        />
      )} */}
    </>
  );
};

export default ViewCandidateModal;

const styles = StyleSheet.create({
  modalInnerContainer: {
    backgroundColor: 'white',
    maxHeight: '88%',
    borderRadius: 20,
    justifyContent: 'space-around',
    padding: 10,
    flexDirection: 'column',
    // flex: 1,
  },
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
    borderRadius: 20,
    overflow: 'hidden',
    // height: '70%',
  },
  labelcontainer: {height: '40%', width: '90%', alignSelf: 'center'},
  headerText: {
    textAlign: 'center',
    fontSize: R.fontSize.XL,
    fontFamily: R.fonts.Bold,
    color: R.colors.SECONDARY,
  },
  img: {
    top: 30,
    height: 100,
    width: 100,
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 120,
  },
  profileContainer: {},
  msgContainer: {
    flex: 1,
    width: '50%',
    alignSelf: 'center',
  },
  buttonStyle: {
    backgroundColor: '#118CFE',
  },
  txtContainer: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  skillsText: {
    textAlign: 'center',
    fontSize: 18,
    color: R.colors.PRIMARI_DARK,
    fontFamily: R.fonts.Bold,
  },
  skillsTextValue: {
    color: '#2ECC71',
    fontSize: 18,
    textAlign: 'center',
  },
  distanceText: {
    fontSize: 20,
    color: R.colors.PRIMARI_DARK,
    textAlign: 'center',
  },

  final: {
    flexDirection: 'column',
  },

  finalButton: {
    // height: '10%',
    marginHorizontal: 20,
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 2,
  },
  slidContainer: {
    height:
      Platform.OS === 'ios'
        ? Dimensions.get('window').height - 260
        : Dimensions.get('window').height - 144,

    // marginBottom: 100,
  },
  headerContainer: {
    flexDirection: 'row',
    height: '5%',
    marginTop: 20,
  },
  countText: {
    flex: 0.4,
    marginLeft: 40,
    color: R.colors.PRIMARI_DARK,
    fontFamily: R.fonts.Bold,
    fontSize: R.fontSize.M,
    // textAlign: 'center'
  },
  averageText: {
    color: R.colors.RED,
  },
  equipmentText: {
    color: R.colors.LIGHT_GREEN,
    textAlign: 'center',
    fontSize: R.fontSize.L,
    fontFamily: R.fonts.Bold,
    marginVertical: 10,
  },
  equipmentTextSecond: {
    color: R.colors.RED,
    textAlign: 'center',
    fontSize: R.fontSize.L,
    fontFamily: R.fonts.Bold,
    marginVertical: 10,
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
