import { Button, Image, Text, View } from "react-native";
import { twMerge } from "tailwind-merge";
import { TouchableOpacity } from "react-native";

function CustomButton(props) {
    const {
        style = "",
        border = false,
        title = "",
        variant = "contained",
        disabled = false,
        onClick = () => {},
        endIcon = null,
        startIcon = null,
    } = props;

    const variance = {
        contained: `${border && "border"} text-white `,
        outlined: "text-black border border-primary bg-transparent",
        text: "text-black bg-transparent",
    };

    const handleClick = (event) => {
        onClick && onClick(event);
    };

    const classes = twMerge(
        ` bg-primary ${variance[variant]} w-fit px-4 py-1 justify-center items-center rounded-[8px] ${style} ${
            disabled && "bg-gray-500"
        }`,
    );

    const classes2 = twMerge(`${variance[variant]} border-0 uppercase ${style}`);

    return (
        <View className="">
            <TouchableOpacity disabled={disabled} activeOpacity={0.8} onPress={handleClick} className={classes}>
                {startIcon && startIcon}
                <Text className={`${classes2} bg-transparent`}>{title}</Text>
                {endIcon && endIcon}
            </TouchableOpacity>
        </View>
    );
}

export default CustomButton;
