import {Box, Flex, Icon, Text, useColorMode, useColorModeValue} from "native-base";
import {FontAwesome5, MaterialIcons} from "@expo/vector-icons";

export default function MenuBar({navigation}:any) {
    const {
        colorMode,
        toggleColorMode,
    } = useColorMode();
    const goTo = (page:string) => {
        navigation.navigate(page);
    }
    const bg = useColorModeValue('white', '#1e1d1d');
    const btnHeaderColor = useColorModeValue('gray.900', 'gray.100');
    return (
        <Box bg={bg} zIndex={999} w={'100%'} h={'80px'}>
            <Flex flex={1} direction={'row'} alignItems={'center'} justify={'space-around'} h={'100%'}>
                <Flex direction={'column'} alignItems={'center'}>
                    <Icon onPress={()=>goTo('Home')} as={MaterialIcons } size="8" name="home" />
                    {/*<Text fontSize={'xs'}>Expenses</Text>*/}
                </Flex>
                    <Flex direction={'column'} alignItems={'center'}>
                        <Icon onPress={()=>goTo('Expenses')} as={MaterialIcons } size="8" name="attach-money" />
                        {/*<Text fontSize={'xs'}>Expenses</Text>*/}
                    </Flex>
                <Flex direction={'column'} alignItems={'center'}>
                    <Icon onPress={()=>goTo('Notes')} as={MaterialIcons} name="sticky-note-2" size="8"/>
                    {/*<Text fontSize={'xs'}>Notes</Text>*/}
                </Flex>
                <Flex direction={'column'} alignItems={'center'}>
                    <Icon onPress={()=>goTo('Tags')} as={MaterialIcons} name="label" size="8"/>
                    {/*<Text fontSize={'xs'}>Tags</Text>*/}
                </Flex>
            </Flex>
        </Box>
    )
}