import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export const selectMyanmarEFGLayerIdentifyResult = createSelector(
    (state: RootState) => state.Map.myanmarEFGLayerIdentifyResult,
    (myanmarEFGLayerIdentifyResult) => myanmarEFGLayerIdentifyResult
);

export const selectMyanmarEFGLayerHistogramResult = createSelector(
    (state: RootState) => state.Map.myanmarEFGLayerHistogramResult,
    (myanmarEFGLayerHistogramResult) => myanmarEFGLayerHistogramResult
);

export const selectMyanmarEFGLayerSelectedPixelValues = createSelector(
    (state: RootState) => state.Map.myanmarEFGLayerSelectedPixelValues,
    (myanmarEFGLayerSelectedPixelValues) => myanmarEFGLayerSelectedPixelValues
);

export const selectIsQuerying = createSelector(
    (state: RootState) => state.Map.isQuerying,
    (isQuerying) => isQuerying
);
