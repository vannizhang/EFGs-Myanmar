import '@arcgis/core/assets/esri/themes/dark/main.css';
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
            <React.StrictMode>
                <ReduxProvider store={configureAppStore(preloadedState)}>
                    <AppContextProvider>
                       <Layout />
                    </AppContextProvider>
                </ReduxProvider>
            </React.StrictMode>
        );

    } catch(err){
        root.render(
            <ErrorPage error={err} />
        )
    }

})();
