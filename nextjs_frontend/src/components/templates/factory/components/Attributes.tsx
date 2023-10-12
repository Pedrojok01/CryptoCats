import { type FC, useCallback, useState } from "react";

import { HStack, Button, Box } from "@chakra-ui/react";

import { getAnimBadge, getBgBadge, getEyesBadge, getShapeBadge } from "@/utils/getBadge";

import Selector from "./Selector";

const COLOR_RANGE = { min: "10", max: "98" };
const SHAPE_RANGE_5 = { min: "1", max: "5" };
const SHAPE_RANGE_6 = { min: "1", max: "6" };

const Attributes: FC<AttributesProps> = ({ dna, updateDna }) => {
  const [isColorTab, setIsColorTab] = useState(true);

  const toogleTab = useCallback(() => {
    setIsColorTab((prev) => !prev);
  }, []);

  const handleColorChange = useCallback(
    (colorName: keyof DNA, value: number) => {
      updateDna({ [colorName]: value });
    },
    [updateDna]
  );

  const colorSelectors = (
    <>
      <Selector
        action={(value: number) => handleColorChange("headColor", value)}
        name="Head and body color"
        range={COLOR_RANGE}
        idCode={dna.headColor}
      />
      <Selector
        action={(value: number) => handleColorChange("mouthColor", value)}
        name="Mouth and belly color"
        range={COLOR_RANGE}
        idCode={dna.mouthColor}
      />
      <Selector
        action={(value: number) => handleColorChange("pawsColor", value)}
        name="Paws, ears and tail color"
        range={COLOR_RANGE}
        idCode={dna.pawsColor}
      />
      <Selector
        action={(value: number) => handleColorChange("eyesColor", value)}
        name="Eyes and tail-ball color"
        range={COLOR_RANGE}
        idCode={dna.eyesColor}
      />
      <Selector
        action={(value: number) => handleColorChange("collarColor", value)}
        name="Collar color"
        range={COLOR_RANGE}
        idCode={dna.collarColor}
      />
    </>
  );

  const cattributeSelectors = (
    <>
      <Selector
        action={(value: number) => handleColorChange("eyesShape", value)}
        name="Eyes shape"
        range={SHAPE_RANGE_6}
        idCode={dna.eyesShape}
        badge={getEyesBadge(dna.eyesShape)}
      />
      <Selector
        action={(value: number) => handleColorChange("foreheadShape", value)}
        name="Forehead shape"
        range={SHAPE_RANGE_5}
        idCode={dna.foreheadShape}
        badge={getShapeBadge(dna.foreheadShape)}
      />
      <Selector
        action={(value: number) => handleColorChange("decorationColor", value)}
        name="Forehead's color"
        range={COLOR_RANGE}
        idCode={dna.decorationColor}
      />
      <Selector
        action={(value: number) => handleColorChange("animation", value)}
        name="Animation"
        range={SHAPE_RANGE_6}
        idCode={dna.animation}
        badge={getAnimBadge(dna.animation)}
      />
      <Selector
        action={(value: number) => handleColorChange("backgroundColor", value)}
        name="Background"
        range={SHAPE_RANGE_5}
        idCode={dna.backgroundColor}
        badge={getBgBadge(dna.backgroundColor)}
      />
    </>
  );

  return (
    <>
      <HStack justify={"space-around"} mb={5}>
        <Button colorScheme="blue" variant={isColorTab ? "solid" : "ghost"} onClick={() => toogleTab()}>
          Cat Colors
        </Button>
        <Button colorScheme="blue" variant={!isColorTab ? "solid" : "ghost"} onClick={() => toogleTab()}>
          Cattributes
        </Button>
      </HStack>
      <Box textAlign="center">{isColorTab ? colorSelectors : cattributeSelectors}</Box>
    </>
  );
};

export default Attributes;
