import { createConfig, http } from "wagmi";
import { goerli, mainnet } from "wagmi/chains";
import { walletConnect, coinbaseWallet, injected } from "wagmi/connectors";

import { isProdEnv } from "./data/constant";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!projectId) {
  throw Error("WalletConnect project ID missing.");
}

export const client = createConfig({
  chains: isProdEnv ? [mainnet] : [goerli],
  connectors: [
    injected({ target: "metaMask" }),
    coinbaseWallet({
      appName: "CryptoCats",
    }),
    walletConnect({
      projectId: projectId,
      metadata: {
        name: "CryptoCats",
        description: "Crypto Cats collectible - Create, Breed & Sell your CryptoCats!",
        url: "https://crypto-cats.netlify.app/",
        icons: ["https://crypto-cats.netlify.app/favicon.ico"],
      },
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [goerli.id]: http(),
  },
  ssr: true,
});
