import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';

// import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
export type UIState = {
    showAboutModal: boolean;
};

export const initialUIState: UIState = {
    showAboutModal: false,
};

const slice = createSlice({
    name: 'UI',
    initialState: initialUIState,
    reducers: {
        showAboutModalToggled: (state, action: PayloadAction<boolean>) => {
            state.showAboutModal = action.payload;
        },
    },
});

const { reducer } = slice;

export const { showAboutModalToggled } = slice.actions;

export default reducer;
