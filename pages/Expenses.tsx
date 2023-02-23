import {Box, Icon, VStack} from "native-base";
import Layout from "../components/Layout";
import Header from "../components/Header";
import {useEffect, useState} from "react";
import {apiExpenseCount, apiExpenses} from "../services/expense.service";
import IExpenseStatistic from "../models/ExpenseStatistic.model";
import {apiExpensesStatistic} from "../services/expenseStatistic.service";
import dayjs from "dayjs";
import StatCard from "../components/StatCard.component";
import currentFormat from "../utils/currentFormat.utils";
import {MaterialIcons} from "@expo/vector-icons";
import balance from "../utils/numbersBalance.utils";
import {IExpensesGroup} from "../models/ExpensesGroup.model";
import {generateExpensesGroup} from "../utils/groupBy.utils";
import ExpensesDetailedView from "../components/ExpensesDetailedView.component";

export default function Expenses({navigation}) {
    const [expensesGroup, setExpensesGroup] = useState<IExpensesGroup[] | null>(null);
    const [expensesCount, setExpensesCount] = useState<number>(0);
    const [expensesStatistic, setExpensesStatistic] = useState<IExpenseStatistic | null>(null);
    const [monthOptions, setMonthOptions] = useState<string[]>([]);
    const [page, setPage] = useState<number>(1);
    const [monthFilter,setMonthFilter] = useState<string | null>(null)
    useEffect(() => {
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
        if(!monthFilter) {
            setMonthFilter(`${dayjs().month() + 1}-01-${dayjs().year()}`);
        }
        setMonthOptions(newOptions);
        apiExpenses().then((res) => {
            setExpensesGroup(generateExpensesGroup(res.data));
        });
        apiExpenseCount().then((res) => {
            setExpensesCount(res.data);
        });
        apiExpensesStatistic({
            date: monthFilter
        }).then((res) => {
            setExpensesStatistic(res.data);
        });
    }, []);
    return (
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
                {expensesGroup && (
                    <ExpensesDetailedView
                        expensesGroup={expensesGroup}/>
                )}
            </Box>
        </Layout>
    );
}