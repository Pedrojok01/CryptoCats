import { type FC, useEffect, useState } from "react";

import {
  Box,
  Button,
  Center,
  FormLabel,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useColorMode,
  useDisclosure,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { parseEther } from "viem";
import { useAccount } from "wagmi";

import { Loading, RenderCat, TabHeader } from "@/components/elements";
import { useReadContract, useWriteContract } from "@/hooks";
import { useStore } from "@/store/store";

import CatSelectModal from "./components/CatSelectModal";
import NoCatFound from "./components/NoCatFound";

const SellContent: FC = () => {
  const { address } = useAccount();
  const { checkNftAllowance, getCatsWithoutOffer } = useReadContract();
  const { catsWithoutOffer } = useStore();
  const { approveNft, sellCat, loading } = useWriteContract();
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [catToSell, setCatToSell] = useState<SelectedParent>();
  const [price, setPrice] = useState<string>("0");

  useEffect(() => {
    getCatsWithoutOffer();
  }, [getCatsWithoutOffer]);

  const handleReset = async () => {
    setCatToSell(undefined);
    setPrice("");
  };

  const handleSell = async () => {
    if (catToSell) {
      const allowed = await checkNftAllowance(address as string);
      if (!allowed) await approveNft();

      await sellCat(parseEther(price.toString()), catToSell.id);
      setCatToSell(undefined);
    }
  };

  return (
    <>
      <TabHeader
        title="Sell your cats"
        description="Select a cat and enter a price to add an offer to the marketplace."
      />

      {!catsWithoutOffer && <Loading />}

      {catsWithoutOffer?.length === 0 ? (
        <NoCatFound />
      ) : (
        <Center>
          <Wrap>
            <Box
              bgColor={colorMode === "light" ? "#ededed" : "#4f5050"}
              w={350}
              h={"fit-content"}
              paddingBlock={8}
              borderRadius={10}
            >
              <Center>
                <VStack>
                  {catToSell && (
                    <>
                      <RenderCat
                        dna={catToSell.dna}
                        id={catToSell.id}
                        generation={catToSell.generation}
                        isFactory={false}
                      />
                      <br></br>
                    </>
                  )}
                  <Button colorScheme="pink" onClick={onOpen} isLoading={loading}>
                    Select a Cat
                  </Button>
                </VStack>
              </Center>
            </Box>

            <CatSelectModal isOpen={isOpen} onClose={onClose} setParent={setCatToSell} isMarket={true} />

            <VStack w={350} justifyContent="center">
              <FormLabel>Set the price in ETH:</FormLabel>
              <NumberInput defaultValue={0} min={0} w="80%" value={price} onChange={(value) => setPrice(value)}>
                <NumberInputField cursor={loading ? "not-allowed" : "auto"} />
                <NumberInputStepper>
                  <NumberIncrementStepper cursor={loading ? "not-allowed" : "auto"} />
                  <NumberDecrementStepper cursor={loading ? "not-allowed" : "auto"} />
                </NumberInputStepper>
              </NumberInput>
              <HStack>
                <Button colorScheme="red" onClick={handleReset} isLoading={loading}>
                  Reset
                </Button>
                <Button colorScheme="green" disabled={!catToSell || loading} onClick={handleSell} isLoading={loading}>
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
