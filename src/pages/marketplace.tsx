import { NextPage } from "next";
import { useAccount } from "wagmi";

import { NotConnected } from "../components/elements";
import { Default } from "../components/layouts";
import { CatMarketplace } from "../components/templates/marketplace";

const Marketplace: NextPage = () => {
  const { isConnected } = useAccount();

  return <Default pageName="Marketplace">{!isConnected ? <NotConnected /> : <CatMarketplace />}</Default>;
};

export default Marketplace;
