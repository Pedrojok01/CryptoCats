import { useMemo } from "react";

import { useNetwork } from "wagmi";

import { isProdEnv, SUPPORTED_CHAIN } from "../data/constant";

export function useSuportedChains() {
    const { chain } = useNetwork();

    return useMemo(() => {
        if (chain) {
            if (
                (isProdEnv && chain.id === SUPPORTED_CHAIN.mainnet) ||
                (!isProdEnv && chain.id === SUPPORTED_CHAIN.testnet)
            ) {
                return true;
            } else return false;
        }
        return false;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chain]);
}
