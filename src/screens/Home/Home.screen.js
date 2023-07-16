import React, { useContext, useEffect, useState } from "react";
import { Image, ScrollView, Text, TextInput, View } from "react-native";
import * as Icons from "react-native-heroicons/outline";
import { GLOBAL } from "@utils";
import { ScreenContext, UserContext } from "@context";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { getFeaturedItems, getForYouItems } from "@api";
import { getFlashSales } from "@api";
import { CustomButton } from "@ui";
import { Card } from "@components/ui";
import { Logo } from "@assets/icons";
import { Body } from "@components/layout";
import { Link } from "react-router-native";

function HomeScreen() {
    const { setActiveScreen, setShowBottomNav } = useContext(ScreenContext);
    useEffect(() => {
        setActiveScreen("home");
        setShowBottomNav(true);
    }, []);

    const { user } = useContext(UserContext);
    const { first_name, profile_image } = user;

    const EMPTY = [];

    const [featuredItems, setFeaturedItems] = useState([]);
    const [forYouItems, setForYouItems] = useState([]);
    const [flashSales, setFlashSales] = useState([]);

    const customPagination = {
        paginationStyle: { bottom: -24, left: 0, right: 0 },
        dot: (
            <View
                style={{
                    backgroundColor: "rgba(0,0,0,.2)",
                    width: 7,
                    height: 7,
                    borderRadius: 4,
                    marginLeft: 3,
                    marginRight: 3,
                    marginTop: 3,
                    marginBottom: 3,
                }}
            />
        ),
        activeDot: (
            <View
                style={{
                    backgroundColor: GLOBAL.theme_color,
                    width: 19,
                    height: 7,
                    borderRadius: 4,
                    marginLeft: 3,
                    marginRight: 3,
                    marginTop: 3,
                    marginBottom: 3,
                }}
            />
        ),
    };

    const { data: getFeaturedProducts, refetch: refetchFeaturedItems } = useQuery({
        queryKey: ["featured-items"],
        queryFn: getFeaturedItems,
        onSuccess: (data) => {
            setFeaturedItems(data);
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const { data: getForYouProducts, refetch: refetchForYouItems } = useQuery({
        queryKey: ["for-you-items"],
        queryFn: getForYouItems,
        onSuccess: (data) => {
            //console.log("for-you-data", data)
            setForYouItems(data);
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const { data: getFlashSalesProducts, refetch: refetchFlashSales } = useQuery({
        queryKey: ["flash-sales"],
        queryFn: getFlashSales,
        onSuccess: (data) => {
            //console.log("flash", data)
            setFlashSales(data);
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const day = moment().format("dddd");

    const homeCategories = [
        { name: "Featured Products", list: featuredItems || EMPTY },
        { name: "Top picks for you", list: forYouItems || EMPTY },
        { name: `${day} Flash Sales `, list: flashSales || EMPTY },
    ];

    return (
        <View className="flex-1">
            <View className="w-full drop-shadow flex-row bg-white p-4 h-14 items-center justify-between">
                <Image className="w-8 aspect-square rounded-full" source={{ uri: profile_image }} />

                <View className="w-8">
                    <Logo />
                </View>

                <Icons.ShoppingBagIcon className="w-full text-gray-500" />
            </View>

            <Body>
                <Card>
                    <Text className="font-outfit-medium text-gray-800 text-xl">
                        {moment().format("HH") < 12
                            ? "Good morning "
                            : moment().format("HH") < 16
                            ? "Good afternoon "
                            : "Good evening "}
                        <Text className="text-primary">{first_name}</Text>,
                    </Text>

                    <Text className="text-gray-400 mt-1">What do you need today?</Text>

                    <TextInput
                        className="bg-gray-100 rounded-lg mt-4 p-3 w-full"
                        placeholder="Search for a product (ex: thrift, shoes, jeans)"
                    />

                    <CustomButton title={"Search"} style={"bg-primary my-2"} />
                </Card>

                <Card style="mt-4 flex-1 h-fit mb-8 p-0 py-2 pb-8  justify-start">
                    {homeCategories.map((category, index) => {
                        return (
                            <View key={index} className="w-full h-[38vh] flex-1 p-3 mb-4">
                                <Text className="text-md capitalize font-outfit-medium">{category.name}</Text>

                                <ScrollView
                                    className="h-12 w-full mt-4 pb-3"
                                    horizontal
                                    keyboardDismissMode="on-drag"
                                    showsHorizontalScrollIndicator={false}>
                                    {category.list.map((item, index) => {
                                        return (
                                            <Link
                                                underlayColor="#ffffff"
                                                to={`/product/${item.id}`}
                                                state={item}
                                                key={index}>
                                                <View className="flex-1 w-[300px] mr-1 h-full rounded-lg border-solid border border-gray-100 bg-gray-50 justify-center ">
                                                    <Image
                                                        className="w-full h-32 bg-gray-100 rounded-t-lg flex-1"
                                                        source={{ uri: item.images[0] }}
                                                    />

                                                    <View className="my-2 p-3">
                                                        <Text className="text-primary font-outfit-bold">
                                                            {item.name}
                                                        </Text>
                                                        <Text className="text-gray-900 text-sm">
                                                            ₦{parseInt(item.price).toLocaleString("en-US")}
                                                        </Text>
                                                        <Text className="text-gray-500 text-sm">
                                                            By: {item.retailer}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </Link>
                                        );
                                    })}
                                </ScrollView>
                            </View>
                        );
                    })}
                </Card>
            </Body>
        </View>
    );
}

export default HomeScreen;
