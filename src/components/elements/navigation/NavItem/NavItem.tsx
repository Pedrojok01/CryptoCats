import { FC } from "react";

import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Link, Popover, PopoverContent, PopoverTrigger, Stack, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";

import { SubNav } from "../SubNav";
import { ISubNav } from "../SubNav/SubNav";

const NavItem: FC<ISubNav> = ({ label, children, href }) => {
    const linkColor = useColorModeValue("gray.600", "gray.400");
    const linkActiveColor = useColorModeValue("gray.800", "white");
    const router = useRouter();
    const isCurrentPath = router.asPath === href || (href !== "/" && router.pathname.startsWith(href || ""));

    return (
        <>
            {!children ? (
                <Link
                    color={isCurrentPath ? linkActiveColor : linkColor}
                    as={NextLink}
                    href={href || "/"}
                    _hover={{
                        textDecoration: "none",
                    }}
                >
                    {label}
                </Link>
            ) : (
                <Box>
                    <Popover trigger={"hover"} placement={"bottom-start"}>
                        <PopoverTrigger>
                            <Box
                                color={isCurrentPath ? linkActiveColor : linkColor}
                                _hover={{
                                    textDecoration: "none",
                                    color: linkActiveColor,
                                }}
                                cursor="pointer"
                            >
                                <>
                                    {label} <ChevronDownIcon />
                                </>
                            </Box>
                        </PopoverTrigger>

                        <PopoverContent border={0} boxShadow={"xl"} p={4} rounded={"xl"} minW={"sm"}>
                            <Stack>
                                {children.map((child) => (
                                    <SubNav key={child.label} {...child} />
                                ))}
                            </Stack>
                        </PopoverContent>
                    </Popover>
                </Box>
            )}
        </>
    );
};

export default NavItem;
