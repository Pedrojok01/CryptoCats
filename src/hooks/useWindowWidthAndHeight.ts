import { useEffect, useState } from "react";

export const useWindowWidthAndHeight = () => {
    const windowInnerSize = [window.innerWidth, window.innerHeight];
    const [windowSize, setWidowSize] = useState<number[]>(windowInnerSize);

    useEffect(() => {
        const changeWindowSize = () => {
            setWidowSize([window.innerWidth, window.innerHeight]);
        };
        window.addEventListener("resize", changeWindowSize);
        return () => window.removeEventListener("resize", changeWindowSize);
    }, []);

    const isMobile = windowSize[0] <= 768;
    const isMediumScreen = windowSize[0] <= 1250;

    return { windowSize, isMobile, isMediumScreen };
};
