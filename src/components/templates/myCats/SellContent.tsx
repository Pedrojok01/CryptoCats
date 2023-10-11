import { FC, useState } from "react";

import {
  Box,
  Button,
  Center,
  FormLabel,
  Heading,
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

import { Loading, RenderCat } from "@/components/elements";
import useReadContract from "@/hooks/useReadContract";
import useWriteContract from "@/hooks/useWriteContract";
import { useStore } from "@/store/store";

import CatSelectModal from "./components/CatSelectModal";
import NoCatFound from "./components/NoCatFound";

const SellContent: FC = () => {
  const { address } = useAccount();
  const { checkNftAllowance } = useReadContract();
  const { catsWithoutOffer } = useStore();
  const { approveNft, sellCat, loading } = useWriteContract();
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [catToSell, setCatToSell] = useState<SelectedParent>();
  const [price, setPrice] = useState<string>("0");

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
      <Box textAlign="center" mb={5}>
        <Heading as="h1" size="lg" marginBottom={6}>
          Sell your cats
        </Heading>
        <Heading as="h4" size="sm" fontWeight="normal">
          Select a cat and enter a price to add an offer to the marketplace.
        </Heading>
      </Box>

      <Loading props={catsWithoutOffer} />

      {catsWithoutOffer?.length === 0 && <NoCatFound />}

      {catsWithoutOffer?.length > 0 && (
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
