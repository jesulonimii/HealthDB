import QUERY_KEYS from "./query-keys";
import axios from "axios";

const api_url = process.env.API_URL;

const GLOBAL = {
	theme_color: "#1f8318",
	//API_URL: "http://192.168.0.101:3333",
	//API_URL: "http://192.168.43.207:3333",
	API_URL: "https://my-json-server.typicode.com/jesulonimii/swep",
	API_KEY: "qwerty1234",
	default_user: {
		id: "1234",
		username: "test",
		first_name: "Test User",
		last_name: "Test User Surname",
		profile_image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
		email: "",
	},
};

const COLORS = {
	primary: "#010066",
	info: "#045da6",
	success: "#1f8318",
	danger: "#d32f2f",
	error: "#d32f2f",
	warning: "#ffa000",
};

const HEX2RGBA = (hex, alpha = 1) => {
	if (hex.length < 6 || hex.length > 7) {
		return `rgba(1, 1, 1, ${alpha})`;
	} else {
		const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
		return `rgba(${r},${g},${b},${alpha})`;
	}
};

const stringToBoolean = (stringValue) => {
	switch (stringValue?.toString().toLowerCase()?.trim()) {
		case "true":
		case "yes":
		case "1":
		case true:
			return true;

		case "false":
		case "no":
		case "0":
		case null:
		case false:
		case undefined:
			return false;

		default:
			return JSON.parse(stringValue);
	}
};

const callApi = async (config) => {
	const { data } = await axios({ ...config, timeout: 10000 });
	return data;
};

export { GLOBAL, callApi, QUERY_KEYS, COLORS, HEX2RGBA, stringToBoolean };
