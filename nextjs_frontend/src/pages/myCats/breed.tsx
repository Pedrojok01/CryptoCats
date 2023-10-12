import { type NextPage } from "next";
import { useAccount } from "wagmi";

import { NotConnected } from "@/components/elements";
import { Default } from "@/components/layouts";
import BreedContent from "@/components/templates/myCats/BreedContent";

const Breed: NextPage = () => {
  const { isConnected } = useAccount();

  return <Default pageName="Breed">{!isConnected ? <NotConnected /> : <BreedContent />}</Default>;
};

export default Breed;
