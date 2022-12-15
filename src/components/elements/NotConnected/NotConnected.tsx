import { FC } from "react";

import { Alert, AlertIcon, Box, Center, Text, VStack } from "@chakra-ui/react";

import { ConnectButton } from "../ConnectButton";

const NotConnected: FC = () => {
    return (
        <Box>
            <Center>
                <Alert
                    status="info"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    height="200px"
                    w={"40%"}
                >
                    <VStack>
                        <AlertIcon boxSize="40px" />
                        <Text fontSize={18} p={3}>
                            You need to connect a crypto wallet to perform this action.
                        </Text>

                        <ConnectButton />
                    </VStack>
                </Alert>
            </Center>
        </Box>
    );
};

export default NotConnected;
