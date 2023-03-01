import {createAsyncThunk} from '@reduxjs/toolkit';
import JobApi from 'datalib/services/job.api';
import UserApi from 'datalib/services/user.api';
/*
 * This function is used to create an action to post a job
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
export const createJob = createAsyncThunk(
  '/job/create',
  async ({job, skill}, {rejectWithValue}) => {
    try {
      return await new JobApi().createJob({job, skill});
    } catch (error) {
      return rejectWithValue(error.code);
    }
  },
);
/*
 * This function is used to create an action to update a job
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
export const updateJob = createAsyncThunk(
  '/job/updateByJobid',
  async ({job, jobId}, {rejectWithValue}) => {
    try {
      return await new JobApi().updateJob(job, jobId);
    } catch (error) {
      return rejectWithValue(error.code);
    }
  },
);
/*
 * This function is used to create an action to get All jobs of that user
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
export const getMyJobs = createAsyncThunk(
  '/job/getByUserId',
  async (userId, {rejectWithValue}) => {
    try {
      return await new JobApi().getMyJobs(userId);
    } catch (error) {
      return rejectWithValue(error.code);
    }
  },
);
/*
 * This function is used to create an action to fetch current job of an user
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
export const getCurrentJob = createAsyncThunk(
  '/job/get-current-job',
  async (userId, {rejectWithValue}) => {
    try {
      return await new JobApi().getCurrentJob();
    } catch (error) {
      return rejectWithValue(error.code);
    }
  },
);
/*
 * This function is used to create an action to cancel a job
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
export const cancelJob = createAsyncThunk(
  '/job/cancel',
  async (jobId, {rejectWithValue}) => {
    try {
      return await new JobApi().cancelJob(jobId);
    } catch (error) {
      return rejectWithValue(error.code);
    }
  },
);
/*
 * This function is used to create an action to complete the job
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
export const completeJob = createAsyncThunk(
  '/job/complete',
  async (jobId, {rejectWithValue}) => {
    try {
      return await new JobApi().completeJob(jobId);
    } catch (error) {
      return rejectWithValue(error.code);
    }
  },
);
/*
 * This function is used to create an action to delete the job
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
export const deleteJob = createAsyncThunk(
  '/job/delete',
  async (jobId, {rejectWithValue}) => {
    try {
      return await new JobApi().deleteJob(jobId);
    } catch (error) {
      return rejectWithValue(error.code);
    }
  },
);
/*
 * This function is used to create an action to fetch all common skills
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
export const getSkills = createAsyncThunk(
  '/common/getSkills',
  async (userId, {rejectWithValue}) => {
    try {
      return await new JobApi().getSkills();
    } catch (error) {
      return rejectWithValue(error.code);
    }
  },
);

/*
 * This function is used to get the current job Applicant
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
export const getJobApplicant = createAsyncThunk(
  '/job/get-all-job-applications/',
  async (jobId, {rejectWithValue}) => {
    try {
      return await new JobApi().getJobApplicant(jobId);
    } catch (error) {
      return rejectWithValue(error.code);
    }
  },
);

/*
 * This function is used to report the service provider
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
export const jobReport = createAsyncThunk(
  '/job/report',
  async (report, {rejectWithValue}) => {
    try {
      return await new JobApi().jobReport(report);
    } catch (error) {
      return rejectWithValue(error.code);
    }
  },
);

/*
 * This function is used to updates job status to payment-pending
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
export const updatePayment = createAsyncThunk(
  '/payment/update',
  async (jobId, {rejectWithValue}) => {
    try {
      return await new JobApi().updatePayment(jobId);
    } catch (error) {
      return rejectWithValue(error.code);
    }
  },
);

/*
 * This function is used to updates job status to payment-pending
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
export const confirmPayment = createAsyncThunk(
  '/payment/confirm',
  async (jobId, {rejectWithValue}) => {
    try {
      return await new JobApi().confirmPayment(jobId);
    } catch (error) {
      return rejectWithValue(error.code);
    }
  },
);

/*
 * This function is used to updates job status to completed
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
export const createUserFeedback = createAsyncThunk(
  '/user/review/create',
  async (feedback, {rejectWithValue}) => {
    try {
      return await new UserApi().createUserFeedback(feedback);
    } catch (error) {
      return rejectWithValue(error.code);
    }
  },
);

/*
 * This function is used to mark job as disputed
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
export const markJobDispute = createAsyncThunk(
  '/job/mark-dispute',
  async (dispute, {rejectWithValue}) => {
    try {
      return await new JobApi().markJobDispute(dispute);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.code);
    }
  },
);
