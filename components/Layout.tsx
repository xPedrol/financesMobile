import {Box, useColorModeValue} from "native-base";
import Header from "./Header";

export default function Layout({children}) {
    const bg = useColorModeValue("warmGray.50", "#111111");

    return (
        <Box bg={bg}>
            <Header title={'Wise Ways'}/>
            <Box h={'100%'} mt={'50px'} mx="4">
                {children}
            </Box>
        </Box>
    );
}