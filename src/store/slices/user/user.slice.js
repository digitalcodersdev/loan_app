import {createSlice} from '@reduxjs/toolkit';
import {
  defaultThunkFailureState,
  defaultThunkLoadingState,
  defaultThunkSuccessState,
} from '../../../constants/thunk.config';
import {ThunkStatusEnum} from '../../../constants/thunkStatus.enum';
import {
  uploadProfilePic,
  getUserById,
  updateUser,
  getUserReviews,
} from '../../actions/userActions';
// TODO: Should we have api based status and errors for more fine grained control
/*
 * This function is used to create user slice
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 * For more documentation see : https://redux-toolkit.js.org/api/createSlice
 */

const initialThunkState = {status: ThunkStatusEnum.IDLE, error: null};

// The initial state value for this slice of state.
const initialState = {
  user: null,
  getUserByIdStatus: initialThunkState,
  updateUserStatus: initialThunkState,
  uploadProfilePicStatus: initialThunkState,
  updateUserAddressStatus: initialThunkState,
  userReviews: initialThunkState,
};

// TODO: Remove boilerplate?
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {restoreUserStore: () => initialState},
  extraReducers: builder => {
    builder.addCase(getUserById.pending, state => {
      state.getUserByIdStatus = defaultThunkLoadingState;
    });
    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.getUserByIdStatus = defaultThunkSuccessState;
      state.user = action.payload;
    });
    builder.addCase(getUserById.rejected, (state, action) => {
      state.getUserByIdStatus = {
        ...defaultThunkFailureState,
        error: action.payload,
      };
    });
    builder.addCase(updateUser.pending, state => {
      state.updateUserStatus = {
        ...defaultThunkLoadingState,
        statusMessage: 'loading message...',
      };
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.updateUserStatus = {
        ...defaultThunkSuccessState,
        statusMessage: 'api success',
      };
      // state.user.profileStatus = action.meta.arg.profileStatus;
      // state.user = {...state.user, ...action.meta.arg};
      state.user = action.payload;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.updateUserStatus = {
        ...defaultThunkFailureState,
        error: action.payload,
        statusMessage: 'api rejected',
      };
    });

    // TODO: IMP: Handle profile pic, save on async storage?
    builder.addCase(uploadProfilePic.pending, state => {
      state.uploadProfilePicStatus = defaultThunkLoadingState;
    });
    builder.addCase(uploadProfilePic.fulfilled, (state, action) => {
      state.uploadProfilePicStatus = defaultThunkSuccessState;
      if (state.user) {
        state.user.picture = action.meta.arg.picture;
      }
    });
    builder.addCase(uploadProfilePic.rejected, (state, action) => {
      state.uploadProfilePicStatus = {
        ...defaultThunkFailureState,
        error: action.payload,
      };
    });

    builder.addCase(getUserReviews.pending, state => {
      state.getUserReviews = defaultThunkLoadingState;
    });
    builder.addCase(getUserReviews.fulfilled, (state, action) => {
      state.userReviews = action.payload;
    });
    builder.addCase(getUserReviews.rejected, (state, action) => {
      state.uploadProfilePicStatus = {
        ...defaultThunkFailureState,
        error: action.payload,
      };
    });

    // builder.addCase(getServiceProviderUserReviews.pending, state => {
    //   state.getUserReviews = defaultThunkLoadingState;
    // });
    // builder.addCase(
    //   getServiceProviderUserReviews.fulfilled,
    //   (state, action) => {
    //     state.serviceProviderReviews = action.payload;
    //   },
    // );
    // builder.addCase(getServiceProviderUserReviews.rejected, (state, action) => {
    //   state.uploadProfilePicStatus = {
    //     ...defaultThunkFailureState,
    //     error: action.payload,
    //   };
    // });
  },
});

export default userSlice.reducer;
export const {restoreUserStore} = userSlice.actions;
export const currentUserSelector = state => state.user.user || {};
export const userReviewSelector = state => state.user.userReviews || [];
