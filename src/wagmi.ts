import { configureChains, createConfig } from "wagmi";
import { goerli, mainnet } from "wagmi/chains";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { isProdEnv } from "./data/constant";

const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!alchemyApiKey) {
    throw Error("Alchemy API key missing.");
}

if (!projectId) {
    throw Error("WalletConnect project ID missing.");
}

const { chains, publicClient } = configureChains(
    [goerli, mainnet, ...(isProdEnv ? [goerli] : [mainnet])],
    [alchemyProvider({ apiKey: alchemyApiKey }), publicProvider()]
);

export const client = createConfig({
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
            options: { projectId: projectId },
        }),
    ],
    publicClient,
});
