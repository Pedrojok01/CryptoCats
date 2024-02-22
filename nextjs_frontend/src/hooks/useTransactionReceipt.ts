// useTransactionReceipt.ts
import { usePublicClient } from "wagmi";

interface AwaitTransactionReceiptProps {
  confirmations?: number;
  hash: `0x${string}`;
}

const useTransactionReceipt = () => {
  const publicClient = usePublicClient();

  const awaitTransactionReceipt = async ({ confirmations = 2, hash }: AwaitTransactionReceiptProps) => {
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
