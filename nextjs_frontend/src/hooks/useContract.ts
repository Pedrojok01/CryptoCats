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

  const isPublicClient = clientType === "public" ? publicClient : undefined;
  const isWalletClient = clientType === "wallet" && walletClient ? walletClient : undefined;

  const contractInstance = useMemo(() => {
    return getContract({
      address,
      abi,
      publicClient: isPublicClient,
      walletClient: isWalletClient,
    });
  }, [address, abi, isPublicClient, isWalletClient]);

  return contractInstance;
};
