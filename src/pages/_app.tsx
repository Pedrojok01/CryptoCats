import * as React from "react";

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
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);
    return (
        <ChakraProvider resetCSS theme={theme}>
            <WagmiConfig client={client}>
                <NextHead>
                    <title>CryptoCats</title>
                </NextHead>

                {mounted && <Component {...pageProps} />}
            </WagmiConfig>
        </ChakraProvider>
    );
}

export default App;
