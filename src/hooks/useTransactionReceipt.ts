// useTransactionReceipt.ts
import { PublicClient } from "viem";
import { usePublicClient } from "wagmi";

interface AwaitTransactionReceiptProps {
    confirmations?: number;
    hash: `0x${string}`;
}

const useTransactionReceipt = () => {
    const publicClient: PublicClient = usePublicClient();

    const awaitTransactionReceipt = async ({ confirmations = 3, hash }: AwaitTransactionReceiptProps) => {
        if (!publicClient) {
            throw new Error("PublicClientContext is undefined");
        }

        return await publicClient.waitForTransactionReceipt({
            confirmations,
            hash,
        });
    };

    return {
        awaitTransactionReceipt,
    };
};

export default useTransactionReceipt;
