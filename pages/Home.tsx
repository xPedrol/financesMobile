import Layout from "../components/Layout";
import Header from "../components/Header";
import {Box, Icon, ScrollView, Text, useColorModeValue, View, VStack} from "native-base";
import StatCard from "../components/StatCard.component";
import currentFormat from "../utils/currentFormat.utils";
import {useEffect, useState} from "react";
import {apiExpensesStatistic, apiMonthsBalance} from "../services/expenseStatistic.service";
import balance from "../utils/numbersBalance.utils";
import {MaterialIcons} from "@expo/vector-icons";
import IExpenseStatistic from "../models/ExpenseStatistic.model";
import {apiNotesCount} from "../services/note.service";
import {
    VictoryAxis,
    VictoryBar,
    VictoryChart,
    VictoryGroup,
    VictoryLabel,
    VictoryStack,
    VictoryTheme
} from "victory-native";
import {months} from "../utils/formatDate.utils";

const NegativeAwareTickLabel = props => {
    const {
        datum, // Bar's specific data object
        y, // Calculated y data value IN SVG SPACE (from top-right corner)
        dy, // Distance from data's y value to label's y value
        scale, // Function that converts from data-space to svg-space
        ...rest // Other props passed to label from Bar
    } = props;

    return (
        <VictoryLabel
            datum={datum} // Shove `datum` back into label. We destructured it from `props` so we'd have it available for a future step
            y={scale.y(0)} // Set y to the svg-space location of the axis
            dy={20 * Math.sign(datum.value)} // Change direction of offset based on the datum value
            {...rest} // Shove the rest of the props into the label
        />
    );
};
export default function Home({navigation}) {
    const bgBar = useColorModeValue("#0891b2", "#0891b2")
    const textBar = useColorModeValue("black", "white")
    const victoryBarStyle =  {
        data: {
            color:textBar,
            fill: bgBar,
            fillOpacity: 1,
            strokeWidth: 3
        },
        labels: {
            fontSize: 12,
            padding: 15,
            fill: textBar
        }
    };
    const [expensesStatistic, setExpensesStatistic] = useState<IExpenseStatistic | null>(null);
    const [noteCount, setNoteCount] = useState<number>(0);
    const [monthsBalance, setMonthsBalance] = useState<any | null>(null);
    useEffect(() => {
        apiExpensesStatistic(
            {
                unit: "year"
            }
        ).then((res) => {
            setExpensesStatistic(res.data);
        });

        apiNotesCount().then((res) => {
            setNoteCount(res.data);
        });

        apiMonthsBalance().then((res) => {
            const aux: { month: string, value: number }[] = [];
            const {data} = res;
            for (let i = 0; i < 12; i++) {
                if (data && data[i]) {
                    aux.push({
                        month: months[i],
                        value: data[i].amount
                    });
                } else {
                    aux.push({
                        month: months[i],
                        value: 0
                    });
                }
            }
            setMonthsBalance(aux);
        });
    }, []);
    return (
        <Layout header={<Header title={'Home'}/>}>
            <Box>
                {expensesStatistic &&
                    <>
                        <Text mb={'20px'}>Valores refentes ao ano atual</Text>
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
                            <StatCard stat={noteCount} status={'note'}
                                      title={'Notes'}
                                      icon={<Icon as={MaterialIcons} name="sticky-note-2" size="3xl"/>}/>
                        </VStack>
                    </>
                }
                {monthsBalance &&
                    <>
                        <Text my={'20px'}>Gastos referentes ao ano atual</Text>
                        <ScrollView horizontal={true}>
                            <View>
                                <VictoryChart width={1000}>
                                    <VictoryGroup data={monthsBalance} x="month" y="value">
                                        <VictoryBar style={victoryBarStyle} labels={({ datum }) => `${currentFormat(datum.value)}`} x="month" y="value"/>
                                        <VictoryBar x="month" y="value"
                                                    labels={({ datum }) => `${datum.month}`}
                                                    style={victoryBarStyle}
                                                    labelComponent={<NegativeAwareTickLabel />}
                                        />
                                    </VictoryGroup>

                                    <VictoryAxis
                                        style={{
                                            tickLabels: { fill: "none" }
                                        }}
                                    />
                                </VictoryChart>
                                {/*<VictoryChart  animate={{*/}
                                {/*    duration: 500,*/}
                                {/*    onLoad: {duration: 1000}*/}
                                {/*}} width={1000}>*/}
                                {/*    <VictoryBar style={{*/}
                                {/*        data: {*/}
                                {/*            color:textBar,*/}
                                {/*            fill: bgBar,*/}
                                {/*            fillOpacity: 1,*/}
                                {/*            strokeWidth: 3*/}
                                {/*        },*/}
                                {/*        labels: {*/}
                                {/*            fontSize: 12,*/}
                                {/*            fill: textBar*/}
                                {/*        }*/}
                                {/*    }} labels={({ datum }) => `${datum.value}`} data={monthsBalance} x="month" y="value"/>*/}
                                {/*    <VictoryAxis*/}
                                {/*        style={{*/}
                                {/*            axis: { stroke: textBar },*/}
                                {/*            axisLabel: { fontSize: 18, padding: 30, fill: textBar },*/}
                                {/*            ticks: { stroke: textBar, size: 5, },*/}
                                {/*            tickLabels: { fontSize: 12, padding: 5, fill: textBar }*/}
                                {/*        }} />*/}
                                {/*    <VictoryAxis style={{*/}
                                {/*        axis: { stroke: "transparent" },*/}
                                {/*        axisLabel: { fontSize: 18, padding: 30, fill: textBar },*/}
                                {/*        tickLabels: { fontSize: 12, fill: textBar }*/}
                                {/*    }}  dependentAxis/>*/}
                                {/*</VictoryChart>*/}
                            </View>
                        </ScrollView>
                    </>
                }
            </Box>
        </Layout>
    );
}