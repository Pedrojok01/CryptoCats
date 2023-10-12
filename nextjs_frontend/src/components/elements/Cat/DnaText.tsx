import type { FC } from "react";

import { Text } from "@chakra-ui/react";

interface DNAProps {
  dna: {
    headColor: number;
    mouthColor: number;
    pawsColor: number;
    eyesColor: number;
    collarColor: number;
    eyesShape: number;
    foreheadShape: number;
    decorationColor: number;
    animation: number;
    backgroundColor: number;
  };
}

const DnaText: FC<DNAProps> = ({ dna }) => {
  const dnaString = Object.values(dna).join(" ");

  return (
    <Text fontSize="sm" fontWeight={500}>
      DNA: {dnaString}
    </Text>
  );
};

export default DnaText;
