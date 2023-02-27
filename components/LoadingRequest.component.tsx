import {useEffect} from "react";
import {Heading, HStack, Spinner} from "native-base";

type Props = {
    title?: string;
    noTitle?: boolean;
    props?: any
}
export default function LoadingRequest({title, props, noTitle = false}: Props) {
    useEffect(() => {
        if (!title) title = 'Loading...'
    })
    return (
        <HStack space={2} justifyContent="center" {...props}>
            <Spinner color="gray.300" size={'lg'} accessibilityLabel="Loading"/>
            {!noTitle &&
                <Heading color="gray.300" fontSize="md">
                    Loading
                </Heading>
            }

        </HStack>
    )
}