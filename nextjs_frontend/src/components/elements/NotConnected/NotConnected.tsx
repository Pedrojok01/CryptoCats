import type { FC } from "react";

import { Alert, AlertIcon, Box, Center, Text, VStack } from "@chakra-ui/react";

import { useWindowWidthAndHeight } from "@/hooks";

import { ConnectButton } from "../ConnectButton";

const NotConnected: FC = () => {
  const { isMobile } = useWindowWidthAndHeight();
  return (
    <Box>
      <Center>
        <Alert
          status="info"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height={isMobile ? "260px" : "200px"}
          w={isMobile ? "95%" : "40%"}
          borderRadius="10px"
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
