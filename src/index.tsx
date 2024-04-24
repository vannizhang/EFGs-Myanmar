import './styles/index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';

import configureAppStore, { getPreloadedState } from './store/configureStore';

// import AppContextProvider from './contexts/AppContextProvider';
import { Layout } from '@components/Layout/Layout';
import { initEsriOAuth, isAnonymouns, signIn } from '@utils/esri-oauth';
import { APP_ID } from './constants';
import { ErrorPage } from '@components/ErrorPage/ErrorPage';
import { canAccessEFGImageryService } from '@services/Myanmar-EFG/helper';

(async () => {
    const root = createRoot(document.getElementById('root'));

    try {
        await initEsriOAuth({
            appId: APP_ID,
        });

        // user has to be signed in to use this app.
        // therefore prompt user to sign in if they are not.
        if (isAnonymouns()) {
            signIn();
            return;
        }

        // check and see if the signed in user can assign the EFG layer that just shared with the org
        await canAccessEFGImageryService();

        const preloadedState = getPreloadedState();

        root.render(
            <ReduxProvider store={configureAppStore(preloadedState)}>
                <Layout />
            </ReduxProvider>
        );
    } catch (err) {
        root.render(<ErrorPage error={err} />);
        // console.log(err)
    }
})();
