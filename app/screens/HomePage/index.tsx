import React, { useState, useCallback } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import {
  View,
  Text,
  Button,
  Box,
  ButtonText
} from '@gluestack-ui/themed';
import { UserHome, LeaderBoard } from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import socket from '../../api/socket';
import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/useRedux';
import { selectAuth } from '../../store/auth';
import { authApi, questionApi } from '../../api';
import quizData from '../../api/dummyOption';
import TypeWriter from '@sucho/react-native-typewriter';


export default function HomePage({ navigation }: any) {
  const [refreshing, setRefreshing] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const user = useAppSelector(selectAuth);
  const [connectSocket, setConnectSocket] = useState(false);

  const { data } = questionApi.useGetQuestionsQuery();
  // const { data } = quizData; //DummyData

  // const quiz = data?.data

  // console.log('data questions', quiz);

  //Untuk Refresh ketika ditarik kebawah
  const onRefresh = useCallback(async () => {
    setRefreshing(false);
    setRefreshTrigger(prev => prev + 1);

    try {
      const token = await AsyncStorage.getItem('userToken');
    } catch (error) {
      console.error("Error on refreshing", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {

    socket.on('connect', () => {
      console.log('Connected to server');
      setConnectSocket(true);
    });

  }, [navigation]);

  const handlePlayQUiz = () => {
    socket.emit(
      'createPlayer',
      {
        id: user?.id,
        username: user?.username,
        avatar: user?.mainAvatar,
        points: 0,
        answers: []
      }
    )

    navigation.navigate('FindingOpponent');
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
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
          alignItems="center"
          gap={'$2'}
          width={'100%'}
          pb={'$4'}
          py={'$4'}
        >
          {/* Users View */}
          <UserHome navigation={navigation} reshTrigger={refreshTrigger} />

          {connectSocket ? (
            <TypeWriter
              textArray={['Youre Connect!', 'Ready to play!']}
              loop
              speed={100}
              delay={500}
              textStyle={{
                fontSize: 15,
                color: 'yellow',
                textAlign: 'center',
              }}
              cursorStyle={{
                fontSize: 0,
              }}
            />
          ) : (
            <Text
              size='xs'
              color='white'
            >Server Disconnected</Text>
          )}


          {/* Button Quiz */}
          <Button
            rounded={'$full'}
            backgroundColor="$greenButton"
            width={'40%'}
            onPress={handlePlayQUiz}
          // onPress={() => navigation.navigate('Quiz')}
          >
            <ButtonText
              fontSize="$xl"
              fontWeight="bold"
              color="white"
              textAlign="center"
            >
              Play Quiz
            </ButtonText>
          </Button>

          {/* Quiz Attention */}
          <Text
            fontSize={10}
            color='white'
            textAlign="center"
            w={'80%'}
            mb={'$2'}
          >
            * Play the Quiz, then collect diamonds to buy in-game items.
          </Text>

          {/* LeaderBoard Views */}
          <LeaderBoard />
        </Box>
      </View>
    </ScrollView>
  );
}
