import React, {useState, useEffect} from 'react';
import {View, PermissionsAndroid} from 'react-native';
import ScreenWrapper from 'library/wrapper/ScreenWrapper';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import Button from 'library/commons/Button';
import JobPostModal from 'library/modals/JobPostModal';
import R from 'resources/R';
import ServiceProviderDetailModal from 'library/modals/ServiceProviderDetailModal';
import {useSelector, useDispatch} from 'react-redux';
import {
  getSkills,
  getCurrentJob,
  getJobApplicant,
} from '../../../store/actions/jobActions';
import {currentJobSelector} from '../../../store/slices/job/job.slice';
import BottomBar from './BottomBar';
import KindaJobMap from './KindaJobMap';
/*
 * This function Component is used to render Map screen
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
export default function HomeScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const job = useSelector(currentJobSelector);
  const skills = useSelector(state => state.jobs.jobSkills);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [modalState, setModalState] = useState({
    jobPostingModal: false,
    serviceProviderModal: false,
  });
  useEffect(() => {
    if (job && skills) {
      let skillId = job.skills?.filter(item => item.parentSkill === null)[0][
        'skillId'
      ];
      getSkillFromId(skillId, skills);
    }
  }, [job, skills]);
  function getSkillFromId(skillId, _skillList) {
    _skillList.forEach(item => {
      if (item.id === skillId) {
        setSelectedSkill(item);
      } else if (item.skill) {
        getSkillFromId(skillId, item.skill);
      }
    });
  }
  const handleModalToggle = (modal, isVisible) => {
    setModalState({...modalState, [modal]: isVisible});
  };
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'KindaJobs',
          message: 'KindaJobs access to your location ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log('You can use the location');
        // alert('You can use the location');
      } else {
        // console.log('location permission denied');
        // alert('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestLocationPermission();
    if (!job) {
      dispatch(getSkills());
      dispatch(getCurrentJob());
    }
  }, []);

  useEffect(() => {
    if (job && !job?.jobApplicant) {
      checkAccepted();
    }
  }, [job]);
  async function checkAccepted() {
    if (job && !job?.jobApplicant) {
      const res = await dispatch(getJobApplicant(job.id));
      if (!res) {
        setTimeout(checkAccepted, 5000);
      }
    }
  }

  return (
    <>
      <ScreenWrapper header={false}>
        <View style={styles.container}>
          <View style={styles.mapContainer}>
            <KindaJobMap />
            <View style={styles.backBtn}>
              <Button
                layout="circle"
                icon="menu"
                onPress={() => navigation.toggleDrawer()}
                buttonStyle={styles.drawerButton}
              />
            </View>
            {job ? (
              <View style={styles.viewJob}>
                <Button
                  title={job?.jobApplicant ? 'View Job' : 'Edit'}
                  onPress={
                    job?.jobApplicant
                      ? () => handleModalToggle('serviceProviderModal', true)
                      : () => handleModalToggle('jobPostingModal', true)
                  }
                  backgroundColor={R.colors.SECONDARY}
                  buttonStyle={{paddingHorizontal: 20, width: 140}}
                />
              </View>
            ) : null}
          </View>

          <BottomBar />
        </View>
      </ScreenWrapper>
      {modalState.jobPostingModal && selectedSkill && (
        <JobPostModal
          isVisible={modalState.jobPostingModal}
          onModalClose={visible =>
            handleModalToggle('jobPostingModal', visible)
          }
          edit={true}
          skill={selectedSkill}
          editJob={job}
        />
      )}

      {modalState.serviceProviderModal && (
        <ServiceProviderDetailModal
          isVisible={modalState.serviceProviderModal}
          onModalClose={visible =>
            handleModalToggle('serviceProviderModal', visible)
          }
        />
      )}
    </>
  );
}
