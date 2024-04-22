import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export const selectMyanmarEFGLayerIdentifyResult = createSelector(
    (state: RootState) => state.Map.myanmarEFGLayerIdentifyResult,
    (myanmarEFGLayerIdentifyResult) => myanmarEFGLayerIdentifyResult
);

export const selectIsQuerying = createSelector(
    (state: RootState) => state.Map.isQuerying,
    (isQuerying) => isQuerying
);
