import { useState } from "react";

import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import { BigNumberish, parseUnits } from "ethers";

import { useContract } from "./useContract";
import useReadContract from "./useReadContract";
import { Catcontract } from "../../types/Catcontract";
import { CatMarketplace } from "../../types/CatMarketplace";
import { CAT_ABI } from "../data/abis/catContract_abi";
import { MARKET_ABI } from "../data/abis/marketplace_abi";
import { getContractAddresses } from "../data/constant";
import { getExplorer } from "../utils/getExplorerByChain";

const useWriteContract = () => {
    const toast = useToast();
    const { catAddress, marketplaceAddress } = getContractAddresses();
    const catInstance: Catcontract = useContract(catAddress, CAT_ABI);
    const marketplaceInstance: CatMarketplace = useContract(marketplaceAddress, MARKET_ABI);
    const { syncCatsOffersForMarket, syncCatsWithoutOffer } = useReadContract();
    const [loading, setLoading] = useState<boolean>(false);

    /* Set Token Allowance:
     *************************/
    const approveNft = async () => {
        setLoading(true);
        try {
            const tx = await catInstance.setApprovalForAll(marketplaceAddress, true);
            await tx.wait();
            const title = "NFT Approval set";
            const msg = `Allowance succesfully set.`;
            toast({
                title: title,
                description: msg,
                position: "top-right",
                status: "success",
                duration: 10000,
                isClosable: true,
            });
            setLoading(false);
        } catch (error: any) {
            const title = "NFT Approval denied";
            const msg = "Something went wrong while setting the allowance. Please try again.";
            toast({
                title: title,
                description: msg,
                position: "top-right",
                status: "error",
                duration: 10000,
                isClosable: true,
            });

            console.log(error.reason ? error.reason : error.message);
            setLoading(false);
        }
    };

    /* Mint a gen0 cat from the factory :
     *************************************/
    const mintCat = async (dna: string): Promise<any> => {
        setLoading(true);
        try {
            const tx = await catInstance.createCatGen0(dna);
            const receipt = await tx.wait();
            const link = `${getExplorer()}tx/${receipt.transactionHash}`;
            const title = "Mint Successfully";
            const msg = (
                <>
                    Your cat has been succesfully created!
                    <br></br>
                    <a href={link} target="_blank" rel="noreferrer noopener">
                        View in explorer: &nbsp;
                        <ExternalLinkIcon style={{ transform: "scale(1.3)", color: "purple" }} />
                    </a>
                </>
            );
            toast({
                title: title,
                description: msg,
                position: "top-right",
                status: "success",
                duration: 10000,
                isClosable: true,
            });
            setLoading(false);
        } catch (error: any) {
            const title = "An error occured";
            const msg = error.reason ? error.reason : "An unexpected error occured while minting.";
            toast({
                title: title,
                description: msg,
                position: "top-right",
                status: "error",
                duration: 10000,
                isClosable: true,
            });
            setLoading(false);
            return error.reason ? error.reason : error.message ? error.message : "Unexpected error";
        }
    };

    /* Breed a new cat from 2 parents :
     ***********************************/
    const breedCat = async (id1: number, id2: number): Promise<any> => {
        setLoading(true);
        try {
            const tx = await catInstance.breed(id1, id2);
            const receipt = await tx.wait();
            const link = `${getExplorer()}tx/${receipt.transactionHash}`;
            const title = "Breed Successful";
            const msg = (
                <>
                    Your seebling is born!
                    <br></br>
                    <a href={link} target="_blank" rel="noreferrer noopener">
                        View in explorer: &nbsp;
                        <ExternalLinkIcon style={{ transform: "scale(1.3)", color: "purple" }} />
                    </a>
                </>
            );
            toast({
                title: title,
                description: msg,
                position: "top-right",
                status: "success",
                duration: 10000,
                isClosable: true,
            });
            setLoading(false);
        } catch (error: any) {
            const title = "An error occured";
            const msg = error.reason ? error.reason : "An unexpected error occured while breeding.";
            toast({
                title: title,
                description: msg,
                position: "top-right",
                status: "error",
                duration: 10000,
                isClosable: true,
            });
            setLoading(false);
            return error.reason ? error.reason : error.message ? error.message : "Unexpected error";
        }
    };

    /* Add a cat offer to the marketplace :
     *****************************************/
    const sellCat = async (price: BigNumberish, id: number): Promise<any> => {
        setLoading(true);
        try {
            const tx = await marketplaceInstance.setOffer(price, id);
            const receipt = await tx.wait();
            const link = `${getExplorer()}tx/${receipt.transactionHash}`;
            const title = "Offer Successful";
            const msg = (
                <>
                    Your cat offer has been added to the marketplace!
                    <br></br>
                    <a href={link} target="_blank" rel="noreferrer noopener">
                        View in explorer: &nbsp;
                        <ExternalLinkIcon style={{ transform: "scale(1.3)", color: "purple" }} />
                    </a>
                </>
            );
            toast({
                title: title,
                description: msg,
                position: "top-right",
                status: "success",
                duration: 10000,
                isClosable: true,
            });
            syncCatsWithoutOffer();
            setLoading(false);
        } catch (error: any) {
            const title = "An error occured";
            const msg = error.reason ? error.reason : "An unexpected error occured while setting the offer.";
            toast({
                title: title,
                description: msg,
                position: "top-right",
                status: "error",
                duration: 10000,
                isClosable: true,
            });
            setLoading(false);
            return error.reason ? error.reason : error.message ? error.message : "Unexpected error";
        }
    };

    /* Remove a cat offer from the marketplace :
     *********************************************/
    const cancelOffer = async (id: number): Promise<any> => {
        setLoading(true);
        try {
            const tx = await marketplaceInstance.removeOffer(id);
            const receipt = await tx.wait();
            const link = `${getExplorer()}tx/${receipt.transactionHash}`;
            const title = "Offer Successfully Removed";
            const msg = (
                <>
                    Your cat id:{id} has been successfully removed from the marketplace!
                    <br></br>
                    <a href={link} target="_blank" rel="noreferrer noopener">
                        View in explorer: &nbsp;
                        <ExternalLinkIcon style={{ transform: "scale(1.3)", color: "purple" }} />
                    </a>
                </>
            );
            toast({
                title: title,
                description: msg,
                position: "top-right",
                status: "success",
                duration: 10000,
                isClosable: true,
            });
            syncCatsOffersForMarket();
            setLoading(false);
        } catch (error: any) {
            const title = "An error occured";
            const msg = error.reason ? error.reason : "An unexpected error occured while removing the offer.";
            toast({
                title: title,
                description: msg,
                position: "top-right",
                status: "error",
                duration: 10000,
                isClosable: true,
            });
            setLoading(false);
            return error.reason ? error.reason : error.message ? error.message : "Unexpected error";
        }
    };

    /* Remove a cat offer from the marketplace :
     *********************************************/
    const buyOffer = async (id: number, price: BigNumberish): Promise<any> => {
        setLoading(true);
        try {
            const tx = await marketplaceInstance.buyCat(id, { value: parseUnits(price.toString(), "ether") });
            const receipt = await tx.wait();
            const link = `${getExplorer()}tx/${receipt.transactionHash}`;
            const title = "Buy Success";
            const msg = (
                <>
                    Your have successfully purchased the cat id:{id} from the marketplace!
                    <br></br>
                    <a href={link} target="_blank" rel="noreferrer noopener">
                        View in explorer: &nbsp;
                        <ExternalLinkIcon style={{ transform: "scale(1.3)", color: "purple" }} />
                    </a>
                </>
            );
            toast({
                title: title,
                description: msg,
                position: "top-right",
                status: "success",
                duration: 10000,
                isClosable: true,
            });
            syncCatsOffersForMarket();
            setLoading(false);
        } catch (error: any) {
            const title = "An error occured";
            const msg = error.reason ? error.reason : "An unexpected error occured while buying the cat.";
            toast({
                title: title,
                description: msg,
                position: "top-right",
                status: "error",
                duration: 10000,
                isClosable: true,
            });
            setLoading(false);
            return error.reason ? error.reason : error.message ? error.message : "Unexpected error";
        }
    };

    return { approveNft, mintCat, breedCat, sellCat, cancelOffer, buyOffer, loading };
};

export default useWriteContract;
