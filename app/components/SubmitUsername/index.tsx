import * as React from 'react';
import {
    View,
    Text,
    Input,
    Button,
    InputField
} from '@gluestack-ui/themed'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux'
import { UserInfo, selectAuth, session } from '../../store/auth';
import { authApi } from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SubmitUsername({ navigation, avatar }: any) {
    const [username, setUsername] = React.useState<string>('')

    const user = useAppSelector(selectAuth)

    // const [createUse] = authApi.useCreateUserAuthMutation()
    const [updateUserAuth] = authApi.useUpdateUserAuthMutation()


    const dispatch = useAppDispatch();

    const handleSubmit = async () => {
        try {
            const userInfo: UserInfo = {
                ...user,
                avatar,
                username,
            }

            await AsyncStorage.setItem('userUsername', username);

            updateUserAuth(userInfo)
            dispatch(session({ userInfo }));
        } catch (error) {
            console.error(error)
        }
    }

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
                // onPress={() => navigation.navigate('Home')}
                onPress={() => handleSubmit().then(() => navigation.navigate('Home'))}
            >
                <Text>Continue</Text>
            </Button>
        </View>
    )
}