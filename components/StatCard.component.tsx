import {Box, Flex, Heading, Stack, Text, useColorModeValue} from "native-base";
import {getStatusColor} from "../utils/handleColor.utils";

type Props = {
    title: string;
    stat: string | number | undefined;
    status: 'gain' | 'loss' | 'note' | 'balance';
    icon: any;
}
export default function StatCard({title, stat, status, icon}: Props) {
    return (
        <Flex direction={'row'} justify={'space-between'} alignItems={'center'} rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" w={'100%'} _dark={{
            borderColor: "coolGray.600",
        }} _web={{
            shadow: 2,
            borderWidth: 0
        }} _light={{
            backgroundColor: "gray.50"
        }}>
            <Stack p="4">
                <Heading size="sm" ml="-1">
                    {title}
                </Heading>
                <Text color={getStatusColor(status)} fontFamily={'Inter800'}>
                    {stat ?? '---'}
                </Text>
            </Stack>
            <Box mr={'10px'}
                my={'auto'}
                color={useColorModeValue('gray.800', 'gray.200')}
                alignContent={'center'}>
                {icon && icon}
            </Box>
        </Flex>
    );
}