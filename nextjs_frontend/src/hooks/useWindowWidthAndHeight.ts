import { useEffect, useState } from "react";

export const useWindowWidthAndHeight = () => {
  const windowInnerSize = [window.innerWidth, window.innerHeight];
  const [windowSize, setWindowSize] = useState<number[]>(windowInnerSize);

  useEffect(() => {
    const changeWindowSize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", changeWindowSize);
    return () => window.removeEventListener("resize", changeWindowSize);
  }, []);

  const isMobile = windowSize[0] ? windowSize[0] <= 768 : false;
  const isMediumScreen = windowSize[0] ? windowSize[0] <= 950 : false;

  return { windowSize, isMobile, isMediumScreen };
};
