import axios from "axios";
import { GLOBAL } from "@utils";

const API_URL = GLOBAL.API_URL;
const API_KEY = GLOBAL.API_KEY;

export const getUserInfo = async (username) => {
    const payload = {};

    /*const config = {
        method: 'get',
        url: `${API_URL}/users/${username}`,
        data: payload,
        headers: {
            'Content-Type': 'application/json',
            Authorization: API_KEY,
        },
    }
*/
    const config = {
        method: "get",
        url: `${API_URL}/users?username=${username}`,
        data: payload,
        headers: {
            "Content-Type": "application/json",
            Authorization: API_KEY,
        },
    };

    return await call(config);
};

const call = async (config) => {
    try {
        const { data } = await axios(config);
        return data;
    } catch (e) {
        console.log({ error: e });
        return null;
    }
};
