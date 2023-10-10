import { FC } from "react";

import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Button, Card, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { useAccount, useDisconnect, useNetwork } from "wagmi";

import Address from "./Address";
import { getExplorer } from "../../../utils/getExplorerByChain";

type DisconnectModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const DisconnectModal: FC<DisconnectModalProps> = ({ isOpen, onClose }) => {
  const { chain } = useNetwork();
  const { address } = useAccount();
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
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          Account
          <Card
            style={{
              marginTop: "10px",
              borderRadius: "1rem",
              padding: "15px",
            }}
          >
            <Address account={address as string} avatar="left" size={6} copyable style={{ fontSize: "20px" }} />
            <div style={{ marginTop: "10px", padding: "0 10px" }}>
              {chain?.id !== undefined && (
                <a href={`${getExplorer()}/address/${address}`} target="_blank" rel="noreferrer">
                  <ExternalLinkIcon style={{ marginRight: "5px" }} />
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
