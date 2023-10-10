import { useState, useEffect } from "react";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import NextHead from "next/head";
import { WagmiConfig } from "wagmi";

import { client } from "../wagmi";
import "../styles/globals.css";

const config = {
    initialColorMode: "dark",
    useSystemColorMode: false,
};

const theme = extendTheme(config);

function App({ Component, pageProps }: AppProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    return (
        <ChakraProvider resetCSS theme={theme}>
            <WagmiConfig config={client}>
                <NextHead>
                    <title>CryptoCats</title>
                </NextHead>
                {mounted && <Component {...pageProps} />}
            </WagmiConfig>
        </ChakraProvider>
    );
}

export default App;
