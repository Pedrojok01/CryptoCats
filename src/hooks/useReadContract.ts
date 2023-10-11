import { useCallback } from "react";

import { useAccount } from "wagmi";

import { contracts } from "@/data/contracts";
import { mapArrayToCatObject, mapArrayToOfferObject } from "@/utils/formatArrayToObject";

import { useContractInstances } from "./useContractInstances";
import { useStore } from "../store/store";
import { logError } from "../utils/errorUtil";

const useReadContract = () => {
  const { address } = useAccount();
  const { catInstance, marketplaceInstance } = useContractInstances({ clientType: "public" });
  const { userCats, setGen0Count, setMaxGen0Supply, setUserCats, setCatsWithoutOffer, setCatsOffersForMarket } =
    useStore();

  /* Get the name of a specific NFT :
   ************************************/
  const getTokenName = useCallback(async (): Promise<string | undefined> => {
    try {
      const symbol = (await catInstance.read.symbol()) as string;
      return symbol;
    } catch (error: unknown) {
      logError(error);
      return undefined;
    }
  }, [catInstance]);

  /* Get the number of gen0 cats already minted:
   ***********************************************/
  const getGen0Count = useCallback(async () => {
    try {
      const count = (await catInstance.read.gen0Count()) as number;
      setGen0Count(count);
    } catch (error: unknown) {
      logError(error);
    }
  }, [catInstance, setGen0Count]);

  /* Get the max supply number of gen0 cats:
   *******************************************/
  const getMaxGen0Supply = useCallback(async () => {
    try {
      const maxCount = (await catInstance.read.CREATION_LIMIT_GEN0()) as number;
      setMaxGen0Supply(maxCount);
    } catch (error: unknown) {
      logError(error);
      setMaxGen0Supply(0);
    }
  }, [catInstance, setMaxGen0Supply]);

  /* Check if existing allowance of NFT 1155 :
   *********************************************/
  const checkNftAllowance = useCallback(
    async (user: string) => {
      try {
        const allowance = await catInstance.read.isApprovedForAll([user, contracts.marketplace.address]);
        return allowance;
      } catch (error: unknown) {
        logError(error);
        return false;
      }
    },
    [catInstance]
  );

  /* Get all cats per user :
   ***************************/
  const getUserCats = useCallback(async () => {
    try {
      const amount = (await catInstance.read.getCatPerOwner([address])) as string[];
      const catPromises = amount.map(async (id) => {
        const array = (await catInstance.read.getCat([Number(id)])) as bigint[];
        return mapArrayToCatObject(array);
      });

      const cats = await Promise.all(catPromises);
      setUserCats(cats);
    } catch (error: unknown) {
      logError(error);
    }
  }, [address, catInstance, setUserCats]);

  /* Get all cats without offer on the marketplace per user :
   ************************************************************/
  const getCatsWithoutOffer = useCallback(async () => {
    try {
      const offerChecks = userCats.map((cat) =>
        marketplaceInstance.read.isOffer([Number(cat.indexId)])
      ) as Promise<boolean>[];
      const offerResults = await Promise.all(offerChecks);
      const noOffer = userCats.filter((_, index) => !offerResults[index]);
      setCatsWithoutOffer(noOffer);
    } catch (error: unknown) {
      logError(error);
    }
  }, [userCats, marketplaceInstance, setCatsWithoutOffer]);

  /* Get all cats without offer on the marketplace per user :
   ************************************************************/
  const getCatsOffersForMarket = useCallback(async () => {
    try {
      const offers = (await marketplaceInstance.read.getAllTokenOnSale()) as bigint[];
      const catPromises = offers.map((id) => catInstance.read.getCat([Number(id)])) as Promise<bigint[]>[];
      const offerPromises = offers.map((id) => marketplaceInstance.read.getOffer([Number(id)])) as Promise<OfferAbi>[];
      const [catsArray, offersArray] = await Promise.all([Promise.all(catPromises), Promise.all(offerPromises)]);

      const catOffers = catsArray.map((cat, index) => {
        const offer = mapArrayToOfferObject(offersArray[index]);
        offer.ownOffer = offer.seller === address;
        return { catData: mapArrayToCatObject(cat), marketData: offer };
      });
      setCatsOffersForMarket(catOffers);
    } catch (error: unknown) {
      logError(error);
    }
  }, [address, catInstance, marketplaceInstance, setCatsOffersForMarket]);

  return {
    getTokenName,
    getGen0Count,
    getMaxGen0Supply,
    checkNftAllowance,
    getUserCats,
    getCatsWithoutOffer,
    getCatsOffersForMarket,
  };
};

export default useReadContract;
