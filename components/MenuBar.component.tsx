import {Box, Flex, Icon, useColorMode, useColorModeValue} from "native-base";
import {MaterialIcons} from "@expo/vector-icons";
import {useNavigation, useRoute} from "@react-navigation/native";
import {useEffect} from "react";

const menuItems = [
    {
        name: 'Home',
        icon: 'home',
        page: 'Home'
    },
    {
        name: 'Expenses',
        icon: 'attach-money',
        page: 'Expenses'
    },
    {
        name: 'Notes',
        icon: 'sticky-note-2',
        page: 'Notes'
    },
    {
        name: 'Tags',
        icon: 'label',
        page: 'Tags'
    }
];
export default function MenuBar() {
    const navigation = useNavigation();
    const route = useRoute();
    const goTo = (page: string) => {
        navigation.navigate(page);
    };
    const bg = useColorModeValue('white', '#1e1d1d');
    return (
        <Box bg={bg} zIndex={999} w={'100%'} h={'80px'}>
            <Flex flex={1} direction={'row'} alignItems={'stretch'} justify={'space-around'} h={'100%'}>
                {
                    menuItems.map((item, index) => {
                        return (
                            <Flex key={item.page} direction={'column'} justifyContent={'center'} alignItems={'center'} h={'100%'}>
                                <Icon color={route.name === item.page?'white':'gray.500'} onPress={() => goTo(item.page)} as={MaterialIcons} size="8" name={item.icon}/>
                            </Flex>
                        )
                    })
                }
            </Flex>
        </Box>
    );
}