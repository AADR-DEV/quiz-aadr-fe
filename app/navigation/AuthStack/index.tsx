import { createStackNavigator } from '@react-navigation/stack';
import { LoginPage, AvatarPage, CheckUserPage } from '../../screens';
import { selectAuth } from '../../store/auth';
import { useAppSelector } from '../../hooks/useRedux';


export default function AuthStack() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={LoginPage}
                options={{
                    headerShown: false, //menghilangkan header
                }}
            />
        </Stack.Navigator>
    )
}