import Layout from "../components/Layout";
import Header from "../components/Header";
import {
    Box,
    Button,
    Flex,
    FormControl,
    Icon,
    Input,
    Pressable,
    Stack, Text, TextArea,
    useToast,
    VStack,
    WarningOutlineIcon
} from "native-base";
import {Controller, useForm} from "react-hook-form";
import {MaterialIcons} from "@expo/vector-icons";
import {useRef, useState} from "react";
import {EnumCategory} from "../enum/Category.enum";
import DateTimePicker from '@react-native-community/datetimepicker';
import {apiCreateExpense, apiUpdateExpense} from "../services/expense.service";
import {useNavigation} from "@react-navigation/native";
import {IExpense} from "../models/Expense.model";
import RNDateTimePicker from "@react-native-community/datetimepicker";

type FormData = {
    amount: string;
    tagId: string;
    description: string;
    date: Date;
    category?: EnumCategory;
};
export default function Expense() {
    const {control, handleSubmit, formState: {errors}} = useForm<FormData>();
    const toast = useToast();
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [creating, setCreating] = useState<boolean>(true);
    const navigation = useNavigation();
    const expenseId = useRef<string | null>(null);
    const onSubmit = async (data: IExpense) => {
        setSubmitting(true);
        if (data.category === EnumCategory.LOSS) {
            data.amount = -Math.abs(Number(data.amount));
        }
        delete data.category;
        let request =
            !creating && expenseId.current
                ? apiUpdateExpense(expenseId.current as string, data as any)
                : apiCreateExpense(data as any);
        request
            .then(() => {
                toast.show({
                    title: "Expense saved successfully.",
                });
                navigation.goBack();
            })
            .catch(() => {
                toast.show({
                    title: "Something went wrong. Please try again later.",
                });
            }).finally(() => setSubmitting(false));
    };
    return (
        <Layout header={<Header showMenuButtons={true} goBackTo={'Expenses'} title={'Expense'}/>}>
            <Text textAlign={'center'} fontSize={'22px'} fontFamily={'Inter800'} letterSpacing={'-.049375rem'}>
                New
            </Text>
            <Text textAlign={'center'} fontSize={'12px'}>Adding a new expense</Text>
            <VStack space={4} alignItems="stretch" mt={'25px'}>
                <FormControl isRequired isInvalid={'amount' in errors}>
                    <Stack>
                        <Controller
                            rules={{
                                required: true,
                            }}
                            control={control}
                            render={({field: {onChange, onBlur, value}}) => (
                                <Input onBlur={onBlur}
                                       onChangeText={onChange}
                                       value={value} type="text" placeholder="Amount" variant="outline" size={'md'}/>
                            )}
                            name="amount"
                            defaultValue=""
                        />
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>}>
                            Required Field
                        </FormControl.ErrorMessage>
                    </Stack>
                </FormControl>
                <FormControl isRequired isInvalid={'date' in errors}>
                    <Stack>
                        <Controller
                            rules={{
                                required: true,
                            }}
                            control={control}
                            render={({field: {onChange, onBlur, value}}) => (
                                <RNDateTimePicker display={'default'}
                                    value={new Date()}/>
                            )}
                            name="date"
                        />
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>}>
                            Required Field
                        </FormControl.ErrorMessage>
                    </Stack>
                </FormControl>
                <FormControl isRequired isInvalid={'tagId' in errors}>
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
                                       type={"text"}
                                       placeholder="Tag"/>
                            )}
                            name="tagId"
                            defaultValue=""
                        />
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>}>
                            Required Field
                        </FormControl.ErrorMessage>
                    </Stack>
                </FormControl>
                <FormControl isRequired isInvalid={'category' in errors}>
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
                                       type={"text"}
                                       placeholder="Category"/>
                            )}
                            name="category"
                        />
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>}>
                            Required Field
                        </FormControl.ErrorMessage>
                    </Stack>
                </FormControl>
                <FormControl isRequired isInvalid={'description' in errors}>
                    <Stack>
                        <Controller
                            control={control}
                            render={({field: {onChange, onBlur, value}}) => (
                                <TextArea onBlur={onBlur}
                                          onChangeText={onChange}
                                          value={value} variant="outline"
                                          size={'md'}
                                          type={"text"}
                                          placeholder="Description" autoCompleteType={undefined}></TextArea>
                            )}
                            name="description"/>
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>}>
                            Required Field
                        </FormControl.ErrorMessage>
                    </Stack>
                </FormControl>
                <Flex justify={'flex-end'}>
                    <Button colorScheme={'gray'} onPress={handleSubmit(onSubmit)} isLoading={submitting}>Salvar</Button>
                </Flex>
            </VStack>
        </Layout>
    )
}