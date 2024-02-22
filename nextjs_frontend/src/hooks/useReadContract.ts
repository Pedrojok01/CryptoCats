import { useCallback, useMemo } from "react";

import { getContract } from "viem";
import { usePublicClient } from "wagmi";

import { contracts } from "@/data/contracts";
import { mapArrayToCatObject, mapArrayToOfferObject } from "@/utils/formatArrayToObject";

import { useStore } from "../store/store";
import { logError } from "../utils/errorUtil";

const useReadContract = () => {
  const client = usePublicClient();
  const { userCats, setGen0Count, setMaxGen0Supply, setUserCats, setCatsWithoutOffer, setCatsOffersForMarket } =
    useStore();

  const catInstance = useMemo(
    () => (client ? getContract({ address: contracts.cat.address, abi: contracts.cat.abi, client }) : null),
    [client]
  );
  const marketplaceInstance = useMemo(
    () =>
      client ? getContract({ address: contracts.marketplace.address, abi: contracts.marketplace.abi, client }) : null,
    [client]
  );

  /* Get the name of a specific NFT :
   ************************************/
  const getTokenName = useCallback(async (): Promise<string | undefined> => {
    if (!catInstance?.read.symbol) return;

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
    if (!catInstance?.read.gen0Count) return;

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
    if (!catInstance?.read.CREATION_LIMIT_GEN0) return;

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
    async (user: `0x${string}`) => {
      if (!catInstance?.read.isApprovedForAll) return;

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
  const getUserCats = useCallback(
    async (address: `0x${string}`) => {
      if (!catInstance?.read?.getCatPerOwner || !address) return;

      try {
        const amount = (await catInstance.read.getCatPerOwner([address])) as string[];
        const catPromises = amount.map(async (id) => {
          if (!catInstance.read.getCat) return;
          const array = (await catInstance.read.getCat?.([Number(id)])) as bigint[];
          return mapArrayToCatObject(array);
        });

        const cats = (await Promise.all(catPromises)) as Cat[];
        setUserCats(cats);
      } catch (error: unknown) {
        logError(error);
      }
    },
    [catInstance, setUserCats]
  );

  /* Get all cats without offer on the marketplace per user :
   ************************************************************/
  const getCatsWithoutOffer = useCallback(async () => {
    if (!userCats || !marketplaceInstance) return;

    try {
      const offerChecks = userCats.map((cat) => {
        if (!marketplaceInstance.read.isOffer) return null;
        return marketplaceInstance.read.isOffer([Number(cat.indexId)]) as unknown as Promise<boolean>;
      });

      const offerResults = await Promise.all(offerChecks);
      const noOffer = userCats?.filter((_, index) => !offerResults[index]);
      setCatsWithoutOffer(noOffer);
    } catch (error: unknown) {
      logError(error);
    }
  }, [userCats, marketplaceInstance, setCatsWithoutOffer]);

  /* Get all cats without offer on the marketplace per user :
   ************************************************************/

  const getCatsOffersForMarket = useCallback(
    async (address: `0x${string}`) => {
      if (!marketplaceInstance?.read.getAllTokenOnSale || !client) return;

      try {
        const offers = (await marketplaceInstance.read.getAllTokenOnSale()) as bigint[];
        const results = await client.multicall({
          contracts: offers.flatMap((id) => [
            { ...contracts.cat, functionName: "getCat", args: [Number(id)] },
            { ...contracts.marketplace, functionName: "getOffer", args: [Number(id)] },
          ]),
        });

        const catOffers: CatOffersForMarket[] = [];

        for (let i = 0; i < results.length; i += 2) {
          const catData = mapArrayToCatObject(results[i]?.result as bigint[]);
          const offerData = mapArrayToOfferObject(results[i + 1]?.result as OfferAbi);
          offerData.ownOffer = offerData.seller === address;
          catOffers.push({ catData, marketData: offerData });
        }
        setCatsOffersForMarket(catOffers);
      } catch (error: unknown) {
        logError(error);
      }
    },
    [marketplaceInstance?.read, client, setCatsOffersForMarket]
  );

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
