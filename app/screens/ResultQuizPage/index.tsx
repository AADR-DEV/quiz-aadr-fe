import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Box,
    VStack,
    Image,
    RadioGroup,
    Radio,
    RadioLabel,
    ScrollView,
    Avatar,
    AvatarFallbackText,
    AvatarImage,
} from '@gluestack-ui/themed';
import socket from '../../api/socket';

export default function ResultQuizPage({
    currentQuestionIndex,
    score,
    imageQuestion,
    options,
    question,
    answerSocket,
    trueAnswer
}: any) {
    const [countdown, setCountdown] = useState(5);
    const userAnswers = answerSocket;

    useEffect(() => {
        // Buat interval untuk mengurangi waktu countdown setiap 1 detik
        const interval = setInterval(() => {
            if (countdown > 0) {
                setCountdown(countdown - 1);
            } else {
                clearInterval(interval); // Hentikan interval setelah mencapai 0
            }
        }, 1000); // 1 detik

        return () => {
            clearInterval(interval); // Hentikan interval jika komponen dibongkar
        };
    }, [countdown]);

    return (
        <ScrollView flex={1} backgroundColor="$primaryBg" gap={'$3'}>
            <View
                flex={1}
                alignItems="center"
                backgroundColor="$primaryBg"
                gap={'$3'}
                paddingVertical={'$5'}>
                <VStack mt={'$5'} space="xs">
                    <Text textAlign="center" size="md" color="white" fontWeight="bold">
                        Result Question {currentQuestionIndex + 1}
                    </Text>
                </VStack>
                <Box
                    rounded={'$2xl'}
                    padding="$4"
                    alignItems="center"
                    gap={'$2'}
                    bgColor="$secondaryBg"
                    width={'90%'}
                    height={'90%'}>
                    <Box
                        flexDirection="row"
                        justifyContent="center"
                        alignItems="center"
                        gap={'$3'}
                        width={'100%'}>
                        <Text fontSize="$xl" fontWeight="bold" color="$tertiaryButton">
                            Your Score: {score}
                        </Text>
                    </Box>
                    <Box
                        flexDirection="row"
                        justifyContent="center"
                        alignItems="center"
                        gap={'$3'}
                        width={'100%'}>
                        <Text
                            fontSize="$sm"
                            color="white">
                            Wait {countdown} preparing for next questions
                        </Text>
                    </Box>
                    <Box>
                        <Image
                            w={150}
                            h={150}
                            rounded={'$2xl'}
                            source={{
                                uri: imageQuestion || 'default_img',
                            }}
                            alt="image"
                            resizeMode="cover"
                            role="img"
                        />
                    </Box>
                    <Box width={'100%'} height={50}>
                        <Text
                            textAlign="center"
                            size="sm"
                            color="white"
                            fontWeight="bold">
                            {question}
                        </Text>
                    </Box>
                    <Box width={'100%'} alignItems="center" gap={'$2'}>
                        <RadioGroup>
                            <VStack gap={'$2'}>
                                {options.map((option: any, index: any) => {
                                    // Mencari pengguna yang memilih opsi ini
                                    const matchingUsers = userAnswers.filter(
                                        (user: any) => user.answers.some((answer: any) => answer.questionAnswer === option)
                                    );
                                    return (
                                        <Box key={index}>
                                            <Radio value={option}>
                                                <RadioLabel
                                                    bgColor={trueAnswer === option ? '$greenButton' : '$redButton'}
                                                    padding={'$3'}
                                                    rounded={'$md'}
                                                    width={'100%'}
                                                    color="white"
                                                    flexDirection="row">
                                                    <Box flexDirection="row" alignItems="center" width={400}>
                                                        <Box width={150}>
                                                            <Text color="white" size="sm">
                                                                {option}
                                                            </Text>
                                                        </Box>
                                                        <Box
                                                            width={90}
                                                            alignItems="center"
                                                            justifyContent="center"
                                                            flexDirection="row"
                                                            gap={'$1'}>
                                                            {/* Menampilkan avatar pengguna yang memilih opsi ini */}
                                                            {matchingUsers.map((user: any, userIndex: number) => (
                                                                <Avatar
                                                                    key={userIndex}
                                                                    size="xs"
                                                                    bgColor="$amber600">
                                                                    <AvatarFallbackText>
                                                                        {user.username}
                                                                    </AvatarFallbackText>
                                                                    <AvatarImage
                                                                        source={
                                                                            user
                                                                                ? { uri: user.avatar }
                                                                                : require('../../../assets/avatars/free_dog.png')
                                                                        }></AvatarImage>
                                                                </Avatar>
                                                            ))}
                                                        </Box>
                                                    </Box>
                                                </RadioLabel>
                                            </Radio>
                                        </Box>
                                    );
                                })}
                            </VStack>
                        </RadioGroup>
                    </Box>
                </Box>
            </View>
        </ScrollView>
    );
}
