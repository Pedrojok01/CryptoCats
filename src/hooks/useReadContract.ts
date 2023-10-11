import { useCallback, useEffect } from "react";

import { useAccount } from "wagmi";

import { useContract } from "./useContract";
import { contracts } from "../data/contracts";
import { useStore } from "../store/store";
import { logError } from "../utils/errorUtil";

const useReadContract = () => {
  const { address } = useAccount();
  const catInstance = useContract({ address: contracts.cat.address, abi: contracts.cat.abi, clientType: "public" });
  const marketplaceInstance = useContract({
    address: contracts.marketplace.address,
    abi: contracts.marketplace.abi,
    clientType: "public",
  });

  const { userCats, setGen0Count, setMaxGen0Supply, setUserCats, setCatsWithoutOffer, setCatsOffersForMarket } =
    useStore();

  if (!catInstance || !marketplaceInstance) {
    throw Error("Contract instance missing.");
  }

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
  const getGen0Count = async () => {
    try {
      const count = (await catInstance.read.gen0Count()) as number;
      setGen0Count(count);
    } catch (error: unknown) {
      logError(error);
    }
  };

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
   ***********************************************/
  const checkNftAllowance = async (user: string) => {
    try {
      const allowance = await catInstance.read.isApprovedForAll([user, contracts.marketplace.address]);
      return allowance;
    } catch (error: unknown) {
      logError(error);
      return false;
    }
  };

  /* Get all cats per user :
   ***************************/
  const getUserCats = async (user: `0x${string}`) => {
    try {
      const amount = (await catInstance.read.getCatPerOwner([user])) as string;

      const cats = [];
      for (let i = 0; i < amount.length; i++) {
        const temp: any = await catInstance.read.getCat([Number(amount[i])]);
        cats.push(temp);
      }
      setUserCats(cats);
    } catch (error: unknown) {
      logError(error);
    }
  };

  const syncUserCats = useCallback(() => {
    if (address) {
      getUserCats(address);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  /* Get all cats without offer on the marketplace per user :
   ************************************************************/
  const getCatsWithoutOffer = async (cats: any[]) => {
    try {
      const noOffer = [];
      for (let i = 0; i < cats.length; i++) {
        const isOffer = (await marketplaceInstance.read.isOffer([Number(cats[i].indexId)])) as boolean;
        if (!isOffer) noOffer.push(cats[i]);
      }
      setCatsWithoutOffer(noOffer);
    } catch (error: unknown) {
      logError(error);
    }
  };

  const syncCatsWithoutOffer = useCallback(() => {
    if (userCats) getCatsWithoutOffer(userCats);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userCats]);

  /* Get all cats without offer on the marketplace per user :
   ************************************************************/
  const getCatsOffersForMarket = async () => {
    try {
      const offers = (await marketplaceInstance.read.getAllTokenOnSale()) as bigint[];

      const catOffers: CatOffersForMarket[] = [];
      for (let i = 0; i < offers.length; i++) {
        const tempCat = (await catInstance.read.getCat([Number(offers[i])])) as Cat;
        const tempMarket = (await marketplaceInstance.read.getOffer([Number(offers[i])])) as Offer;
        const marketData: Offer = { ...tempMarket, ownOffer: false };

        if (marketData.seller === address) {
          marketData.ownOffer = true;
        }

        const offer: CatOffersForMarket = { catData: tempCat, marketData: marketData };
        catOffers.push(offer);
      }
      setCatsOffersForMarket(catOffers);
    } catch (error: unknown) {
      logError(error);
    }
  };

  const syncCatsOffersForMarket = useCallback(() => {
    getCatsOffersForMarket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  useEffect(() => {
    getGen0Count();
    getMaxGen0Supply();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    syncUserCats();
    syncCatsOffersForMarket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  useEffect(() => {
    syncCatsWithoutOffer();
  }, [userCats, syncCatsWithoutOffer]);

  return {
    getTokenName,
    getGen0Count,
    getMaxGen0Supply,
    syncUserCats,
    syncCatsWithoutOffer,
    checkNftAllowance,
    syncCatsOffersForMarket,
  };
};

export default useReadContract;
