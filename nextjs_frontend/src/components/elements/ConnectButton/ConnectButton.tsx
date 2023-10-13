import type { FC } from "react";

import { Button, useDisclosure } from "@chakra-ui/react";
import { useAccount } from "wagmi";

import { useWindowWidthAndHeight } from "@/hooks/useWindowWidthAndHeight";
import { getEllipsisTxt } from "@/utils/format";

import ConnectModal from "./ConnectModal";
import DisconnectModal from "./DisconnectModal";

const ConnectButton: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { connector: isConnected, address } = useAccount();
  const { isMobile } = useWindowWidthAndHeight();

  return (
    <>
      {!isConnected ? (
        <>
          <Button size="sm" className="box-shadow" onClick={onOpen}>
            Connect Wallet
          </Button>
          <ConnectModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </>
      ) : (
        <>
          <Button size="sm" className="box-shadow" onClick={onOpen}>
            {address && typeof address === "string" && (
              <p>{isMobile ? getEllipsisTxt(address, 5) : getEllipsisTxt(address, 4)}</p>
            )}
          </Button>

          <DisconnectModal isOpen={isOpen} onClose={onClose} />
        </>
      )}
    </>
  );
};

export default ConnectButton;
