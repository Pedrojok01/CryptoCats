import { FC, useState } from "react";

import { HStack, Button, Box } from "@chakra-ui/react";

import Selector from "./Selector";
import { getAnimBadge, getBgBadge, getEyesBadge, getShapeBadge } from "@/utils/getBadge";

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
  const [tab, setTab] = useState<boolean>(true);

  return (
    <>
      <HStack justify={"space-around"} mb={5}>
        <Button colorScheme="blue" variant={tab ? "solid" : "ghost"} onClick={() => setTab(true)}>
          Cat Colors
        </Button>
        <Button colorScheme="blue" variant={!tab ? "solid" : "ghost"} onClick={() => setTab(false)}>
          Cattributes
        </Button>
      </HStack>
      <Box textAlign="center">
        {tab ? (
          <>
            <Selector
              action={setHeadColor}
              name="Head and body color"
              range={{ min: "10", max: "98" }}
              idCode={dna.headColor}
            />
            <Selector
              action={setMouthColor}
              name={"Mouth and belly color"}
              range={{ min: "10", max: "98" }}
              idCode={dna.mouthColor}
            />
            <Selector
              action={setPawsColor}
              name={"Paws, ears and tail color"}
              range={{ min: "10", max: "98" }}
              idCode={dna.pawsColor}
            />
            <Selector
              action={setEyesColor}
              name={"Eyes and tail-ball color"}
              range={{ min: "10", max: "98" }}
              idCode={dna.eyesColor}
            />
            <Selector
              action={setCollarColor}
              name={"Collar color"}
              range={{ min: "10", max: "98" }}
              idCode={dna.collarColor}
            />
          </>
        ) : (
          <>
            <Selector
              action={setEyesShape}
              name={"Eyes shape"}
              range={{ min: "1", max: "6" }}
              idCode={dna.eyesShape}
              badge={getEyesBadge(dna.eyesShape)}
            />
            <Selector
              action={setForeheadShape}
              name={"Forehead shape"}
              range={{ min: "1", max: "5" }}
              idCode={dna.foreheadShape}
              badge={getShapeBadge(dna.foreheadShape)}
            />
            <Selector
              action={setDecorationColor}
              name={"Forehead's color"}
              range={{ min: "10", max: "98" }}
              idCode={dna.decorationColor}
            />
            <Selector
              action={setAnimation}
              name={"Animation"}
              range={{ min: "1", max: "6" }}
              idCode={dna.animation}
              badge={getAnimBadge(dna.animation)}
            />
            <Selector
              action={setBackgroundColor}
              name={"Background"}
              range={{ min: "1", max: "5" }}
              idCode={dna.backgroundColor}
              badge={getBgBadge(dna.backgroundColor)}
            />
          </>
        )}
      </Box>
    </>
  );
};

export default Attributes;
