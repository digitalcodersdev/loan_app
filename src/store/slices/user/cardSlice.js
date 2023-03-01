import {createSlice, createEntityAdapter} from '@reduxjs/toolkit';
import {
  defaultThunkFailureState,
  defaultThunkLoadingState,
  defaultThunkSuccessState,
} from '../../../constants/thunk.config';
import {ThunkStatusEnum} from '../../../constants/thunkStatus.enum';
import {
  addCard,
  getCards,
  updateCard,
  deleteCard,
  setDefaultCard,
  // getDefaultCard,
} from '../../actions/userActions';
// TODO: Should we have api based status and errors for more fine grained contro
/*
 * This function is used to create bank slice
 * @author Kindajobs <jdeveloper.vimal@gmail.com>
 * For more documentation see : https://redux-toolkit.js.org/api/createSlice
 */

const initialThunkState = {status: ThunkStatusEnum.IDLE, error: null};

//A function that generates a set of prebuilt reducers and selectors for performing CRUD operations on a normalized state structure containing instances of a particular type of data object.
const cardItemAdapter = createEntityAdapter({
  selectId: card => card.id || '',
});

// The initial state value for this slice of state.
const initialState = cardItemAdapter.getInitialState({
  card: [],
  getCardByIdStatus: initialThunkState,
  updateCardStatus: initialThunkState,
});
// A function that accepts an initial state, an object of reducer functions, and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state.
const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {restoreCardStore: () => initialState},
  extraReducers: builder => {
    builder.addCase(addCard.pending, state => {
      state.updateCardStatus = defaultThunkLoadingState;
    });
    builder.addCase(addCard.fulfilled, (state, action) => {
      state.updateCardStatus = defaultThunkSuccessState;
      if (action.payload) {
        state.card = [...state.card, action.payload];
      }
    });
    builder.addCase(addCard.rejected, (state, action) => {
      state.updateCardStatus = {
        ...defaultThunkFailureState,
        error: action.payload,
      };
    });
    builder.addCase(getCards.pending, state => {
      state.getCardByIdStatus = defaultThunkLoadingState;
    });
    builder.addCase(getCards.fulfilled, (state, action) => {
      state.getCardByIdStatus = defaultThunkSuccessState;
      // cardItemAdapter.upsertMany(state, action.payload);
      state.card = action.payload;
    });
    builder.addCase(getCards.rejected, (state, action) => {
      state.getCardByIdStatus = {
        ...defaultThunkFailureState,
        error: action.payload,
      };
    });
    builder.addCase(updateCard.pending, state => {
      state.getCardByIdStatus = defaultThunkLoadingState;
    });
    builder.addCase(updateCard.fulfilled, (state, action) => {
      state.getCardByIdStatus = defaultThunkSuccessState;
      cardItemAdapter.upsertOne(state, action.payload);
    });
    builder.addCase(updateCard.rejected, (state, action) => {
      state.getCardByIdStatus = {
        ...defaultThunkFailureState,
        error: action.payload,
      };
    });

    builder.addCase(deleteCard.pending, state => {
      state.getCardByIdStatus = defaultThunkLoadingState;
    });
    builder.addCase(deleteCard.fulfilled, (state, action) => {
      state.getCardByIdStatus = defaultThunkSuccessState;
      // console.log('SLICE_METHOD', action.meta.arg);
      state.card = state.card.filter(item => item.cardId !== action.meta.arg);
      // cardItemAdapter.removeOne(state.card, action.meta.arg);
    });
    builder.addCase(deleteCard.rejected, (state, action) => {
      state.getCardByIdStatus = {
        ...defaultThunkFailureState,
        error: action.payload,
      };
    });

    builder.addCase(setDefaultCard.pending, state => {
      state.getCardByIdStatus = defaultThunkLoadingState;
    });
    builder.addCase(setDefaultCard.fulfilled, (state, action) => {
      state.getCardByIdStatus = defaultThunkSuccessState;
      state.card = state.card.map((item, index) => {
        // console.log('HELLO_', itemdef);
        if (item.default) {
          item.default = 0;
        }
        if (item.cardId === action.meta.arg) {
          item.default = 1;
        }
        return item;
      });
    });
    builder.addCase(setDefaultCard.rejected, (state, action) => {
      state.getCardByIdStatus = {
        ...defaultThunkFailureState,
        error: action.payload,
      };
    });

    // builder.addCase(getDefaultCard.pending, state => {
    //   state.getCardByIdStatus = defaultThunkLoadingState;
    // });
    // builder.addCase(getDefaultCard.fulfilled, (state, action) => {
    //   state.getCardByIdStatus = defaultThunkSuccessState;
    //   state.card = state.card.map((item, index) => {
    //     // console.log('HELLO_', itemdef);
    //     if (item.default) {
    //       item.default = 0;
    //     }
    //     if (item.cardId === action.meta.arg) {
    //       item.default = 1;
    //     }
    //     return item;
    //   });
    // });
    // builder.addCase(getDefaultCard.rejected, (state, action) => {
    //   state.getCardByIdStatus = {
    //     ...defaultThunkFailureState,
    //     error: action.payload,
    //   };
    // });
  },
});

export default cardSlice.reducer;
export const {restoreCardStore} = cardSlice.actions;
//For more detail please see documentaion: https://redux-toolkit.js.org/api/createEntityAdapter
export const {
  selectAll: selectAllCard,
  selectById: selectCardById,
  selectIds: selectCardIds,
} = cardItemAdapter.getSelectors(state => state.card);

export const getDefaultCard = state => {
  const card = state.card.card.filter(item => {
    if (item.default) {
      return item;
    }
  });
  return card[0];
};

export const getCardById = (state, cardId) => {
  const card = state.card.card.filter(item => item.cardId === cardId);
  return card[0];
};
