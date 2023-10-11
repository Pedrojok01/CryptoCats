import { FC } from "react";

import { Box, Button, Center, useColorMode, useDisclosure, VStack } from "@chakra-ui/react";

import { RenderCat } from "@/components/elements";

import CatSelectModal from "./CatSelectModal";

const CatSelection: FC<CatSelectionProps> = ({ parent, setParent, name, otherParent, loading }) => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        bgColor={colorMode === "light" ? "#ededed" : "#4f5050"}
        w={350}
        h={"fit-content"}
        paddingBlock={8}
        borderRadius={10}
      >
        <Center>
          <VStack>
            {parent && (
              <>
                <RenderCat dna={parent.dna} id={parent.id} generation={parent.generation} isFactory={false} />
                <br></br>
              </>
            )}
            <Button colorScheme="pink" onClick={onOpen} isLoading={loading}>
              {!parent ? `Select ${name}` : "Change"}
            </Button>
          </VStack>
        </Center>
      </Box>

      <CatSelectModal isOpen={isOpen} onClose={onClose} setParent={setParent} otherParent={otherParent} />
    </>
  );
};

export default CatSelection;
