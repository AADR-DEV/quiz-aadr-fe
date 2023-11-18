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


export default function AvatarUser() {
    const currentUser = useAppSelector(selectAuth) //data dari redux
    const { data } = authApi.useGetUserAuthQuery({ email: currentUser?.email } as GetUserAuthPayload)

    const avatarUser = data && data.avatar //=> didapat dari get user di avatar
    console.log("AvatarUser = " + avatarUser);

    const Avatars = [
        { key: 'free_fox', image: require('../../../assets/avatars/free_fox.png') },
        { key: 'free_giraffe', image: require('../../../assets/avatars/free_giraffe.png') },
        { key: 'free_goat', image: require('../../../assets/avatars/free_goat.png') },
        { key: 'free_hen', image: require('../../../assets/avatars/free_hen.png') },
        { key: 'free_horse', image: require('../../../assets/avatars/free_horse.png') },
        { key: 'free_rabbit', image: require('../../../assets/avatars/free_rabbit.png') },
    ];

    return (
        <View>
            {Avatars.map((avatar) => {
                if (avatar && avatar.key === avatarUser) {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                console.log('masuk')
                            }}
                        >
                            <Image
                                source={avatar.image}
                                alt="Logo"
                                size="xl"
                                role="img"
                                position='absolute'
                                height={60}
                                width={60}
                                top={-133}
                                right={-30}
                            />
                            <Icon
                                as={Settings}
                                size={"xl"}
                                color="white"
                                fontWeight="bold"
                                alignSelf="flex-start"
                                position='absolute'
                                top={-95}
                                right={-35}
                            />
                        </TouchableOpacity>
                    )
                }
            })}


        </View>
    )
}