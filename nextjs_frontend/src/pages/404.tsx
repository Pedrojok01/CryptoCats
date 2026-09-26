import { Center, Heading, Link, Text, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import NextLink from "next/link";

import { Default } from "../components/layouts";

const NotFoundPage: NextPage = () => {
  return (
    <Default pageName="Not found">
      <Center py={20}>
        <VStack spacing={4}>
          <Heading>404</Heading>
          <Text fontSize={18}>This page could not be found.</Text>
          <Link as={NextLink} href="/">
            Back to home
          </Link>
        </VStack>
      </Center>
    </Default>
  );
};

export default NotFoundPage;
