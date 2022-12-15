import { useCallback, useEffect, useState } from "react";

import { BigNumber } from "ethers";
import { useAccount } from "wagmi";

import { Catcontract } from "../../types/Catcontract";
import { CatMarketplace } from "../../types/CatMarketplace";
import { CAT_ABI } from "../data/abis/catContract_abi";
import { MARKET_ABI } from "../data/abis/marketplace_abi";
import { getContractAddresses } from "../data/constant";
import { useContract } from "./useContract";

const useReadContract = () => {
    const { address } = useAccount();
    const { catAddress, marketplaceAddress } = getContractAddresses();
    const catInstance: Catcontract = useContract(catAddress, CAT_ABI);
    const marketplaceInstance: CatMarketplace = useContract(marketplaceAddress, MARKET_ABI);

    const [gen0Count, setGen0Count] = useState<number>(0);
    const [maxGen0Supply, setMaxGen0Supply] = useState<number>(0);
    const [userCats, setUserCats] = useState<Cat[]>();
    const [catsWithoutoffer, setCatsWithoutoffer] = useState<Cat[]>();
    const [catsOffersForMarket, setCatsOffersForMarket] = useState<CatOffersForMarket[]>();

    maxGen0Supply;

    /* Get the name of a specific NFT :
     ************************************/
    const getTokenName = async (): Promise<string | undefined> => {
        try {
            const symbol = await catInstance.symbol();
            return symbol;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    };

    /* Get the number of gen0 cats already minted:
     ***********************************************/
    const getGen0Count = async () => {
        try {
            const count = await catInstance.gen0Count();
            setGen0Count(count);
        } catch (error: any) {
            console.log(error.reason ? error.reason : error.message ? error.message : error);
            setGen0Count(0);
        }
    };

    /* Get the max supply number of gen0 cats:
     *******************************************/
    const getMaxGen0Supply = async () => {
        try {
            const maxCount = await catInstance.CREATION_LIMIT_GEN0();
            setMaxGen0Supply(maxCount);
        } catch (error: any) {
            console.log(error.reason ? error.reason : error.message ? error.message : error);
            setMaxGen0Supply(0);
        }
    };

    /* Check if existing allowance of NFT 1155 :
     ***********************************************/
    const checkNftAllowance = async (user: string) => {
        try {
            const allowance = await catInstance.isApprovedForAll(user, marketplaceAddress);
            return allowance;
        } catch (error: any) {
            console.log(error.reason ? error.reason : error.message);
            return false;
        }
    };

    /* Get all cats per user :
     ***************************/
    const getUserCats = async (user: string) => {
        try {
            const amount = await catInstance.getCatPerOwner(user);

            const cats = [];
            for (let i = 0; i < amount.length; i++) {
                const temp: any = await catInstance.getCat(Number(amount[i]));
                cats.push(temp);
            }
            setUserCats(cats);
        } catch (error: any) {
            console.log(error.reason ? error.reason : error.message ? error.message : error);
        }
    };

    const syncUserCats = useCallback(() => {
        getUserCats(address as string);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address]);

    /* Get all cats without offer on the marketplace per user :
     ************************************************************/
    const getCatsWithoutOffer = async (cats: any[]) => {
        try {
            const noOffer = [];
            for (let i = 0; i < cats.length; i++) {
                const isOffer: boolean = await marketplaceInstance.isOffer(Number(cats[i].indexId));
                if (!isOffer) noOffer.push(cats[i]);
            }
            setCatsWithoutoffer(noOffer);
        } catch (error: any) {
            console.log(error.reason ? error.reason : error.message ? error.message : error);
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
            const offers: BigNumber[] = await marketplaceInstance.getAllTokenOnSale();

            const catOffers: CatOffersForMarket[] = [];
            for (let i = 0; i < offers.length; i++) {
                const tempCat: Cat = await catInstance.getCat(Number(offers[i]));
                const tempMarket: Offer = await marketplaceInstance.getOffer(Number(offers[i]));
                const marketData: Offer = { ...tempMarket, ownOffer: false };

                if (marketData.seller === address) {
                    marketData.ownOffer = true;
                }

                const offer: CatOffersForMarket = { catData: tempCat, marketData: marketData };
                catOffers.push(offer);
            }
            setCatsOffersForMarket(catOffers);
        } catch (error: any) {
            console.log(error.reason ? error.reason : error.message ? error.message : error);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userCats]);

    return {
        getTokenName,
        gen0Count,
        getGen0Count,
        maxGen0Supply,
        getMaxGen0Supply,
        userCats,
        syncUserCats,
        catsWithoutoffer,
        syncCatsWithoutOffer,
        checkNftAllowance,
        catsOffersForMarket,
        syncCatsOffersForMarket,
    };
};

export default useReadContract;
