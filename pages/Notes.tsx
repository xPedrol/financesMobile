import Layout from "../components/Layout";
import Header from "../components/Header";
import {Box, Text} from "native-base";

export default function Notes({navigation}){
    return (
        <Layout header={<Header title={'Notes'}/>}>
            <Box>
                <Text>Notes</Text>
            </Box>
        </Layout>
    )
}