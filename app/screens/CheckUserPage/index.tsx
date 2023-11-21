import React, { useEffect } from 'react';
import { View } from '@gluestack-ui/themed';
import { useAppSelector } from '../../hooks/useRedux';
import { selectAuth } from '../../store/auth';
import authApi, { GetUserAuthPayload } from '../../api/authApi';
import { Loading } from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CheckUserPage({ navigation }: any) {
    const user = useAppSelector(selectAuth);
    const { data, isLoading } = authApi.useGetUserAuthQuery({ email: user?.email } as GetUserAuthPayload);

    const usernameUser = data && data.username;

    //Android13
    if (!isLoading) {
        if (usernameUser === null || usernameUser === '' || usernameUser === undefined) {
            navigation.navigate('Avatar');
        } else {
            navigation.navigate('Home');
        }
    }

    AsyncStorage.getItem('userToken')
        .then(token => {
            console.log("CheckUserPage token = ", token);
        });

    return (
        <View
            backgroundColor="$primaryBg"
            flex={1}
            justifyContent="center"
            alignItems="center"
        >
            <Loading />
        </View>
    );
}
