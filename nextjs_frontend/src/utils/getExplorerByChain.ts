import { isProdEnv } from "../data/constant";

export const getExplorer = (): string | undefined => {
  if (isProdEnv) {
    return "https://etherscan.io/";
  } else return "https://sepolia.etherscan.io/";
};
