import { FC } from "react";

import { Box, Text, useColorMode, VStack } from "@chakra-ui/react";

import styles from "../../../styles/Cat.module.css";

const RenderCatInfo: FC<RenderCatInfoProps> = ({ dna, id, generation, isFactory }) => {
    const { colorMode } = useColorMode();

    return (
        <>
            {isFactory ? (
                <Box className={styles.dnaDiv} p={2}>
                    <Box
                        bgColor={colorMode === "light" ? "#bfbfbf" : "#3a3b3c"}
                        w="fit-content"
                        m="auto"
                        p={"1px 5px"}
                        borderRadius={3}
                        fontWeight={500}
                    >
                        DNA: {dna.headColor} {dna.mouthColor} {dna.pawsColor} {dna.eyesColor} {dna.collarColor}{" "}
                        {dna.eyesShape}
                        {dna.foreheadShape} {dna.decorationColor} {dna.animation}
                        {dna.backgroundColor}
                    </Box>
                </Box>
            ) : (
                <Box>
                    <VStack className={styles.dnaDiv} m="auto" pb={4} spacing={1}>
                        <Box
                            bgColor={colorMode === "light" ? "#bfbfbf" : "#3a3b3c"}
                            w="fit-content"
                            m="auto"
                            p={"1px 5px"}
                            borderRadius={3}
                        >
                            <Text textAlign="center" fontSize="sm" fontWeight={500}>
                                ID: {id}
                            </Text>
                        </Box>
                        <Box
                            bgColor={colorMode === "light" ? "#bfbfbf" : "#3a3b3c"}
                            w="fit-content"
                            m="auto"
                            p={"1px 5px"}
                            borderRadius={3}
                        >
                            <Text textAlign="center" fontSize="sm" fontWeight={500}>
                                GEN: {generation}
                            </Text>
                        </Box>
                        <Box
                            bgColor={colorMode === "light" ? "#bfbfbf" : "#3a3b3c"}
                            w="fit-content"
                            m="auto"
                            p={"1px 5px"}
                            borderRadius={3}
                        >
                            <Text fontSize="sm" fontWeight={500}>
                                DNA: {dna.headColor} {dna.mouthColor} {dna.pawsColor} {dna.eyesColor} {dna.collarColor}{" "}
                                {dna.eyesShape}
                                {dna.foreheadShape} {dna.decorationColor} {dna.animation}
                                {dna.backgroundColor}
                            </Text>
                        </Box>
                    </VStack>
                </Box>
            )}
        </>
    );
};

export default RenderCatInfo;
