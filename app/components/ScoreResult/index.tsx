import {
    Avatar,
    AvatarBadge,
    AvatarFallbackText,
    AvatarImage,
    Image,
    HStack,
    Spinner,
    View,
} from '@gluestack-ui/themed';
import { Button, ButtonText, Text } from '@gluestack-ui/themed';
import { Box } from '@gluestack-ui/themed';
import socket from '../../api/socket';
import Loading from '../Loading';
import { useEffect, useState } from 'react';

export default function ScoreResult({ navigation, id, username, avatar, score }: any) {

    // const dataScoreAllPlayers = scoreAllPlayers

    const [scoreAllPlayers, setScoreAllPlayers] = useState(0);

    const dataScoreAllPlayers = scoreAllPlayers

    useEffect(() => {
        console.log('submit score to socket');
        socket.emit(
            "score",
            {
                id: id,
                username: username,
                avatar: avatar,
                points: score
            }
        );

        socket.on(
            "score",
            (score) => {
                setScoreAllPlayers(score);
                console.log('ambil data score players');
            }
        );

    }, []);


    const medalImages = [
        require('../../../assets/medal/medal_1.png'),
        require('../../../assets/medal/medal_2.png'),
        require('../../../assets/medal/medal_3.png'),
    ];

    const colorWinners = [
        '#FFFEC4',
        '#F5F7F8',
        '#FCC8D1',
    ]

    const handleFinishGame = () => {

        socket.emit('endGame', true)

        navigation.navigate('Home');

    }

    return (
        <View
            flex={1}
            alignItems="center"
            gap={'$3'}
            width={'100%'}
            height={'100%'}
            mb={50}
        >
            <Box
                alignItems="center"
                gap={10}
                mt={10}
                width={400}
            >
                <Box
                    alignItems="center"
                    width={'80%'}
                    padding={20}
                    pb={10}
                    bg="$tertiaryBg"
                    rounded={'$lg'}
                    my={20}
                >
                    <Box alignContent="center">
                        <Text
                            fontWeight="bold"
                            fontSize="$lg"
                            color="white">
                            Congratulations!
                        </Text>
                        <Text
                            fontSize="$lg"
                            color="white"
                            textAlign="center">
                            You earned
                        </Text>
                        <HStack
                            alignContent="center"
                            gap={10}
                            justifyContent="center"
                            alignItems='center'
                            pt={5}>
                            <Text
                                fontSize="$2xl"
                                color="white"
                                py={20}
                                alignSelf="center">
                                10
                            </Text>
                            <Image
                                source={require('../../../assets/diamonds/diamond-icon.png')}
                                width={20}
                                height={20}
                                mb={10}
                                alt="diamond"
                                role="img"
                            />
                        </HStack>
                    </Box>
                    <Box gap={10} alignItems="center" bg={'$tertiaryBg'} rounded={'$lg'}>
                        <Text
                            fontSize={'$2xl'}
                            fontWeight={'$bold'}
                            pt={3}
                            height={20}
                            color={'$greenButton'}
                        >
                            The Winners
                        </Text>
                        {dataScoreAllPlayers === 0 ? ( // Use a ternary conditional
                            <Spinner
                                size="large"
                            />
                        ) : (
                            dataScoreAllPlayers.map((player: any, index: any) => (
                                <Box key={index} alignItems="center" gap={10} bg={'$tertiaryBg'} rounded={'$lg'}>
                                    {index < 3 ? ( // First three players with medals
                                        <HStack
                                            gap={15}
                                            bg={colorWinners[index]}
                                            padding={10}
                                            rounded={'$lg'}>
                                            <Box width={50}>
                                                <Avatar bgColor='$amber500' size="md">
                                                    <AvatarImage
                                                        source={
                                                            player ? { uri: player.avatar } : require('../../../assets/avatars/free_dog.png')
                                                        }
                                                    ></AvatarImage>
                                                </Avatar>
                                                <Image
                                                    source={medalImages[index]} // Use the imported image here
                                                    width={28}
                                                    height={28}
                                                    position="absolute"
                                                    left={30}
                                                    top={25}
                                                    alt="badge"
                                                    role="img"
                                                />
                                            </Box>
                                            <Box justifyContent="center" width={120}>
                                                <Text textAlign="left" color={'$primaryBg'}>
                                                    {player.username}
                                                </Text>
                                            </Box>
                                            <Box justifyContent="center" width={80}>
                                                <Text textAlign="center" color={'$primaryBg'}>
                                                    {player.points} pts
                                                </Text>
                                            </Box>
                                        </HStack>
                                    ) : (
                                        // The last two players with different styling
                                        <HStack gap={15} bg={'#C5DFF8'} padding={10} rounded={'$lg'}>
                                            <Box width={50}>
                                                <Avatar bgColor='$blue500' size="md">
                                                    <AvatarFallbackText>{player.username}</AvatarFallbackText>
                                                </Avatar>
                                            </Box>
                                            <Box justifyContent="center" width={120}>
                                                <Text textAlign="left" color={'$primaryBg'}>
                                                    {player.username}
                                                </Text>
                                            </Box>
                                            <Box justifyContent="center" width={80}>
                                                <Text textAlign="center" color={'$primaryBg'}>
                                                    {player.points} pts
                                                </Text>
                                            </Box>
                                        </HStack>
                                    )}
                                </Box>
                            ))
                        )}
                    </Box>
                </Box>
                <Button
                    mt={4}
                    onPress={handleFinishGame}
                    // onPress={() => navigation.navigate('Home')}
                    rounded={'$lg'}>
                    <ButtonText>Done</ButtonText>
                </Button>
            </Box>
        </View>
    );
}
