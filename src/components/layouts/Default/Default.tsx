import { FC, ReactNode } from "react";

import { Box, Container } from "@chakra-ui/react";
import Head from "next/head";
import banner from "public/banner.png";

import { Footer, Header } from "..";

const Default: FC<{ children: ReactNode; pageName: string }> = ({ children, pageName }) => (
    <Box pos="relative" h={"100vh"} overflow="hidden">
        <Head>
            <title>{`${pageName} | CryptoCats`}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Header />

        <Container
            bgImage={`url(${banner.src})`}
            bgRepeat="no-repeat"
            bgSize="100% 70%"
            bgPosition="top"
            maxW="container.xlg"
            overflow={"auto"}
            h={"83%"}
            pt={30}
            mb={75}
            as="main"
        >
            {children}
        </Container>
        <Footer />
    </Box>
);

export default Default;
