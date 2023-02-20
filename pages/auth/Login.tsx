import Layout from "../../components/Layout";
import {
    Button,
    Flex,
    FormControl,
    Input,
    Stack,
    Text,
    useColorModeValue,
    VStack,
    WarningOutlineIcon
} from "native-base";

export default function Login({navigation}) {
    const titleBg = useColorModeValue('gray.300', '#4a5568');
    return (
        <Layout>
            <Flex justify={'center'} h={'50%'}>
                <Text textAlign={'center'} fontSize={'32px'} fontFamily={'Inter800'} letterSpacing={'-.049375rem'}>
                    <Text>Log in to </Text>
                    <Text bg={titleBg} ml={'5px'} p={'5px'} borderRadius={'xl'}>Finances</Text>
                    <Text bg={titleBg} ml={'5px'} py={'5px'}
                          px={'20px'} borderRadius={'xl'}>!</Text>
                </Text>

                <VStack space={4} alignItems="stretch" mt={'25px'}>
                    <FormControl isRequired>
                        <Stack>
                            <Input type="text" placeholder="Email"/>
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>}>
                                Atleast 6 characters are required.
                            </FormControl.ErrorMessage>
                        </Stack>
                    </FormControl>
                    <FormControl isRequired>
                        <Stack>
                            <Input type="password" placeholder="Password"/>
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>}>
                                Atleast 6 characters are required.
                            </FormControl.ErrorMessage>
                        </Stack>
                    </FormControl>
                    <Flex justify={'flex-end'}>
                        <Button bg={'#4a5568'} onPress={() => console.log("hello world")}>Login</Button>
                    </Flex>
                </VStack>
            </Flex>
        </Layout>
    );
}