import { useMemo } from "react";

import { Contract as EthersContract, ContractInterface } from "@ethersproject/contracts";
import { Provider } from "@ethersproject/providers";
import { ZeroAddress, isAddress } from "ethers";

import { useSignerOrProvider } from "./useSignerOrProvider";

function getContract<T extends EthersContract>(address: string, abi: ContractInterface, provider: Provider): T {
    return new EthersContract(address, abi, provider) as T;
}

export function useContract<T extends EthersContract>(address: string, abi: ContractInterface): T | null {
    const signerOrProvider = useSignerOrProvider();

    if (!isAddress(address) || address === ZeroAddress) {
        throw Error(`Invalid 'address' parameter '${address}'.`);
    }

    return useMemo(() => getContract<T>(address, abi, signerOrProvider), [address, abi, signerOrProvider]);
}
