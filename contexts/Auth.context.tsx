import * as SecureStore from 'expo-secure-store';
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import {NavigationContainer} from "@react-navigation/native";
import {Stack} from "native-base";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useEffect, useMemo, useReducer} from "react";
import Home from "../pages/Home";
import {apiLogin} from "../services/auth.service";
import {AuthContext} from "../hooks/useAuth";
import {AUTH_TOKEN} from "@env";


export default function AuthProvider() {
    const Stack = createNativeStackNavigator();

    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        }
    );

    useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken;

            try {
                userToken = await SecureStore.getItemAsync(AUTH_TOKEN);
                dispatch({type: 'RESTORE_TOKEN', token: userToken});
            } catch (e) {
                throw e;
                // Restoring token failed
            }
        };

        bootstrapAsync();
    }, []);

    const authContext = useMemo(
        () => ({
            signIn: async (data) => {
                try {
                    const result = await apiLogin(data);
                    await SecureStore.setItemAsync(AUTH_TOKEN, result.data.token);
                    dispatch({type: 'SIGN_IN', token: result.data.token});
                    return result;
                } catch (e) {
                    // console.error(e);
                    throw e;
                }
            },
            signOut: () => dispatch({type: 'SIGN_OUT'}),
            signUp: async (data) => {
                // In a production app, we need to send user data to server and get a token
                // We will also need to handle errors if sign up failed
                // After getting token, we need to persist the token using `SecureStore`
                // In the example, we'll use a dummy token

                dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
            },
            getToken: async () => {
                try {
                    return await SecureStore.getItemAsync(AUTH_TOKEN);
                } catch (e) {
                    throw e;
                }
            }
        }),
        []
    );
    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {state.userToken == null ? (
                    <Stack.Navigator initialRouteName="Login" screenOptions={{animation: "none", headerShown: false}}>
                        <Stack.Screen name="Login" component={Login}/>
                        <Stack.Screen name="Register" component={Register}/>
                    </Stack.Navigator>
                ) : (
                    <Stack.Navigator initialRouteName="Home" screenOptions={{animation: "none", headerShown: false}}>
                        <Stack.Screen name="Home" component={Home}/>
                    </Stack.Navigator>
                )}
            </NavigationContainer>
        </AuthContext.Provider>
    );
}