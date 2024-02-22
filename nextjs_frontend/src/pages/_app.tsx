import { useState, useEffect } from "react";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import NextHead from "next/head";
import { WagmiProvider } from "wagmi";

import { UserCatsProvider } from "@/context/UserCatsProvider";

import { client } from "../wagmi";

import "../styles/globals.css";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme(config);

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);
  const queryClient = new QueryClient();

  useEffect(() => setMounted(true), []);

  return (
    <ChakraProvider resetCSS theme={theme}>
      <WagmiProvider config={client}>
        <QueryClientProvider client={queryClient}>
          <NextHead>
            <title>CryptoCats</title>
          </NextHead>
          {mounted && (
            <UserCatsProvider>
              <Component {...pageProps} />
            </UserCatsProvider>
          )}
        </QueryClientProvider>
      </WagmiProvider>
    </ChakraProvider>
  );
}

export default App;
