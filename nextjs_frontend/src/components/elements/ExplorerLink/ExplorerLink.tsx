// ExplorerLink.tsx
import React from "react";

import { ExternalLinkIcon } from "@chakra-ui/icons";

import { getExplorer } from "@/utils/getExplorerByChain";

interface ExplorerLinkProps {
  hash: string;
}

const ExplorerLink: React.FC<ExplorerLinkProps> = ({ hash }) => {
  const link = `${getExplorer()}tx/${hash}`;

  return (
    <>
      <br></br>
      View in explorer: &nbsp;
      <a href={link} target="_blank" rel="noopener noreferrer">
        <ExternalLinkIcon transform={"scale(1.3)"} color={"purple"} />
      </a>
    </>
  );
};

export default ExplorerLink;
