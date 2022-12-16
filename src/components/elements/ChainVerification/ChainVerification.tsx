import { FC } from "react";

import { Box, Button, Flex, Text } from "@chakra-ui/react";

import { isProdEnv } from "../../../data/constant";
import { useSuportedChains } from "../../../hooks/useSupportedChains";

const ChainVerification: FC = () => {
    const isSupportedChain = useSuportedChains();

    const handleSwitch = async () => {
        try {
            if (window.ethereum) {
                await window.ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: isProdEnv ? [{ chainId: "0x1" }] : [{ chainId: "0x5" }],
                });
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            {!isSupportedChain && (
                <Box w={"100%"} p={"8px 0px"} bg="rgb(255, 127, 105) none repeat scroll 0% 0%">
                    <Flex direction="row" alignItems={"center"} justify="space-evenly">
                        <Text paddingInline="15px" fontWeight="550" fontSize="16px">
                            Wrong network. Please switch to {isProdEnv ? "Ethereum Mainnet" : "Goerli Testnet"}.
                        </Text>
                        <Button onClick={() => handleSwitch()}>Switch Network</Button>
                    </Flex>
                </Box>
            )}
        </>
    );
};

export default ChainVerification;
