import { useState } from "react";

import { formatEther, getContract } from "viem";

import { useContract } from "./useContract";
import useNotify from "./useNotify";
import useReadContract from "./useReadContract";
import useTransactionReceipt from "./useTransactionReceipt";
import { ExplorerLink } from "../components/elements/ExplorerLink";
import { contracts } from "../data/contracts";
import { logError } from "../utils/errorUtil";

const useWriteContract = () => {
  const { awaitTransactionReceipt } = useTransactionReceipt();
  const notify = useNotify();
  const catInstance = useContract({ address: contracts.cat.address, abi: contracts.cat.abi, clientType: "wallet" });
  const marketplaceInstance = useContract({
    address: contracts.marketplace.address,
    abi: contracts.marketplace.abi,
    clientType: "wallet",
  });
  const { syncCatsOffersForMarket, syncCatsWithoutOffer } = useReadContract();
  const [loading, setLoading] = useState<boolean>(false);

  if (!catInstance || !marketplaceInstance) {
    throw Error("Contract instance missing.");
  }

  console.log("catInstance", catInstance);

  /* Set Token Allowance:
   *************************/
  const approveNft = async () => {
    setLoading(true);
    try {
      const hash: `0x${string}` = await catInstance.setApprovalForAll([contracts.marketplace.address, true]);
      awaitTransactionReceipt({ hash });
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

  getContract;

  /* Mint a gen0 cat from the factory :
   *************************************/
  const mintCat = async (dna: string): Promise<any> => {
    setLoading(true);
    try {
      const hash: `0x${string}` = await catInstance.write.createCatGen0(dna);
      awaitTransactionReceipt({ hash });
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
    } catch (error: any) {
      notify({
        title: "An error occured",
        message: error.reason ? error.reason : "An unexpected error occured while minting.",
        status: "error",
      });
      return error.reason ? error.reason : error.message ? error.message : "Unexpected error";
    } finally {
      setLoading(false);
    }
  };

  /* Breed a new cat from 2 parents :
   ***********************************/
  const breedCat = async (id1: number, id2: number): Promise<any> => {
    setLoading(true);
    try {
      const hash: `0x${string}` = await catInstance.write.breed(id1, id2);
      awaitTransactionReceipt({ hash });
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
    } catch (error: any) {
      notify({
        title: "An error occured",
        message: error.reason ? error.reason : "An unexpected error occured while breeding.",
        status: "error",
      });
      return error.reason ? error.reason : error.message ? error.message : "Unexpected error";
    } finally {
      setLoading(false);
    }
  };

  /* Add a cat offer to the marketplace :
   *****************************************/
  const sellCat = async (price: bigint, id: number): Promise<any> => {
    setLoading(true);
    try {
      const hash: `0x${string}` = await marketplaceInstance.write.setOffer(price, id);
      awaitTransactionReceipt({ hash });
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
      syncCatsWithoutOffer();
    } catch (error: any) {
      notify({
        title: "An error occured",
        message: error.reason ? error.reason : "An unexpected error occured while setting the offer.",
        status: "error",
      });
      return error.reason ? error.reason : error.message ? error.message : "Unexpected error";
    } finally {
      setLoading(false);
    }
  };

  /* Remove a cat offer from the marketplace :
   *********************************************/
  const cancelOffer = async (id: number): Promise<any> => {
    setLoading(true);
    try {
      const hash: `0x${string}` = await marketplaceInstance.write.removeOffer(id);
      awaitTransactionReceipt({ hash });
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
      syncCatsOffersForMarket();
    } catch (error: any) {
      notify({
        title: "An error occured",
        message: error.reason ? error.reason : "An unexpected error occured while removing the offer.",
        status: "error",
      });
      return error.reason ? error.reason : error.message ? error.message : "Unexpected error";
    } finally {
      setLoading(false);
    }
  };

  /* Remove a cat offer from the marketplace :
   *********************************************/
  const buyOffer = async (id: number, price: bigint): Promise<any> => {
    setLoading(true);
    try {
      const hash: `0x${string}` = await marketplaceInstance.write.buyCat(id, {
        value: formatEther(price),
      });
      awaitTransactionReceipt({ hash });
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
      syncCatsOffersForMarket();
    } catch (error: any) {
      notify({
        title: "An error occured",
        message: error.reason ? error.reason : "An unexpected error occured while buying the cat.",
        status: "error",
      });
      return error.reason ? error.reason : error.message ? error.message : "Unexpected error";
    } finally {
      setLoading(false);
    }
  };

  return { approveNft, mintCat, breedCat, sellCat, cancelOffer, buyOffer, loading };
};

export default useWriteContract;
