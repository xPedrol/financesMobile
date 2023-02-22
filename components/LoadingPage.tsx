import {Flex, Heading, HStack, Spinner} from "native-base";

export default function LoadingPage() {
    return (<Flex flex={1} justify={'center'} bg={'#111111'}>
        <HStack space={2} justifyContent="center" alignItems={'center'}>
            <Spinner accessibilityLabel="Loading" size="lg" color={'gray.300'}/>
            <Heading color="gray.300" fontSize="md">
                Loading
            </Heading>
        </HStack>
    </Flex>)
}