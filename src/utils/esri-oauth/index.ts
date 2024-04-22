// import { loadModules } from 'esri-loader';
import axios from 'axios';

import OAuthInfo from '@arcgis/core/identity/OAuthInfo';
import esriId from '@arcgis/core/identity/IdentityManager';
/**
 * Importing the Portal class will make the final bundle size much larger than
 * what we actually need. Had a call with Yann Cabon from the JSAPI team
 * and he says the this is probably because of Portal class also imports
 * basemap as dependency which includes most of fundemental modules for mapping.
 *
 * Yann Cabon has created a new issue to address this as an enhancement:
 * @see https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/61305
 */
import Portal from '@arcgis/core/portal/Portal';
import Credential from '@arcgis/core/identity/Credential';
import PortalUser from '@arcgis/core/portal/PortalUser';

type Props = {
    appId: string;
    portalUrl?: string;
};

type OAuthResponse = {
    credential: Credential;
    portal: Portal;
};

type IPlatformSelfResponse = {
    expires_in: number;
    token: string;
    username: string;
};

export type UserData = {
    name: string;
    id: string;
    group: string;
    image: string;
    favGroupId: string;
};

let oauthInfo: OAuthInfo;
// let esriId: typeof IdentityManager;
let userPortal: Portal;
let credential: Credential = null;

export const initEsriOAuth = async ({
    appId,
    portalUrl = 'https://www.arcgis.com',
}: Props): Promise<OAuthResponse> => {
    try {
        // const platformSelfResponse = await platformSelf(appId, portalUrl);

        oauthInfo = new OAuthInfo({
            appId,
            portalUrl,
            popup: false,
        });

        // esriId = IdentityManager;

        esriId.registerOAuthInfos([oauthInfo]);

        // if (platformSelfResponse) {
        //     const { expires_in, token, username } = platformSelfResponse;

        //     esriId.registerToken({
        //         expires: expires_in,
        //         token: token,
        //         server: portalUrl,
        //         userId: username,
        //         ssl: false,
        //     });
        // }

        credential = await esriId.checkSignInStatus(
            oauthInfo.portalUrl + '/sharing'
        );

        // init paortal
        userPortal = new Portal({ url: portalUrl });
        // Setting authMode to immediate signs the user in once loaded
        userPortal.authMode = 'immediate';

        // Once loaded, user is signed in
        await userPortal.load();
    } catch (err) {
        console.log(err.message);
    }

    return {
        credential,
        portal: userPortal,
    };
};

export const signIn = async (): Promise<void> => {
    console.log('sign in');
    const credential: Credential = await esriId.getCredential(
        oauthInfo.portalUrl + '/sharing'
    );
    console.log('signed in as', credential.userId);
};

export const signOut = async (): Promise<void> => {
    const { appId, portalUrl } = oauthInfo;
    const { token } = credential;

    try {
        // need to call oauth2/signout to clear the encrypted cookie and signs the user out of the ArcGIS platform
        // here to learn more: https://confluencewikidev.esri.com/display/AGO/oAuth+signout
        await axios({
            url: portalUrl + '/sharing/rest/oauth2/signout',
            method: 'post',
            params: {
                client_id: appId,
                token,
                // redirect_uri: window.location.href
            },
        });
    } catch (err) {
        console.error(err);
    }

    esriId.destroyCredentials();

    window.location.reload();
};

// get the user data object to populate Esri Global Nav
export const getUserData = (): UserData => {
    if (!userPortal) {
        return null;
    }

    const { name } = userPortal;

    const user: PortalUser & {
        favGroupId?: string;
    } = userPortal.user;

    const { fullName, username, thumbnailUrl, favGroupId } = user;

    return {
        // 	name: 'Cassidy Bishop',
        name: fullName,
        // 	id: 'iamoktatester@gmail.com',
        id: username,
        // 	group: 'Riverside City Mgmt.',
        group: name,
        // 	image: '//placehold.it/300x300'
        image: thumbnailUrl,
        favGroupId,
    };
};

export const getPortalBaseUrl = () => {
    if (!userPortal) {
        return null;
    }

    const { urlKey, url, customBaseUrl } = userPortal;

    return urlKey ? `https://${urlKey}.${customBaseUrl}` : `${url}`;
};

export const switchAccount = (appId: string) => {
    const portalBaseUrl = getPortalBaseUrl();
    const redirectUri = `${window.location.origin}${window.location.pathname}`;
    const targetUrl = `${portalBaseUrl}/home/pages/Account/manage_accounts.html#redirect_uri=${redirectUri}&client_id=${appId}`;
    window.open(targetUrl, '_blank');
};

export const isAnonymouns = () => {
    return credential === null;
};

export const getToken = () => {
    if (!credential) {
        return '';
    }

    return credential.token;
};

export const revalidateToken = async () => {
    if (isAnonymouns()) {
        return;
    }

    const token = getToken();

    const portalBaseUrl = getPortalBaseUrl();

    const requestURL = `${portalBaseUrl}/sharing/rest/portals/self?f=json&token=${token}`;

    try {
        const res = await fetch(requestURL);

        const data = await res.json();

        if (data.error) {
            throw data.error;
        }
    } catch (err) {
        console.log(err);

        // sign out if current token is invalid, means user has signed out from somewhere else
        signOut();
    }
};
