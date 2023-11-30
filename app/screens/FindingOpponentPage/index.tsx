import {
  View,
  Text,
  Image,
  Box,
  Avatar,
  AvatarFallbackText,
  HStack,
  Button,
  Progress,
  ProgressFilledTrack,
  AvatarImage,
  ScrollView,
} from '@gluestack-ui/themed';
import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { AppLottieView, AvatarPlayer, AvatarUser, Loading } from '../../components';
import { useAppSelector } from '../../hooks/useRedux';
import { selectAuth } from '../../store/auth';
import socket from '../../api/socket';

type User = {
  name: string;
}

type usersInRoom = {
  id: string;
  username: string;
  points: number;
  avatar: string;
  answers: string[];
}

export default function FindingOpponentPage({ navigation }: any) {
  const user = useAppSelector(selectAuth);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [usersInRoom, setUsersInRoom] = useState<usersInRoom[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log(usersInRoom.length)

  useEffect(() => {

    socket.on(
      "userList",
      (userList) => { setUsersInRoom(userList); }
    )

    socket.on(
      "startGame",
      (startGame) => {
        if (startGame) {
          navigation.navigate('Quiz');
        }
      }
    )

    socket.on("countdown", (counterTime) => {
      setCountdown(counterTime);

      if (counterTime === 0 || counterTime < 0) {
        setTimeout(() => {
          // socket.emit('endGame', true)
          navigation.navigate('Home'); // Navigasi ke halaman beranda jika jumlah pengguna kurang dari 3 saat countdown mencapai 0
        }, 2000);
      }
    });

    socket.on(
      "message",
      (message) => {
        setMessage(message);
      }
    )

    socket.on(
      "question",
      (question) => {
        console.log(question);
      }
    )

  }, [usersInRoom, countdown]);



  if (isLoading) {
    return (
      <ScrollView
        backgroundColor="$primaryBg"
        flex={1}
        gap={'$5'}
        paddingVertical={'$10'}
        w={'100%'}
      >
        <View
          backgroundColor="$primaryBg"
          flex={1}
          justifyContent="center"
          alignItems="center"
          gap={'$5'}
          width={'100%'}
        >
          <Loading />
        </View>
      </ScrollView>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    search: {
      justifyContent: 'center',
      width: '60%',
      height: '20%',
    },
  });

  // console.log(countdown);
  // console.log(usersInRoom);


  return (
    <ScrollView
      backgroundColor="$primaryBg"
      flex={1}
      gap={'$5'}
      paddingVertical={'$10'}
      w={'100%'}
    >
      <View
        backgroundColor="$primaryBg"
        flex={1}
        justifyContent="center"
        alignItems="center"
        gap={'$5'}
        width={'100%'}
      >
        <View
          flex={1}
          alignItems="center"
          justifyContent="center"
          backgroundColor="$primaryBg"
          gap={'$1'}
          width={'100%'}
        >
          <Box
            width={"100%"}
            alignItems='center'
            gap={5}
          >
            <Box
              width={"95%"}
              alignItems='center'
              gap={5}
            >
              <View
                flex={1}
                alignItems="center"
                justifyContent="center"
                backgroundColor="$primaryBg"
                gap={'$1'}
                width={'100%'}
              >
                <ImageBackground
                  source={require('../../screens/FindingOpponentPage/finding-opponent.png')}
                  resizeMode="cover"
                  style={styles.image}
                  role='img'
                  alt='Finding Opponent'
                >
                  <Box
                    rounded={'$3xl'}
                    justifyContent="center"
                    bgColor="$tertiaryBg"
                    alignItems="center"
                    width={'90%'}
                    pb={'$4'}
                    py={'$4'}
                  >
                    {/* Countdown timer */}
                    <Text
                      fontWeight="bold"
                      fontSize="$lg"
                      color="white"
                      my={'$2'}
                    >Game starts in: {countdown} seconds</Text>

                    <Text
                      fontSize="$lg"
                      color="black"
                      my={'$2'}
                    >Player Joined</Text>

                    <HStack
                      mb={20}
                      space="sm"
                    >
                      {usersInRoom.map((userItem, index) => (
                        // Cek apakah user.id sama dengan user.id dalam usersInRoom
                        user && user.mainAvatar !== userItem.avatar && (
                          <Box
                            key={index}
                            alignItems='center'
                            bg="$secondaryBg"
                            padding={10}
                            borderRadius="$lg"
                            width={60}
                          >
                            <Avatar
                              width={40}
                              height={40}
                              bgColor="$tertiaryButton"
                              size='xs'
                            >
                              <Text>
                                <AvatarFallbackText>{userItem.username}</AvatarFallbackText>
                              </Text>
                              <AvatarImage
                                source={
                                  userItem ? { uri: userItem.avatar } : require('../../../assets/avatars/free_dog.png')
                                }
                              ></AvatarImage>
                            </Avatar>
                            <Text size='xs' color='white' textAlign='center'>
                              {userItem.username}
                            </Text>
                          </Box>
                        )
                      ))}
                    </HStack>
                    <Box
                      width={'100%'}
                      justifyContent='center'
                      alignItems='center'
                    >
                      <Image
                        size='xl'
                        source={user ? { uri: user.mainAvatar } : require('../../../assets/avatars/free_dog.png')}
                        role='img'
                        alt='Finding Opponent'
                      />
                    </Box>
                    <Text
                      fontWeight='bold'
                      fontSize="$lg"
                      color="white"
                      my={'$2'}
                    >Get Ready...{user?.username}!!</Text>

                    <Text
                      fontWeight='bold'
                      fontSize="$lg"
                      color="white"
                      my={'$2'}
                    >{message}</Text>

                    <AppLottieView
                      animation={require('../FindingOpponentPage/Loading-dots.json')}
                      autoPlay
                      loop
                      style={{
                        width: 200,
                        height: 150,
                      }}
                      bgColor="red"
                    />

                    {/* <Button
                      rounded={'$2xl'}
                      backgroundColor="$tertiaryButton"
                      onPress={() => {
                        navigation.navigate('Home');
                      }}
                    >
                      <Text
                        color="white"
                        fontWeight="semibold"
                        fontSize="$md"
                      >
                        back to home
                      </Text>
                    </Button> */}
                  </Box>
                </ImageBackground>
              </View>
            </Box>
          </Box>
        </View>
      </View>
    </ScrollView>

  );
}
