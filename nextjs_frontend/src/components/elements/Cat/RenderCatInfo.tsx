import type { FC } from "react";

import { Box, Text, useColorMode, VStack } from "@chakra-ui/react";

import styles from "@/styles/Cat.module.css";

import DnaText from "./DnaText";

const RenderCatInfo: FC<RenderCatInfoProps> = ({ dna, id, generation, isFactory }) => {
  const { colorMode } = useColorMode();
  const bgColor = colorMode === "light" ? "#bfbfbf" : "#3a3b3c";

  const DnaBox = (
    <Box bgColor={bgColor} w="fit-content" m="auto" p={"1px 5px"} borderRadius={3}>
      <DnaText dna={dna} />
    </Box>
  );

  return (
    <Box className={styles.dnaDiv} p={isFactory ? 2 : undefined}>
      {isFactory ? (
        DnaBox
      ) : (
        <VStack m="auto" pb={4} spacing={1}>
          <Box {...{ bgColor, w: "fit-content", m: "auto", p: "1px 5px", borderRadius: 3 }}>
            <Text textAlign="center" fontSize="sm" fontWeight={500}>
              ID: {id}
            </Text>
          </Box>
          <Box {...{ bgColor, w: "fit-content", m: "auto", p: "1px 5px", borderRadius: 3 }}>
            <Text textAlign="center" fontSize="sm" fontWeight={500}>
              GEN: {generation}
            </Text>
          </Box>
          {DnaBox}
        </VStack>
      )}
    </Box>
  );
};

export default RenderCatInfo;
