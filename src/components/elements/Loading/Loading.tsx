import { FC } from "react";

import { Center, Spinner } from "@chakra-ui/react";

const Loading: FC<any> = ({ props }) => {
    return (
        <>
            {!props && (
                <Center height={"50%"} padding={10}>
                    <Spinner size="lg" speed="0.65s" />
                </Center>
            )}{" "}
        </>
    );
};

export default Loading;
