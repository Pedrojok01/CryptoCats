import { type FC, type ReactNode } from "react";

import { Box, Heading } from "@chakra-ui/react";

type TabHeaderProps = {
  title: string;
  description: ReactNode;
};

const TabHeader: FC<TabHeaderProps> = ({ title, description }) => {
  return (
    <Box textAlign="center" mb={5}>
      <Heading as="h1" size="lg" marginBottom={6}>
        {title}
      </Heading>
      <Heading as="h4" size="sm" fontWeight="normal">
        {description}
      </Heading>
    </Box>
  );
};

export default TabHeader;
