import { View } from "react-native";

function CardUi(props) {
    const { style = "", children = null } = props;

    return <View className={`w-full bg-white h-fit rounded-lg p-5 ${style}`}>{children}</View>;
}

export default CardUi;
