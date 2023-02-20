import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
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

const Stack = createNativeStackNavigator();

export default function App() {
    let [fontsLoaded] = useFonts({
        'Inter900':Inter_900Black,
        'Inter400':Inter_400Regular,
        'Inter500':Inter_500Medium,
        'Inter600':Inter_600SemiBold,
        'Inter700':Inter_700Bold,
        'Inter800':Inter_800ExtraBold
    });

    if (!fontsLoaded) {
        return null;
    }
    return (
        <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login" screenOptions={{animation: "none", headerShown: false}}>
                    <Stack.Screen name="Login" component={Login}/>
                    <Stack.Screen name="Register" component={Register}/>
                </Stack.Navigator>
            </NavigationContainer>
        </NativeBaseProvider>
    );
}
