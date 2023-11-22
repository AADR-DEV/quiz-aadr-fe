import {
    View,
    Text,
    Box,
    VStack,
    HStack,
    Image,
    Input,
    Button,
    InputField,
    ButtonText
} from '@gluestack-ui/themed';
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useAppSelector } from '../../hooks/useRedux';
import { UserInfo, session, selectAuth } from '../../store/auth';
import { useDispatch } from 'react-redux';
import { authApi } from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BuyAvatarPage({ navigation }: any) {
    const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
    const user = useAppSelector(selectAuth);
    const dispatch = useDispatch();
    const avatarListCategory = authApi.useGetAvatarListQuery();
    const Avatars = avatarListCategory.data?.data || [];
    const [updateUserAuth] = authApi.useUpdateUserAuthMutation();

    console.log(selectedAvatar);

    const handleChooseAvatar = (avatarUrl: string) => {
        setSelectedAvatar(avatarUrl);
    }

    console.log(selectedAvatar);

    const handleSubmit = async () => {
        try {
            const userInfo: UserInfo = {
                ...user,
                mainAvatar: selectedAvatar,
            };

            await AsyncStorage.setItem('userAvatar', selectedAvatar);
            updateUserAuth(userInfo);
            dispatch(session({ userInfo }));
            navigation.navigate('Home');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View
            backgroundColor="$primaryBg"
            flex={1}
            alignItems="center"
        >
            <Box
                rounded={"$2xl"}
                padding="$4"
                justifyContent="center"
                alignItems="center"
                gap={"$2"}
                bgColor='$secondaryBg'
                width={"90%"}
                mt={'$5'}
            >
                <Text
                    fontSize="$lg"
                    fontWeight="bold"
                    color='white'
                >Change or Buy New Avatar</Text>
                <Box padding={5} flexDirection="row" flexWrap="wrap" justifyContent="space-between">
                    {Avatars.map((avatar: any) => (
                        <TouchableOpacity
                            key={avatar.id}
                            onPress={() => handleChooseAvatar(avatar.url)}
                            style={{
                                width: '30%',
                                marginBottom: '2%',
                            }}
                        >
                            <Box
                                backgroundColor={selectedAvatar === avatar.url ? '$primaryBg' : '$tertiaryBg'}
                                padding={selectedAvatar === avatar.url ? 5 : 5}
                                rounded={selectedAvatar === avatar.url ? '$2xl' : '$2xl'}
                                justifyContent='center'
                                alignItems='center'
                            >
                                <Image
                                    source={{ uri: avatar.url }}
                                    alt={avatar.name}
                                    size="sm"
                                    role="img"
                                />
                                <HStack
                                    justifyContent='center'
                                    alignItems='center'
                                    gap={'$1'}
                                >
                                    <Image
                                        source={require('../../../assets/diamonds/starter_pack.png')}
                                        alt="Diamond icon"
                                        width={15}
                                        height={15}
                                        role="img"
                                    />
                                    <Text
                                        color='white'
                                        size='sm'
                                        fontWeight='bold'
                                        textAlign='center'
                                        mt={2}
                                    >
                                        {avatar.price}
                                    </Text>
                                </HStack>
                            </Box>
                        </TouchableOpacity>
                    ))}
                </Box>
                <Box
                    justifyContent='space-between'
                    alignItems='center'
                    width={'100%'}
                    display='flex'
                    flexDirection='row'
                    gap={'$2'}
                >
                    <Button
                        onPress={() => {
                            navigation.navigate('Home')
                        }}
                        bg='$redButton'
                        my={'$4'}
                        rounded="$2xl"
                        width={'45%'}
                    >
                        <ButtonText
                            textAlign='center'
                            width={'100%'}
                            size='sm'
                            fontWeight='bold'
                        >Cancel</ButtonText>
                    </Button>
                    <Button
                        onPress={handleSubmit}
                        bg='$greenButton'
                        my={'$4'}
                        rounded="$2xl"
                        width={'45%'}
                    >
                        <ButtonText
                            textAlign='center'
                            width={'100%'}
                            size='sm'
                            fontWeight='bold'
                        >Buy</ButtonText>
                    </Button>
                </Box>
            </Box>
        </View>
    )
}