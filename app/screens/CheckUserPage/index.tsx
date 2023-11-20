import React from 'react';
import { View } from '@gluestack-ui/themed';
import { useAppSelector } from '../../hooks/useRedux';
import { selectAuth } from '../../store/auth';
import authApi, { GetUserAuthPayload } from '../../api/authApi';
import { Loading } from '../../components';

export default function CheckUserPage({ navigation }: any) {
    const user = useAppSelector(selectAuth);
    const { data, isLoading } = authApi.useGetUserAuthQuery({ email: user?.email } as GetUserAuthPayload);

    const usernameUser = data && data.username;

    if (!isLoading) {
        if (usernameUser === null || usernameUser === '' || usernameUser === undefined) {
            navigation.navigate('Avatar');
        } else {
            navigation.navigate('Home');
        }
    }

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
