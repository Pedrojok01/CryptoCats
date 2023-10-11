import { FC } from "react";

import { Box, Heading, Wrap } from "@chakra-ui/react";

import { Loading } from "@/components/elements";
import { useStore } from "@/store/store";

import DisplayCat from "./components/DisplayCat";
import NoCatFound from "./components/NoCatFound";

const ShowContent: FC = () => {
  const { userCats } = useStore();

  return (
    <>
      <Box textAlign="center">
        <Heading as="h1" size="lg" marginBottom={6}>
          Cats Inventory
        </Heading>
        <Heading as="h4" size="sm" fontWeight="normal">
          Display all the cats NFTs that you own.
        </Heading>
      </Box>

      <Loading props={userCats} />

      {userCats && userCats?.length === 0 ? (
        <NoCatFound />
      ) : (
        <Wrap w={"80%"} justify="center" m="auto" p={5}>
          {userCats?.map((cat: Cat, index: number) => {
            return (
              <DisplayCat
                dnaBN={Number(cat.genes)}
                key={index}
                id={Number(cat.indexId)}
                generation={Number(cat.generation)}
              />
            );
          })}
        </Wrap>
      )}
    </>
  );
};

export default ShowContent;
