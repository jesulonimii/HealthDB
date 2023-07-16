import { useState } from "react";

const api_url = process.env.API_URL;

const GLOBAL = {
    active_screen: "home",
    theme_color: "#1f8318",
    /*API_URL: 'http://192.168.0.101:3333',*/
    API_URL: "https://my-json-server.typicode.com/jesulonimii/json-server",
    API_KEY: "qwerty1234",
    default_user: {
        id: null,
        username: null,
        first_name: "William",
        last_name: "Abodunrin",
        profile_image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
        email: "",
    },
};

export { GLOBAL };
