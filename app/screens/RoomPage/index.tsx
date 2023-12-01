import React, { useState, useEffect } from 'react';
import { View, Text, Button, Input, InputField, Box, ButtonText, ScrollView, Avatar, Progress, ProgressFilledTrack, HStack, AvatarFallbackText, } from "@gluestack-ui/themed";
import { io } from 'socket.io-client';
import { useAppSelector } from "../../hooks/useRedux";
import { selectAuth } from "../../store/auth";
import { ImageBackground, StyleSheet } from 'react-native';
import { AppLottieView } from '../../components';
import { Image } from '@gluestack-ui/themed';
import socket from '../../api/socket';
import FindingOpponentPage from '../FindingOpponentPage';


type usersInRoom = {
    name: string,
    room: string
}

type User = {
    name: string;
}

export default function RoomPage({ navigation }: any) {
    const user = useAppSelector(selectAuth);
    const playerName = user?.username;
    const [roomID, setRoomID] = useState('');
    const [activeRooms, setActiveRooms] = useState<string[]>([]);

    const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
    const [joinMessage, setJoinMessage] = useState<string | null>(null);


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

    // Connect ke Server
    // useEffect(() => {
    //     socket.on('connect', () => {
    //         console.log('Connected to server');
    //     });

    //     // Menangani pembaruan daftar ruangan
    //     // socket.on(
    //     //     "roomList",
    //     //     ({ rooms }) => { setActiveRooms(rooms); }
    //     // );

    //     // socket.emit(
    //     //     "createRoom",
    //     //     {
    //     //         name: playerName,
    //     //         room: roomID,
    //     //         points: 0,
    //     //         asnwers: []
    //     //     }
    //     // );

    //     socket.on(
    //         'roomList',
    //         (rooms) => { setActiveRooms(rooms); }
    //     );

    //     socket.on("message", (message) => {
    //         // Di sini Anda dapat memeriksa apakah pesan adalah pesan bergabung
    //         if (message.text === "joined") {
    //             // Pesan adalah pesan bergabung, Anda dapat menangani tampilannya di sini
    //             const joinMessage = `${message.name} has joined the room`;
    //             // Simpan pesan dalam state atau tampilkan sesuai kebutuhan
    //             setJoinMessage(joinMessage);
    //         }
    //     });


    // }, [playerName, roomID]);

    console.log('Room List:', activeRooms);

    // Fungsi untuk melakukan join ke ruangan
    const handleCreateRoom = () => {
        navigation.navigate('FindingOpponent', { playerName, roomID });
        // socket.emit(
        //     "enterRoom",
        //     {
        //         name: playerName,
        //         room: roomID,
        //     }
        // );

        // Join Room
        socket.emit(
            "createRoom",
            {
                name: playerName,
                room: roomID,
                points: 0,
                asnwers: []
            }
        );
    }

    const handleJoinRoom = (roomID: string) => {
        setSelectedRoom(roomID); // Set the selected room

        socket.emit(
            "enterRoom",
            {
                name: playerName,
                room: roomID,
            }
        );

    }

    // Define the content for the selected room and input room conditions
    let roomContent = null;

    if (selectedRoom) {
        // Condition 2: Users in a selected room
        roomContent = (
            <FindingOpponentPage navigation={navigation} />
        );
    } else {
        // Condition 1: Input Room
        roomContent = (
            <React.Fragment>
                <Text
                    fontWeight="bold"
                    color="white"
                >Input Room</Text>

                <Input
                    width={"80%"}
                    bg="white"
                    rounded="$sm"
                >
                    <InputField
                        onChangeText={(text) => setRoomID(text)}
                        value={roomID}
                        placeholder='Create Room'
                    />
                </Input>
                <Button
                    bg="$greenButton"
                    rounded="$lg"
                    onPress={handleCreateRoom}
                >
                    <Text color="white">
                        Create Room
                    </Text>
                </Button>

                {/* Tampilkan daftar ruangan aktif di sini */}
                <Box
                    width={"90%"}
                    alignItems='center'
                    gap={5}
                >
                    <Text
                        color="white"
                    >Active Rooms</Text>
                    <Box
                        gap={5}
                        width={"80%"}
                    >
                        {activeRooms.map((room, index) => (
                            <Box
                                key={index}
                                bg="$secondaryBg"
                                padding={5}
                                rounded={"$lg"}
                                height={60}
                                width={"100%"}
                                justifyContent="space-between"
                                flexDirection="row"
                                alignItems="center"
                            >
                                <Text
                                    color="white"
                                    padding={5}
                                >
                                    {room}
                                </Text>

                                <Button
                                    size='xs'
                                    bg='$tertiaryButton'
                                    rounded={'$2xl'}
                                    onPress={() => handleJoinRoom(room)}
                                >
                                    <ButtonText>Join Room</ButtonText>
                                </Button>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </React.Fragment>
        );
    }

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
                {roomContent}
            </View>
        </ScrollView>
    )
}
