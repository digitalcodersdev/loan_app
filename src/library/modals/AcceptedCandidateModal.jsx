import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import Button from 'library/commons/Button';
import Profile from 'library/commons/Profile';
import BottomBar from 'library/commons/BottomBar';
import ScreenWrapper from 'library/wrapper/ScreenWrapper';
import ReviewModal from 'library/modals/ReviewModal';
import {useNavigation} from '@react-navigation/native';
import ScreensNameEnum from '../../constants/ScreensNameEnum';
import {useSelector, useDispatch} from 'react-redux';
import R from 'resources/R';
import ProviderProfileModal from './ProviderProfileModal';
import MessagingModal from './MessagingModal';
/*
 * This Component is used to render  Accepted  Candidate
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const AcceptedCandidateModal = ({isVisible, onModalClose}) => {
  const navigation = useNavigation();
  const user = useSelector(state => state?.user.user);
  const [isReviewModalVisible, setModalVisible] = React.useState(false);
  const [profileVisible, setProfileVisible] = React.useState(false);
  const [messagingModal, setMessagingModal] = React.useState(false);
  const [isAccepted, setAccepted] = React.useState(false);
  function handleModalClose() {
    setModalVisible(false);
  }
  const handleProfileClose = () => {
    setProfileVisible(false);
  };
  const onMessagingModalClose = () => {
    setMessagingModal(false);
  };
  return (
    <>
      <Modal
        isVisible={isVisible}
        swipeDirection="down"
        backdropOpacity={0.2}
        onSwipeComplete={e => {
          onModalClose(false);
        }}
        onBackdropPress={e => {
          onModalClose(false);
        }}
        backdropOpacity={0.2}
        style={styles.modalContainer}>
        <View style={styles.modalInnerContainer}>
          <View style={styles.slidContainer}>
            <View style={styles.modelButton}></View>
            <View style={styles.headerContainer}>
              <View style={styles.pageCounts}>
                <Text style={styles.countText}>1 of 5</Text>
              </View>
              <View style={styles.camdidateCon}>
                <Text style={styles.headerText}> Candidate</Text>
              </View>
            </View>

            <View style={styles.labelcontainer}>
              <Profile user={user} />
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
                No similar projects completed
              </Text>
              <Text style={styles.workPace}>
                Work Pace: <Text style={styles.averaeText}>Average</Text>
              </Text>
              <Text style={styles.averageText}>Has Required Equipment</Text>
              <Text style={styles.milesText}>50 Miles Away</Text>
            </View>
            {/* <View style={styles.final}> */}
            <View style={styles.finalButton}>
              <Button
                title={'Accepted'}
                buttonStyle={{backgroundColor: R.colors.PRIMARY_LIGHT}}
                textColor={R.colors.PRIMARI_DARK}
                onPress={() => {}}
              />
            </View>
            {/* )} */}
            {/* </View> */}
          </View>
        </View>
      </Modal>
      <ReviewModal
        isVisible={isReviewModalVisible}
        onModalClose={handleModalClose}
      />
      <ProviderProfileModal
        isVisible={profileVisible}
        onModalClose={handleProfileClose}
      />
      {messagingModal && (
        <MessagingModal
          isVisible={messagingModal}
          onModalClose={onMessagingModalClose}
        />
      )}
    </>
  );
};

export default AcceptedCandidateModal;

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
    borderRadius: 20,
    overflow: 'hidden',
  },
  modalInnerContainer: {
    backgroundColor: 'white',
    maxHeight: '90%',
    borderRadius: 20,
    justifyContent: 'space-between',
    paddingVertical: 20,
  },

  labelcontainer: {
    height: '40%',
    width: '80%',
    alignSelf: 'center',
  },
  headerText: {
    // textAlign: 'center',
    fontSize: R.fontSize.XXL,
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
  },
  skillsText: {
    textAlign: 'center',
    fontSize: R.fontSize.XL,
    color: R.colors.PRIMARI_DARK,
    fontFamily: R.fonts.Bold,
  },
  milesText: {
    textAlign: 'center',
    fontSize: R.fontSize.XXL,
    color: R.colors.PRIMARI_DARK,
    fontFamily: R.fonts.Bold,
    marginVertical: 20,
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

  finalButton: {marginHorizontal: 20},
  slidContainer: {
    height:
      Platform.OS === 'ios'
        ? Dimensions.get('window').height - 260
        : Dimensions.get('window').height - 144,

    // marginBottom: 100,
  },
  borromContainer: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    height: '6%',
    marginVertical: 10,
  },
  countText: {
    flex: 0.4,
    marginLeft: 40,
    color: R.colors.PRIMARI_DARK,
    fontFamily: R.fonts.Bold,
    fontSize: R.fontSize.M,
    // textAlign: 'center'
    // height: '100%',
  },
  averageText: {
    color: R.colors.LIGHT_GREEN,
    textAlign: 'center',
    fontSize: R.fontSize.XXL,
    marginVertical: 20,
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
  pageCounts: {
    flex: 0.6,
  },
  camdidateCon: {
    flex: 1,
  },
  workPace: {
    color: R.colors.PRIMARI_DARK,
    fontFamily: R.fonts.Bold,
    fontSize: R.fontSize.L,
    textAlign: 'center',
  },
  averaeText: {
    color: R.colors.primary,
    fontFamily: R.fonts.Bold,
    fontSize: R.fontSize.L,
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
