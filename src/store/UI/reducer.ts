import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';

// import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
export type UIState = {
    showBottomPanel: boolean;
};

export const initialUIState: UIState = {
    showBottomPanel: true,
};

const slice = createSlice({
    name: 'UI',
    initialState: initialUIState,
    reducers: {
        showBottomPanelToggled: (state, action: PayloadAction<boolean>) => {
            state.showBottomPanel = action.payload;
        },
    },
});

const { reducer } = slice;

export const { showBottomPanelToggled } = slice.actions;

export default reducer;
