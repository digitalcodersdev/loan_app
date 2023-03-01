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
import ReportSentModal from './ReportSentModal';
import R from 'resources/R';
/*
 * This function is used to create the Message Report Options Modal
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const DATA = [
  {id: 1, disputeText: 'This is spam'},
  {id: 2, disputeText: 'This advocates self harm'},
  {id: 3, disputeText: 'This is harrassing me'},
  {id: 4, disputeText: 'User is requesting payment outside of kindajobs'},
];
const MessageReportOptions = ({
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
    setTimeout(() => setConfirmModalVisibility(false), 3000);
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

          <Text style={styles.headerText}>Report</Text>

          <View style={styles.listContainer}>
            <FlatList
              data={DATA}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={styles.itemContainer}
                    onPress={() => {
                      handleConfirm(item.id);
                    }}>
                    <Text style={styles.item}>{item.disputeText}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </Modal>
      <ReportSentModal
        isVisible={contactModalVis}
        onModalClose={() => setConfirmModalVisibility(false)}
      />
    </>
  );
};

export default MessageReportOptions;

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
    maxHeight: '50%',
    minHeight: '40%',
  },
  headerText: {
    color: R.colors.PRIMARI_DARK,
    fontSize: R.fontSize.XL,
    fontFamily: R.fonts.Bold,
    alignSelf: 'center',
  },
  item: {
    color: R.colors.PRIMARI_DARK,
    fontSize: R.fontSize.M,
    alignSelf: 'center',
    borderColor: R.colors.RED,
    marginVertical: 10,
  },
  itemSelected: {
    color: 'white',
    fontSize: R.fontSize.M,
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
