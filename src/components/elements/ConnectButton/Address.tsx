import { CSSProperties, useEffect, useState } from "react";

import { CopyIcon } from "@chakra-ui/icons";
import { Flex, Skeleton, Tooltip } from "@chakra-ui/react";

import Jazzicons from "./Jazzicons";
import { getEllipsisTxt } from "../../../utils/format";

interface AddressProps {
    style: CSSProperties | undefined;
    avatar: string;
    size: number | undefined;
    copyable: boolean;
    account: string;
}

const Address: React.FC<AddressProps> = (props) => {
    const [address, setAddress] = useState<string>();
    const [isClicked, setIsClicked] = useState<boolean>(false);

    useEffect(() => {
        if (props.account !== undefined) setAddress(props.account);
    }, [props.account]);

    useEffect(() => {
        if (isClicked === true)
            setTimeout(() => {
                setIsClicked(false);
            }, 10000);
    }, [isClicked]);

    if (address === undefined) return <Skeleton noOfLines={1} width="100%" />;

    const Copy = () => (
        <Tooltip title="Copy Address">
            <CopyIcon
                style={{ cursor: "pointer" }}
                onClick={() => {
                    navigator.clipboard.writeText(address);
                    setIsClicked(true);
                }}
            />
        </Tooltip>
    );

    return (
        <Flex
            h={"42px"}
            pl="15px"
            gap={"15px"}
            bgColor="rgba(255, 255, 255, 0.1)"
            borderRadius={"10px"}
            alignItems="center"
            style={{ ...props.style }}
        >
            {props.avatar === "left" && <Jazzicons seed={address} />}
            <p>{props.size ? getEllipsisTxt(address, props.size) : address}</p>
            {props.avatar === "right" && <Jazzicons seed={address} />}
            {props.copyable && (isClicked ? <Check /> : <Copy />)}
        </Flex>
    );
};

export default Address;

const Check = () => (
    <Tooltip title="Copied!">
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="#21BF96"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12l5 5l10 -10" />
            <title id="copied-address">Copied!</title>
        </svg>
    </Tooltip>
);
