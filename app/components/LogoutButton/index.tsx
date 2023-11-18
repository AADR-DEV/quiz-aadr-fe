import { Text, Box, View, Icon, CloseIcon } from '@gluestack-ui/themed'
import { logout } from '../../store/auth';
import { useAppDispatch } from '../../hooks/useRedux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import { LogOut } from 'lucide-react-native'

export default function LogoutButton() {

    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        dispatch(logout())
        AsyncStorage.removeItem('userToken')
        await AsyncStorage.clear()
        await GoogleSignin.revokeAccess()
        return auth().signOut()
    }

    return (
        <View>
            <TouchableOpacity
                onPress={() => {
                    handleLogout()
                }}
            >
                <Box
                    marginRight={'$3'}
                    flexDirection="row"
                    gap={'$2'}
                    alignItems="center"
                    backgroundColor="$primaryBg"
                    padding="$1"
                    paddingHorizontal={'$5'}
                    rounded="$3xl"
                    justifyContent="center"
                >
                    <Text
                        color="white"
                        fontWeight="bold"
                        fontSize="$xs"
                    >Logout</Text>
                    <Icon
                        color="white"
                        size='sm'
                        as={LogOut}
                    />
                </Box>
            </TouchableOpacity>
        </View>
    )
}