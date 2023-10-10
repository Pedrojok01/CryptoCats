// useContract.ts
import { useMemo } from "react";
import { Abi, getContract } from "viem";
import { usePublicClient, useWalletClient } from "wagmi";

interface UseContractProps {
    address: `0x${string}`;
    abi: Abi;
    clientType: "public" | "wallet";
}

export const useContract = ({ address, abi, clientType }: UseContractProps) => {
    const publicClient = usePublicClient();
    const { data: walletClient } = useWalletClient();

    const client = clientType === "public" ? publicClient : walletClient;

    const contractInstance = useMemo(() => {
        return getContract({
            address,
            abi,
            publicClient: client ? client : undefined,
            walletClient: client ? client : undefined,
        });
    }, [address, abi, client]);

    return contractInstance;
};
