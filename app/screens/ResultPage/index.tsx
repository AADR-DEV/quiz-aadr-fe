import React from 'react';
import { View, Box, Text, VStack, Image, Button, AvatarImage, Avatar, AvatarFallbackText } from '@gluestack-ui/themed';
import { AppLottieView } from '../../components';

export default function ResultPage({ navigation }: any) {
  return (
    <View
      backgroundColor="$primaryBg"
      flex={1}
      justifyContent="center"
      alignItems="center"
      gap={'$5'}
    >
      <Box
        rounded={'$3xl'}
        justifyContent="center"
        bgColor="white"
        alignItems="center"
        gap={'$4'}
        width={'90%'}
        pb={'$4'}
        py={'$4'}
      >
        <Text
          fontWeight="bold"
          color="black"
          size="xl"
        >
          Game Result
        </Text>
        <VStack
          justifyContent="center"
          alignItems="center"
        >
          <Text
            fontWeight="semibold"
            color="$tertiaryButton"
            size="xl"
          >
            You got 2 diamonds!
          </Text>
          <Image
            source={require('../../../assets/diamonds/starter_pack.png')}
            alt="Diamond icon"
            size="xl"
            role="img"
          />
        </VStack>
        <VStack
          space="md"
          justifyContent="center"
          alignItems="center"
        >
          <Box padding={5}>
            <Text
              color="black"
              fontWeight="bold"
              fontSize="$xl"
            >
              1. player 1
            </Text>
          </Box>
          <Box padding={5}>
            <Text
              color="black"
              fontWeight="semibold"
            >
              2. player 2
            </Text>
          </Box>
          <Box padding={5}>
            <Text
              color="black"
              fontWeight="semibold"
            >
              3. player 3
            </Text>
          </Box>
          <Box padding={5}>
            <Text
              color="black"
              fontWeight="semibold"
            >
              4. player 4
            </Text>
          </Box>
          <Box padding={5}>
            <Text
              color="black"
              fontWeight="semibold"
            >
              5. player 5
            </Text>
          </Box>
        </VStack>
        <Button
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
        </Button>
      </Box>
    </View>
  );
}
