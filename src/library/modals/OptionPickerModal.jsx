import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import R from 'resources/R';
import Modal from 'react-native-modal';
/*
 * This function is used to create option picker for skills
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const OptionPickerModal = ({
  isVisible,
  onModalClose,
  onValueChange,
  options,
  isMultiSelect,
  defultValues = [],
}) => {
  const [selectedType, setSelected] = useState(defultValues);

  useEffect(() => {
    const skillsObj = [];
    if (selectedType) {
      options.forEach(_item => {
        if (selectedType.includes(_item.id)) {
          skillsObj.push({
            skillId: _item.id,
            parentSkill: _item.parentId,
            price: _item.price,
            title:_item.title,
          });
        }
      });
    }
    onValueChange && onValueChange(skillsObj);
  }, [selectedType]);
  const handleValueChange = (item, index) => {
    if (isMultiSelect) {
      if (selectedType.includes(item.id)) {
        const itemIndex = selectedType.indexOf(item.id);
        selectedType.splice(itemIndex, 1);
        setSelected(selectedType);
      } else {
        setSelected([...selectedType, item.id]);
      }
    } else {
      setSelected([item.id]);

      onModalClose(false);
    }
  };
  return (
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
        <View style={styles.modalBody}>
          {options.map((item, index) =>
            isMultiSelect ? (
              <View key={`${index}`} style={styles.item}>
                <TouchableOpacity
                  onPress={() => handleValueChange(item, index)}>
                  <View style={styles.itemInner}>
                    {item.icon ? (
                      <View style={styles.itemIcon}>
                        <Icon
                          name={item.icon}
                          color={item.color || 'black'}
                          size={25}
                        />
                      </View>
                    ) : null}
                    <Text style={styles.itemText}> {item.title}</Text>
                    <Icon
                      name={
                        selectedType.includes(item.id)
                          ? 'check-box'
                          : 'check-box-outline-blank'
                      }
                      size={24}
                      color={
                        selectedType.includes(item.id)
                          ? R.colors.GREEN
                          : R.colors.DARKGRAY
                      }
                    />
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View key={`${index}`} style={styles.item}>
                <TouchableOpacity
                  onPress={() => handleValueChange(item, index)}>
                  <View style={styles.itemInner}>
                    <Text style={styles.itemText}>{item.title} </Text>
                    <View style={{}}>
                      <Icon
                        name={
                          selectedType.includes(item.id)
                            ? 'radio-button-checked'
                            : 'radio-button-unchecked'
                        }
                        size={24}
                        color={
                          selectedType.includes(item.id)
                            ? R.colors.GREEN
                            : R.colors.DARKGRAY
                        }
                      />
                    </View>
                  </View>
                  {item.shortDesc ? (
                    <Text style={styles.itemSubtitle}>{item.shortDesc}</Text>
                  ) : null}
                </TouchableOpacity>
              </View>
            ),
          )}
        </View>
      </View>
    </Modal>
  );
};
export default OptionPickerModal;
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
    fontFamily: R.fonts.Medium,
    fontSize: R.fontSize.L,
    color: R.colors.PRIMARI_DARK,
    paddingVertical: 10,
  },

  itemInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
