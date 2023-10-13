import { type FC, useEffect } from "react";

import { Wrap } from "@chakra-ui/react";
import { formatEther } from "viem";

import { Loading, TabHeader } from "@/components/elements";
import { useReadContract, useWriteContract } from "@/hooks";
import { useStore } from "@/store/store";

import DisplayCat from "../myCats/components/DisplayCat";
import NoCatFound from "../myCats/components/NoCatFound";

const CatMarketplace: FC = () => {
  const { getCatsOffersForMarket } = useReadContract();
  const { catsOffersForMarket } = useStore();
  const { cancelOffer, buyOffer, loading } = useWriteContract();

  useEffect(() => {
    getCatsOffersForMarket();
  }, [getCatsOffersForMarket]);

  return (
    <>
      <TabHeader title="Cats Marketplace" description="Display all the cats that are currently for sale." />

      {!catsOffersForMarket && <Loading />}

      {catsOffersForMarket?.length === 0 ? (
        <NoCatFound />
      ) : (
        <Wrap w={"80%"} justify="center" m="auto">
          {catsOffersForMarket?.map((cat: CatOffersForMarket, index: number) => {
            const price = Number(formatEther(cat.marketData.price));
            return (
              <DisplayCat
                dnaBN={cat.catData.genes}
                key={index}
                id={Number(cat.catData.indexId)}
                generation={Number(cat.catData.generation)}
                price={price}
                ownOffer={cat.marketData.ownOffer}
                action={cat.marketData.ownOffer ? cancelOffer : buyOffer}
                loading={loading}
              />
            );
          })}
        </Wrap>
      )}
    </>
  );
};

export default CatMarketplace;
