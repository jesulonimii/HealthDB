import axios from "axios";
import { GLOBAL, callApi } from "@utils";

const API_URL = GLOBAL.API_URL;
const API_KEY = GLOBAL.API_KEY;

export const GetUserInfo = async (id) => {
	const payload = {};

	const config = {
		method: "get",
		url: `${API_URL}/users?id=${id}`,
		data: payload,
		headers: {
			"Content-Type": "application/json",
			Authorization: API_KEY,
		},
	};

	const userInfo = await callApi(config);
	return userInfo[0] ? { error: false, data: userInfo[0] } : { error: "No user found" };
};

export const Login = async (id, password) => {
	const payload = {
		id: id.toLowerCase().trim(),
		password: password.trim(),
	};

	const config = {
		method: "get",
		url: `${API_URL}/users?id=${id}&password=${password}`,
		data: payload,
		headers: {
			"Content-Type": "application/json",
			Authorization: API_KEY,
		},
	};

	const userInfo = await callApi(config);
	return userInfo[0] ? { error: false, data: userInfo[0] } : { error: "Invalid Credentials" };
};
export const Signup = async ({ password, first_name, last_name, phone }) => {
	const payload = {
		id: "hc-" + phone.trim(),
		password: password.trim(),
		student: null,
		personal_info: {
			first_name: first_name.trim(),
			last_name: last_name.trim(),
			profile_image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
			date_of_birth: "-",
			gender: "-",
		},
		contact_info: {
			address: "-",
			phone: phone.trim(),
			email: "-",
		},
		emergency_contacts: [],
		medical_history: {
			last_visit: null,
		},
		notifications: [],
		appointments: [],
		completed_app_registration: false,
	};

	const config = {
		method: "post",
		url: `${API_URL}/users`,
		data: payload,
		headers: {
			"Content-Type": "application/json",
			Authorization: API_KEY,
		},
	};

	const userInfo = await callApi(config);
	console.log("userInfo", userInfo);
	return userInfo ? { error: false, data: userInfo } : { error: "Registration Failed." };
};

export const CompleteInfo = async ({
	id,
	first_name,
	last_name,
	phone,
	level,
	department,
	faculty,
	matric_number,
	date_of_birth,
	gender,
	address,
	email,
	additional_medical_info,
	allergies,
}) => {
	console.log("compare data", {
		id,
		first_name,
		last_name,
		phone,
		level,
		department,
		faculty,
		matric_number,
		date_of_birth,
		gender,
		address,
		email,
		additional_medical_info,
		allergies,
	});

	const payload = {
		id: matric_number.toLowerCase().trim(),
		student: {
			level: level.trim(),
			department: department.trim(),
			faculty: faculty.trim(),
			matric_number: matric_number.trim(),
		},
		personal_info: {
			first_name: first_name.trim(),
			last_name: last_name.trim(),
			profile_image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
			date_of_birth: date_of_birth.trim(),
			gender: gender.trim(),
		},
		contact_info: {
			address: address.trim(),
			phone: phone.trim(),
			email: "" || email.trim(),
		},
		medical_history: {
			additional_medical_info: additional_medical_info.trim(),
			allergies: allergies.trim(),
			surgeries: null,
			last_visit: null,
		},
		completed_app_registration: true,
	};

	const config = {
		method: "patch",
		url: `${API_URL}/users/${id.toLowerCase().trim()}`,
		data: payload,
		headers: {
			"Content-Type": "application/json",
			Authorization: API_KEY,
		},
	};

	const userInfo = await callApi(config);
	console.log("userInfo", userInfo);
	return userInfo ? { error: false, data: userInfo } : { error: "Registration Failed." };
};


