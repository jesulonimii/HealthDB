import { Settings, View } from "react-native";
import { Route, Routes } from "react-router-native";
import { twMerge } from "tailwind-merge";
import { FavouritesScreen, Home, NotificationScreen, SearchScreen } from "../screens/Home";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../api";
import { useContext } from "react";
import { UserContext } from "../context";
import { ProductInfoScreen } from "../screens/Products";

function Router(props) {
    const { className = "" } = props;

    const { user, setUser } = useContext(UserContext);

    const routes = [
        {
            path: "/",
            component: <Home />,
        },
        {
            path: "/search",
            component: <SearchScreen />,
        },
        {
            path: "/favourites",
            component: <FavouritesScreen />,
        },
        {
            path: "/settings",
            component: <NotificationScreen />,
        },
        {
            path: "/product/:id",
            component: <ProductInfoScreen />,
        },
    ];

    //fetch user data
    const username = "jesulonimii";
    const {
        data: userData,
        status,
        refetch: refetchUserData,
    } = useQuery({
        queryKey: ["user-data", username],
        queryFn: () => getUserInfo(username),
        onSuccess: (data) => {
            setUser(data[0]);
        },
        onError: (error) => {
            console.log(error);
        },
    });

    return (
        <View className={twMerge(`w-full flex-1 ${className}`)}>
            <Routes>
                {routes.map((route, index) => {
                    return <Route key={index} path={route.path} element={route.component} />;
                })}
            </Routes>
        </View>
    );
}

export default Router;
