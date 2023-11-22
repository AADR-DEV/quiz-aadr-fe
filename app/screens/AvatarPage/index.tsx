import {
    View,
    Text,
    Box,
    VStack,
    HStack,
    Image
} from '@gluestack-ui/themed';
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { AvatarPremiumInfo, SubmitUsername } from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApi } from '../../api';


interface AvatarCategory {
    id: string;
    name: string;
    price: number;
    url: string;
    type: string;
    isSelected: boolean;
}

export default function AvatarPage({ navigation }: any) {
    const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
    const { data: avatarListCategory } = authApi.useGetAvatarListQuery();
    const [avatarList, setAvatarList] = useState<AvatarCategory[]>([]);


    const chunkArray = (array: any[], chunkSize: number) => {
        const chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
        }
        return chunks;
    };

    const handleChooseAvatar = (avatarName: string | null) => {
        // Menghapus efek perubahan dari semua avatar
        setAvatarList(prevAvatarList => prevAvatarList.map(avatar => ({ ...avatar, isSelected: false })));

        if (avatarName) {
            const selectedAvatar = avatarList.find(avatar => avatar.name === avatarName);
            if (selectedAvatar) {
                // Menambahkan efek perubahan hanya pada avatar yang dipilih
                setSelectedAvatar(selectedAvatar.url);
                setAvatarList(prevAvatarList => prevAvatarList.map(avatar => avatar.name === avatarName ? { ...avatar, isSelected: true } : avatar));
            }
        } else {
            setSelectedAvatar(null);
        }
    };

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

        // Set data avatar dari respons API ke state avatarList
        if (avatarListCategory) {
            // Filter hanya avatar dengan type 'free'
            const freeAvatars: AvatarCategory[] = avatarListCategory.data
                .filter(avatar => avatar.type === 'free')
                .map(avatar => ({ ...avatar, isSelected: false })); // Awalnya semua tidak terpilih
            // Batasi tampilan hingga 6 avatar
            const limitedAvatars = freeAvatars.slice(0, 6);

            setAvatarList(limitedAvatars);
        }
    }, [avatarListCategory]);

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
                    {chunkArray(avatarList, 3).map((row, rowIndex) => (
                        <HStack key={rowIndex} space={"md"} justifyContent='center' my={"$1"}>
                            {row.map((avatar: AvatarCategory) => (
                                <VStack key={avatar.id} w="30%" space={"md"} alignSelf="center" >
                                    <TouchableOpacity
                                        onPress={() => handleChooseAvatar(avatar.name)}>
                                        <Box
                                            backgroundColor={avatar.isSelected ? '$primaryBg' : 'transparent'}
                                            padding={avatar.isSelected ? 2 : 0}
                                            rounded={avatar.isSelected ? '$2xl' : '$none'}
                                            justifyContent='center'
                                            alignItems='center'
                                            width={80}
                                        >
                                            <Image
                                                source={{ uri: avatar.url }}
                                                style={{ width: 50, height: 50, borderRadius: 20 }}
                                                role='img'
                                                alt={avatar.name}
                                            />
                                            <Text
                                                fontSize="$sm"
                                                textAlign='center'
                                                color='white'
                                            >
                                                {avatar.name
                                                    .split('_')
                                                    .filter((word, index) => index > 0)
                                                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                                    .join(' ')
                                                }
                                            </Text>
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
                    mainAvatar={selectedAvatar}
                />
            </Box>
        </View >
    )
}
