import { getContractAddresses } from "./constant";
import { CAT_ABI } from "../data/abis/catContract_abi";
import { MARKET_ABI } from "../data/abis/marketplace_abi";
import { Abi } from "viem";

const { catAddress, marketplaceAddress } = getContractAddresses();

export const contracts = {
    cat: {
        address: catAddress,
        abi: CAT_ABI as Abi,
    },
    marketplace: {
        address: marketplaceAddress,
        abi: MARKET_ABI as Abi,
    },
};
