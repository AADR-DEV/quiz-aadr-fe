import {
    View,
    Image,
    Icon,
    Box
} from "@gluestack-ui/themed";
import { authApi } from "../../api";
import { useAppSelector } from "../../hooks/useRedux";
import { selectAuth } from "../../store/auth";
import { GetUserAuthPayload } from "../../api/authApi";

export default function AvatarPlayer() {

    const currentUser = useAppSelector(selectAuth); // Data dari Redux
    const { data } = authApi.useGetUserAuthQuery({ email: currentUser?.email } as GetUserAuthPayload);

    const avatarUser = data && data.avatar; // => Didapat dari get user di avatar

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
                        <Box key={avatar.key}>
                            <Image
                                source={avatar.image}
                                alt="Logo"
                                size="xl"
                                role="img"
                                width={130}
                                height={130}
                            />
                        </Box>
                    )
                }
            })}
        </View>
    )
}