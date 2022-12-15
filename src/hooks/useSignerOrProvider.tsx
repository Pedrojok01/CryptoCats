import { useMemo } from "react";

import { Web3Provider } from "@ethersproject/providers";
import { useSigner, useProvider } from "wagmi";

export function useSignerOrProvider() {
    const { data: signer } = useSigner();
    const provider: Web3Provider = useProvider();

    return useMemo(() => {
        if (signer) {
            return signer;
        } else {
            return provider;
        }
    }, [signer, provider]);
}
