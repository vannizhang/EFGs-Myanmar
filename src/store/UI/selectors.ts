import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export const selectShowBottomPanel = createSelector(
    (state: RootState) => state.UI.showBottomPanel,
    (showBottomPanel) => showBottomPanel
);
