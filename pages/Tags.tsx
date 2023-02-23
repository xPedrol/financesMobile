import Layout from "../components/Layout";
import Header from "../components/Header";
import {Box, Text} from "native-base";

export default function Tags({navigation}){
    return (
        <Layout header={<Header title={'Tags'}/>}>
            <Box>
                <Text>Tags</Text>
            </Box>
        </Layout>
    )
}