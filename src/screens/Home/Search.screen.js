import { Button, Image, Text, TextInput, View } from "react-native";
import { Body } from "../../components/layout";
import { GLOBAL } from "../../utils";
import { useContext, useEffect } from "react";
import { ScreenContext } from "../../context";

function SearchScreen(props) {
    const { active_screen, setActiveScreen, setShowBottomNav } = useContext(ScreenContext);

    useEffect(() => {
        setActiveScreen("search");
        setShowBottomNav(true);
    }, []);

    const { className = "" } = props;

    return (
        <View className="flex-1">
            <View className="w-full drop-shadow flex-row bg-white py-4 h-14 items-center justify-center">
                <Text className="text-md font-outfit-semibold">Category</Text>
            </View>

            <Body></Body>
        </View>
    );
}

export default SearchScreen;
