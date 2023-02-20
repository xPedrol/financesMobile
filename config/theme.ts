import type {StorageManager} from "native-base";
import {ColorMode, extendTheme} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

const config = {
    useSystemColorMode: true,
    initialColorMode: 'dark',
};


const newColorTheme = {
    brand: {
        900: "#8287af",
        800: "#7c83db",
        700: "#b3bef6",
    },
};
const fonts = {
    heading: "Inter800",
    body: "Inter500",
    mono: "Inter500",
};
export const theme = extendTheme({colors: newColorTheme, config,fonts});

export const colorModeManager: StorageManager = {
    get: async () => {
        try {
            let val = await AsyncStorage.getItem("@my-app-color-mode");
            return val === "dark" ? "dark" : "light";
        } catch (e) {
            console.log(e);
            return "dark";
        }
    },
    set: async (value: ColorMode) => {
        try {
            await AsyncStorage.setItem("@my-app-color-mode", value);
        } catch (e) {
            console.log(e);
        }
    },
};