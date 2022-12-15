import { Skeleton } from "@chakra-ui/react";
import Blockies from "react-blockies";

/**
 * Shows a blockie image for the provided wallet address
 * @param {*} props
 * @returns <Blockies> JSX Elemenet
 */

function Blockie({ seed, size, scale }: { seed: string; size?: number; scale?: number }) {
    if (!seed) return <Skeleton width={40} />;

    if (size) return <Blockies seed={seed.toLowerCase()} size={size} className="identicon" />;
    if (scale) return <Blockies seed={seed.toLowerCase()} size={size} scale={scale} className="identicon" />;

    return <Blockies seed={seed.toLowerCase()} className="identicon" />;
}

export default Blockie;
