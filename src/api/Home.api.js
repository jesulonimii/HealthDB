import axios from "axios";
import { GLOBAL } from "@utils";

const API_URL = GLOBAL.API_URL;
const API_KEY = GLOBAL.API_KEY;

export const getFeaturedItems = async () => {
    const payload = {};

    const config = {
        method: "get",
        url: `${API_URL}/featured`,
        data: payload,
        headers: {
            "Content-Type": "application/json",
            Authorization: API_KEY,
        },
    };

    return await call(config);
};

export const getForYouItems = async () => {
    const payload = {};

    const config = {
        method: "get",
        url: `${API_URL}/for-you`,
        data: payload,
        headers: {
            "Content-Type": "application/json",
            Authorization: API_KEY,
        },
    };

    return await call(config);
};

export const getFlashSales = async () => {
    const payload = {};

    const config = {
        method: "get",
        url: `${API_URL}/flash-sales`,
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
