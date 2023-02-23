import {Box, Text} from "native-base";
import Layout from "../components/Layout";
import Header from "../components/Header";

export default function Expenses({navigation}){
    return (
        <Layout navigation={navigation} header={<Header title={'Expenses'} navigation={navigation}/>}>
            <Box>
                <Text>Expenses</Text>
            </Box>
        </Layout>
    )
}