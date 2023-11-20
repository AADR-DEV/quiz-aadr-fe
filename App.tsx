import { GluestackUIProvider, Text, Box } from "@gluestack-ui/themed"
import { config } from './config/gluestack-ui.config'
import { AppNav } from "./app/navigation";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export default function App() {
  GoogleSignin.configure({
    webClientId: '385575590265-gvv95qm867qll7c874mlio7a4a59t9c5.apps.googleusercontent.com',
  });

  return (
    <Provider store={store}>
      <GluestackUIProvider config={config}>
        <AppNav />
      </GluestackUIProvider>
    </Provider>
  )
}