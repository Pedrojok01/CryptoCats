import type { FC } from "react";

import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Button, Card, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { useAccount, useDisconnect } from "wagmi";

import { getExplorer } from "@/utils/getExplorerByChain";

import Address from "./Address";

type DisconnectModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const DisconnectModal: FC<DisconnectModalProps> = ({ isOpen, onClose }) => {
  const { address, chain } = useAccount();
  const { disconnect } = useDisconnect();

  const disconnectWallet = async () => {
    disconnect();
    onClose();
    localStorage.removeItem("connectorId");
    window.location.reload();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent w={340}>
        <ModalCloseButton />
        <ModalBody>
          Account
          <Card mt={3} p={"15px"} borderRadius="1rem">
            <Address account={address as string} avatar="left" size={6} copyable style={{ fontSize: "20px" }} />
            <div style={{ marginTop: "10px", padding: "0 10px" }}>
              {chain?.id !== undefined && (
                <a href={`${getExplorer()}/address/${address}`} target="_blank" rel="noreferrer">
                  <ExternalLinkIcon mr={"5px"} />
                  View on Explorer
                </a>
              )}
            </div>
          </Card>
          <Button
            style={{
              width: "100%",
              margin: "15px auto",
              borderRadius: "0.5rem",
              fontSize: "16px",
              fontWeight: "500",
            }}
            onClick={() => disconnectWallet()}
          >
            Disconnect Wallet
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DisconnectModal;
