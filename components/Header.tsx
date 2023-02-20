import {Flex, Icon, Text, useColorMode} from "native-base";
import {AntDesign} from "@expo/vector-icons";
import {useRef} from "react";
import {StatusBar} from "react-native";

type HeaderProps = {
    title: string
    goBack?: boolean
    goBackTo?: string
};
const Header = ({title}:HeaderProps) => {
    const {
        toggleColorMode
    } = useColorMode();
    const initialPadding =useRef<number>(StatusBar.currentHeight+5 || 22);
    return (
        <>
            <Flex px={'15px'} pb={'17px'} paddingTop={`${initialPadding.current}px`} direction="row" align="center" justify={'space-between'} bg={'#111111'}>
                <Text fontSize={'15px'} fontFamily={'Inter900'}>{title}</Text>
                <Icon as={AntDesign} name="user" size="lg" color={'gray.200'}/>
            </Flex>
        </>
    );
}

export default Header;