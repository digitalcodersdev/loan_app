import {createAsyncThunk} from '@reduxjs/toolkit';
import UserApi from 'datalib/services/user.api';
/*
 * This function is used to create an action to fetch an user by his id
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
export const getUserById = createAsyncThunk(
  'user/getUserById',
  async (userId, {rejectWithValue}) => {
    try {
      return await new UserApi().getUserById();
    } catch (error) {
      return rejectWithValue(error.code);
    }
  },
);
/*
 * This function is used to create an action to  update  user information
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
export const updateUser = createAsyncThunk(
  'user/update-user',
  async (user, {rejectWithValue}) => {
    try {
      // TODO: Removing profilePic while updating user, no need to clutter api call
      user.picture = null;
      return await new UserApi().updateUser(user);
    } catch (error) {
      return rejectWithValue(error.code);
    }
  },
);

/*
 * This function is used to create an action to upload a picture
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 */
export const uploadProfilePic = createAsyncThunk(
  'user/uploadProfilePic',
  async ({userId, picture}, {rejectWithValue}) => {
    try {
      return await new UserApi().uploadProfilePic(userId, picture);
    } catch (error) {
      return rejectWithValue(error.code);
    }
  },
);

export const getUserReviews = createAsyncThunk(
  '/user/review/get',
  async (filter, {rejectWithValue}) => {
    try {
      return await new UserApi().getUserReviews(filter);
    } catch (error) {
      return rejectWithValue(error.code);
    }
  },
);

export const addCard = createAsyncThunk(
  '/card/add',
  async (card, {rejectWithValue}) => {
    try {
      return await new UserApi().addCard(card);
    } catch (error) {
      return rejectWithValue(error.code);
    }
  },
);

export const getCards = createAsyncThunk(
  '/card/get',
  async (idUser, {rejectWithValue}) => {
    try {
      return await new UserApi().getCards();
    } catch (error) {
      return rejectWithValue(error.code);
    }
  },
);

export const updateCard = createAsyncThunk(
  '/card/update',
  async ({card, cardId}, {rejectWithValue}) => {
    try {
      return await new UserApi().updateCard(card, cardId);
    } catch (error) {
      return rejectWithValue(error.code);
    }
  },
);

export const deleteCard = createAsyncThunk(
  '/card/delete',
  async (cardId, {rejectWithValue}) => {
    try {
      return await new UserApi().deleteCard(cardId);
    } catch (error) {
      return rejectWithValue(error.code);
    }
  },
);

export const setDefaultCard = createAsyncThunk(
  '/card/set-default',
  async (cardId, {rejectWithValue}) => {
    try {
      return await new UserApi().setDefaultCard(cardId);
    } catch (error) {
      return rejectWithValue(error.code);
    }
  },
);

export const getDefaultCard = createAsyncThunk(
  '/card/set/default',
  async (cardId, {rejectWithValue}) => {
    try {
      return await new UserApi().getDefaultCard();
    } catch (error) {
      return rejectWithValue(error.code);
    }
  },
);
