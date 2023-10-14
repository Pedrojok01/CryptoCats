import { useCallback, useEffect, useState } from "react";

import { basic, crescendo, none, thirdEyes, wild } from "@/data/catStettings";

export const useForeheadDecoration = (num: number) => {
  const [forehead, setForehead] = useState<ForeheadShape>(basic);

  const handleForeheadShape = useCallback(() => {
    switch (num) {
      case 1:
        setForehead(none);
        break;
      case 2:
        setForehead(basic);
        break;
      case 3:
        setForehead(wild);
        break;
      case 4:
        setForehead(crescendo);
        break;
      case 5:
        setForehead(thirdEyes);
        break;
    }
  }, [num]);

  useEffect(() => {
    handleForeheadShape();
  }, [num, handleForeheadShape]);

  return { forehead };
};
