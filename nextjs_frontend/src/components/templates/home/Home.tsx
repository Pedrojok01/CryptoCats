import { Box, Button, Heading, VStack, Link } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { useAccount } from "wagmi";

import { ConnectButton } from "@/components/elements";
import { useWindowWidthAndHeight } from "@/hooks/useWindowWidthAndHeight";
import homeCatsGroup from "public/img/homeCatsGroup.png";

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
      <Box
        bgColor={"rgba(161, 36, 7, 0.85)"}
        w="55%"
        minW={300}
        p={5}
        borderRadius="10px"
        textAlign="center"
        className="box-shadow"
      >
        <Heading size="lg" p={3} marginBottom={6} textAlign="center" className="text-shadow">
          Collect and breed...
          <br />
          ...some funny looking cats!
        </Heading>
        {isConnected ? (
          <Link as={NextLink} href="/marketplace">
            <Button className="box-shadow">Get Your Own Cat Now</Button>
          </Link>
        ) : (
          <ConnectButton />
        )}
      </Box>
    </VStack>
  );
};

export default Home;
