import fetch from 'node-fetch';

const baseURL = 'https://id.twitch.tv';
const oAuthURL = `${baseURL}/oauth2`;
const tokenURL = `${oAuthURL}/token`;
const authorizeURL = `${oAuthURL}/authorize`;

interface Credentials {
    client_id: string | undefined;
    client_secret: string | undefined;
}

export const getAppAccessToken = async (credentials: Credentials, scope): Promise<string> => {
    const query = [
        `client_id=${credentials.client_id}`,
        `client_secret=${credentials.client_secret}`,
        'grant_type=client_credentials',
        `scope=${scope}`
    ];
    const response = await fetch(`${tokenURL}?${query.join("&")}`, {
        method: "POST"
    });

    try {
        const { access_token } = await response.json();
        return Promise.resolve(access_token);
    } catch (e) {
        return Promise.reject(response.text);
    }
}