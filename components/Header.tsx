import {Actionsheet, Button, Flex, Icon, Text, useColorMode, useColorModeValue, useDisclose} from "native-base";
import {StatusBar} from "react-native";
import {useAuth} from "../hooks/useAuth";
import {MaterialIcons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {ReactNode} from "react";
type BackButtonProps = {
    goBackTo: string
}
const BackButton = ({goBackTo}:BackButtonProps) => {
    const btnHeaderColor = useColorModeValue('gray.900', 'gray.100');

    const navigation = useNavigation();
    return (
        <Button
            onPress={() => navigation.goBack()}
            variant="ghost"
            _text={{
                color: btnHeaderColor,
            }}
            size={'lg'}
            borderColor={btnHeaderColor}
            startIcon={<Icon as={MaterialIcons} color={btnHeaderColor} name="arrow-back"/>}
        >
        </Button>
    );
};
type HeaderProps = {
    title: string
    goBackTo?: string
    showMenuButtons?: boolean
    backButton?: ReactNode
};
const Header = ({title, goBackTo, showMenuButtons = true}: HeaderProps) => {
    const {
        colorMode,
        toggleColorMode,
    } = useColorMode();
    const navigation = useNavigation();
    const bg = useColorModeValue('white', '#1e1d1d');
    const btnHeaderColor = useColorModeValue('gray.900', 'gray.100');
    const {getToken, signOut: authSignOut} = useAuth();
    const singOut = async () => {
        if (navigation) {
            await authSignOut();
            navigation.navigate('Login');
        }
    };
    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclose();
    return (
        <>
            <StatusBar barStyle={colorMode === 'light' ? 'dark-content' : 'light-content'} backgroundColor={bg}/>
            <Flex bg={bg} px={'20px'} h={'80px'} direction="row" align="center" justify={'space-between'}>
                <Flex direction={'row'} alignItems={'center'}>
                    {goBackTo ?
                        <>
                            <BackButton goBackTo={goBackTo}/>
                            <Text fontSize={'15px'} fontFamily={'Inter900'}
                                  onPress={() => navigation.goBack()}>{title}</Text>
                        </>
                        :
                        <Text fontSize={'15px'} fontFamily={'Inter900'}>{title}</Text>
                    }

                </Flex>
                {showMenuButtons &&
                    <Flex direction={'row'}>
                        <Button mr={'7px'} size={'sm'} colorScheme={'text'} variant={'outline'}
                                onPress={toggleColorMode}
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
                }

            </Flex>
            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>
                    <Actionsheet.Item startIcon={<Icon as={MaterialIcons} size="6" name="account-circle"/>}>
                        Profile
                    </Actionsheet.Item>
                    <Actionsheet.Item onPress={singOut} startIcon={<Icon as={MaterialIcons} size="6" name="logout"/>}>
                        Logout
                    </Actionsheet.Item>
                </Actionsheet.Content>
            </Actionsheet>
        </>
    );
};

export default Header;