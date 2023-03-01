import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/user/user.slice';
import bankReducer from './slices/user/bank.slice';
import jobReducers from './slices/job/job.slice';
import cardReducers from './slices/user/cardSlice';

/*
 * This file is used to create common redux store
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
const store = configureStore({
  reducer: {
    user: userReducer,
    bank: bankReducer,
    jobs: jobReducers,
    card: cardReducers,
  },
});

export default store;
