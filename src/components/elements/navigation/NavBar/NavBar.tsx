import { HStack } from "@chakra-ui/react";

import NAV_LINKS from "./paths";
import { NavItem } from "../NavItem";

const NavBar = () => {
    return (
        <HStack gap={"15px"}>
            {NAV_LINKS.map((link) => (
                <NavItem key={`link-${link.label}`} {...link} />
            ))}
        </HStack>
    );
};

export default NavBar;
