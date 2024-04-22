import { Point } from '@arcgis/core/geometry';
import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';

// import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
export type MapState = {
    queryLocation: Point;
    isQuerying: boolean;
};

export const initialMapState: MapState = {
    queryLocation: null,
    isQuerying: false,
};

const slice = createSlice({
    name: 'Map',
    initialState: initialMapState,
    reducers: {
        queryLocationChanged: (state, action: PayloadAction<Point>) => {
            state.queryLocation = action.payload;
        },
        isQueryingToggled: (state, action: PayloadAction<boolean>) => {
            state.isQuerying = action.payload;
        },
    },
});

const { reducer } = slice;

export const { queryLocationChanged, isQueryingToggled } = slice.actions;

export default reducer;
