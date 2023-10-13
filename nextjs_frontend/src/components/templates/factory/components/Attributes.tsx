import { type FC, useCallback, useState } from "react";

import { HStack, Button, Box } from "@chakra-ui/react";

import { catAttributes, colorAttributes } from "@/data/catAttributes";

import Selector from "./Selector";

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

  const colorSelectors = colorAttributes.map((attr) => (
    <Selector
      key={attr.colorName}
      colorName={attr.colorName}
      action={handleColorChange}
      name={attr.name}
      range={attr.range}
      idCode={dna[attr.colorName as keyof DNA]}
    />
  ));

  const cattributeSelectors = catAttributes.map((attr) => (
    <Selector
      key={attr.colorName}
      colorName={attr.colorName}
      action={handleColorChange}
      name={attr.name}
      range={attr.range}
      idCode={dna[attr.colorName as keyof DNA]}
      badge={attr.badge ? attr.badge(dna[attr.colorName as keyof DNA]) : undefined}
    />
  ));

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
