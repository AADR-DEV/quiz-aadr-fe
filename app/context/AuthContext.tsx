// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { createContext, useState, useEffect } from "react";


// interface AuthContextType {
//     isLoading: boolean
//     userToken: string | null
//     login: () => void
//     logout: () => void
// }

// export const AuthContext = createContext<AuthContextType>({
//     isLoading: false,
//     userToken: null,
//     login: () => { },
//     logout: () => { }
// });

// export const AuthProvider = ({ children }) => {
//     const [isLoading, setIsLoading] = useState(false)
//     const [userToken, setUserToken] = useState(null)


//     const login = async () => {
//         setIsLoading(true)
//         setTimeout(() => {
//             setIsLoading(false)
//             setUserToken('random_to')
//             AsyncStorage.setItem('userToken', 'random_token')
//             // navigation.navigate('Avatar')
//         }, 2000)
//     }

//     const logout = () => {
//         setIsLoading(true)
//         setTimeout(() => {
//             setIsLoading(false)
//             setUserToken(null)
//             AsyncStorage.removeItem('userToken')
//         }, 2000)
//     }

//     const isLoggedIn = async () => {
//         try {
//             setIsLoading(true);
//             let userToken = await AsyncStorage.getItem('userToken');
//             setUserToken(userToken);
//             setIsLoading(false);
//         } catch (error) {
//             console.log('Login Error ${error}')
//         }
//     }

//     useEffect(() => {
//         isLoggedIn();
//     }, []);

//     return (
//         <AuthContext.Provider value={{ isLoading, userToken, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     )
// }