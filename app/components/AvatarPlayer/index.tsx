import {
    View,
    Image,
    Icon,
    Box,
    Avatar,
    AvatarFallbackText
} from "@gluestack-ui/themed";
import { authApi } from "../../api";
import { useAppSelector } from "../../hooks/useRedux";
import { selectAuth } from "../../store/auth";
import { GetUserAuthPayload } from "../../api/authApi";
import { AvatarImage } from "@gluestack-ui/themed";

export default function AvatarPlayer() {
    const currentUser = useAppSelector(selectAuth); // Data dari Redux
    const { data } = authApi.useGetUserAuthQuery({ email: currentUser?.email } as GetUserAuthPayload);

    const avatarUser = data && data.mainAvatar; // => Didapat dari get user di avatar

    console.log("AvatarPlayer = " + avatarUser);

    return (
        <View>
            <Avatar
                width={130}
                height={130}
            >
                <AvatarFallbackText>SS</AvatarFallbackText>
                <AvatarImage
                    source={avatarUser ? { uri: avatarUser } : require('../../../assets/avatars/free_dog.png')}
                />
            </Avatar>
        </View>
    )
}