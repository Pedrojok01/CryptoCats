import { FC, useState } from "react";

import { Box, Button, Center, Heading, HStack, VStack, Wrap } from "@chakra-ui/react";

import { Loading } from "@/components/elements";
import { useReadContract, useWriteContract } from "@/hooks";
import { useStore } from "@/store/store";

import CatSelection from "./components/CatSelection";
import NoCatFound from "./components/NoCatFound";

const BreedContent: FC = () => {
  const { getUserCats } = useReadContract();
  const { userCats } = useStore();
  const { breedCat, loading } = useWriteContract();
  const [mum, setMum] = useState<SelectedParent>();
  const [dad, setDad] = useState<SelectedParent>();

  const isBreedEnable = mum && dad ? true : false;

  const handleReset = async () => {
    setMum(undefined);
    setDad(undefined);
  };

  const handleBreed = async () => {
    if (mum && dad) {
      await breedCat(mum.id, dad.id);
      setMum(undefined);
      setDad(undefined);
      getUserCats();
    }
  };

  return (
    <>
      <Box textAlign="center" mb={5}>
        <Heading as="h1" size="lg" marginBottom={6}>
          Cats Breeding
        </Heading>
        <Heading as="h4" size="sm" fontWeight="normal">
          Select two parents to breed a seedling.
        </Heading>
      </Box>

      <Loading props={userCats} />

      {userCats && userCats.length === 0 && <NoCatFound />}

      {userCats && userCats.length > 0 && (
        <Center>
          <VStack>
            <Wrap w={"100%"} m="auto" gap={20} justify="center">
              <CatSelection parent={mum} setParent={setMum} name="Mummy" otherParent={dad} loading={loading} />
              <CatSelection parent={dad} setParent={setDad} name="Daddy" otherParent={mum} loading={loading} />
            </Wrap>

            <HStack gap={20}>
              <Button colorScheme="red" isLoading={loading} onClick={handleReset}>
                Reset
              </Button>
              <Button
                colorScheme="green"
                isLoading={loading}
                disabled={!isBreedEnable || loading}
                onClick={handleBreed}
              >
                Breed
              </Button>
            </HStack>
          </VStack>
        </Center>
      )}
    </>
  );
};

export default BreedContent;
