import {
  View,
  Text,
  Button,
  Box,
  HStack,
  VStack,
  Link,
  LinkText,
  Image,
  Avatar,
  AvatarFallbackText,
  ScrollView,
  ButtonText
} from '@gluestack-ui/themed';
import { UserHome, LeaderBoard } from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function HomePage({ navigation }: any) {

  AsyncStorage.getItem('userToken')
    .then(token => {
      console.log("HomePage token = ", token);
    });


  return (
    <ScrollView>
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
          <UserHome navigation={navigation} />

          {/* Button Quiz */}
          <Button
            rounded={'$full'}
            backgroundColor="$greenButton"
            width={'40%'}
            onPress={() => {
              navigation.navigate('FindingOpponent');
            }}

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
