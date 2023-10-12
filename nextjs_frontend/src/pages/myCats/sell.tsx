import { type NextPage } from "next";
import { useAccount } from "wagmi";

import { NotConnected } from "@/components/elements";
import { Default } from "@/components/layouts";
import SellContent from "@/components/templates/myCats/SellContent";

const Sell: NextPage = () => {
  const { isConnected } = useAccount();

  return <Default pageName="Breed">{!isConnected ? <NotConnected /> : <SellContent />}</Default>;
};

export default Sell;
