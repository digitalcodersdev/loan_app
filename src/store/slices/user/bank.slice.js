import {createSlice, createEntityAdapter} from '@reduxjs/toolkit';
import {
  defaultThunkFailureState,
  defaultThunkLoadingState,
  defaultThunkSuccessState,
} from '../../../constants/thunk.config';
import {ThunkStatusEnum} from '../../../constants/thunkStatus.enum';
import {addBankAccount, getBankAccount} from '../../actions/bankActions';
// TODO: Should we have api based status and errors for more fine grained contro
/*
 * This function is used to create bank slice
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 * For more documentation see : https://redux-toolkit.js.org/api/createSlice
 */

const initialThunkState = {status: ThunkStatusEnum.IDLE, error: null};

//A function that generates a set of prebuilt reducers and selectors for performing CRUD operations on a normalized state structure containing instances of a particular type of data object.
const bankItemAdapter = createEntityAdapter({
  selectId: bank => bank.id || '',
});

// The initial state value for this slice of state.
const initialState = bankItemAdapter.getInitialState({
  bank: [],
  getBankByIdStatus: initialThunkState,
  updateBankStatus: initialThunkState,
});

// A function that accepts an initial state, an object of reducer functions, and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state.
const bankSlice = createSlice({
  name: 'bank',
  initialState,
  reducers: {restoreBankStore: () => initialState},
  extraReducers: builder => {
    builder.addCase(addBankAccount.pending, state => {
      state.updateBankStatus = defaultThunkLoadingState;
    });
    builder.addCase(addBankAccount.fulfilled, (state, action) => {
      state.updateBankStatus = defaultThunkSuccessState;
      bankItemAdapter.upsertOne(state, action.payload);
    });
    builder.addCase(addBankAccount.rejected, (state, action) => {
      state.updateBankStatus = {
        ...defaultThunkFailureState,
        error: action.payload,
      };
    });
    builder.addCase(getBankAccount.pending, state => {
      state.getBankByIdStatus = defaultThunkLoadingState;
    });
    builder.addCase(getBankAccount.fulfilled, (state, action) => {
      state.getBankByIdStatus = defaultThunkSuccessState;
      bankItemAdapter.upsertMany(state, action.payload);
    });
    builder.addCase(getBankAccount.rejected, (state, action) => {
      state.getBankByIdStatus = {
        ...defaultThunkFailureState,
        error: action.payload,
      };
    });
  },
});

export default bankSlice.reducer;
export const {restoreBankStore} = bankSlice.actions;
//For more detail please see documentaion: https://redux-toolkit.js.org/api/createEntityAdapter
export const {
  selectAll: selectAllBankAccount,
  selectById: selectBankAccountById,
  selectIds: selectBankAccountIds,
} = bankItemAdapter.getSelectors(state => state.bank);
