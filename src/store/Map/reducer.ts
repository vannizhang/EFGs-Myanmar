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

/**
 * count of pixels by pixel value
 */
export type PixelsHistogram = {
    [key: number]: number;
};

// import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
export type MapState = {
    /**
     * result of identify task of a user selected location
     */
    myanmarEFGLayerIdentifyResult: ImageryTileLayerIdentifyResult;
    /**
     * histogram of pixels on map's current extent
     */
    myanmarEFGLayerHistogramResult: PixelsHistogram;
    isQuerying: boolean;
};

export const initialMapState: MapState = {
    myanmarEFGLayerIdentifyResult: null,
    myanmarEFGLayerHistogramResult: null,
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
        myanmarEFGLayerHistogramResultChanged: (
            state,
            action: PayloadAction<PixelsHistogram>
        ) => {
            state.myanmarEFGLayerHistogramResult = action.payload;
        },
        isQueryingToggled: (state, action: PayloadAction<boolean>) => {
            state.isQuerying = action.payload;
        },
    },
});

const { reducer } = slice;

export const {
    myanmarEFGLayerIdentifyResultChanged,
    myanmarEFGLayerHistogramResultChanged,
    isQueryingToggled,
} = slice.actions;

export default reducer;
