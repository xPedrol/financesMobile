import {Button, Flex, Text, useColorMode, useColorModeValue} from "native-base";
import {StatusBar} from "react-native";

export default function ConnectionError({navigation}) {
    const {
        colorMode,
    } = useColorMode();
    const bg = useColorModeValue("warmGray.50", "#111111");
    return (
        <>
            <StatusBar barStyle={colorMode === 'light' ? 'dark-content' : 'light-content'} backgroundColor={bg}/>
            <Flex flex={1} justifyContent={'center'} alignItems={'center'} bg={bg}>
                <Text fontSize={'xl'}>Connection Error</Text>
                <Button onPress={() => navigation.navigate('Home')} size={'sm'} mt={'10px'}>Try again</Button>
            </Flex>
        </>
    );
}