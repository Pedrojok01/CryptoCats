import { useMemo, useState } from "react";

import { getContract, parseEther } from "viem";
import { useWalletClient } from "wagmi";

import useNotify from "./useNotify";
import useReadContract from "./useReadContract";
import useTransactionReceipt from "./useTransactionReceipt";
import { ExplorerLink } from "../components/elements/ExplorerLink";
import { contracts } from "../data/contracts";
import { logError } from "../utils/errorUtil";

const useWriteContract = () => {
  const client = useWalletClient()?.data;
  const { getCatsWithoutOffer, getCatsOffersForMarket } = useReadContract();
  const { awaitTransactionReceipt } = useTransactionReceipt();
  const notify = useNotify();
  const [loading, setLoading] = useState<boolean>(false);

  const catInstance = useMemo(
    () => (client ? getContract({ address: contracts.cat.address, abi: contracts.cat.abi, client }) : null),
    [client]
  );
  const marketplaceInstance = useMemo(
    () =>
      client ? getContract({ address: contracts.marketplace.address, abi: contracts.marketplace.abi, client }) : null,
    [client]
  );

  /* Set Token Allowance:
   *************************/
  const approveNft = async (): Promise<void> => {
    if (!catInstance?.write.setApprovalForAll) return;

    setLoading(true);
    try {
      const hash: `0x${string}` = await catInstance.write.setApprovalForAll([contracts.marketplace.address, true]);
      await awaitTransactionReceipt({ hash });
      notify({
        title: "NFT Approval set",
        message: "Allowance successfully set.",
        status: "success",
      });
    } catch (error: unknown) {
      notify({
        title: "NFT Approval denied",
        message: "Something went wrong while setting the allowance. Please try again.",
        status: "error",
      });
      logError(error);
    } finally {
      setLoading(false);
    }
  };

  /* Mint a gen0 cat from the factory :
   *************************************/
  const mintCat = async (dna: string): Promise<void> => {
    if (!catInstance?.write.createCatGen0) return;

    setLoading(true);
    try {
      const hash: `0x${string}` = await catInstance.write.createCatGen0([dna]);
      await awaitTransactionReceipt({ hash });
      const msg = (
        <>
          Your cat has been succesfully created!
          <ExplorerLink hash={hash} />
        </>
      );
      notify({
        title: "Mint Successfully",
        message: msg,
        status: "success",
      });
    } catch (error: unknown) {
      const msg = logError(error);
      notify({
        title: "An error occured",
        message: msg ?? "An unexpected error occured while minting.",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  /* Breed a new cat from 2 parents :
   ***********************************/
  const breedCat = async (id1: number, id2: number): Promise<void> => {
    if (!catInstance?.write.breed) return;

    setLoading(true);
    try {
      const hash: `0x${string}` = await catInstance.write.breed([id1, id2]);
      await awaitTransactionReceipt({ hash });
      const msg = (
        <>
          Your seebling is born!
          <ExplorerLink hash={hash} />
        </>
      );
      notify({
        title: "Breed Successful",
        message: msg,
        status: "success",
      });
    } catch (error: unknown) {
      const msg = logError(error);
      notify({
        title: "An error occured",
        message: msg ?? "An unexpected error occured while breeding.",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  /* Add a cat offer to the marketplace :
   *****************************************/
  const sellCat = async (price: bigint, id: number): Promise<void> => {
    if (!marketplaceInstance?.write.setOffer) return;

    setLoading(true);
    try {
      const hash: `0x${string}` = await marketplaceInstance.write.setOffer([price, id]);
      await awaitTransactionReceipt({ hash });
      const msg = (
        <>
          Your cat offer has been added to the marketplace!
          <ExplorerLink hash={hash} />
        </>
      );
      notify({
        title: "Offer Successful",
        message: msg,
        status: "success",
      });
      getCatsWithoutOffer();
    } catch (error: unknown) {
      const msg = logError(error);
      notify({
        title: "An error occured",
        message: msg ?? "An unexpected error occured while setting the offer.",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  /* Remove a cat offer from the marketplace :
   *********************************************/
  const cancelOffer = async (id: number): Promise<void> => {
    if (!marketplaceInstance?.write.removeOffer) return;

    setLoading(true);
    try {
      const hash: `0x${string}` = await marketplaceInstance.write.removeOffer([id]);
      await awaitTransactionReceipt({ hash });
      const msg = (
        <>
          Your cat id:{id} has been successfully removed from the marketplace!
          <ExplorerLink hash={hash} />
        </>
      );
      notify({
        title: "Offer Successfully Removed",
        message: msg,
        status: "success",
      });
      getCatsOffersForMarket();
    } catch (error: unknown) {
      const msg = logError(error);
      notify({
        title: "An error occured",
        message: msg ?? "An unexpected error occured while removing the offer.",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  /* Remove a cat offer from the marketplace :
   *********************************************/
  const buyOffer = async (id: number, price: number): Promise<void> => {
    if (!marketplaceInstance?.write.buyCat) return;

    setLoading(true);
    try {
      const hash: `0x${string}` = await marketplaceInstance.write.buyCat([id], {
        value: parseEther(price.toString()),
      });
      await awaitTransactionReceipt({ hash });
      const msg = (
        <>
          Your have successfully purchased the cat id:{id} from the marketplace!
          <ExplorerLink hash={hash} />
        </>
      );
      notify({
        title: "Buy Success",
        message: msg,
        status: "success",
      });
      getCatsOffersForMarket();
    } catch (error: unknown) {
      const msg = logError(error);
      notify({
        title: "An error occured",
        message: msg ?? "An unexpected error occured while buying the cat.",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return { approveNft, mintCat, breedCat, sellCat, cancelOffer, buyOffer, loading };
};

export default useWriteContract;
