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
    const avatarUser = data && data.mainAvatar; // => Didapat dari get user di avatar

    useEffect(() => {
        refetch();
    }, [refreshTrigger, refetch]);

    return (
        <View>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('BuyAvatar');
                }}
            >
                <Image
                    source={avatarUser ? { uri: avatarUser } : require('../../../assets/avatars/free_dog.png')}
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
        </View>
    )
}