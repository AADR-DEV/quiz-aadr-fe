import React, { useState } from 'react';
import {
    View,
    Text,
    Input,
    Button,
    InputField,
} from '@gluestack-ui/themed';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { UserInfo, selectAuth, session } from '../../store/auth';
import { authApi } from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertAvatar from '../AlertAvatar';

export default function SubmitUsername({ navigation, avatar }: any) {
    const [username, setUsername] = useState('');
    const [showAlertDialog, setShowAlertDialog] = useState(false);

    const user = useAppSelector(selectAuth);
    const [updateUserAuth] = authApi.useUpdateUserAuthMutation();
    const dispatch = useAppDispatch();

    const handleSubmit = async () => {
        if (username === '' || !avatar) {
            setShowAlertDialog(true);
            return;
        }

        try {
            const userInfo: UserInfo = {
                ...user,
                avatar,
                username,
            };

            await AsyncStorage.setItem('userUsername', username);
            updateUserAuth(userInfo);
            dispatch(session({ userInfo }));
            navigation.navigate('Home');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View
            rounded={"$2xl"}
            justifyContent="center"
            alignItems="center"
            gap={"$2"}
            bgColor='$secondaryBg'
            width={"100%"}
        >
            <Text
                fontSize="$xl"
                fontWeight="bold"
                color='white'
            >Username</Text>

            <Input
                rounded={'$2xl'}
                width={'90%'}
                backgroundColor='white'
            >
                <InputField
                    fontSize="$sm"
                    color='gray'
                    textAlign='center'
                    placeholder="Input your username"
                    onChange={(e) => setUsername(e.nativeEvent.text)}
                />
            </Input>

            <Button
                rounded={'$2xl'}
                backgroundColor="$greenButton"
                onPress={() => handleSubmit()}
            >
                <Text>Continue</Text>
            </Button>

            {showAlertDialog && (
                <AlertAvatar showAlertDialog={showAlertDialog} setShowAlertDialog={setShowAlertDialog} />
            )}
        </View>
    );
}
