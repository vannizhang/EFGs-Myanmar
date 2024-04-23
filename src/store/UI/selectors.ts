import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export const selectShowAboutModal = createSelector(
    (state: RootState) => state.UI.showAboutModal,
    (showAboutModal) => showAboutModal
);
