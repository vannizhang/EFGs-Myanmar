import { getToken } from '@utils/esri-oauth';
import { EFG_SERVICE_URL } from './config';

export const canAccessEFGImageryService = async () => {
    const requestURL = EFG_SERVICE_URL + `/?f=json&token=${getToken()}`;

    const res = await fetch(requestURL);

    const body = await res.json();
    console.log(body);

    if (body.error) {
        throw new Error(JSON.stringify(body.error));
    }

    return true;
};
