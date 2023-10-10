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
} from "@chakra-ui/react";
import NextLink from "next/link";

import { useWindowWidthAndHeight } from "../../../hooks/useWindowWidthAndHeight";
import { ChainVerification, ColorModeButton, ConnectButton, NavBar } from "../../elements";

const Header = () => {
  const { isMobile } = useWindowWidthAndHeight();

  return (
    <Box borderBottom="1px" borderBottomColor="chakra-border-color">
      <ChainVerification />
      <Container maxW="container.xl" p={"10px"}>
        <Flex align="center" justify="space-between">
          <Heading cursor={"default"} size="md">
            CryptoCats - NFTs
          </Heading>

          {isMobile && (
            <Menu>
              <MenuButton as={IconButton} aria-label="Options" icon={<HamburgerIcon />} variant="outline" />
              <MenuList>
                <Link as={NextLink} href="/">
                  <MenuItem>Home</MenuItem>
                </Link>
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
