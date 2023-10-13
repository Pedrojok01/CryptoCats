import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Link, Text, VStack } from "@chakra-ui/react";

const links = {
  github: "https://github.com/Pedrojok01/CryptoCats/",
};

const Footer = () => {
  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} w="100vw" h={"56px"}>
      <VStack fontSize={"0.9rem"} gap={"0.05rem"}>
        <Text>
          Designed by{" "}
          <Link href={links.github} isExternal alignItems={"center"}>
            <b>Pedrojok01</b> <ExternalLinkIcon mb={1} />
          </Link>
        </Text>
        <Text>Don&apos;t forget to leave a ⭐️ if you like it!</Text>
      </VStack>
    </Box>
  );
};

export default Footer;
