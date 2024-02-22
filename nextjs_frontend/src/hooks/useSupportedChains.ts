import { useMemo } from "react";

import { useAccount } from "wagmi";

import { isProdEnv, SUPPORTED_CHAIN } from "../data/constant";

export function useSuportedChains() {
  const { chain } = useAccount();

  return useMemo(() => {
    if (chain) {
      if ((isProdEnv && chain.id === SUPPORTED_CHAIN.mainnet) || (!isProdEnv && chain.id === SUPPORTED_CHAIN.testnet)) {
        return true;
      } else return false;
    }
    return false;
  }, [chain]);
}
