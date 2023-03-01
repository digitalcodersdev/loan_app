import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Accordian from 'library/commons/Accordian';
import Modal from 'react-native-modal';
import R from 'resources/R';
import {useSelector, useDispatch} from 'react-redux';
import {getSkills} from '../../store/actions/jobActions';
/*
 * This function is used to print skills
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const Skills = ({
  isVisible,
  onModalClose,
  onSkillSelect,
  defaultValues = [],
  onConfirm,
}) => {
  const dispatch = useDispatch();
  const [selectedSkills, setSelectedSkills] = useState([]);
  const skills = useSelector(state => state.jobs.jobSkills);

  useEffect(() => {
    dispatch(getSkills());
  }, [dispatch]);
  // useEffect(() => {
  //   if (defaultValues) {
  //     setSelectedSkills(defaultValues);
  //   }
  // });
  // const handleOnSubmit = () => {
  //   onModalClose && onModalClose(false);
  //   updateSkills && updateSkills(selectedSkills);
  // };
  const onSkillChange = skills => {
    setSelectedSkills([...selectedSkills, skills.id]);
    onSkillSelect(skills);
  };
  return (
    <Modal
      isVisible={isVisible}
      swipeDirection="down"
      onSwipeComplete={e => {
        onModalClose(false);
      }}
      onBackdropPress={e => {
        onModalClose(false);
      }}
      style={styles.modalContainer}>
      <View style={styles.modalInnerContainer}>
        <View style={styles.backgroundColor}>
          <View style={styles.modelButton}></View>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>
              We will be adding more categories soon!
            </Text>
          </View>

          <View style={styles.limitScroll}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {skills
                ? skills.map((item, index) => (
                    <Accordian
                      key={`accordion_${index}`}
                      title={item.title}
                      data={item.skill}
                      onSkillChange={onSkillChange}
                      selectedSkills={selectedSkills}
                    />
                  ))
                : null}
            </ScrollView>
          </View>
          {/* <View style={styles.btncontainer}>
            <Button title={'Confirm'} onPress={handleOnSubmit} />
          </View> */}
        </View>
      </View>
    </Modal>
  );
};

export default Skills;

const styles = StyleSheet.create({
  modalHeader: {
    marginBottom: 20,
  },
  modalHeaderText: {
    textAlign: 'center',
    fontFamily: R.fonts.Bold,
    fontSize: R.fontSize.S,
    marginTop: 10,
  },
  limitScroll: {height: '100%'},
  closeBtn: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  btncontainer: {},

  messageText: {
    fontSize: 50,
    marginBottom: 40,
    // fontFamily: R.fonts.LatoBlack,
    textAlign: 'center',
  },
  modalContent: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalWraper: {backgroundColor: 'rgba(0,0,0,0.5)', flex: 1},
  backgroundColor: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
  },
  skillsMain: {
    display: 'flex',
    flexDirection: 'column',
    margin: 20,
  },
  fields: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txt: {
    color: R.colors.PRIMARI_DARK,
    fontSize: 16,
  },
  checkBox: {
    marginRight: 30,
  },
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
    borderRadius: 20,
    overflow: 'hidden',
  },
  modal: {
    backgroundColor: 'white',
  },
  modalInnerContainer: {
    backgroundColor: 'white',
    minHeight: '80%',
    borderRadius: 20,
    justifyContent: 'space-between',
    padding: 15,
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
