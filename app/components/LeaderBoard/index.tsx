import {
    Box,
    HStack,
    VStack,
    Text,
    Image,
    Avatar,
    AvatarFallbackText,
    View,
    AvatarImage,
    Spinner
} from '@gluestack-ui/themed'
import { authApi } from '../../api'
import { AllUserDiamond } from '../../types/userType'



export default function LeaderBoard() {
    const { data } = authApi.useGetAllUsersDiamondQuery()
    const userDiamond = data?.data

    const allTenUsersDiamonds = Array.isArray(userDiamond) && userDiamond.length >= 3 ? userDiamond?.slice(3, 10) : [];
    const topThreeUsersDiamonds = Array.isArray(userDiamond) && userDiamond.length >= 3 ? userDiamond?.slice(0, 3) : [];

    // console.log('user diamonds', userDiamond);

    const rankStyles = [
        {
            avatarSize: 'md',
            avatarMarginBottom: '$6',
            imageWidth: 70,
            imageHeight: 65,
        },
        {
            avatarSize: 'md', // Ubah ukuran avatar menjadi 'md' untuk indeks 0
            avatarMarginBottom: '$6',
            imageWidth: 70,
            imageHeight: 55,
        },
        {
            avatarSize: 'sm', // Ubah ukuran avatar menjadi 'sm' untuk indeks 2
            avatarMarginBottom: '$4',
            imageWidth: 70,
            imageHeight: 35,
        },
    ];

    const imageLeaderBoard = [
        require(`../../../assets/leaderboard/leaderboard-1.png`),
        require(`../../../assets/leaderboard/leaderboard-2.png`),
        require(`../../../assets/leaderboard/leaderboard-3.png`),
    ]

    function rearrangeIndexes(arr: any) {
        const temp = arr[1];
        arr[1] = arr[0];
        arr[0] = temp;
        return arr;
    }

    rearrangeIndexes(rankStyles);
    rearrangeIndexes(imageLeaderBoard);
    rearrangeIndexes(topThreeUsersDiamonds);



    return (
        <View
            width={'90%'}
        >
            <Box
                rounded={'$2xl'}
                justifyContent="center"
                alignItems="center"
                gap={'$2'}
                bgColor="$tertiaryBg"
                width={'100%'}
                padding={'$5'}
                py={'$6'}
            >
                <VStack
                    space={'md'}
                    justifyContent="center"
                    alignItems="center"
                    w={'100%'}
                >
                    <Box
                        justifyContent="center"
                        alignItems="center"
                        mb={'$2'}

                    >
                        <Image
                            source={require('../../../assets/crown.png')}
                            alt="Logo"
                            size="xs"
                            role="img"
                            mb={'$2'}
                        />
                        <Text
                            fontSize="$xl"
                            fontWeight="bold"
                            color="white"
                        >
                            The Richest Players
                        </Text>
                    </Box>

                    <HStack
                        justifyContent="center"
                        alignItems="center"
                        w={'100%'}
                        gap={'$5'}
                    >
                        {topThreeUsersDiamonds.map((user, index) => (
                            <Box
                                justifyContent="center"
                                alignItems="center"
                                alignSelf="flex-end"
                                key={index}
                            >
                                <Avatar
                                    alignSelf="center"
                                >
                                    <AvatarImage
                                        source={user?.mainAvatar ? { uri: user?.mainAvatar } : require('../../../assets/avatars/free_dog.png')}
                                    ></AvatarImage>
                                </Avatar>
                                <Text
                                    size='xs'
                                    color="white"
                                >
                                    {user?.username}
                                </Text>
                                <Box
                                    justifyContent="center"
                                    alignItems="center"
                                    flexDirection='row'
                                    gap={'$1'}
                                >
                                    <Image
                                        source={require(`../../../assets/diamonds/starter_pack.png`)}
                                        alt="Diamond icon"
                                        width={15}
                                        height={15}
                                        role="img"
                                        mb={'$1'}
                                    />
                                    <Text
                                        color="white"
                                        size='xs'
                                    >
                                        {user?.total_diamonds}
                                    </Text>
                                </Box>
                                <Image
                                    source={imageLeaderBoard[index]}
                                    alt={`Leaderboard-${index + 1}`}
                                    width={rankStyles[index].imageWidth}
                                    height={rankStyles[index].imageHeight}
                                    role="img"
                                    mt={'$1'}
                                />
                            </Box>
                        ))}
                    </HStack>
                    {/* UserList */}
                    <Box
                        width={'100%'}
                        display='flex'
                        flexDirection='column'
                        gap={'$2'}
                    >
                        {allTenUsersDiamonds === undefined || allTenUsersDiamonds.length === 0 || allTenUsersDiamonds === null
                            ? (
                                <Spinner />
                            ) : (
                                allTenUsersDiamonds?.map((user: any, index: number) => (

                                    <Box
                                        justifyContent='flex-start'
                                        alignItems="center"
                                        flexDirection='row'
                                        width={'100%'}
                                        bg='$primaryBg'
                                        rounded={'$2xl'}
                                        gap={'$2'}
                                        padding={'$2'}
                                        key={index}
                                    >
                                        <Text
                                            color="white"
                                            fontWeight="bold"
                                            fontSize="$xs"
                                            rounded={'$full'}
                                            padding={'$1'}
                                            bg='orange'
                                            width={'11%'}
                                            textAlign="center"
                                        >
                                            {index + 4}
                                        </Text>
                                        <Avatar
                                            alignSelf="center"
                                            ml={'$2'}
                                            bg='red'
                                            size='sm'
                                        >
                                            <AvatarImage
                                                source={user?.mainAvatar ? { uri: user?.mainAvatar } : require('../../../assets/avatars/free_dog.png')
                                                }
                                            ></AvatarImage>
                                        </Avatar>
                                        <Box
                                            justifyContent='space-between'
                                            alignItems="center"
                                            flexDirection='row'
                                            width={'65%'}
                                        >
                                            <Text
                                                color="white"
                                                fontSize={'$sm'}
                                            >
                                                {user?.username}
                                            </Text>
                                            <Box
                                                gap={'$1'}
                                                alignItems="center"
                                                flexDirection='row'
                                            >
                                                <Image
                                                    source={require('../../../assets/diamonds/starter_pack.png')}
                                                    alt="Diamond icon"
                                                    width={15}
                                                    height={15}
                                                    role="img"
                                                    mb={'$1'}
                                                />
                                                <Text
                                                    fontSize={'$sm'}
                                                    color='white'
                                                >
                                                    {user?.total_diamonds}
                                                </Text>
                                            </Box>
                                        </Box>

                                    </Box>
                                ))
                            )}

                    </Box>
                </VStack>
            </Box >
        </View >
    )
}