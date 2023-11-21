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
import { AvatarPremiumInfo, SubmitUsername } from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppSelector } from '../../hooks/useRedux';
import { UserInfo, session, selectAuth } from '../../store/auth';
import { useDispatch } from 'react-redux';
import { authApi } from '../../api';

export default function BuyAvatarPage({ navigation }: any) {
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    console.log(selectedAvatar, 'selected')
    const user = useAppSelector(selectAuth);
    // console.log('user = ', user)
    const [updateUserAuth] = authApi.useUpdateUserAuthMutation();
    const dispatch = useDispatch()

    const Avatars = [
        { key: 'free_dog', image: require('../../../assets/avatars/free_dog.png'), price: 'Free' },
        { key: 'free_owl', image: require('../../../assets/avatars/free_owl.png'), price: 'Free' },
        { key: 'free_penguin', image: require('../../../assets/avatars/free_penguin.png'), price: 'Free' },
        { key: 'free_hen', image: require('../../../assets/avatars/free_hen.png'), price: 'Free' },
        { key: 'free_horse', image: require('../../../assets/avatars/free_horse.png'), price: 'Free' },
        { key: 'free_rabbit', image: require('../../../assets/avatars/free_rabbit.png'), price: 'Free' },
        { key: 'premium_cat', image: require('../../../assets/avatars/premium_cat.png'), price: 100 },
        { key: 'premium_dog', image: require('../../../assets/avatars/premium_dog.png'), price: 200 },
        { key: 'premium_lion', image: require('../../../assets/avatars/premium_lion.png'), price: 300 },
    ];

    function chunkArray(array, chunkSize) {
        const chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
        }
        return chunks;
    }

    const chunkedAvatars = chunkArray(Avatars, 3);


    const handleChooseAvatar = (avatarName: any) => {
        setSelectedAvatar(avatarName);
    }

    const isAvatarSelected = (avatarName: string) => {
        return selectedAvatar === avatarName;
    }

    const handleSubmit = async () => {
        try {
            const userInfo: UserInfo = {
                ...user,
                avatar: selectedAvatar
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
                <Box padding={5}>
                    {chunkedAvatars.map((row, rowIndex) => (
                        <HStack key={rowIndex} space={"md"} justifyContent='center' my={"$1"}>
                            {row.map((avatar: any) => (
                                <VStack key={avatar.key} w="30%" space={"md"} alignSelf="center" >
                                    <TouchableOpacity
                                        onPress={() => handleChooseAvatar(avatar.key)}>
                                        <Box
                                            backgroundColor={isAvatarSelected(avatar.key) ? '$primaryBg' : '$tertiaryBg'}
                                            padding={isAvatarSelected(avatar.key) ? 5 : 5}
                                            rounded={isAvatarSelected(avatar.key) ? '$2xl' : '$2xl'}
                                            justifyContent='center'
                                            alignItems='center'
                                        >
                                            <Image
                                                source={avatar.image}
                                                alt={avatar.key}
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
                                </VStack>
                            ))}
                        </HStack>
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
                        onPress={() => {

                        }}
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
                            onPress={() => handleSubmit()}
                        >Buy</ButtonText>
                    </Button>
                </Box>
            </Box>
        </View>
    )
}