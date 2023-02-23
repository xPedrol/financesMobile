import {Flex, Heading, HStack, Spinner, useColorMode, useColorModeValue} from "native-base";
import {StatusBar} from "react-native";

export default function LoadingPage() {
    const {
        colorMode,
    } = useColorMode();
    const bg = useColorModeValue("#fafaf9", "#111111");
    return (
        <>
            <StatusBar barStyle={colorMode === 'light' ? 'dark-content' : 'light-content'} backgroundColor={bg}/>
            <Flex flex={1} justify={'center'} bg={bg}>
                <HStack space={2} justifyContent="center" alignItems={'center'}>
                    <Spinner accessibilityLabel="Loading" size="lg" color={'gray.300'}/>
                    <Heading color="gray.300" fontSize="md">
                        Loading
                    </Heading>
                </HStack>
            </Flex>
        </>
    );
}