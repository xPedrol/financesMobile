import {IExpensesGroup} from "../models/ExpensesGroup.model";
import {formatNumbersBalanceDate} from "../utils/formatDate.utils";
import currentFormat from "../utils/currentFormat.utils";
import dayjs from "dayjs";
import {DATE_TIME_OUTPUT_FORMAT} from "../const/date.const";
import {getStatusColor} from "../utils/handleColor.utils";
import {Box, Button, Divider, Flex, Icon, SimpleGrid, Text} from "native-base";
import {MaterialIcons} from "@expo/vector-icons";

type ExpensesDetailedViewProps = {
    expensesGroup: IExpensesGroup[]
}
const ExpensesDetailedView = ({expensesGroup}: ExpensesDetailedViewProps) => {
    console.log(expensesGroup);
    return (
        <>
            {expensesGroup.map((group) => (
                <Box key={group.date}>
                    <Text mt={35}>{formatNumbersBalanceDate(group.date)}</Text>
                    <Divider/>
                        {group.expenses.map((expense) => (
                            <Box key={expense.id} mb={8} mt={2}>
                                <Flex w={'100%'} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                                    <Text>{expense.tag?.name ?? '---'}</Text>
                                    <Flex direction={'row'}>
                                        <Button
                                            colorScheme={"gray"}
                                            variant={"ghost"}
                                            size={"xs"}
                                        >
                                            <Icon color={'gray.400'} size={5} as={MaterialIcons} name={'edit'}/>
                                        </Button>
                                        <Button
                                            colorScheme={"red"}
                                            variant={"ghost"}
                                            size={"xs"}
                                        >
                                            <Icon color={'red.400'} size={5} as={MaterialIcons} name={'delete'}/>
                                        </Button>
                                    </Flex>
                                </Flex>
                                <Text fontSize={'15px'}
                                      color={getStatusColor(expense.amount)}>{currentFormat(expense.amount)}</Text>
                                <Text
                                    fontSize={'11px'}>{dayjs(expense.date).format(DATE_TIME_OUTPUT_FORMAT)}</Text>
                            </Box>
                        ))}
                </Box>
            ))}
        </>
    );
};

export default ExpensesDetailedView;