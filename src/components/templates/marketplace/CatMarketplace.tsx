import { FC, useEffect } from "react";

import { Box, Heading, Wrap } from "@chakra-ui/react";
import { formatEther } from "viem";

import useReadContract from "../../../hooks/useReadContract";
import useWriteContract from "../../../hooks/useWriteContract";
import { useStore } from "../../../store/store";
import { Loading } from "../../elements";
import DisplayCat from "../myCats/components/DisplayCat";
import NoCatFound from "../myCats/components/NoCatFound";

const CatMarketplace: FC = () => {
  const { syncCatsOffersForMarket } = useReadContract();
  const { catsOffersForMarket } = useStore();
  const { cancelOffer, buyOffer, loading } = useWriteContract();

  useEffect(() => {
    syncCatsOffersForMarket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catsOffersForMarket]);

  return (
    <>
      <Box textAlign="center">
        <Heading as="h1" size="lg" marginBottom={6}>
          Cats Marketplace
        </Heading>
        <Heading as="h4" size="sm" fontWeight="normal">
          Display all the cats that are currently for sale.
        </Heading>
      </Box>

      <Loading props={catsOffersForMarket} />

      {catsOffersForMarket && catsOffersForMarket?.length === 0 ? (
        <NoCatFound />
      ) : (
        <Wrap w={"80%"} justify="center" m="auto" p={5}>
          {catsOffersForMarket?.map((cat: CatOffersForMarket, index: number) => {
            return (
              <DisplayCat
                dnaBN={Number(cat.catData.genes)}
                key={index}
                id={Number(cat.catData.indexId)}
                generation={Number(cat.catData.generation)}
                price={Number(formatEther(cat.marketData.price))}
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
