import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Pressable,
} from 'react-native';
import Modal from 'react-native-modal';
import ContactOptionsModal from './ContactOptionsModal';
import R from 'resources/R';
/*
 * This function is used to create the Dispute Options Modal
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const DATA = [
  {id: 1, disputeText: 'Property damaged'},
  {id: 2, disputeText: 'Hazardous working'},
  {id: 3, disputeText: 'Inappropriate remarks or actions'},
  {id: 4, disputeText: 'Uncomfortable requests'},
  {id: 5, disputeText: 'Unpermitted recording'},
  {id: 6, disputeText: 'Lacked experience'},
  {id: 7, disputeText: 'Work not matching profile skills'},
  {id: 8, disputeText: 'No intent to work'},
  {id: 9, disputeText: 'Job not completed'},
];
const DisputeModal = ({
  isVisible,
  onModalClose,
  onDisputeSelect,
  defaultDispute,
}) => {
  const [selectedDispute, setSelectedDispute] = useState(
    defaultDispute ? defaultDispute : null,
  );
  const [contactModalVis, setConfirmModalVisibility] = useState(false);
  const handleConfirm = id => {
    setSelectedDispute(id);
    setConfirmModalVisibility(true);
    onDisputeSelect && onDisputeSelect(id);
    onModalClose(false);
  };
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
          {/* <Pressable
          onPress={() => {
            onConfirm && onConfirm(selectedDispute);
            onModalClose();
          }}>
          <Icon name={'arrow-circle-down'} size={30} />
        </Pressable> */}

          <Text style={styles.headerText}>Dispute Request</Text>

          <View style={styles.listContainer}>
            <FlatList
              data={DATA}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={
                      selectedDispute === item.id
                        ? styles.selectedContainer
                        : styles.itemContainer
                    }
                    onPress={() => {
                      handleConfirm(item.id);
                    }}>
                    <Text
                      style={
                        selectedDispute === item.id
                          ? styles.itemSelected
                          : styles.item
                      }>
                      {item.disputeText}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </Modal>
      <ContactOptionsModal
        isVisible={contactModalVis}
        onModalClose={setConfirmModalVisibility}
      />
    </>
  );
};

export default DisputeModal;

const styles = StyleSheet.create({
  modalContainer: {
    margin: 20,
    overflow: 'hidden',
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalInnerContainer: {
    backgroundColor: 'white',
    // minHeight: 150,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: 20,
    maxHeight: '90%',
    minHeight: '80%',
  },
  headerText: {
    color: R.colors.PRIMARI_DARK,
    fontSize: R.fontSize.XL,
    fontFamily: R.fonts.Bold,
    alignSelf: 'center',
  },
  item: {
    color: R.colors.PRIMARI_DARK,
    fontSize: R.fontSize.L,
    alignSelf: 'center',
    borderColor: R.colors.RED,
    marginVertical: 10,
  },
  itemSelected: {
    color: 'white',
    fontSize: R.fontSize.L,
    alignSelf: 'center',
    borderColor: R.colors.RED,
    marginVertical: 10,
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  selectedContainer: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    backgroundColor: '#E3AB1A',
    borderRadius: 20,
  },
  listContainer: {
    marginTop: 30,
  },
});
