import { useEffect, useState } from "react";

import { basicEyes, chillEyes, tiredEyes, cyclopeEyes, aseanEyes, surprisedEyes } from "@/data/catStettings";

export const useEyesShape = (num: number) => {
  const [eyes, setEyes] = useState<EyesShape>(basicEyes);

  const handleEyesShape = () => {
    switch (parseInt(num.toString())) {
      case 1:
        setEyes(basicEyes);
        break;
      case 2:
        setEyes(chillEyes);
        break;
      case 3:
        setEyes(tiredEyes);
        break;
      case 4:
        setEyes(cyclopeEyes);
        break;
      case 5:
        setEyes(aseanEyes);
        break;
      case 6:
        setEyes(surprisedEyes);
        break;
      default:
        setEyes(basicEyes);
        break;
    }
  };

  useEffect(() => {
    handleEyesShape();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [num]);

  return { eyes };
};
