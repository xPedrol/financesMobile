import Layout from "../components/Layout";
import Header from "../components/Header";
import {
    Button,
    CheckIcon,
    Flex,
    FormControl,
    Input,
    Select,
    Stack,
    Text,
    TextArea,
    useToast,
    VStack,
    WarningOutlineIcon
} from "native-base";
import {Controller, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {categories, EnumCategory} from "../enum/Category.enum";
import {apiCreateExpense, apiExpense, apiUpdateExpense} from "../services/expense.service";
import {useNavigation} from "@react-navigation/native";
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import dayjs, {Dayjs} from "dayjs";
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
import {DATE_INPUT_FORMAT, DATE_OUTPUT_FORMAT, DATE_TIME_OUTPUT_FORMAT} from "../const/date.const";
import {ITag} from "../models/Tag.model";
import {apiTags} from "../services/tag.service";


type FormData = {
    amount: string;
    tagId: string;
    description: string;
    date: string;
    category?: EnumCategory;
};
export default function Expense({route}) {
    const {id} = route.params;
    const {control, handleSubmit, formState: {errors}, getValues, setValue} = useForm<FormData>();
    const toast = useToast();
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [creating, setCreating] = useState<boolean>(true);
    const navigation = useNavigation();
    const [date, setDate] = useState<Dayjs>(dayjs());
    const [tags, setTags] = useState<ITag[]>([]);

    const onChange = (event, selectedDate) => {
        setValue('date', dayjs(selectedDate).utc().format(DATE_INPUT_FORMAT));
        setDate(dayjs(selectedDate));
    };

    const onSubmit = async (data: FormData) => {
        setSubmitting(true);
        if (data.category === EnumCategory.LOSS) {
            data.amount = String(-Math.abs(Number(data.amount)));
        }
        delete data.category;
        let request =
            !creating && id
                ? apiUpdateExpense(id as string, data as any)
                : apiCreateExpense(data as any);
        request
            .then(() => {
                toast.show({
                    title: "Expense saved successfully.",
                });
                navigation.navigate('Expenses');
            })
            .catch(() => {
                toast.show({
                    title: "Something went wrong. Please try again later.",
                });
            }).finally(() => setSubmitting(false));
    };
    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date.toDate(),
            onChange,
            mode: currentMode,
            is24Hour: true,
        });
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    useEffect(() => {
        if (id) {
            apiExpense(id).then(({data}) => {
                setValue('amount', String(Math.abs(data.amount)));
                setValue('tagId', data.tagId);
                setValue('description', data.description);
                const nDate = dayjs(data.date).utc().format(DATE_INPUT_FORMAT);
                setValue('date', nDate);
                setDate(dayjs(data.date));
                setValue('category', data.amount > 0 ? EnumCategory.GAIN : EnumCategory.LOSS);
            });
            setCreating(false);
        } else {
            setCreating(true);
        }
    }, [id]);
    useEffect(() => {
        apiTags().then(({data}) => {
            setTags(data);
        });
    }, []);
    return (
        <Layout header={<Header showMenuButtons={true} goBackTo={'Expenses'} title={'Expense'}/>}>
            <Text textAlign={'center'} fontSize={'22px'} fontFamily={'Inter800'} letterSpacing={'-.049375rem'}>
                {creating ? 'New' : 'Update'} Expense
            </Text>
            <Text textAlign={'center'} fontSize={'12px'}>{creating ? 'Adding' : 'Updating'} a new expense</Text>
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
                                       keyboardType='numeric'
                                       value={String(value)} type="text" placeholder="Amount" variant="outline"
                                       size={'md'}/>
                            )}
                            name="amount"
                            defaultValue={''}
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
                                <Select selectedValue={value} minWidth="200" accessibilityLabel="Choose Tag"
                                        placeholder="Choose Tag" _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size="5"/>
                                }} mt={1} onValueChange={onChange}>
                                    {tags.map((tag) => (
                                        <Select.Item key={tag.id} label={tag.name} value={tag.id}/>
                                    ))}
                                </Select>
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
                                <Select selectedValue={value} minWidth="200" accessibilityLabel="Choose Category"
                                        placeholder="Choose Category" _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size="5"/>
                                }} mt={1} onValueChange={onChange}>
                                    {categories.map((category) => (
                                        <Select.Item key={category} label={category} value={category}/>
                                    ))}
                                </Select>
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
                <Flex justify={'flex-end'} direction={'row'}>
                    <Button flex={1}
                            onPress={showDatepicker}>{date ? dayjs(date).utc().format(DATE_OUTPUT_FORMAT) : 'Choose a date'}</Button>
                    <Button ml={5} flex={1} colorScheme={'gray'} onPress={handleSubmit(onSubmit)}
                            isLoading={submitting}>Salvar</Button>
                </Flex>
            </VStack>
        </Layout>
    );
}