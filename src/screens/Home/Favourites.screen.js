import { Text, View } from "react-native";
import * as Icons from "react-native-heroicons/outline";
import { HomeModernIcon } from "react-native-heroicons/mini";
import { GLOBAL } from "../../utils";
import { useContext, useEffect } from "react";
import { ScreenContext } from "../../context";

function FavouritesScreen(props) {
    const { active_screen, setActiveScreen, setShowBottomNav } = useContext(ScreenContext);

    useEffect(() => {
        setActiveScreen("favourites");
        setShowBottomNav(true);
    }, []);

    const { className = "" } = props;

    return (
        <View className={`flex-1 bg-gray-200 ${className}`}>
            <View className="w-full h-[93%] justify-center items-center">
                <Text className="text-gray-500">Your Liked items would appear here.</Text>
            </View>
        </View>
    );
}

export default FavouritesScreen;
