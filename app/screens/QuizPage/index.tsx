import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Box,
  Progress,
  ProgressFilledTrack,
  VStack,
  Image,
  Button,
  ButtonText,
  RadioGroup,
  Radio,
  RadioLabel,
  ScrollView,
  Spinner,
  Avatar,
  AvatarFallbackText,
} from '@gluestack-ui/themed';
import { questions as originalQuestions } from '../../api/dummyOption';
import { AlertTimeOut, ScoreResult, Timer } from '../../components';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

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
  const [showAlertDialog, setShowAlertDialog] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false); // State untuk loading

  // Acak Jawaban
  const shuffleOptions = (options: string[]): string[] => {
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
  };

  // Acak Pertanyaan
  useEffect(() => {
    setIsLoading(true); // Aktifkan loading sebelum mengacak pertanyaan
    const shuffledQuestions = originalQuestions
      .sort(() => 0.5 - Math.random())
      .slice(0, 5)
      .map(q => ({
        ...q,
        question: q.quetion, // Perbaiki 'quetion' menjadi 'question'
        options: shuffleOptions([
          q.trueans,
          q.falseans_1,
          q.falseans_2,
          q.falseans_3
        ])
      }));
    setQuestions(shuffledQuestions);

    // Setelah berhasil memuat pertanyaan, nonaktifkan loading
    setIsLoading(false);

    // Waktu Kuis
    const interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer === 1) {
          showAlertAndProceed();
        }
        return prevTimer > 1 ? prevTimer - 1 : 20;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [currentQuestionIndex]);


  const showAlertAndProceed = () => {
    setShowAlertDialog(true);
  };

  const handleAnswerChange = (value: string) => {
    if (!selectedAnswer) {
      setSelectedAnswer(value);
      if (value === questions[currentQuestionIndex].trueans) {
        // Jika jawaban benar, tambahkan poin tambahan (0.5 kali waktu yang tersisa)
        const additionalScore = timer * 1;
        setScore(score + additionalScore);
      } else {
        // Jika jawaban salah, kurangkan waktu dari timer (jika waktu lebih dari 5 detik)
        if (timer > 5) {
          setTimer(timer - 5);
        }
      }
    }
  };


  const getAnswerBackgroundColor = (option: string) => {
    if (selectedAnswer === option) {
      return option === questions[currentQuestionIndex].trueans ? '$greenButton' : '$redButton';
    }
    return '$tertiaryBg';
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestionIndex].trueans) {
      setScore(score + 0);
    }

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setIsLoading(true); // Aktifkan loading sebelum pindah ke pertanyaan berikutnya
      setTimeout(() => {
        setCurrentQuestionIndex(nextIndex);
        setTimer(20); // Reset waktu untuk ke pertanyaan selanjutnya
        setSelectedAnswer('');
        setIsLoading(false); // Matikan loading setelah pindah ke pertanyaan berikutnya
      }, 500); // Atur durasi loading (dalam milidetik)
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <View
        flex={1}
        alignItems="center"
        backgroundColor="$primaryBg"
        gap={'$3'}
        width={'100%'}
        height={'100%'}
      >
        <ScoreResult score={score} navigation={navigation} />
      </View>
    );
  }

  return (
    <ScrollView
      flex={1}
      backgroundColor="$primaryBg"
      gap={'$3'}
    >
      <View
        flex={1}
        alignItems="center"
        backgroundColor="$primaryBg"
        gap={'$3'}
        paddingVertical={'$5'}
      >
        <VStack
          mt={'$5'}
          space="xs"
        >
          <Progress
            value={(currentQuestionIndex + 1) * 20}
            w="$80"
            h="$1"
          >
            <ProgressFilledTrack
              h="$1"
              bg="$amber500"
            />
          </Progress>
          <Text
            textAlign="center"
            size="md"
            color="white"
            fontWeight="bold"
          >
            Question {currentQuestionIndex + 1} of 5
          </Text>
          {/* Timer Display */}
          {/* <Text
            textAlign='center'
            size="md"
            color="white">
            Time remaining: {timer} seconds
          </Text> */}
        </VStack>

        {isLoading ? ( // Tampilkan loading jika isLoading aktif
          <Spinner
            size="large"
            color="$amber500"
            mt={'$20'}
            alignSelf='center'
          />
        ) : (
          <Box
            rounded={'$2xl'}
            padding="$4"
            // justifyContent="center"
            alignItems="center"
            gap={'$2'}
            bgColor="$secondaryBg"
            width={'90%'}
            height={'90%'}
          >
            {/* Konten pertanyaan dan jawaban lainnya */}
            <Box
              flexDirection='row'
              justifyContent='center'
              alignItems='center'
              gap={'$3'}
              width={'100%'}
            >
              <Box
                my={'$2'}
                alignSelf='center'
                position='absolute'
                left={0}
              >
                <CountdownCircleTimer
                  isPlaying
                  duration={20}
                  colors={['#95FF66', '#FFC2A6', '#FF6B5E', '#FF0000']}
                  colorsTime={[20, 15, 10, 0]}
                  size={30}
                  strokeWidth={3}
                >
                  {({ remainingTime }) =>
                    <Text
                      fontSize={13}
                      color='white'
                    >
                      {remainingTime}
                    </Text>}
                </CountdownCircleTimer>
              </Box>
              <Text
                fontSize="$xl"
                fontWeight="bold"
                color="white"
              >Your Score: {score}</Text>
            </Box>
            {/* Image */}
            <Box>
              <Image
                w={150}
                h={150}
                rounded={'$2xl'}
                source={{ uri: questions[currentQuestionIndex]?.image || 'default_img' }}
                alt="image"
                resizeMode="cover"
                role="img"
              />
            </Box>
            {/* Question */}
            <Box
              width={'100%'}
              height={50}
            >
              <Text
                textAlign="center"
                size="sm"
                color="white"
                fontWeight="bold"
              >
                {questions[currentQuestionIndex]?.question}
              </Text>
            </Box>
            {/* Answers */}
            <Box
              width={'100%'}
              alignItems="center"
              gap={'$2'}
            >
              <RadioGroup onChange={handleAnswerChange} value={selectedAnswer}>
                <VStack
                  gap={'$2'}
                >
                  {questions[currentQuestionIndex]?.options?.map((option, index) => (
                    <Box>
                      <Radio key={index} value={option}>
                        <RadioLabel
                          backgroundColor={getAnswerBackgroundColor(option)}
                          padding={'$3'}
                          rounded={'$md'}
                          width={'100%'}
                          color="white"
                          justifyContent='space-between'
                          flexDirection='row'
                        >
                          <Box
                            flexDirection='row'
                            alignItems='center'
                            justifyContent='space-between'
                            width={400}
                          >
                            <Box
                              width={200}
                            >
                              <Text
                                color='white'
                              >
                                {option}
                              </Text>
                            </Box>
                            <Box
                              width={200}
                            >
                              <Avatar
                                size='xs'
                              >
                                <AvatarFallbackText>{option}</AvatarFallbackText>
                              </Avatar>
                            </Box>
                          </Box>
                        </RadioLabel>
                      </Radio>
                    </Box>
                  ))}
                </VStack>
              </RadioGroup>
            </Box>
            <Button
              rounded={'$full'}
              bg="$amber500"
              size="sm"
              onPress={handleNextQuestion}
            >
              <ButtonText>Next</ButtonText>
            </Button>
          </Box>
        )}

        <AlertTimeOut showAlertDialog={showAlertDialog} setShowAlertDialog={setShowAlertDialog} handleNextQuestion={handleNextQuestion} />
      </View>
    </ScrollView>
  );
}
