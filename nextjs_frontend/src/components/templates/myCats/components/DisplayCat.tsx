import { useMemo, type FC, useCallback } from "react";

import { Badge, Box, Button, HStack, VStack } from "@chakra-ui/react";

import { RenderCat } from "@/components/elements";
import { catDna } from "@/utils/catsUtils";

const DisplayCat: FC<DisplayCatProps> = ({
  dnaBN,
  id,
  generation,
  selectable,
  setSelected,
  onClose,
  price,
  ownOffer,
  action,
  loading,
}) => {
  const parsedDna = useMemo(() => catDna(dnaBN), [dnaBN]);

  const handleMarketAction = useCallback(async () => {
    if (!action) {
      console.error("Action function is undefined");
      return;
    }

    if (ownOffer) await action(id);
    else await action(id, price);
  }, [ownOffer, action, id, price]);

  const selectCat = useCallback(() => {
    const cat: SelectedCat = { dna: parsedDna, id: id, generation: generation };
    setSelected(cat);
    if (onClose) onClose();
  }, [parsedDna, id, generation, setSelected, onClose]);

  return (
    <>
      {selectable ? (
        <Box cursor="pointer" onClick={selectCat}>
          <RenderCat dna={parsedDna} id={id} generation={generation} isFactory={false} />
        </Box>
      ) : (
        <VStack>
          <RenderCat dna={parsedDna} id={id} generation={generation} isFactory={false} />
          {price && (
            <HStack>
              <Badge fontSize="lg">{price} ETH</Badge>
              {ownOffer ? (
                <Button colorScheme="red" isLoading={loading} onClick={handleMarketAction}>
                  CANCEL
                </Button>
              ) : (
                <Button colorScheme="green" isLoading={loading} onClick={handleMarketAction}>
                  BUY
                </Button>
              )}
            </HStack>
          )}
        </VStack>
      )}
    </>
  );
};

export default DisplayCat;
