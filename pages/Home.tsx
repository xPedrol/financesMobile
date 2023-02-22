import Layout from "../components/Layout";
import Header from "../components/Header";
import {Icon, Text, VStack} from "native-base";
import StatCard from "../components/StatCard.component";
import currentFormat from "../utils/currentFormat.utils";
import {useEffect, useState} from "react";
import {apiExpensesStatistic} from "../services/expenseStatistic.service";
import balance from "../utils/numbersBalance.utils";
import {MaterialIcons} from "@expo/vector-icons";

export default function Home() {
    const [expensesStatistic, setExpensesStatistic] = useState<any>({});
    useEffect(() => {
        apiExpensesStatistic(
            {
                unit: "year"
            }
        ).then((res) => {
            setExpensesStatistic(res.data);
        });
    });
    return (
        <Layout header={<Header title={'Home'}/>}>
            <Text mb={'20px'}>Valores refentes ao ano atual</Text>
            <VStack alignItems={'center'} space={'md'}>
                <StatCard stat={currentFormat(expensesStatistic.gains)} status={'gain'}
                          title={'Gains'}
                          icon={<Icon as={MaterialIcons} name="attach-money" size="3xl"/>}/>
                <StatCard stat={currentFormat(expensesStatistic.gains)} status={'loss'}
                          title={'Losses'}
                          icon={<Icon as={MaterialIcons} name="money-off" size="3xl"/>}/>
                <StatCard stat={currentFormat(expensesStatistic.gains)}
                          status={balance([expensesStatistic.gains, expensesStatistic.losses]) < 0 ? 'loss' : 'gain'}
                          title={'Balance'}
                          icon={<Icon as={MaterialIcons} name="account-balance" size="3xl"/>}/>
                <StatCard stat={currentFormat(expensesStatistic.gains)} status={'note'}
                          title={'Notes'}
                          icon={<Icon as={MaterialIcons} name="sticky-note-2" size="3xl"/>}/>
            </VStack>
        </Layout>
    );
}