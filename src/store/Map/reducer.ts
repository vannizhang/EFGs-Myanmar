import { Point } from '@arcgis/core/geometry';
import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';

export type ImageryTileLayerIdentifyResult = {
    point: Point;
    pixelValue: number;
};

// import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
export type MapState = {
    myanmarEFGLayerIdentifyResult: ImageryTileLayerIdentifyResult;
    isQuerying: boolean;
};

export const initialMapState: MapState = {
    myanmarEFGLayerIdentifyResult: null,
    isQuerying: false,
};

const slice = createSlice({
    name: 'Map',
    initialState: initialMapState,
    reducers: {
        myanmarEFGLayerIdentifyResultChanged: (
            state,
            action: PayloadAction<ImageryTileLayerIdentifyResult>
        ) => {
            state.myanmarEFGLayerIdentifyResult = action.payload;
        },
        isQueryingToggled: (state, action: PayloadAction<boolean>) => {
            state.isQuerying = action.payload;
        },
    },
});

const { reducer } = slice;

export const { myanmarEFGLayerIdentifyResultChanged, isQueryingToggled } =
    slice.actions;

export default reducer;
