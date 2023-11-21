import { Box, HStack, Link, LinkText, Text, VStack, View, Image, Icon, CalendarDaysIcon } from '@gluestack-ui/themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAppSelector } from '../../hooks/useRedux';
import { selectAuth } from '../../store/auth';
import { AppLottieView, AvatarUser } from '..';
import { Plus } from 'lucide-react-native';
import { useEffect } from 'react';


export default function UserHome({ navigation, refreshTrigger }: any) {
    const user = useAppSelector(selectAuth)

    console.log("UserHome = ", user);

    useEffect(() => {
        console.log("UserHome is refreshing");
    }, [refreshTrigger]);

    return (
        <View
            paddingHorizontal={'$4'}
        >
            <HStack
                justifyContent="space-between"
                alignItems="center"
                width={'80%'}
                padding={'$4'}
                bgColor="$tertiaryBg"
                rounded={'$3xl'}
            >
                <Box
                    alignItems="center"
                    display='flex'
                    width={'90%'}
                    flexDirection='row'
                >
                    <Box
                        display='flex'
                        flexDirection='row'
                    >
                        <Text
                            fontSize="$md"
                            fontWeight="bold"
                            color="white"
                        >Hello, </Text>

                        {/* Nama Users */}
                        <Text
                            fontSize="$md"
                            fontWeight="bold"
                            color="$greenButton"
                        >{user && user.username}</Text>


                    </Box>
                </Box>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Shop');
                    }}
                >
                    <Box
                        bgColor="$secondaryBg"
                        rounded={'$3xl'}
                        padding={'$1'}
                        width={100}
                        alignItems="center"
                        justifyContent="center"
                        display='flex'
                        flexDirection='row'
                        gap={'$2'}
                    >
                        <Image
                            source={require('../../../assets/diamonds/starter_pack.png')}
                            alt="Diamond icon"
                            width={20}
                            height={20}
                            role="img"
                        />
                        <Text
                            color='$white'
                        >20</Text>
                        <Icon
                            color="white"
                            size="md"
                            as={Plus} />
                    </Box>
                </TouchableOpacity>
            </HStack>
            <Box
                alignItems="center"
                display='flex'
            >
                <AppLottieView
                    animation={require('./circle_avatar.json')}
                    autoPlay
                    loop
                    style={{
                        width: 200,
                        height: 200,
                    }}
                    rezizeMode="contain"
                />
                <AvatarUser navigation={navigation} refreshTrigger={refreshTrigger} />
            </Box>
        </View >
    );
}