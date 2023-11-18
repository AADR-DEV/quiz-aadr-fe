import {
    View,
    Image,
    Box,
    HStack,
    Text
} from '@gluestack-ui/themed'
import {
    TouchableOpacity
} from 'react-native'


export default function AvatarPremiumInfo() {

    return (
        <View>
            <Box justifyContent='center' alignItems='center' my={'$2'} backgroundColor='$primaryBg' rounded={'$2xl'} padding={5}>
                <Text
                    fontSize="$sm"
                    color='$tertiaryButton'
                    fontWeight="bold"
                >Buy Premium Avatar</Text>
                <Text
                    fontSize={10}
                    color='white'
                    paddingHorizontal={'$3'}
                    textAlign='center'
                >Choose a free avatar to start, then explore premium avatars for purchase within the game.</Text>
                <HStack space={"lg"}>
                    <Box>
                        <Image
                            source={require('../../../assets/avatars/premium_cat.png')}
                            alt="Premium Cat Avatar"
                            size="xs"
                            role="img"
                        />
                    </Box>
                    <Box>
                        <Image
                            source={require('../../../assets/avatars/premium_dog.png')}
                            alt="Premium Dog Avatar"
                            size="xs"
                            role="img"
                        />
                    </Box>
                    <Box>
                        <Image
                            source={require('../../../assets/avatars/premium_lion.png')}
                            alt="Premium Lion Avatar"
                            size="xs"
                            role="img"
                        />
                    </Box>
                </HStack>
            </Box>
        </View>
    )
}