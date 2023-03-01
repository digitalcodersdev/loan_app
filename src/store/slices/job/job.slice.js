import {createSlice, createEntityAdapter} from '@reduxjs/toolkit';
import {
  defaultThunkFailureState,
  defaultThunkLoadingState,
  defaultThunkSuccessState,
} from '../../../constants/thunk.config';
import {ThunkStatusEnum} from '../../../constants/thunkStatus.enum';
import {
  createJob,
  updateJob,
  getMyJobs,
  getCurrentJob,
  cancelJob,
  completeJob,
  getSkills,
  getJobApplicant,
  jobReport,
  updatePayment,
  confirmPayment,
  createUserFeedback,
  markJobDispute,
} from '../../actions/jobActions';
/*
 * This function is used to create job slice
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 * For more documentation see : https://redux-toolkit.js.org/api/createSlice
 */

const initialThunkState = {status: ThunkStatusEnum.IDLE, error: null};

//A function that generates a set of prebuilt reducers and selectors for performing CRUD operations on a normalized state structure containing instances of a particular type of data object.
const jobItemAdapter = createEntityAdapter({
  selectId: job => job.id || '',
});

// The initial state value for this slice of state.
const initialState = jobItemAdapter.getInitialState({
  currentJob: null,
  jobSkills: [],
  pageNumber: 1,
  getJobByIdStatus: initialThunkState,
  updateJobStatus: initialThunkState,
  jobDispute: [],
});

// TODO: Remove boilerplate?
const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {restoreJobStore: () => initialState},
  extraReducers: builder => {
    builder.addCase(createJob.pending, state => {
      state.updateJobStatus = defaultThunkLoadingState;
    });
    builder.addCase(createJob.fulfilled, (state, action) => {
      state.updateJobStatus = defaultThunkSuccessState;
      state.currentJob = action.payload;
    });
    builder.addCase(createJob.rejected, (state, action) => {
      state.updateJobStatus = {
        ...defaultThunkFailureState,
        error: action.payload,
      };
    });

    builder.addCase(updateJob.pending, state => {
      state.updateJobStatus = defaultThunkLoadingState;
    });
    builder.addCase(updateJob.fulfilled, (state, action) => {
      state.updateJobStatus = defaultThunkSuccessState;
      state.currentJob = action.meta.arg.job;
    });
    builder.addCase(updateJob.rejected, (state, action) => {
      state.updateJobStatus = {
        ...defaultThunkFailureState,
        error: action.payload,
      };
    });

    builder.addCase(getMyJobs.pending, state => {
      state.updateJobStatus = defaultThunkLoadingState;
    });
    builder.addCase(getMyJobs.fulfilled, (state, action) => {
      state.updateJobStatus = defaultThunkSuccessState;
      jobItemAdapter.upsertMany(state, action.payload);
    });
    builder.addCase(getMyJobs.rejected, (state, action) => {
      state.updateJobStatus = {
        ...defaultThunkFailureState,
        error: action.payload,
      };
    });

    builder.addCase(getCurrentJob.pending, state => {
      state.updateJobStatus = defaultThunkLoadingState;
    });
    builder.addCase(getCurrentJob.fulfilled, (state, action) => {
      state.updateJobStatus = defaultThunkSuccessState;
      state.currentJob = action.payload;
    });
    builder.addCase(getCurrentJob.rejected, (state, action) => {
      state.updateJobStatus = {
        ...defaultThunkFailureState,
        error: action.payload,
      };
    });

    builder.addCase(cancelJob.pending, state => {
      state.updateJobStatus = defaultThunkLoadingState;
    });
    builder.addCase(cancelJob.fulfilled, (state, action) => {
      state.updateJobStatus = {
        ...defaultThunkSuccessState,
        statusMessage: 'api success',
      };
      state.currentJob = null;
    });
    builder.addCase(cancelJob.rejected, (state, action) => {
      state.updateJobStatus = {
        ...defaultThunkFailureState,
        error: action.payload,
      };
    });

    builder.addCase(completeJob.pending, state => {
      state.updateJobStatus = defaultThunkLoadingState;
    });
    builder.addCase(completeJob.fulfilled, (state, action) => {
      state.updateJobStatus = {
        ...defaultThunkSuccessState,
        statusMessage: 'api success',
      };
      state.currentJob = null;
    });
    builder.addCase(completeJob.rejected, (state, action) => {
      state.updateJobStatus = {
        ...defaultThunkFailureState,
        error: action.payload,
      };
    });

    builder.addCase(getSkills.pending, state => {
      state.updateJobStatus = defaultThunkLoadingState;
    });
    builder.addCase(getSkills.fulfilled, (state, action) => {
      state.updateJobStatus = {
        ...defaultThunkSuccessState,
        statusMessage: 'api success',
      };
      state.jobSkills = action.payload;
    });
    builder.addCase(getSkills.rejected, (state, action) => {
      state.updateJobStatus = {
        ...defaultThunkFailureState,
        error: action.payload,
      };
    });

    builder.addCase(getJobApplicant.pending, state => {
      state.updateJobStatus = defaultThunkLoadingState;
    });
    builder.addCase(getJobApplicant.fulfilled, (state, action) => {
      state.updateJobStatus = {
        ...defaultThunkSuccessState,
        statusMessage: 'api success',
      };
      if (state.currentJob) {
        state.currentJob.jobApplicant = action.payload;
      }
    });
    builder.addCase(getJobApplicant.rejected, (state, action) => {
      state.updateJobStatus = {
        ...defaultThunkFailureState,
        error: action.payload,
      };
    });

    builder.addCase(jobReport.pending, state => {
      state.updateJobStatus = defaultThunkLoadingState;
    });
    builder.addCase(jobReport.fulfilled, (state, action) => {
      state.updateJobStatus = {
        ...defaultThunkSuccessState,
        statusMessage: 'api success',
      };
      state.currentJob.jobApplicant.jobReport = true;
    });
    builder.addCase(jobReport.rejected, (state, action) => {
      state.updateJobStatus = {
        ...defaultThunkFailureState,
        error: action.payload,
      };
    });

    builder.addCase(updatePayment.pending, state => {
      state.updateJobStatus = defaultThunkLoadingState;
    });
    builder.addCase(updatePayment.fulfilled, (state, action) => {
      state.updateJobStatus = {
        ...defaultThunkSuccessState,
        statusMessage: 'api success',
      };
      state.currentJob.status = 'payment-pending';
    });
    builder.addCase(updatePayment.rejected, (state, action) => {
      state.updateJobStatus = {
        ...defaultThunkFailureState,
        error: action.payload,
      };
    });

    builder.addCase(confirmPayment.pending, state => {
      state.updateJobStatus = defaultThunkLoadingState;
    });
    builder.addCase(confirmPayment.fulfilled, (state, action) => {
      state.updateJobStatus = {
        ...defaultThunkSuccessState,
        statusMessage: 'api success',
      };
      state.currentJob.status = 'completed';
    });
    builder.addCase(confirmPayment.rejected, (state, action) => {
      state.updateJobStatus = {
        ...defaultThunkFailureState,
        error: action.payload,
      };
    });

    builder.addCase(createUserFeedback.pending, state => {
      state.updateJobStatus = defaultThunkLoadingState;
    });
    builder.addCase(createUserFeedback.fulfilled, (state, action) => {
      state.updateJobStatus = {
        ...defaultThunkSuccessState,
        statusMessage: 'api success',
      };
      state.currentJob = null;
    });
    builder.addCase(createUserFeedback.rejected, (state, action) => {
      state.updateJobStatus = {
        ...defaultThunkFailureState,
        error: action.payload,
      };
    });

    builder.addCase(markJobDispute.pending, state => {
      state.updateJobStatus = defaultThunkLoadingState;
    });
    builder.addCase(markJobDispute.fulfilled, (state, action) => {
      state.updateJobStatus = {
        ...defaultThunkSuccessState,
        statusMessage: 'api success',
      };
      if (
        action.payload.status === 'new' ||
        action.payload.status === 'in-progress' ||
        action.payload.status === 'open'
      ) {
        state.currentJob.disputed = 1;
      } else {
      }
      // state.jobDispute = state.jobDispute.push({
      //   id: action.meta.arg.jobId,
      //   disputed: true,
      // });
    });
    builder.addCase(markJobDispute.rejected, (state, action) => {
      state.updateJobStatus = {
        ...defaultThunkFailureState,
        error: action.payload,
      };
    });
  },
});

export default jobSlice.reducer;
export const {restoreJobStore} = jobSlice.actions;
export const {
  selectAll: selectAllJob,
  selectById: selectJobById,
  selectIds: selectJobIds,
} = jobItemAdapter.getSelectors(state => state.jobs);

export const getSkillById = (state, jobId) => {
  const skill = state.jobs.jobSkills.filter(item => item.id === jobId);
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXX', skill);
  return skill[0];
};

export const currentJobSelector = state => state.jobs.currentJob || null;
export const jobApplicantSelector = state => {
  return state.jobs.currentJob?.jobApplicant;
};
export const jobReportSelector = state =>
  state.jobs.currentJob?.jobApplicant?.jobReport || false;

export const selectJobSkillById = (state, jobId) => {
  return state.jobs.jobSkills.filter(item => item.id === jobId);
};
