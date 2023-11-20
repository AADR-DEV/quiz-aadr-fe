import { Box } from "@gluestack-ui/themed";
import { StatusBar } from 'react-native';
import AppLottieView from "../AppLottieView";




export default function Loading() {
    return (
        <Box
        >
            <StatusBar
                barStyle="light-content"
                backgroundColor="#6A5AE0"
            />
            <AppLottieView
                animation={require('./loading_animation.json')}
                autoPlay
                loop
                style={{
                    width: 200,
                    height: 200,
                }}
                rezizeMode="contain"
            />
        </Box>
    );
}