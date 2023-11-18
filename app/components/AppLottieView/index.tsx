import LottieView from "lottie-react-native";

const AppLottieView = ({ animation = '', autoPlay = true, loop = true, ...props }) => {
    return <LottieView source={animation} autoPlay={autoPlay} loop={loop} {...props} />;
};

export default AppLottieView;
