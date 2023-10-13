// useSellCat.ts
import { useCallback, useEffect } from "react";

import { parseEther } from "viem";
import { useAccount } from "wagmi";

import useReadContract from "./useReadContract";
import useWriteContract from "./useWriteContract";

const useSellCat = () => {
  const { address } = useAccount();
  const { getCatsWithoutOffer, checkNftAllowance } = useReadContract();
  const { approveNft, sellCat, loading } = useWriteContract();

  useEffect(() => {
    getCatsWithoutOffer();
  }, [getCatsWithoutOffer]);

  const handleSell = useCallback(
    async (price: string, catId: number) => {
      if (!address) return;

      const allowed = await checkNftAllowance(address);
      if (!allowed) await approveNft();
      await sellCat(parseEther(price), catId);
    },
    [address, checkNftAllowance, approveNft, sellCat]
  );

  return { handleSell, loading };
};

export default useSellCat;
