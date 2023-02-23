import {Box, ScrollView, useColorModeValue} from "native-base";
import MenuBar from "./MenuBar.component";
import {useAuth} from "../hooks/useAuth";

export default function Layout({children ,header, ...props}) {
    const bg = useColorModeValue("warmGray.50", "#111111");
    const {getToken} = useAuth()
    return (
        <Box bg={bg} {...props} flex={1}>
            <ScrollView>
                <Box>
                    {header}
                </Box>
                <Box h={'100%'} mx="4" mt={'30px'}>
                    {children}
                </Box>
            </ScrollView>
            {getToken() && <MenuBar/>}
        </Box>
    );
}