import {
    View,
    Image,
    Icon,
} from "@gluestack-ui/themed";
import { authApi } from "../../api";
import { useAppSelector } from "../../hooks/useRedux";
import { selectAuth } from "../../store/auth";
import { GetUserAuthPayload, GetUserAuthResponse } from "../../api/authApi";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Settings } from 'lucide-react-native';
import { useEffect } from "react";

export default function AvatarUser({ navigation, refreshTrigger }: any) {
    const currentUser = useAppSelector(selectAuth); // Data dari Redux
    const { data, refetch } = authApi.useGetUserAuthQuery({ email: currentUser?.email } as GetUserAuthPayload);

    const avatarUser = data && data.avatar; // => Didapat dari get user di avatar
    console.log("AvatarUser = " + avatarUser);

    useEffect(() => {
        refetch();
    }, [refreshTrigger, refetch]);

    const Avatars = [
        { key: 'free_dog', image: require('../../../assets/avatars/free_dog.png') },
        { key: 'free_owl', image: require('../../../assets/avatars/free_owl.png') },
        { key: 'free_penguin', image: require('../../../assets/avatars/free_penguin.png') },
        { key: 'free_hen', image: require('../../../assets/avatars/free_hen.png') },
        { key: 'free_horse', image: require('../../../assets/avatars/free_horse.png') },
        { key: 'free_rabbit', image: require('../../../assets/avatars/free_rabbit.png') },
        { key: 'premium_cat', image: require('../../../assets/avatars/premium_cat.png') },
        { key: 'premium_dog', image: require('../../../assets/avatars/premium_dog.png') },
        { key: 'premium_lion', image: require('../../../assets/avatars/premium_lion.png') },
    ];

    return (
        <View key={avatarUser}>
            {Avatars.map((avatar) => {
                if (avatar && avatar.key === avatarUser) {
                    return (
                        <TouchableOpacity
                            key={avatar.key}
                            onPress={() => {
                                navigation.navigate('BuyAvatar');
                            }}
                        >
                            <Image
                                source={avatar.image}
                                alt="Logo"
                                size="xl"
                                role="img"
                                position='absolute'
                                height={80}
                                width={80}
                                top={-141}
                                right={-40}
                            />
                            <Icon
                                as={Settings}
                                size={"xl"}
                                color="white"
                                fontWeight="bold"
                                alignSelf="flex-start"
                                position='absolute'
                                top={-85}
                                right={-45}
                            />
                        </TouchableOpacity>
                    )
                }
            })}
        </View>
    )
}