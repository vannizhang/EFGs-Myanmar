import './styles/index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';

import configureAppStore, { getPreloadedState } from './store/configureStore';

import AppContextProvider from './contexts/AppContextProvider';
import { Layout } from '@components/Layout/Layout';
import { initEsriOAuth } from '@utils/esri-oauth';
import { APP_ID } from './constants';
import { ErrorPage } from '@components/ErrorPage/ErrorPage';

(async () => {
    const root = createRoot(document.getElementById('root'));

    try {
        // await initEsriOAuth({
        //     appId: APP_ID
        // })

        const preloadedState = getPreloadedState();

        root.render(
            <ReduxProvider store={configureAppStore(preloadedState)}>
                <Layout />
            </ReduxProvider>
        );
    } catch (err) {
        root.render(<ErrorPage error={err} />);
    }
})();
