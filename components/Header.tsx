import {Actionsheet, Box, Button, Flex, Icon, Text, useColorMode, useColorModeValue, useDisclose} from "native-base";
import {useRef} from "react";
import {StatusBar} from "react-native";
import {useAuth} from "../hooks/useAuth";
import {MaterialIcons} from "@expo/vector-icons";

type HeaderProps = {
    title: string
    navigation?: any
    goBack?: boolean
    goBackTo?: string
};
const Header = ({title,navigation}: HeaderProps) => {
    const {
        colorMode,
        toggleColorMode,
    } = useColorMode();
    const iconColor = useColorModeValue('gray.600', 'gray.400');
    const bg = useColorModeValue('white', '#1e1d1d');
    const btnHeaderColor = useColorModeValue('gray.900', 'gray.100');
    const initialPadding = useRef<number>(StatusBar.currentHeight || 22);
    const {getToken,signOut:authSignOut} = useAuth();
    const singOut = async () => {
        console.log('singOut','navigation')
        if(navigation){
            await authSignOut();
            navigation.navigate('Login');
        }
    }
    const onActionSelect = (index: number) => {
        if (index === 0) {
            navigation.navigate('Profile');
        } else if (index === 1) {
            singOut();
        }
    }
    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclose();
    console.log('getToken()',getToken())
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
                    {getToken() &&
                        <Button size={'sm'} colorScheme={'text'} variant={'outline'}
                                onPress={onOpen} _text={{
                            color: btnHeaderColor,
                        }} borderColor={btnHeaderColor}>User</Button>
                    }
                </Flex>
            </Flex>
            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>
                    <Actionsheet.Item startIcon={<Icon as={MaterialIcons} size="6" name="account-circle" />}>
                        Profile
                    </Actionsheet.Item>
                    <Actionsheet.Item onPress={singOut}  startIcon={<Icon as={MaterialIcons} size="6" name="logout" />} >
                        Logout
                    </Actionsheet.Item>
                </Actionsheet.Content>
            </Actionsheet>
        </>
    );
};

export default Header;