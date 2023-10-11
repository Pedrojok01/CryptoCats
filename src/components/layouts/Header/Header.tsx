import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Link,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";

import { ChainVerification, ColorModeButton, ConnectButton, NavBar } from "@/components/elements";
import { useWindowWidthAndHeight } from "@/hooks/useWindowWidthAndHeight";
import logo from "public/img/cryptocats_logo_transparent.png";

const Header = () => {
  const { isMobile } = useWindowWidthAndHeight();

  return (
    <Box borderBottom="1px" borderBottomColor="chakra-border-color">
      <ChainVerification />
      <Container maxW="container.xl" p={"10px"}>
        <Flex align="center" justify="space-between">
          <Heading cursor={"default"} size="md">
            <Link as={NextLink} href="/" style={{ textDecoration: "none" }}>
              <HStack>
                <Image src={logo.src} alt="logo" width={40} height={40} />
                {!isMobile && <Text>CryptoCats</Text>}
              </HStack>
            </Link>
          </Heading>

          {isMobile && (
            <Menu>
              <MenuButton as={IconButton} aria-label="Options" icon={<HamburgerIcon />} variant="outline" />
              <MenuList>
                <Link as={NextLink} href="/myCats/show">
                  <MenuItem>My Cats - Show</MenuItem>
                </Link>
                <Link as={NextLink} href="/myCats/breed">
                  <MenuItem>My Cats - Breed</MenuItem>
                </Link>
                <Link as={NextLink} href="/myCats/sell">
                  <MenuItem>My Cats - Sell</MenuItem>
                </Link>
                <Link as={NextLink} href="/marketplace">
                  <MenuItem>Marketplace</MenuItem>
                </Link>
                <Link as={NextLink} href="/factory">
                  <MenuItem>Factory</MenuItem>
                </Link>
                <HStack gap={10} justify="center" marginBlock={3}>
                  <>
                    <ConnectButton /> <ColorModeButton />
                  </>
                </HStack>
              </MenuList>
            </Menu>
          )}

          {!isMobile && (
            <>
              <NavBar />
              <HStack gap={"10px"}>
                <ConnectButton />
                <ColorModeButton />
              </HStack>
            </>
          )}
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
