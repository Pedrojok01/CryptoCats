import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Link, Text } from "@chakra-ui/react";

const links = {
  github: "https://github.com/Pedrojok01/CryptoCats/",
};

const Footer = () => {
  return (
    <Box pos={"absolute"} bottom={0} textAlign={"center"} w="full" p={4} mb={0}>
      <Text>
        Designed by{" "}
        <Link href={links.github} isExternal alignItems={"center"}>
          <b>Pedrojok01</b> <ExternalLinkIcon />
        </Link>
      </Text>
      <Text>Don&apos;t forget to leave a ⭐️ if you like it!</Text>
    </Box>
  );
};

export default Footer;
