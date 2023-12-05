import { createStackNavigator } from '@react-navigation/stack';
import {
  AvatarPage,
  HomePage,
  QuizPage,
  ShopPage,
  ResultPage,
  CheckUserPage,
  FindingOpponentPage,
  BuyAvatarPage,
  RoomPage,
} from '../../screens';
import { LogoutButton } from '../../components';

export default function AppStack() {
  const Stack = createStackNavigator();


  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CheckUser"
        component={CheckUserPage}
        options={{
          headerShown: false, //menghilangkan header
        }}
      />
      {/* Avatar */}
      <Stack.Screen
        name="Avatar"
        component={AvatarPage}
        options={{
          headerShown: false, //menghilangkan header
        }}
      />
      {/* HomeScreen */}
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={{
          headerLeft: () => null, //menghilangkan arrow back
          headerRight: () => {
            return (
              <LogoutButton />
            )
          },
          headerTitle: 'QRich',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#5a4ad3',
          },
        }}
      />
      {/* QuizScreen */}
      <Stack.Screen
        name="Quiz"
        component={QuizPage}
        options={{
          headerLeft: () => null, //menghilangkan arrow back
          headerTitle: 'Quiz',
          headerTintColor: 'white',
          headerShown: false,
          headerStyle: {
            backgroundColor: '#5a4ad3',
          },
        }}
      />
      {/* ShopScreen */}
      <Stack.Screen
        name="Shop"
        component={ShopPage}
        options={{
          headerLeft: () => null, //menghilangkan arrow back
          headerTitle: 'Buy Diamonds',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#5a4ad3',
          },
        }}
      />
      {/* ResultScreen */}
      <Stack.Screen
        name="Result"
        component={ResultPage}
        options={{
          headerLeft: () => null, //menghilangkan arrow back
          headerTitle: 'Quiz',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#5a4ad3',
          },
        }}
      />
      {/* FindingEnemy */}
      <Stack.Screen
        name="FindingOpponent"
        component={FindingOpponentPage}
        options={{
          headerLeft: () => null, //menghilangkan arrow back
          headerTitle: 'Finding Opponent',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#5a4ad3',
          },
        }}
      />
      {/* CreateRoom */}
      <Stack.Screen
        name="CreateRoom"
        component={RoomPage}
        options={{
          headerLeft: () => null, //menghilangkan arrow back
          headerTitle: 'Room',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#5a4ad3',
          },
        }}
      />
      {/* BuyAvatar */}
      <Stack.Screen
        name="BuyAvatar"
        component={BuyAvatarPage}
        options={{
          headerLeft: () => null, //menghilangkan arrow back
          headerTitle: 'Avatars',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#5a4ad3',
          },
        }}
      />
    </Stack.Navigator>
  );
}
