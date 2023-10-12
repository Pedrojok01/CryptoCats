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
import { Connector, useConnect } from "wagmi";

import IMAGES from "./walletIcons";

type ConnectModalProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const ConnectModal: FC<ConnectModalProps> = ({ isOpen, onClose }) => {
  const { connect, connectors, isLoading, pendingConnector } = useConnect();

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
          <Heading textAlign="center" p={"15px 0px 40px"} fontSize="1.65rem">
            Connect Your Wallet
          </Heading>

          <Flex direction="column">
            <VStack mb={5}>
              {connectors.map((connector) => (
                <Button
                  w="93%"
                  justifyContent="space-between"
                  disabled={!connector.ready}
                  key={connector.id}
                  onClick={() => {
                    onClose();
                    connect({ connector });
                  }}
                >
                  <span className="connect-button-text">{connector.name}</span>
                  {!connector.ready && " (unsupported)"}
                  {isLoading && connector.id === pendingConnector?.id && " (connecting)"}
                  <Image src={getConnectorImage(connector)} width={32} height={32} alt={connector.name} />
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
