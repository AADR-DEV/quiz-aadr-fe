import {
    Box,
    Spinner,
} from '@gluestack-ui/themed';
import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { UserInfo, login, selectAuth } from '../../store/auth';
import authApi, { GetUserAuthPayload } from '../../api/authApi';

export default function CheckUserPage({ navigation }: any) {
    const user = useAppSelector(selectAuth);
    const { data } = authApi.useGetUserAuthQuery({ email: user?.email } as unknown as GetUserAuthPayload);

    const usernameUser = data && data.username;
    console.log("UserNameUser LoginPage = " + usernameUser);

    const checkUser = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            if (token) {
                console.log("Login Page username = ", usernameUser);
                if (usernameUser === null || usernameUser === '') {
                    navigation.navigate('Avatar');
                } else {
                    navigation.navigate('Home');
                }
            }
        } catch (error) {
            console.log('Login Error:', error);
        }
    };

    checkUser();

    return (
        <Box
            backgroundColor="$primaryBg"
            flex={1}
            justifyContent="center"
            alignItems="center"
        >
            <StatusBar
                barStyle="light-content"
                backgroundColor="#6A5AE0"
            />
            <Spinner color="white" />
        </Box>
    );
}
