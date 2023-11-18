import { createStackNavigator } from '@react-navigation/stack';
import {
  AvatarPage,
  HomePage,
  QuizPage,
  ShopPage,
  ResultPage,
} from '../../screens';
import { LogoutButton } from '../../components';




export default function AppStack() {
  const Stack = createStackNavigator();


  return (
    <Stack.Navigator>
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
          headerTitle: 'Quiz',
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
    </Stack.Navigator>
  );
}
