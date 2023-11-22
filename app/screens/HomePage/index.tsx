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

export default function HomePage({ navigation }: any) {
  const [refreshing, setRefreshing] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  //Untuk Refresh ketika ditarik kebawah
  const onRefresh = useCallback(async () => {
    setRefreshing(false);
    setRefreshTrigger(prev => prev + 1);

    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log("HomePage token = ", token);
    } catch (error) {
      console.error("Error on refreshing", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

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

          {/* Button Quiz */}
          <Button
            rounded={'$full'}
            backgroundColor="$greenButton"
            width={'40%'}
            onPress={() => navigation.navigate('FindingOpponent')}
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
