import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Box,
  Progress,
  ProgressFilledTrack,
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
import { AppLottieView, ScoreResult } from '../../components';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { useAppSelector } from '../../hooks/useRedux';
import { selectAuth } from '../../store/auth';
import { questionApi } from '../../api/questionApi';
import quizData from '../../api/dummyOption';
import socket from '../../api/socket';
import ResultQuizPage from '../ResultQuizPage';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Question {
  id: string;
  image: string;
  question: string;
  trueans: string;
  falseans_1: string;
  falseans_2: string;
  falseans_3: string;
  options?: string[];
}

export default function QuizPage({ navigation }: any) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timer, setTimer] = useState(20);
  const [isLoading, setIsLoading] = useState(false); // State untuk loading
  const [answerColors, setAnswerColors] = useState<string[]>([]);
  const [key, setKey] = useState<number>(0);
  const user = useAppSelector(selectAuth);
  const [answerSocket, setAnswerSocket] = useState([]);


  // const { data } = quizData; //DummyData
  const { data } = questionApi.useGetQuestionsQuery();
  const quizData = data?.data

  // console.log(quizData);

  const [resultCurrentQuestion, setResultCurrentQuestion] = useState(false);
  const [scoreAllPlayers, setScoreAllPlayers] = useState(0);

  useEffect(() => {

    socket.emit(
      "answer",
      {
        questionId: quizData[currentQuestionIndex].id,
        questionAnswer: selectedAnswer
      }
    );

    socket.on(
      "answer",
      (answer) => { setAnswerSocket(answer); }
    );

  }, [selectedAnswer, scoreAllPlayers]);

  // Acak Jawaban
  const shuffleOptions = (options: string[]): string[] => {
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
  };

  // Acak Pertanyaan
  //>>>> Default acak tanpa enemy
  useEffect(() => {
    setIsLoading(true); // Aktifkan loading sebelum mengacak pertanyaan

    const shuffledQuestions = quizData
      // .sort(() => 0.5 - Math.random())
      // .slice(0, 5)
      .map((q: any) => ({
        ...q,
        question: q.quetion, // Perbaiki 'quetion' menjadi 'question'
        options: shuffleOptions([
          q.trueans,
          q.falseans_1,
          q.falseans_2,
          q.falseans_3,
        ]),
      }));

    setQuestions(shuffledQuestions);

    // Setelah berhasil memuat pertanyaan, nonaktifkan loading
    setIsLoading(false);

    // Inisialisasi warna jawaban
    const initialAnswerColors = shuffledQuestions[0]?.options?.map(() => '$tertiaryBg') || [];
    setAnswerColors(initialAnswerColors);

    // Waktu Kuis
    const interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer === 1) {
          const nextIndex = currentQuestionIndex + 1;
          // setCurrentQuestionIndex(nextIndex);
          if (nextIndex < 5) {
            setIsLoading(true); // Aktifkan loading sebelum pindah ke pertanyaan berikutnya
            setTimeout(() => {

              setResultCurrentQuestion(true);

              setTimeout(() => { //timeout resultpage
                setResultCurrentQuestion(false);
                setCurrentQuestionIndex(nextIndex);
                setKey(prevKey => prevKey + 1);
                setTimer(20); // Reset waktu untuk ke pertanyaan selanjutnya
                setSelectedAnswer('');
              }, 5000)
              setIsLoading(false); // Matikan loading setelah pindah ke pertanyaan berikutnya
            }, 500); // Atur durasi loading (dalam milidetik)
          }
          if (nextIndex == 5) {
            setResultCurrentQuestion(true);
            setTimeout(() => {
              setResultCurrentQuestion(false);
              setFinished(true);
            }, 5000)
          }
        }
        return prevTimer > 1 ? prevTimer - 1 : 10;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [currentQuestionIndex]);


  const handleAnswerChange = (value: string) => {
    if (!selectedAnswer) {
      setSelectedAnswer(value);
      const updatedColors = questions[currentQuestionIndex]?.options?.map((option, index) => {
        return option === questions[currentQuestionIndex].trueans ? '$greenButton' : (value === option ? '$redButton' : '$tertiaryBg');
      }) || [];
      setAnswerColors(updatedColors);
      if (value === questions[currentQuestionIndex].trueans) {
        // Jika jawaban benar, tambahkan poin tambahan (0.5 kali waktu yang tersisa)
        const additionalScore = timer * 0.5;
        setScore(score + additionalScore);
      }
    }
  };

  const getAnswerBackgroundColor = (index: number) => {
    return answerColors[index];
  };

  if (finished) {
    return (
      <ScrollView
        flex={1}
        backgroundColor="$primaryBg"
        gap={'$3'}
        width={'100%'}
        height={'100%'}>
        <ScoreResult
          id={user?.id}
          username={user?.username}
          avatar={user?.mainAvatar}
          score={score}
          navigation={navigation}
          scoreAllPlayers={scoreAllPlayers} />
      </ScrollView>
    );
  }

  if (resultCurrentQuestion) {
    return (
      <ResultQuizPage
        currentQuestionIndex={currentQuestionIndex}
        score={score}
        imageQuestion={questions[currentQuestionIndex].image}
        question={questions[currentQuestionIndex].question}
        options={questions[currentQuestionIndex].options}
        answerSocket={answerSocket}
        trueAnswer={questions[currentQuestionIndex].trueans}
      />
    );
  }

  return (
    <ScrollView flex={1} backgroundColor="$primaryBg" gap={'$3'}>
      <View
        flex={1}
        alignItems="center"
        backgroundColor="$primaryBg"
        gap={'$3'}
        paddingVertical={'$5'}>
        <VStack mt={'$5'} space="xs">
          <Progress value={(currentQuestionIndex + 1) * 20} w="$80" h="$1">
            <ProgressFilledTrack h="$1" bg="$amber500" />
          </Progress>
          <Text textAlign="center" size="md" color="white" fontWeight="bold">
            Question {currentQuestionIndex + 1} of 5
          </Text>
        </VStack>

        {isLoading ? ( // Tampilkan loading jika isLoading aktif
          <Box
            flex={1}
            alignItems="center"
            justifyContent="center"
            height={'100%'}
            width={'100%'}
          >
            <Text
              textAlign="center"
              color="white"
              fontWeight="bold"
            >Waiting for results...</Text>
            <AppLottieView
              animation={require('./quiz_loading_animation.json')}
              autoPlay
              loop
              style={{
                width: 200,
                height: 200,
              }}
            />
          </Box>
        ) : (
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
              <Box my={'$2'} alignSelf="center" position="absolute" left={0}>
                <CountdownCircleTimer
                  key={key}
                  isPlaying
                  duration={20}
                  updateInterval={0}
                  isSmoothColorTransition={true}
                  colors={['#95FF66', '#FFC2A6', '#FF6B5E', '#FF0000']}
                  colorsTime={[20, 15, 10, 0]}
                  size={30}
                  onComplete={() => {
                    [true, 1000]
                  }}
                  strokeWidth={3}>
                  {() => (
                    <Text fontSize={13} color="white">
                      {timer}
                    </Text>
                  )}
                </CountdownCircleTimer>
              </Box>
              <Text fontSize="$xl" fontWeight="bold" color="$tertiaryButton">
                Your Score: {score}
              </Text>
            </Box>
            <Box>
              <Image
                w={150}
                h={150}
                rounded={'$2xl'}
                source={{
                  uri: questions[currentQuestionIndex]?.image || 'default_img',
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
                {questions[currentQuestionIndex]?.question}
              </Text>
            </Box>
            <Box width={'100%'} alignItems="center" gap={'$2'}>
              <RadioGroup onChange={handleAnswerChange} value={selectedAnswer}>
                <VStack gap={'$2'}>
                  {questions[currentQuestionIndex]?.options?.map((option, index) => {

                    const matchingUsers = answerSocket.filter(
                      (user: any) => user.answers.some((answer: any) => answer.questionAnswer === option)
                    );

                    return (
                      <Box key={index}>
                        <Radio value={option}>
                          <RadioLabel
                            backgroundColor={getAnswerBackgroundColor(index)}
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
                                {/* Avatar Enemy */}
                                {/* <Avatar size="xs" bgColor="$amber600">
                                <AvatarFallbackText>
                                  {option}
                                </AvatarFallbackText>
                              </Avatar> */}
                                {/* Avatar Player */}
                                {/* {user && selectedAnswer === option && (
                                  <Avatar size="xs">
                                    <AvatarImage
                                      source={
                                        user
                                          ? { uri: user.mainAvatar }
                                          : require('../../../assets/avatars/free_dog.png')
                                      }></AvatarImage>
                                  </Avatar>
                                )} */}

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
                    )
                  })}
                </VStack>
              </RadioGroup>
            </Box>
          </Box>
        )}
      </View>
    </ScrollView>
  );
}
