import { Button, Dimensions, Image, ScrollView, Text, TextInput, View } from "react-native";
import { Body } from "../../components/layout";
import { GLOBAL } from "../../utils";
import React, { useContext, useEffect } from "react";
import { ScreenContext } from "../../context";
import { Link, useLocation, useNavigate, useNavigation, useParams } from "react-router-native";
import Logo from "../../assets/icons/icon.svg";
import * as Icons from "react-native-heroicons/outline";
import { CustomButton } from "../../components/ui";

function ProductScreen(props) {
    const { active_screen, setActiveScreen, setShowBottomNav } = useContext(ScreenContext);
    const { state } = useLocation();

    const { id: getProductId } = useParams();

    const { id, name, retailer, price, images, description } = state;

    const navigate = useNavigate();

    useEffect(() => {
        setActiveScreen("product");
        setShowBottomNav(false);
    }, []);

    const goBack = () => {
        console.log("going back");
        navigate(-1);
    };

    return (
        <View className="flex-1">
            <View className="w-full drop-shadow flex-row bg-white p-4 h-14 items-center justify-between">
                <Link to={".."} underlayColor="#ffffff" className="w-16 h-8 justify-center">
                    <Icons.ChevronLeftIcon className="w-full text-gray-500" />
                </Link>

                <Text className="-ml-10 text-md font-outfit-semibold">{name}</Text>

                <Icons.ShoppingBagIcon className="w-full text-gray-500" />
            </View>

            <Body style="px-0 py-1.5">
                <View className="bg-white p-4 h-[100vh]">
                    <Text className="text-lg font-outfit-medium">{name}</Text>

                    <Text className="text-primary font-bold">{retailer}</Text>

                    <ScrollView
                        className={`${images.length === 1 ? "h-[5vh]" : "h-[0vh]"}  w-full my-4 p-1`}
                        horizontal
                        keyboardDismissMode="on-drag"
                        showsHorizontalScrollIndicator={false}>
                        {images.map((item, index) => {
                            return (
                                <Image
                                    key={index}
                                    className={`aspect-square mr-2 h-full bg-green-400 rounded-lg`}
                                    source={{ uri: item }}
                                />
                            );
                        })}
                    </ScrollView>

                    <Text className="text-xl">₦ {parseInt(price).toLocaleString("en-US")}</Text>

                    <Text className="text-gray-600 my-3 flex-1">{description}</Text>
                </View>
            </Body>

            <View className="flex-row h-14 py-2 bg-white mt-2 p-4 justify-between">
                <Text className="text-gray-500">Add to cart:</Text>

                <View className="flex-row">
                    <CustomButton title="-" style="aspect-square justify-center items-center" />

                    <TextInput
                        className="bg-gray-300 rounded-lg mx-2 px-2 flex items-center justify-center w-12 h-8"
                        disabled
                        placeholder="0"
                    />

                    <CustomButton title="+" style="aspect-square flex justify-center items-center" />
                </View>
            </View>
        </View>
    );
}

export default ProductScreen;
