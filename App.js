import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, View } from "react-native";
import { Link, NativeRouter } from "react-router-native";
import Router from "./src/router";
import * as Icons from "react-native-heroicons/outline";
import * as FilledIcons from "react-native-heroicons/solid";
import { useFonts } from "expo-font";
import { GLOBAL } from "@utils";
import { ScreenContext, UserContext } from "@context";
import { useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@api";

const queryClient = new QueryClient();

export default function App() {
    //define states and hooks
    const [loaded] = useFonts({
        "Outfit-Bold": require("./src/assets/fonts/Outfit/Outfit-Bold.ttf"),
        "Outfit-Regular": require("./src/assets/fonts/Outfit/Outfit-Regular.ttf"),
        "Outfit-Medium": require("./src/assets/fonts/Outfit/Outfit-Medium.ttf"),
        "Outfit-SemiBold": require("./src/assets/fonts/Outfit/Outfit-SemiBold.ttf"),
    });
    const [active_screen, setActiveScreen] = useState("home");
    const [show_bottom_nav, setShowBottomNav] = useState(true);

    const [user, setUser] = useState(GLOBAL.default_user);

    //set up bottom nav bar
    const iconStyle = "text-gray-500 w-full";
    const bottomNav = [
        {
            link: "/",
            icon: <Icons.HomeIcon className={iconStyle} />,
            active: active_screen === "home",
        },
        {
            link: "/search",
            icon: <Icons.InboxStackIcon className={iconStyle} />,
            active: active_screen === "search",
        },
        {
            link: "/favourites",
            icon: <Icons.HeartIcon className={iconStyle} />,
            active: active_screen === "favourites",
        },
        {
            link: "/settings",
            icon: <Icons.BellIcon className={iconStyle} />,
            active: active_screen === "settings",
        },
    ];

    //if fonts fail to load
    if (!loaded) {
        return null;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <ScreenContext.Provider
                value={{
                    active_screen,
                    setActiveScreen,
                    show_bottom_nav,
                    setShowBottomNav,
                }}>
                <UserContext.Provider value={{ user, setUser }}>
                    <NativeRouter>
                        <StatusBar barStyle="dark-content" hidden={false} translucent={true} />

                        <SafeAreaView className="flex-1 flex-col justify-center items-center w-full h-screen pt-8">
                            {/*Top Navigation View*/}
                            <View className="h-[100%] flex-[14] w-full bg-gray-200">
                                <Router />
                            </View>

                            {/*Bottom Navigation*/}

                            {show_bottom_nav && (
                                <View className="w-full h-fit flex-1 flex-row bg-white justify-evenly items-center text-red-500">
                                    {bottomNav.map((item, index) => {
                                        return (
                                            <Link
                                                underlayColor="#e3e3e3"
                                                to={item.link}
                                                key={index}
                                                className="cursor-default h-full flex-1 items-center justify-center focus:bg-white">
                                                <View className="items-center">
                                                    {item.icon}

                                                    {item.active && (
                                                        <View className="w-4 h-1 my-1 bg-primary rounded-full" />
                                                    )}
                                                </View>
                                            </Link>
                                        );
                                    })}
                                </View>
                            )}
                        </SafeAreaView>
                    </NativeRouter>
                </UserContext.Provider>
            </ScreenContext.Provider>
        </QueryClientProvider>
    );
}
