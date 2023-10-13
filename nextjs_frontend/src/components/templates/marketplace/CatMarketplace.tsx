import { type FC, useEffect } from "react";

import { Badge, Button, HStack, Text, VStack, Wrap } from "@chakra-ui/react";
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

  const cancel = async (id: number) => {
    await cancelOffer(id);
  };

  const buy = async (id: number, price: number) => {
    await buyOffer(id, price);
  };

  return (
    <>
      <TabHeader title="Cats Marketplace" description="Display all the cats that are currently for sale." />

      {!catsOffersForMarket && <Loading />}

      {catsOffersForMarket?.length === 0 ? (
        <NoCatFound />
      ) : (
        <Wrap w={"80%"} justify="center" m="auto">
          {catsOffersForMarket?.map((cat: CatOffersForMarket) => {
            const id = Number(cat.catData.indexId);
            const price = Number(formatEther(cat.marketData.price));

            return (
              <VStack bg={"white"} className="card">
                <DisplayCat
                  key={cat.catData.indexId}
                  dnaBN={cat.catData.genes}
                  id={id}
                  generation={Number(cat.catData.generation)}
                />

                <HStack gap={4}>
                  <Text fontSize="lg" fontWeight={700} color={"black"} className="text-shadow-light">
                    {price} ETH
                  </Text>
                  {cat.marketData.ownOffer ? (
                    <Button colorScheme="red" isLoading={loading} onClick={() => cancel(price)} className="box-shadow">
                      CANCEL
                    </Button>
                  ) : (
                    <Button
                      colorScheme="green"
                      isLoading={loading}
                      onClick={() => buy(id, price)}
                      className="box-shadow"
                    >
                      BUY
                    </Button>
                  )}
                </HStack>
              </VStack>
            );
          })}
        </Wrap>
      )}
    </>
  );
};

export default CatMarketplace;
