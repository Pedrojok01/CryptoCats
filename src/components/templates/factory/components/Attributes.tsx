import { FC, useCallback, useState } from "react";

import { HStack, Button, Box } from "@chakra-ui/react";

import Selector from "./Selector";
import { getAnimBadge, getBgBadge, getEyesBadge, getShapeBadge } from "@/utils/getBadge";

const COLOR_RANGE = { min: "10", max: "98" };
const SHAPE_RANGE_5 = { min: "1", max: "5" };
const SHAPE_RANGE_6 = { min: "1", max: "6" };

const Attributes: FC<AttributesProps> = ({
  dna,
  setHeadColor,
  setMouthColor,
  setPawsColor,
  setEyesColor,
  setCollarColor,
  setEyesShape,
  setForeheadShape,
  setDecorationColor,
  setAnimation,
  setBackgroundColor,
}) => {
  const [isColorTab, setIsColorTab] = useState(true);

  const toogleTab = useCallback(() => {
    setIsColorTab((prev) => !prev);
  }, []);

  const colorSelectors = (
    <>
      <Selector action={setHeadColor} name="Head and body color" range={COLOR_RANGE} idCode={dna.headColor} />
      <Selector action={setMouthColor} name="Mouth and belly color" range={COLOR_RANGE} idCode={dna.mouthColor} />
      <Selector action={setPawsColor} name="Paws, ears and tail color" range={COLOR_RANGE} idCode={dna.pawsColor} />
      <Selector action={setEyesColor} name="Eyes and tail-ball color" range={COLOR_RANGE} idCode={dna.eyesColor} />
      <Selector action={setCollarColor} name="Collar color" range={COLOR_RANGE} idCode={dna.collarColor} />
    </>
  );

  const cattributeSelectors = (
    <>
      <Selector
        action={setEyesShape}
        name="Eyes shape"
        range={SHAPE_RANGE_6}
        idCode={dna.eyesShape}
        badge={getEyesBadge(dna.eyesShape)}
      />
      <Selector
        action={setForeheadShape}
        name="Forehead shape"
        range={SHAPE_RANGE_5}
        idCode={dna.foreheadShape}
        badge={getShapeBadge(dna.foreheadShape)}
      />
      <Selector action={setDecorationColor} name="Forehead's color" range={COLOR_RANGE} idCode={dna.decorationColor} />
      <Selector
        action={setAnimation}
        name="Animation"
        range={SHAPE_RANGE_6}
        idCode={dna.animation}
        badge={getAnimBadge(dna.animation)}
      />
      <Selector
        action={setBackgroundColor}
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
