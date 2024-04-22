import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export const selectQueryLocation = createSelector(
    (state: RootState) => state.Map.queryLocation,
    (queryLocation) => queryLocation
);

export const selectIsQuerying = createSelector(
    (state: RootState) => state.Map.isQuerying,
    (isQuerying) => isQuerying
);
