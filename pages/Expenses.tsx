import {Box, Fab, Icon, Spinner, useColorModeValue, VStack} from "native-base";
import Layout from "../components/Layout";
import Header from "../components/Header";
import {useEffect, useState} from "react";
import {apiExpenseCount, apiExpenses} from "../services/expense.service";
import IExpenseStatistic from "../models/ExpenseStatistic.model";
import {apiExpensesStatistic} from "../services/expenseStatistic.service";
import dayjs from "dayjs";
import StatCard from "../components/StatCard.component";
import currentFormat from "../utils/currentFormat.utils";
import {AntDesign, MaterialIcons} from "@expo/vector-icons";
import balance from "../utils/numbersBalance.utils";
import {IExpensesGroup} from "../models/ExpensesGroup.model";
import {generateExpensesGroup} from "../utils/groupBy.utils";
import ExpensesDetailedView from "../components/ExpensesDetailedView.component";
import {Text} from "react-native";
import LoadingRequest from "../components/LoadingRequest.component";

export default function Expenses({navigation, route}) {
    const [expensesGroup, setExpensesGroup] = useState<IExpensesGroup[] | null>(null);
    const [expensesCount, setExpensesCount] = useState<number>(0);
    const [expensesStatistic, setExpensesStatistic] = useState<IExpenseStatistic | null>(null);
    const [monthOptions, setMonthOptions] = useState<string[]>([]);
    const [monthFilter, setMonthFilter] = useState<string | null>(null);
    const [expenseLoading, setExpenseLoading] = useState<boolean>(true)
    useEffect(() => {
        setExpenseLoading(true)
        const year = dayjs().year();
        const newOptions = [];
        if (monthOptions.length === 0) {
            for (let i = 0; i < 12; i++) {
                const month = String(i + 1).padStart(2, "0");
                newOptions.push({
                    label: `${month}/${year}`,
                    value: `${i + 1}-01-${year}`
                });
            }
        } else {
            newOptions.push(...monthOptions);
        }
        if (!monthFilter) {
            setMonthFilter(`${dayjs().month() + 1}-01-${dayjs().year()}`);
        }
        setMonthOptions(newOptions);
        apiExpenses({
            page: 0,
            perPage: 1000
        }).then((res) => {
            console.log(res)
            setExpensesGroup(generateExpensesGroup(res.data));
        }).finally(() => setExpenseLoading(false));
        apiExpenseCount().then((res) => {
            setExpensesCount(res.data);
        });
        apiExpensesStatistic({
            date: monthFilter
        }).then((res) => {
            setExpensesStatistic(res.data);
        });
    }, [route]);
    return (
        <>
            <Layout header={<Header title={'Expenses'}/>}>
                <Box>
                    {expensesStatistic && (
                        <VStack alignItems={'center'} space={'md'}>
                            <StatCard stat={currentFormat(expensesStatistic.gains)} status={'gain'}
                                      title={'Gains'}
                                      icon={<Icon as={MaterialIcons} name="attach-money" size="3xl"/>}/>
                            <StatCard stat={currentFormat(expensesStatistic.losses)} status={'loss'}
                                      title={'Losses'}
                                      icon={<Icon as={MaterialIcons} name="money-off" size="3xl"/>}/>
                            <StatCard stat={currentFormat(balance([expensesStatistic.gains, expensesStatistic.losses]))}
                                      status={balance([expensesStatistic.gains, expensesStatistic.losses]) < 0 ? 'loss' : 'gain'}
                                      title={'Balance'}
                                      icon={<Icon as={MaterialIcons} name="account-balance" size="3xl"/>}/>
                        </VStack>
                    )}
                    {expenseLoading ? <LoadingRequest props={{mt: 10}} noTitle={true}/> :
                        expensesGroup ?
                            <ExpensesDetailedView
                                expensesGroup={expensesGroup}/>
                            :
                            <Text>Not found</Text>
                    }
                </Box>
            </Layout>
            <Fab renderInPortal={false} shadow={2} size="sm" bottom={100} variant={'solid'} colorScheme={'gray'}
                 onPress={() => navigation.navigate('Expense', {
                     id: null
                 })}
                 icon={<Icon color="white" as={AntDesign} name="plus" size="sm"/>}/>
        </>
    );
}