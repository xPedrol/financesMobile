import {IToastProps, useToast} from "native-base";

export default function useCustomToast({...props}:IToastProps) {
    const toastConfig = {
        duration: 3000,
        isClosable: true,
        position: "top",
    };
    const toast = useToast();
    return toast.show({...toastConfig, ...props});
}