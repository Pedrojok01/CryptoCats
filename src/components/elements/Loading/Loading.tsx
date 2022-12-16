import { FC } from "react";

import { Center, Spinner } from "@chakra-ui/react";

import { useSuportedChains } from "../../../hooks/useSupportedChains";

const Loading: FC<any> = ({ props }) => {
    const isSupportedChain = useSuportedChains();

    return (
        <>
            {!props && isSupportedChain && (
                <Center height={"50%"} padding={10}>
                    <Spinner size="lg" speed="0.65s" />
                </Center>
            )}{" "}
        </>
    );
};

export default Loading;
