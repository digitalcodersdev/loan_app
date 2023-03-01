import React, {useState, useEffect} from 'react';
import {View, Text, Pressable, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import Button from 'library/commons/Button';
import JobPostModal from 'library/modals/JobPostModal';
import R from 'resources/R';
import Skills from 'library/modals/Skills';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ServiceProviderDetailModal from 'library/modals/ServiceProviderDetailModal';
import ViewCandidateModal from 'library/modals/ViewCandidateModal';
import MessagingModal from 'library/modals/MessagingModal';
import JobCancelModal from 'library/modals/JobCancelModal';
import ConfirmationModal from 'library/modals/ConfirmationModal';
import UserExperienceModal from 'library/modals/UserExperienceModal';
import PaymentStatusModal from 'library/modals/PaymentStatusModal';
import SelectACardModal from 'library/modals/SelectACardModal';
import {currentUserSelector} from '../../../store/slices/user/user.slice';
import {useSelector, useDispatch} from 'react-redux';
import DisputeModal from 'library/modals/DisputeModal';
import {markJobDispute} from '../../../store/actions/jobActions';
import ChatApi from 'datalib/services/chat.api';
import {
  getCurrentJob,
  cancelJob,
  updatePayment,
  confirmPayment,
} from '../../../store/actions/jobActions';
import Loader from 'library/commons/Loader';
import {
  currentJobSelector,
  jobApplicantSelector,
} from '../../../store/slices/job/job.slice';
import {getJobApplicant} from '../../../store/actions/jobActions';
import noImageImg from '../../../resources/images/noImage.png';
/*
 * This function Component is used to render Bottom components for Home screen
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
export default function BottomBar() {
  const dispatch = useDispatch();
  const user = useSelector(currentUserSelector);
  const applicant = useSelector(jobApplicantSelector);
  const job = useSelector(currentJobSelector);
  const [modalState, setModalState] = useState({
    skillSelectionModal: false,
    jobPostingModal: false,
    viewCandidateModal: false,
    messageModal: false,
    jobCancelModal: false,
    selectCardModal: false,
    paymentStatusModal: false,
    userExperienceModal: false,
    serviceProviderModal: false,
    confirmJobPaymentModal: false,
    disputeModal: false,
  });
  const handleModalToggle = (modal, isVisible) => {
    setModalState({...modalState, [modal]: isVisible});
  };
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState([]);
  const [serviceProvider, setServiceProvider] = useState(true);
  useEffect(() => {
    if (!job) {
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
      if (res.meta.requestStatus !== 'fulfilled') {
        setTimeout(checkAccepted, 5000);
      }
    }
  }

  useEffect(() => {
    if (job && job?.status !== 'in-progress') {
      checkJobStatus();
    }
  }, []);
  async function checkJobStatus() {
    if (job && job?.status !== 'in-progress') {
      const res = await dispatch(getCurrentJob());
      if (res.payload.status !== 'fulfilled') {
        setTimeout(checkJobStatus, 5000);
      }
    }
  }
  const handleCancelJob = () => {
    setLoading(true);
    const res = dispatch(cancelJob(job.id));
    if (res) {
      setLoading(false);
      setModalState({
        ...modalState,
        jobCancelModal: false,
      });
    }
  };

  const onSkillSelect = _skills => {
    setSkills(_skills);
    setModalState({
      ...modalState,
      skillSelectionModal: false,
      jobPostingModal: true,
    });
  };

  const onJobPosted = data => {
    setModalState({
      ...modalState,
      jobPostingModal: false,
    });
  };

  const handlePaymentPending = async data => {
    if (data === 'confirm') {
      dispatch(updatePayment(job.id));
    }
  };

  const handleCompleteJob = async () => {
    dispatch(confirmPayment(job.id));
    handleModalToggle('paymentStatusModal', true);
    setTimeout(() => {
      handleModalToggle('paymentStatusModal', false);
      handlePaymentComplete();
    }, 3000);
  };

  const handlePaymentComplete = async () => {
    handleModalToggle('userExperienceModal', true);
  };

  const handleDisputeJob = async id => {
    const dispute = {
      disputeCode: id,
      jobId: job?.id,
    };
    await dispatch(markJobDispute(dispute));
  };
  const handleOpenChat = async applicantId => {
    // const chatRoom = await new ChatApi().createChatRoom(applicantId);
    // console.log(chatRoom);
    handleModalToggle('messageModal', true);
  };
  return (
    <>
      {!job ? (
        <View style={styles.bottomArea}>
          <View style={styles.titleArea}>
            <Text style={styles.titleText}>
              {!serviceProvider ? (
                <View style={styles.kindaView}>
                  <Text style={styles.kindajobsTitle}>
                    Kindajobs is not in your area yet!
                    <Icon name="block" size={25} color={'red'} />
                  </Text>
                  <Text style={styles.kindDescription}>
                    Get prepared! we will be in town soon.
                  </Text>
                </View>
              ) : (
                `Hey ${user.firstName}, what do you want to complete today?`
              )}
            </Text>
          </View>
          <View style={styles.buttonArea}>
            <Button
              title={'Post'}
              onPress={() => handleModalToggle('skillSelectionModal', true)}
            />
          </View>
        </View>
      ) : job?.jobApplicant ? (
        <View style={styles.jobAcceptedContainer}>
          <View style={styles.providerContainer}>
            <View style={styles.profileContainer}>
              <Pressable
                onPress={() => {
                  // setServiceProviderDetailModal(true);
                }}>
                <Text style={styles.name}>{applicant.firstName}</Text>
              </Pressable>
              <View style={styles.starContainer}>
                <View style={styles.innerStarContainer}>
                  <Icon name="star" color="#FFAA00" size={15} />
                  <Text style={styles.rating}>{applicant.rating}</Text>
                </View>
                {/* <Text style={styles.reviewCount}>7 Reviews</Text> */}
              </View>
            </View>
            <View style={styles.imgContainer}>
              {applicant.userImage ? (
                <Image
                  source={{uri: applicant.userImage}}
                  style={styles.image}
                  resizeMode={'contain'}
                />
              ) : (
                <Image
                  source={noImageImg}
                  style={styles.image}
                  resizeMode={'contain'}
                />
              )}
              {/* <Icon name="flag" size={25} style={styles.icon} /> */}
            </View>
          </View>
          {job?.status === 'new' ? (
            <View style={styles.buttonContainer}>
              <View style={styles.innerContainer}>
                {message ? <View style={styles.circle}></View> : null}
                <Button
                  title={'Message'}
                  backgroundColor={message ? R.colors.SKY_BLUE : R.colors.CGRAY}
                  textColor={message ? R.colors.WHITE : R.colors.PRIMARI_DARK}
                  onPress={() => handleOpenChat(job.jobApplicant.idUser)}
                />
              </View>
              <View style={styles.innerContainer}>
                <Button
                  title={'Call'}
                  backgroundColor={R.colors.CGRAY}
                  textColor={R.colors.PRIMARI_DARK}
                />
              </View>
              <View style={styles.innerContainer}>
                <Button
                  title={'Cancel'}
                  backgroundColor={R.colors.CGRAY}
                  textColor={R.colors.PRIMARI_DARK}
                  onPress={() => handleModalToggle('jobCancelModal', true)}
                />
              </View>
            </View>
          ) : (
            <View style={styles.buttonContainer}>
              <View style={styles.innerContainer}>
                {/* {applicants ? <View style={styles.circle}></View> : null} */}
                {job?.status === 'in-progress' ? (
                  <Button
                    title={'Pay'}
                    backgroundColor={R.colors.CGRAY}
                    textColor={R.colors.PRIMARI_DARK}
                    onPress={() => {
                      handleModalToggle('confirmJobPaymentModal', true);
                    }}
                  />
                ) : (
                  <>
                    <View style={styles.circle}></View>
                    <Button
                      title={'Pay'}
                      backgroundColor={R.colors.LIGHT_GREEN}
                      textColor={R.colors.WHITE}
                      onPress={handleCompleteJob}
                    />
                  </>
                )}
              </View>
              <View style={styles.innerContainer}>
                <Button
                  title={'Cancel'}
                  backgroundColor={R.colors.CGRAY}
                  textColor={R.colors.PRIMARI_DARK}
                  onPress={() => handleModalToggle('jobCancelModal', true)}
                />
              </View>
              <View style={styles.innerContainer}>
                <Button
                  title={'Dispute'}
                  backgroundColor={R.colors.CGRAY}
                  textColor={R.colors.PRIMARI_DARK}
                  onPress={() => handleModalToggle('disputeModal', true)}
                  disabled={job.disputed ? true : false}
                />
              </View>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.modalInnerContainer}>
          <Text style={styles.heading}>Waiting for response</Text>
          <View style={styles.buttonsContainer}>
            <View style={styles.innerContainer}>
              <Button
                title={'Cancel'}
                backgroundColor={'#F8F8FC'}
                textColor={R.colors.PRIMARI_DARK}
                onPress={() => handleModalToggle('jobCancelModal', true)}
              />
            </View>
          </View>
        </View>
      )}
      <Loader message="5" loading={loading} />
      {modalState.skillSelectionModal && (
        <Skills
          isVisible={modalState.skillSelectionModal}
          onModalClose={visible =>
            handleModalToggle('skillSelectionModal', visible)
          }
          onSkillSelect={onSkillSelect}
        />
      )}
      {modalState.serviceProviderModal && (
        <ServiceProviderDetailModal
          isVisible={modalState.serviceProviderModal}
          onModalClose={visible =>
            handleModalToggle('serviceProviderModal', visible)
          }
          job={job}
          applicant={applicant}
        />
      )}
      {modalState.viewCandidateModal && (
        <ViewCandidateModal
          isVisible={modalState.viewCandidateModal}
          onModalClose={visible =>
            handleModalToggle('viewCandidateModal', visible)
          }
        />
      )}
      {modalState.messageModal && (
        <MessagingModal
          isVisible={modalState.messageModal}
          onModalClose={visible => handleModalToggle('messageModal', visible)}
        />
      )}
      {modalState.jobCancelModal && (
        <JobCancelModal
          isVisible={modalState.jobCancelModal}
          onModalClose={visible => handleModalToggle('jobCancelModal', visible)}
          onJobCancel={handleCancelJob}
          confirmationText={'You are going to cancel this job?'}
        />
      )}
      {modalState.confirmJobPaymentModal && (
        <ConfirmationModal
          isVisible={modalState.confirmJobPaymentModal}
          onModalClose={visible =>
            handleModalToggle('confirmJobPaymentModal', visible)
          }
          confirmationText={
            'By doing this you are ending the job and releasing the amount due.'
          }
          onConfirm={handlePaymentPending}
        />
      )}
      {modalState.userExperienceModal && (
        <UserExperienceModal
          isVisible={modalState.userExperienceModal}
          onModalClose={visible =>
            handleModalToggle('userExperienceModal', visible)
          }
        />
      )}
      <SelectACardModal
        isVisible={modalState.selectCardModal}
        onModalClose={visible => handleModalToggle('selectCardModal', visible)}
      />
      <PaymentStatusModal
        isVisible={modalState.paymentStatusModal}
        onModalClose={visible => {
          handleModalToggle('paymentStatusModal', visible);
        }}
        page={'success'}
        cardDetails={'payment-success'}
        onPaymnetComplete={handlePaymentComplete}
      />
      {modalState.jobPostingModal && (
        <JobPostModal
          isVisible={modalState.jobPostingModal}
          onModalClose={visible =>
            handleModalToggle('jobPostingModal', visible)
          }
          onConfirm={onJobPosted}
          skill={skills}
          edit={job?.jobApplicant ? true : false}
        />
      )}
      <DisputeModal
        isVisible={modalState.disputeModal}
        onModalClose={visible => {
          handleModalToggle('disputeModal', visible);
        }}
        onDisputeSelect={handleDisputeJob}
      />
    </>
  );
}
