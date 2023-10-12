// useContractInstances.ts
import { useContract } from "./useContract";
import { contracts } from "../data/contracts";

type ContractInstances = {
  clientType: "public" | "wallet";
};

export const useContractInstances = ({ clientType }: ContractInstances) => {
  const catInstance = useContract({ address: contracts.cat.address, abi: contracts.cat.abi, clientType: clientType });
  const marketplaceInstance = useContract({
    address: contracts.marketplace.address,
    abi: contracts.marketplace.abi,
    clientType: clientType,
  });

  if (!catInstance) {
    throw Error("Cat contract instance is undefined");
  }

  if (!marketplaceInstance) {
    throw Error("Marketplace contract instance is undefined");
  }

  return { catInstance, marketplaceInstance };
};
