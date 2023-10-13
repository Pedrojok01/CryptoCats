import { type FC, useState } from "react";

import { Button, Center, FormLabel, HStack, VStack, Wrap } from "@chakra-ui/react";

import { Loading, TabHeader } from "@/components/elements";
import useSellCat from "@/hooks/useSellCat";
import { useStore } from "@/store/store";

import CatSelection from "./components/CatSelection";
import NoCatFound from "./components/NoCatFound";
import PriceInput from "./components/PriceInput";

const SellContent: FC = () => {
  const { catsWithoutOffer } = useStore();
  const { handleSell, loading } = useSellCat();
  const [catToSell, setCatToSell] = useState<SelectedCat>();
  const [price, setPrice] = useState<string>("0");

  const handleReset = async () => {
    setCatToSell(undefined);
    setPrice("0");
  };

  const onSell = async () => {
    if (catToSell) {
      await handleSell(price, catToSell.id);
      handleReset();
    }
  };

  return (
    <>
      <TabHeader
        title="Sell your cats"
        description="Select a cat and enter a price to add an offer to the marketplace."
      />

      {!catsWithoutOffer && <Loading />}

      {catsWithoutOffer?.length === 0 && <NoCatFound />}

      {catsWithoutOffer && catsWithoutOffer.length > 0 && (
        <Center>
          <Wrap>
            <CatSelection
              cat={catToSell}
              setCat={setCatToSell}
              name="a cat to sell"
              loading={loading}
              isMarket={true}
            />

            <VStack w={350} justifyContent="center">
              <FormLabel>Set the price in ETH:</FormLabel>
              <PriceInput price={price} setPrice={setPrice} loading={loading} />
              <HStack>
                <Button colorScheme="red" onClick={handleReset} isLoading={loading}>
                  Reset
                </Button>
                <Button colorScheme="green" disabled={!catToSell || loading} onClick={onSell} isLoading={loading}>
                  Sell
                </Button>
              </HStack>
            </VStack>
          </Wrap>
        </Center>
      )}
    </>
  );
};

export default SellContent;
