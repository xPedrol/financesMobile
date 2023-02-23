import Layout from "../components/Layout";
import Header from "../components/Header";
import {Box, Text} from "native-base";

export default function Tags({navigation}){
    return (
        <Layout navigation={navigation} header={<Header title={'Tags'} navigation={navigation}/>}>
            <Box>
                <Text>Tags</Text>
            </Box>
        </Layout>
    )
}