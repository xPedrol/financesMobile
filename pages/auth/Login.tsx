import Layout from "../../components/Layout";
import {
    Box,
    Button,
    Flex,
    FormControl,
    Icon,
    Input,
    Pressable,
    Stack,
    Text,
    useColorModeValue,
    useToast,
    VStack,
    WarningOutlineIcon
} from "native-base";
import Header from "../../components/Header";
import {Controller, useForm} from "react-hook-form";
import {useAuth} from "../../hooks/useAuth";
import {MaterialIcons} from "@expo/vector-icons";
import {useState} from "react";
import {Keyboard} from "react-native";

type formData = {
    email: string;
    password: string;
}
export default function Login({navigation}) {
    const titleBg = useColorModeValue('gray.200', '#1e1d1d');
    const {signIn} = useAuth();
    const [loginLoading, setLoginLoading] = useState<boolean>(false);
    const {control, handleSubmit, formState: {errors}} = useForm<formData>();
    const [show, setShow] = useState(false);
    const toast = useToast();
    const onSubmit = async (data: formData) => {
        setLoginLoading(true);
        signIn(data).then((res) => {
            if (res.data.token) {
                navigation.navigate('Home');
            }
        }).catch((err) => {
            if (
                err &&
                err.response &&
                err.response.data &&
                err.response.data.showError
            ) {
                toast.show({
                    render: () => {
                        return <Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
                            {err.response.data.message}
                        </Box>;
                    }
                });
            } else {
                console.error(err)
                toast.show({
                    render: () => {
                        return <Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
                            Something went wrong. Please try again later.
                        </Box>;
                    }
                });
            }
        }).finally(() => {
            Keyboard.dismiss();
            setLoginLoading(false);
        });
    };
    return (
        <Layout h={'100%'} header={<Header title={'Wise Ways'}/>}>
            <Flex justify={'flex-start'} mt={'20px'} flex={1}>
                <Text textAlign={'center'} fontSize={'22px'} fontFamily={'Inter800'} letterSpacing={'-.049375rem'}>
                    <Text>Log in to </Text>
                    <Text>Wise Ways</Text>
                    <Text>!</Text>
                </Text>

                <VStack space={4} alignItems="stretch" mt={'25px'}>
                    <FormControl isRequired isInvalid={'email' in errors}>
                        <Stack>
                            <Controller
                                rules={{
                                    required: true,
                                }}
                                control={control}
                                render={({field: {onChange, onBlur, value}}) => (
                                    <Input onBlur={onBlur}
                                           onChangeText={onChange}
                                           value={value} type="text" placeholder="Email" variant="outline" size={'md'}/>
                                )}
                                name="email"
                                defaultValue=""
                            />
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>}>
                                Required Field
                            </FormControl.ErrorMessage>
                        </Stack>
                    </FormControl>
                    <FormControl isRequired isInvalid={'password' in errors}>
                        <Stack>
                            <Controller
                                rules={{
                                    required: true,
                                }}
                                control={control}
                                render={({field: {onChange, onBlur, value}}) => (
                                    <Input onBlur={onBlur}
                                           onChangeText={onChange}
                                           value={value} variant="outline"
                                           size={'md'}
                                           type={show ? "text" : "password"}
                                           InputRightElement={<Pressable onPress={() => setShow(!show)}>
                                               <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"}/>}
                                                     size={5} mr="2" color="muted.400"/>

                                           </Pressable>} placeholder="Password"/>
                                )}
                                name="password"
                                defaultValue=""
                            />
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>}>
                                Required Field
                            </FormControl.ErrorMessage>
                        </Stack>
                    </FormControl>
                    <Flex justify={'flex-end'}>
                        <Button onPress={handleSubmit(onSubmit)} isLoading={loginLoading}>Login</Button>
                    </Flex>
                </VStack>
            </Flex>
        </Layout>
    );
}