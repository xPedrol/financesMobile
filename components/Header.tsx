import {Button, Flex, Text, useColorMode, useColorModeValue} from "native-base";
import {useRef} from "react";
import {StatusBar} from "react-native";

type HeaderProps = {
    title: string
    goBack?: boolean
    goBackTo?: string
};
const Header = ({title}: HeaderProps) => {
    const {
        colorMode,
        toggleColorMode,
    } = useColorMode();
    const iconColor = useColorModeValue('gray.600', 'gray.400');
    const bg = useColorModeValue('white', '#1e1d1d');
    const btnHeaderColor = useColorModeValue('gray.900', 'gray.100');
    const initialPadding = useRef<number>(StatusBar.currentHeight || 22);
    return (
        <>
            <StatusBar barStyle={colorMode === 'light' ? 'dark-content' : 'light-content'} backgroundColor={bg}/>
            <Flex bg={bg} px={'20px'} h={'80px'} direction="row" align="center" justify={'space-between'}>
                <Text fontSize={'15px'} fontFamily={'Inter900'}>{title}</Text>
                <Flex direction={'row'}>
                    {/*<Icon mr={'30px'} as={Ionicons} name={colorMode==='light'?'ios-sunny-outline':'ios-moon-outline'} size="3xl" color={iconColor} onPress={toggleColorMode}/>*/}
                    {/*<Icon as={AntDesign} name="user" size="3xl" color={iconColor}/>*/}
                    <Button mr={'7px'} size={'sm'} colorScheme={'text'} variant={'outline'} onPress={toggleColorMode}
                            _text={{
                                color: btnHeaderColor,
                            }}
                            borderColor={btnHeaderColor}>Theme</Button>
                    <Button size={'sm'} colorScheme={'text'} variant={'outline'}
                            onPress={() => console.log("hello world")} _text={{
                        color: btnHeaderColor,
                    }} borderColor={btnHeaderColor}>User</Button>
                </Flex>
            </Flex>
        </>
    );
};

export default Header;