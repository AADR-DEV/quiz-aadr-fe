import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import { View, Spinner, Text } from '@gluestack-ui/themed';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { login, selectAuth, selectLoading } from '../../store/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthStack, AppStack } from '../index';



export default function AppNav({ navigation }: any) {
    const user = useAppSelector(selectAuth)
    const isLoading = useAppSelector(selectLoading)

    const userTokenFromStorage = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken')
            return token
        } catch (error) {
            console.error(error)
        }
    }

    const userToken = user && userTokenFromStorage()
    console.log('userToken', userToken)

    const isLoggedIn = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            if (token) {
                const username = await AsyncStorage.getItem('userUsername');
                console.log("Login Page username = ", username);
                if (username === null || username === '') {
                    navigation.navigate('Avatar');
                } else {
                    navigation.navigate('Home');
                }
            }
        } catch (error) {
            console.log('Login Error:', error);
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    if (isLoading) {
        return (
            <View
                flex={1}
                justifyContent="center"
                alignItems="center"
                backgroundColor="$primaryBg"
            >
                <StatusBar
                    barStyle="light-content"
                    backgroundColor="#6A5AE0"
                />
                <Spinner
                    color="white"
                    size='large'
                />
                <Text
                    color="white"
                    fontWeight="bold"
                >
                    trying to login....
                </Text>
            </View>
        )
    }


    return (
        <NavigationContainer >
            {user && userToken !== null
                ? <AppStack />
                : <AuthStack />
            }
        </NavigationContainer>
    );
} 