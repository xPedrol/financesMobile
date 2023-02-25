import * as SecureStore from 'expo-secure-store';
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import {NavigationContainer} from "@react-navigation/native";
import {Stack, useToast} from "native-base";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useEffect, useMemo, useReducer} from "react";
import {apiLogin} from "../services/auth.service";
import {AuthContext} from "../hooks/useAuth";
import {AUTH_TOKEN} from "@env";
import axiosClient from "../config/httpRequest.config";
import LoadingPage from "../components/LoadingPage";
import Home from "../pages/Home";
import Expenses from "../pages/Expenses";
import Notes from "../pages/Notes";
import Tags from "../pages/Tags";
import ConnectionError from "../pages/ConectionError";
import Expense from "../pages/Expense";

type ReducerState = {
    isLoading: boolean;
    isSignout: boolean;
    userToken: string | null;
}
export default function AuthProvider() {
    const Stack = createNativeStackNavigator();
    const toast = useToast();

    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: true,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        hasError: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        hasError: false,
                        userToken: null,
                    };
                case 'SET_LOADING':
                    return {
                        ...prevState,
                        isLoading: action.isLoading,
                    };
                case 'SET_ERROR':
                    return {
                        ...prevState,
                        hasError: action.hasError,
                    };
            }
        },
        {
            isLoading: true,
            hasError: false,
            userToken: null,
        }
    );


    useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken;

            try {
                userToken = await SecureStore.getItemAsync(AUTH_TOKEN);
                // setIsLoading(true);
                dispatch({type: 'SET_LOADING', isLoading: true});
                axiosClient
                    .get("/me")
                    .then((response) => {
                        if (response.data) {
                            dispatch({type: 'RESTORE_TOKEN', token: userToken});
                            // setUser(response.data);
                        } else {
                            // setUser(null);
                        }
                    })
                    .catch((err) => {
                        // setUser(null);
                        if (state.userToken) {
                            toast.show({
                                title: `Erro ao carregar usuário`
                            });
                            if (err && err.response && err.response.status === 403) {
                                authContext.signOut();
                            } else {
                                dispatch({type: 'SET_ERROR', hasError: true});
                            }
                        }
                    })
                    .finally(() => dispatch({type: 'SET_LOADING', isLoading: false}));
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
            signOut: async () => {
                await SecureStore.deleteItemAsync(AUTH_TOKEN);
                dispatch({type: 'SIGN_OUT'});
            },
            signUp: async (data) => {
                // In a production app, we need to send user data to server and get a token
                // We will also need to handle errors if sign up failed
                // After getting token, we need to persist the token using `SecureStore`
                // In the example, we'll use a dummy token

                dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
            },
            getToken: () => {
                try {
                    return state.userToken;
                } catch (e) {
                    throw e;
                }
            }
        }),
        [state.userToken]
    );
    const getInitialRouteName = (): string => {
        if (state.userToken) {
            if (state.hasError) return 'ConnectionError';
            return 'Home';
        } else {
            return 'Login';
        }
    };
    return (
        <AuthContext.Provider value={authContext}>
            {state.isLoading ? (
                <LoadingPage/>
            ) : <NavigationContainer>
                <Stack.Navigator initialRouteName={getInitialRouteName()}
                                 screenOptions={{animation: "none", headerShown: false}}>
                    {state.userToken === null ? (
                        <>
                            <Stack.Screen name="Login" component={Login}/>
                            <Stack.Screen name="Register" component={Register}/>
                        </>
                    ) : (
                        <>
                            <Stack.Screen name="Home" component={Home}/>
                            <Stack.Screen name="Expenses" component={Expenses}/>
                            <Stack.Screen name="Expense" component={Expense} options={{
                                animation: "slide_from_right"
                            }
                            }/>
                            <Stack.Screen name="Notes" component={Notes}/>
                            <Stack.Screen name="Tags" component={Tags}/>
                        </>
                    )}
                    <Stack.Screen name="ConnectionError" component={ConnectionError}/>
                </Stack.Navigator>
            </NavigationContainer>
            }
        </AuthContext.Provider>
    );
}