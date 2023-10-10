import { FC } from "react";

import { Badge, Box, Button, HStack, VStack } from "@chakra-ui/react";

import { RenderCat } from "../../../elements";

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
    //Split the cat DNA to use in the render
    const catDna = (dnaBN: bigint) => {
        const dnaStr = dnaBN.toString();
        const dna: DNA = {
            //Colors
            headColor: Number(dnaStr.substring(0, 2)),
            mouthColor: Number(dnaStr.substring(2, 4)),
            pawsColor: Number(dnaStr.substring(4, 6)),
            eyesColor: Number(dnaStr.substring(6, 8)),
            collarColor: Number(dnaStr.substring(8, 10)),
            //Cattributes
            eyesShape: Number(dnaStr.substring(10, 11)),
            foreheadShape: Number(dnaStr.substring(11, 12)),
            decorationColor: Number(dnaStr.substring(12, 14)),
            animation: Number(dnaStr.substring(14, 15)),
            backgroundColor: Number(dnaStr.substring(15, 16)),
        };
        return dna;
    };

    const handleMarketAction = async () => {
        if (ownOffer) await action(id);
        else await action(id, price);
    };

    const selectCat = () => {
        const cat = { dna: catDna(dnaBN), id: id, generation: generation };
        setSelected(cat);
        if (onClose) onClose();
    };

    return (
        <>
            {selectable ? (
                <Box style={{ cursor: "pointer" }} onClick={selectCat}>
                    <RenderCat dna={catDna(dnaBN)} id={id} generation={generation} isFactory={false} />
                </Box>
            ) : (
                <VStack>
                    <RenderCat dna={catDna(dnaBN)} id={id} generation={generation} isFactory={false} />
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
