import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NativeBaseProvider} from "native-base";
import {colorModeManager, theme} from "./config/theme";
import {
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
    useFonts
} from '@expo-google-fonts/inter';
import AuthProvider from "./contexts/Auth.context";

const Stack = createNativeStackNavigator();

export default function App() {
    let [fontsLoaded] = useFonts({
        'Inter900': Inter_900Black,
        'Inter400': Inter_400Regular,
        'Inter500': Inter_500Medium,
        'Inter600': Inter_600SemiBold,
        'Inter700': Inter_700Bold,
        'Inter800': Inter_800ExtraBold
    });

    if (!fontsLoaded) {
        return null;
    }
    return (
        <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
            <AuthProvider/>
        </NativeBaseProvider>
    );
}
