import {Box, ScrollView, useColorModeValue} from "native-base";

export default function Layout({children, header, ...props}) {
    const bg = useColorModeValue("warmGray.50", "#111111");

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
        </Box>
    );
}