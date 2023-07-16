import { ScrollView, View } from "react-native";

function Body(props) {
    const { style = "", children } = props;

    return <ScrollView className={`p-4 ${style}`}>{children}</ScrollView>;
}

export default Body;
