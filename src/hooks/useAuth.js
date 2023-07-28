import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "@context";
import { useContext } from "react";
import { Login as LoginUser } from "@api";
import { QUERY_KEYS } from "@utils";
import useLocalStorage from "./useLocalStorage";
import { useRouter } from "expo-router";
import { GetUserInfo } from "@/src/api/Auth.api";

const useAuth = () => {
	const router = useRouter();

	const { user, setUser } = useContext(UserContext);
	const { saveToStorage, removeFromStorage } = useLocalStorage();

	const refreshUser = () => {
		return GetUserInfo(user.id)
			.then((r) => {
				if (!r.error) {
					setUser(r.data);
					return saveToStorage(QUERY_KEYS.user_data, r.data)
						.then((res) => {
							return true;
						})
						.catch((e) => console.log("error-saving-to-storage", e));
				} else {
					return {
						logged_in: false,
						error: r.error,
					};
				}
			})
			.catch((e) => {
				return {
					error: e,
				};
			});
	};

	const Login = async (id, password) => {
		return LoginUser(id, password)
			.then((r) => {
				if (!r.error) {
					setUser(r.data);
					return saveToStorage(QUERY_KEYS.user_data, r.data)
						.then((res) => {
							return {
								logged_in: true,
								reg_complete: r.data.completed_app_registration,
							};
						})
						.catch((e) => console.log("error-saving-to-storage", e));
				} else {
					return {
						logged_in: false,
						error: r.error,
					};
				}
			})
			.catch((e) => {
				console.log("error:", e);
				return {
					logged_in: false,
					error: e,
				};
			});
	};

	const Logout = () => {
		router.push("/login");
		setUser(null);
		removeFromStorage(QUERY_KEYS.user_data).then((r) => console.log(r));
	};

	return {
		Login,
		Logout,
		refreshUser,
		user,
		setUser,
	};
};

export default useAuth;
