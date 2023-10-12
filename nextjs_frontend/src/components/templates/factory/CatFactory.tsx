import { type FC, useEffect, useState } from "react";

import { Box, Button, Card, Flex, Heading, useColorMode } from "@chakra-ui/react";

import { RenderCat } from "@/components/elements";
import { defaultDNA } from "@/data/catStettings";
import { useReadContract, useWriteContract, useWindowWidthAndHeight } from "@/hooks";
import { useStore } from "@/store/store";

import Attributes from "./components/Attributes";

const CatFactory: FC = () => {
  const { colorMode } = useColorMode();
  const { isMobile, isMediumScreen } = useWindowWidthAndHeight();
  const { getGen0Count, getMaxGen0Supply } = useReadContract();
  const { gen0Count, maxGen0Supply } = useStore();
  const { mintCat, loading } = useWriteContract();

  useEffect(() => {
    getGen0Count();
    getMaxGen0Supply();
  }, [getGen0Count, getMaxGen0Supply]);

  // Color
  const [headColor, setHeadColor] = useState<number>(defaultDNA.bodyColor);
  const [mouthColor, setMouthColor] = useState<number>(defaultDNA.mouthColor);
  const [pawsColor, setPawsColor] = useState<number>(defaultDNA.pawsColor);
  const [eyesColor, setEyesColor] = useState<number>(defaultDNA.eyesColor);
  const [collarColor, setCollarColor] = useState<number>(defaultDNA.collarColor);
  // Attributes
  const [eyesShape, setEyesShape] = useState<number>(defaultDNA.eyesShape);
  const [foreheadShape, setForeheadShape] = useState<number>(defaultDNA.decorationPattern);
  const [decorationColor, setDecorationColor] = useState<number>(defaultDNA.decorationColor);
  const [animation, setAnimation] = useState<number>(defaultDNA.animation);
  const [backgroundColor, setBackgroundColor] = useState<number>(defaultDNA.background);

  const dnaToRender: DNA = {
    headColor: headColor,
    mouthColor: mouthColor,
    pawsColor: pawsColor,
    eyesColor: eyesColor,
    collarColor: collarColor,
    eyesShape: eyesShape,
    foreheadShape: foreheadShape,
    decorationColor: decorationColor,
    animation: animation,
    backgroundColor: backgroundColor,
  };

  const resetCatToDefault = () => {
    setHeadColor(defaultDNA.bodyColor);
    setMouthColor(defaultDNA.mouthColor);
    setPawsColor(defaultDNA.pawsColor);
    setEyesColor(defaultDNA.eyesColor);
    setCollarColor(defaultDNA.collarColor);

    setEyesShape(defaultDNA.eyesShape);
    setForeheadShape(defaultDNA.decorationPattern);
    setDecorationColor(defaultDNA.decorationColor);
    setAnimation(defaultDNA.animation);
    setBackgroundColor(defaultDNA.background);
  };

  const generateRandomCat = () => {
    const randomDNA = {
      bodyColor: Math.floor(Math.random() * 89) + 10,
      mouthColor: Math.floor(Math.random() * 89) + 10,
      pawsColor: Math.floor(Math.random() * 89) + 10,
      eyesColor: Math.floor(Math.random() * 89) + 10,
      collarColor: Math.floor(Math.random() * 89) + 10,
      eyesShape: Math.floor(Math.random() * 6) + 1,
      decorationPattern: Math.floor(Math.random() * 5) + 1,
      decorationColor: Math.floor(Math.random() * 89) + 10,
      animation: Math.floor(Math.random() * 6) + 1,
      background: Math.floor(Math.random() * 4) + 1,
    };
    setHeadColor(randomDNA.bodyColor);
    setMouthColor(randomDNA.mouthColor);
    setPawsColor(randomDNA.pawsColor);
    setEyesColor(randomDNA.eyesColor);
    setCollarColor(randomDNA.collarColor);
    setEyesShape(randomDNA.eyesShape);
    setForeheadShape(randomDNA.decorationPattern);
    setDecorationColor(randomDNA.decorationColor);
    setAnimation(randomDNA.animation);
    setBackgroundColor(randomDNA.background);
  };

  const handleMint = async () => {
    const dna =
      headColor.toString() +
      mouthColor.toString() +
      pawsColor.toString() +
      eyesColor.toString() +
      collarColor.toString() +
      eyesShape.toString() +
      foreheadShape.toString() +
      decorationColor.toString() +
      animation.toString() +
      backgroundColor.toString();
    await mintCat(dna);
    getGen0Count();
  };

  return (
    <>
      <Box textAlign="center">
        <Heading as="h1" size="lg" marginBottom={6}>
          Cats-Factory
        </Heading>
        <Heading as="h4" size="sm" fontWeight="normal">
          Create your custom NFT Cat from scratch! <br />(<span>{gen0Count}</span> out of {maxGen0Supply}!)
        </Heading>
      </Box>

      <Flex w="80%" justify="center" m="auto" wrap={"wrap"} p={5} gap={5}>
        <Box w={isMobile ? 400 : isMediumScreen ? 600 : 350} minW={350}>
          <RenderCat dna={dnaToRender} isFactory={true} />
          <Flex gap={2} m={"3"} justify="center">
            <Button colorScheme="blue" onClick={resetCatToDefault}>
              Default DNA
            </Button>
            <Button colorScheme="yellow" onClick={generateRandomCat}>
              Random DNA
            </Button>
          </Flex>
        </Box>
        <Box w={isMobile ? 400 : isMediumScreen ? 600 : 500} minW={350}>
          <Card bgColor={colorMode === "light" ? "#ededed" : "#4f5050"} borderRadius="10" p={5}>
            <Attributes
              dna={dnaToRender}
              setHeadColor={setHeadColor}
              setMouthColor={setMouthColor}
              setPawsColor={setPawsColor}
              setEyesColor={setEyesColor}
              setCollarColor={setCollarColor}
              setEyesShape={setEyesShape}
              setForeheadShape={setForeheadShape}
              setDecorationColor={setDecorationColor}
              setAnimation={setAnimation}
              setBackgroundColor={setBackgroundColor}
            />
          </Card>
          <Flex m={"3"} justify="flex-end">
            <Button colorScheme="green" onClick={handleMint} isLoading={loading} disabled={loading}>
              CREATE
            </Button>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default CatFactory;
