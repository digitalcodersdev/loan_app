import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import R from 'resources/R';
import Modal from 'react-native-modal';
/*
 * This function is used to create option picker
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const ComplexityPicker = ({
  isVisible,
  onModalClose,
  onValueChange,
  options,
}) => {
  const [value, setValue] = useState(null);
  const [isSelected, setSelected] = useState();
  const handleValueChange = (_value, index) => {
    setValue(_value);
    setSelected(index);
    onValueChange && onValueChange(_value.id);
    onModalClose(false);
  };
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.2}
      onSwipeComplete={e => {
        onModalClose(false);
      }}
      onBackdropPress={e => {
        onModalClose(false);
      }}
      style={styles.modalContainer}>
      <View style={styles.modalInnerContainer}>
        <View style={styles.modalBody}>
          {options.map((item, index) => (
            <View key={`${index}`} style={styles.item}>
              <TouchableOpacity onPress={() => handleValueChange(item, index)}>
                <View style={styles.itemInner}>
                  <Text style={styles.itemText}> {item.title} </Text>
                  <View
                    style={
                      isSelected === index
                        ? styles.selectedCircle
                        : styles.circle
                    }></View>
                </View>
                {item.shortDesc ? (
                  <Text style={styles.itemSubtitle}>{item.shortDesc}</Text>
                ) : null}
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </Modal>
  );
};
export default ComplexityPicker;
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  modalHeaderText: {
    textAlign: 'center',
    fontFamily: R.fonts.Bold,
    fontSize: R.fontSize.L,
  },
  modalContainer: {
    justifyContent: 'flex-end',
    height: '100%',
    width: '100%',
    margin: 0,
  },
  item: {
    marginBottom: 10,
  },
  itemIcon: {
    width: 50,
  },
  modalInnerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderColor: 'white',
  },
  modalBody: {
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  itemText: {
    // fontFamily: R.fonts.Bold,
    color: R.colors.PRIMARI_DARK,
    fontSize: R.fontSize.L,
    paddingVertical: 10,
  },

  itemInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemSubtitle: {
    paddingLeft: 5,
  },
  circle: {
    width: '5%',
    height: '45%',
    backgroundColor: R.colors.CGRAY,
    justifyContent: 'flex-end',
    borderRadius: 20,
  },
  selectedCircle: {
    width: '5%',
    height: '45%',
    backgroundColor: R.colors.LIGHT_GREEN,
    justifyContent: 'flex-end',
    borderRadius: 20,
  },
});
