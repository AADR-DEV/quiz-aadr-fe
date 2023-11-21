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
} from '@gluestack-ui/themed';
import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { AppLottieView } from '../../components';

export default function FindingOpponentPage({ navigation }: any) {
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

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Quiz'); // replacing page with countdown
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View
      flex={1}
      alignItems="center"
      justifyContent="center"
      backgroundColor="$primaryBg"
      gap={'$1'}
    >
      <ImageBackground
        source={require('../FindingOpponentPage/finding-opponent.png')}
        resizeMode="cover"
        style={styles.image}
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
          <Progress
            value={40}
            w={250}
            size="md"
            mb={20}
          >
            <ProgressFilledTrack />
          </Progress>

          <HStack
            mb={20}
            space="sm"
          >
            <Avatar
              width={40}
              height={40}
              bgColor="$tertiaryButton"
            >
              <AvatarFallbackText>Guswandi</AvatarFallbackText>
            </Avatar>
            <Avatar
              width={40}
              height={40}
              bgColor="red"
            >
              <AvatarFallbackText>Dita</AvatarFallbackText>
            </Avatar>
            <Avatar
              width={40}
              height={40}
              bgColor="$tertiaryButton"
            >
              <AvatarFallbackText>Akbar</AvatarFallbackText>
            </Avatar>
            <Avatar
              width={40}
              height={40}
            >
              <AvatarFallbackText>Reza</AvatarFallbackText>
            </Avatar>
          </HStack>

          <Avatar
            width={130}
            height={130}
          >
            <AvatarFallbackText>Kok Ngga Mau</AvatarFallbackText>
          </Avatar>

          <AppLottieView
            animation={require('./Loading-dots.json')}
            autoPlay
            loop
            style={{
              width: 200,
              height: 150,
            }}
            bgColor="red"
          />
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
      </ImageBackground>
    </View>
  );
}
