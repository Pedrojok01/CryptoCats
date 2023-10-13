import type { FC, ReactNode } from "react";

import { Box, Container } from "@chakra-ui/react";
import Head from "next/head";

import banner from "public/img/banner.png";

import { Footer, Header } from "..";

const Default: FC<{ children: ReactNode; pageName: string }> = ({ children, pageName }) => (
  <Box h={"100vh"} overflow="hidden">
    <Head>
      <title>{`${pageName} | CryptoCats`}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Header />

    <Container
      bgImage={`url(${banner.src})`}
      bgRepeat="no-repeat"
      bgSize="100% 60%"
      bgPosition="top"
      maxW="container.xlg"
      h={`calc(100vh - 56px - 56px)`}
      p={30}
      overflow={"auto"}
      as="main"
    >
      {children}
    </Container>
    <Footer />
  </Box>
);

export default Default;
