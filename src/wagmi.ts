import { configureChains, createClient } from "wagmi";
import { goerli, mainnet } from "wagmi/chains";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { alchemyProvider } from "wagmi/providers/alchemy";

import { isProdEnv } from "./data/constant";

const { chains, provider, webSocketProvider } = configureChains(
    [goerli, mainnet, ...(isProdEnv ? [goerli] : [mainnet])],
    [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY! })]
);

export const client = createClient({
    autoConnect: true,
    connectors: [
        new MetaMaskConnector({ chains }),
        new CoinbaseWalletConnector({
            chains,
            options: {
                appName: "CryptoCats",
            },
        }),
        new WalletConnectConnector({
            chains,
            options: undefined,
        }),
        // new InjectedConnector({
        //   chains,
        //   options: {
        //     name: 'Injected',
        //     shimDisconnect: true,
        //   },
        // }),
    ],
    provider,
    webSocketProvider,
});
