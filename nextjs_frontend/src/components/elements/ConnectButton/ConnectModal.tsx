import type { FC } from "react";

import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useConnect, type Connector } from "wagmi";

import { client } from "@/wagmi";

import IMAGES from "./walletIcons";

type ConnectModalProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const ConnectModal: FC<ConnectModalProps> = ({ isOpen, onClose }) => {
  const { connect, connectors, status } = useConnect({ config: client });

  // Create a new array of unique connectors (Prevent rendering Metamask twice)
  const uniqueConnectors = Array.from(new Set(connectors.map((connector) => connector.name))).map((name) => {
    return connectors.find((connector) => connector.name === name)!;
  });

  const getConnectorImage = (connector: Connector) => {
    const data = IMAGES.filter((item) => item.name.toLowerCase() === connector.name.toLowerCase());
    return data[0]?.image.src;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent w={340} p={5}>
        <ModalCloseButton />
        <ModalBody>
          <Heading textAlign="center" p={"15px 0px 40px"} fontSize="1.65rem" className="text-shadow">
            Connect Your Wallet
          </Heading>

          <Flex direction="column">
            <VStack gap={3} mb={5}>
              {uniqueConnectors.map((connector) => (
                <Button
                  w="93%"
                  justifyContent="space-between"
                  key={connector.uid}
                  onClick={() => {
                    onClose();
                    connect({ connector });
                  }}
                  className="box-shadow"
                >
                  <span className="connect-button-text">{connector.name}</span>
                  {status === "pending" && "(connecting)"}
                  <Image
                    src={connector.icon ?? getConnectorImage(connector)}
                    width={32}
                    height={32}
                    alt={connector.name}
                  />
                </Button>
              ))}
            </VStack>

            <Flex direction="column" m={[5, "auto", 5]} alignItems="center" fontSize={"15px"}>
              Need help installing a wallet?{" "}
              <Link
                href="https://metamask.zendesk.com/hc/en-us/articles/360015489471-How-to-Install-MetaMask-Manually"
                target="_blank"
                rel="noopener"
              >
                <b>Click here</b>
              </Link>
            </Flex>

            <Box fontSize="10px" textAlign="center">
              Wallets are provided by External Providers and by selecting you agree to Terms of those Providers. Your
              access to the wallet might be reliant on the External Provider being operational.
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ConnectModal;
