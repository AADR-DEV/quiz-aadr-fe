import {
    View,
    Text,
    Box,
    VStack,
    HStack,
    Image,
    Input,
    Button,
    InputField
} from '@gluestack-ui/themed';
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { AvatarPremiumInfo, SubmitUsername } from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AvatarPage({ navigation }: any) {
    const [selectedAvatar, setSelectedAvatar] = useState(null);

    const Avatars = [
        { key: 'free_dog', image: require('../../../assets/avatars/free_dog.png') },
        { key: 'free_owl', image: require('../../../assets/avatars/free_owl.png') },
        { key: 'free_penguin', image: require('../../../assets/avatars/free_penguin.png') },
        { key: 'free_hen', image: require('../../../assets/avatars/free_hen.png') },
        { key: 'free_horse', image: require('../../../assets/avatars/free_horse.png') },
        { key: 'free_rabbit', image: require('../../../assets/avatars/free_rabbit.png') },
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
                    fontSize="$xl"
                    fontWeight="bold"
                    color='white'
                >Choose Free Avatar</Text>
                <Box padding={5}>
                    {chunkedAvatars.map((row, rowIndex) => (
                        <HStack key={rowIndex} space={"md"} justifyContent='center' my={"$1"}>
                            {row.map((avatar: any) => (
                                <VStack key={avatar.key} w="30%" space={"md"} alignSelf="center" >
                                    <TouchableOpacity
                                        onPress={() => handleChooseAvatar(avatar.key)}>
                                        <Box
                                            backgroundColor={isAvatarSelected(avatar.key) ? '$primaryBg' : 'transparent'}
                                            padding={isAvatarSelected(avatar.key) ? 2 : 0}
                                            rounded={isAvatarSelected(avatar.key) ? '$2xl' : '$none'}
                                            justifyContent='center'
                                            alignItems='center'
                                        >
                                            <Image
                                                source={avatar.image}
                                                alt={avatar.key}
                                                size="sm"
                                                role="img"
                                            />
                                        </Box>
                                    </TouchableOpacity>
                                </VStack>
                            ))}
                        </HStack>
                    ))}
                </Box>
                <AvatarPremiumInfo />
                <SubmitUsername
                    navigation={navigation}
                    avatar={selectedAvatar}
                />
            </Box>
        </View>
    )
}
