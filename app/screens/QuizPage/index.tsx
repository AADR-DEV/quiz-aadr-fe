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
} from '@gluestack-ui/themed';
import { Touchable, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function QuizPage({ navigation }) {
  const valueAnswer = {
    answer1: false,
    answer2: false,
    answer3: true,
    answer4: false,
  };

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  const handleChooseAnswer = answerKey => {
    setSelectedAnswer(answerKey);
  };

  const handleNext = () => {
    setIsAnswerChecked(true);
    navigation.push('Result');
  };

  const getBorderColor = answerKey => {
    return selectedAnswer === answerKey ? '$amber500' : 'gray';
  };

  const getBackgroundColor = answerKey => {
    if (isAnswerChecked && selectedAnswer === answerKey) {
      return valueAnswer[answerKey] ? '$greenButton' : '$redButton';
    }
    return 'transparent';
  };

  return (
    <View
      flex={1}
      alignItems="center"
      backgroundColor="$primaryBg"
      gap={'$3'}
    >
      <VStack
        mt={'$5'}
        space="xs"
      >
        <Progress
          value={50}
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
          Question 5 of 10
        </Text>
      </VStack>

      <Box
        rounded={'$2xl'}
        padding="$4"
        justifyContent="center"
        alignItems="center"
        gap={'$2'}
        bgColor="white"
        width={'90%'}
        height={'90%'}
      >
        {/* Image */}
        <Box>
          <Image
            w={150}
            h={150}
            rounded={'$2xl'}
            source={{
              uri: 'https://asset-a.grid.id/crop/0x0:0x0/760x600/photo/cewekbangetfoto/original/19235_foto-gabungan-hewan-hasil-photoshop-ini-lagi-viral-di-socmed.jpg',
            }}
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
            color="black"
            fontWeight="bold"
          >
            Hewan apa ini hayoo?
          </Text>
        </Box>
        {/* Answers */}
        <Box
          width={'100%'}
          alignItems="center"
          gap={'$2'}
        >
          {Object.keys(valueAnswer).map((answerKey, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleChooseAnswer(answerKey)}
            >
              <Box
                w="90%"
                rounded={'$full'}
                bgColor={getBackgroundColor(answerKey)}
                borderColor={getBorderColor(answerKey)}
                borderWidth={1}
                padding="$2"
                role="button"
                alignItems="center"
              >
                <Text
                  textAlign="left"
                  ml={15}
                  size="sm"
                  color="gray"
                  fontWeight="bold"
                  width={250}
                >
                  {answerKey === 'answer1' ? 'Kucing' : ''}
                  {answerKey === 'answer2' ? 'Singa' : ''}
                  {answerKey === 'answer3' ? 'Marmut' : ''}
                  {answerKey === 'answer4' ? 'Gajah' : ''}
                </Text>
              </Box>
            </TouchableOpacity>
          ))}
        </Box>
        <Button
          rounded={'$full'}
          bg="$amber500"
          size="sm"
          onPress={handleNext}
        >
          <ButtonText>Next</ButtonText>
        </Button>
      </Box>
    </View>
  );
}
