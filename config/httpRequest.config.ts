import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { API_URL,AUTH_TOKEN } from '@env';


const axiosClient = axios.create({
    baseURL: API_URL,
    timeout: 5000,
});
axiosClient.interceptors.request.use(async (config: any) => {
    const tokenKey = AUTH_TOKEN as string;
    if(tokenKey) {
        const token = await SecureStore.getItemAsync(tokenKey);
        if (token) {
            (config.headers as any)["Authorization"] = token;
        }
    }
    return config;
});

export default axiosClient;
