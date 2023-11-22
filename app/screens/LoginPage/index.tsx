import {
  Box,
  Button,
  Icon,
  Text,
} from '@gluestack-ui/themed';
import { StatusBar } from 'react-native';
import { AppLottieView } from '../../components';
import { useContext, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { UserInfo, login, selectAuth } from '../../store/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import authApi, { GetUserAuthPayload } from '../../api/authApi';
import { UserCircle } from 'lucide-react-native';

export default function LoginPage({ navigation }: any) {
  const dispatch = useAppDispatch();
  const [createUserAuth] = authApi.useCreateUserAuthMutation();


  const onGoogleButtonPress = async () => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })

    const userInfo = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);

    return auth().signInWithCredential(googleCredential);
  }


  const handleLogin = async () => {
    try {
      const result = await onGoogleButtonPress();
      const idToken = await result.user.getIdToken();

      const userInfo: UserInfo = {
        name: result.user.displayName,
        avatar: result.user.photoURL,
        email: result.user.email,
        username: '',
        total_diamonds: 0,
      };

      await AsyncStorage.setItem('userToken', idToken);
      await createUserAuth(userInfo);
      dispatch(login({ userInfo, isLoading: false }));
    } catch (error) {
      console.log('Login failed:', error);
    }
  };


  const handleNavigate = async () => {
    navigation.navigate('CheckUser');
  };

  const isLoggedIn = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        const username = await AsyncStorage.getItem('userUsername');
        console.log("Login Page username = ", username);
        if (username === null || username === '') {
          navigation.navigate('Avatar');
        } else {
          navigation.navigate('Home');
        }
      }
    } catch (error) {
      console.log('Login Error:', error);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);


  return (
    <Box
      backgroundColor="$primaryBg"
      flex={1}
      justifyContent="center"
      alignItems="center"
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="#6A5AE0"
      />
      <AppLottieView
        animation={require('./login_animation.json')}
        autoPlay
        loop
        style={{
          width: 200,
          height: 200,
        }}
      />
      <Box
        bg="white"
        width="90%"
        rounded={'$2xl'}
        padding="$4"
        justifyContent="center"
        alignItems="center"
        gap={'$2'}
      >
        <Text
          fontWeight="bold"
          color="black"
          size="xl"
        >
          Login
        </Text>
        <Text
          color="gray"
          size="sm"
        >
          Ensure you have a Google account before logging in.
        </Text>
        <Button
          size="lg"
          rounded="$lg"
          backgroundColor="$secondaryBg"
          gap="$2"
          onPress={() => handleLogin().then(() => handleNavigate())}
          width="70%"
          mt={'$5'}
        >
          <Icon
            color='white'
            size="xl"
            as={UserCircle} />
          <Text
            fontWeight="bold"
            color="white"
          >
            Login with Google
          </Text>
        </Button>

        <Text
          color="$secondaryBg"
          size="xs"
        >
          * Your account's security is assured.
        </Text>
      </Box>
    </Box>
  );
}
