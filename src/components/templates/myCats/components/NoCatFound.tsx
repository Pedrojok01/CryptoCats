import { FC } from "react";

import { Alert, AlertDescription, AlertIcon, AlertTitle, Center } from "@chakra-ui/react";

const NoCatFound: FC = () => {
    return (
        <Center height={"50%"} padding={10} w="40%" m="auto" borderRadius={3}>
            <Alert
                status="info"
                variant="top-accent"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
            >
                <AlertIcon boxSize="40px" mr={0} />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                    No Cats Found!
                </AlertTitle>

                <AlertDescription maxWidth="sm">
                    Mint one in the factory, or buy some in the marketplace!
                </AlertDescription>
            </Alert>
        </Center>
    );
};

export default NoCatFound;
