import { useEffect, useState } from "react";

import { noAnim, movingHead, movingTail, movingPaws, movingEyes, movingAll } from "../../../../data/catStettings";

export const useAnimation = (num: number) => {
  const [catAnimation, setCatAnimation] = useState<CatAnimation>(noAnim);

  const handleAnimation = () => {
    switch (parseInt(num.toString())) {
      case 1:
        setCatAnimation(noAnim);
        break;
      case 2:
        setCatAnimation(movingHead);
        break;
      case 3:
        setCatAnimation(movingTail);
        break;
      case 4:
        setCatAnimation(movingPaws);
        break;
      case 5:
        setCatAnimation(movingEyes);
        break;
      case 6:
        setCatAnimation(movingAll);
        break;
      default:
        setCatAnimation(noAnim);
        break;
    }
  };

  useEffect(() => {
    handleAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [num]);

  return { catAnimation };
};
