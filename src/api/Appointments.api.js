import { GLOBAL, callApi } from "@utils";

const API_URL = GLOBAL.API_URL;
const API_KEY = GLOBAL.API_KEY;

export const BookAppointment = async (data, id) => {
	const payload = {
		pending_appointment: data,
	};

	const config = {
		method: "patch",
		url: `${API_URL}/users/${encodeURIComponent(id.toLowerCase().trim())}`,
		data: payload,
		headers: {
			"Content-Type": "application/json",
			Authorization: API_KEY,
		},
	};

	const userInfo = await callApi(config);
	return userInfo[0] ? { error: false, data: userInfo[0] } : { error: "No user found" };
};

export const DeleteAppointment = async (id) => {
	const payload = {
		pending_appointment: null,
	};

	const config = {
		method: "patch",
		url: `${API_URL}/users/${encodeURIComponent(id.toLowerCase().trim())}`,
		data: payload,
		headers: {
			"Content-Type": "application/json",
			Authorization: API_KEY,
		},
	};

	const info = await callApi(config);
	return true;
};

