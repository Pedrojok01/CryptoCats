import { CSSProperties, useEffect, useState } from "react";

import { CopyIcon } from "@chakra-ui/icons";
import { Skeleton, Tooltip } from "@chakra-ui/react";

import { getEllipsisTxt } from "../../../utils/format";
import Blockie from "./Blockie";

const styles = {
    address: {
        height: "42px",
        display: "flex",
        gap: "15px",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: "9px",
        alignItems: "center",
        paddingLeft: "20px",
    },
};

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
        <div style={{ ...props.style, ...styles.address, borderRadius: "50px" }}>
            {props.avatar === "left" && <Blockie seed={address} size={7} />}
            <p>{props.size ? getEllipsisTxt(address, props.size) : address}</p>
            {props.avatar === "right" && <Blockie seed={address} size={7} />}
            {props.copyable && (isClicked ? <Check /> : <Copy />)}
        </div>
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
