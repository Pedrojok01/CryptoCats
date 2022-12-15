import { Box, Button, Heading, VStack, Link } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { useAccount } from "wagmi";

import homeCatsGroup from "../../../../public/homeCatsGroup.png";
import { useWindowWidthAndHeight } from "../../../hooks/useWindowWidthAndHeight";
import { ConnectButton } from "../../elements";

const Home = () => {
    const { isConnected } = useAccount();
    const { isMobile } = useWindowWidthAndHeight();
    return (
        <VStack w={"full"}>
            <Image
                src={homeCatsGroup.src}
                width={!isMobile ? 800 : 350}
                height={isMobile ? 350 : 150}
                alt="Cute CryptoCats"
            />
            <Box bgColor={"rgba(161, 36, 7, 0.8)"} w="55%" minW={280} p={5} borderRadius="10px" textAlign="center">
                <Heading size="lg" p={3} marginBottom={6} textAlign="center">
                    Collect and breed...
                    <br />
                    ...some funny looking cats!
                </Heading>
                {isConnected ? (
                    <Link as={NextLink} href="/marketplace">
                        <Button>Get Your Own Cat Now</Button>
                    </Link>
                ) : (
                    <ConnectButton />
                )}
            </Box>
        </VStack>
    );
};

export default Home;
