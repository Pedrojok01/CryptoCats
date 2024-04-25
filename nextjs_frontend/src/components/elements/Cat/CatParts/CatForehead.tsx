import type { FC } from "react";

import { useForeheadDecoration } from "@/components/templates/factory/hooks";

interface CatForeheadProps {
  getColor: (color: number) => string;
  decorationColor: number;
  foreheadShape: number;
}

export const CatForehead: FC<CatForeheadProps> = ({ getColor, decorationColor, foreheadShape }) => {
  const { forehead } = useForeheadDecoration(foreheadShape);

  return (
    <section className={forehead.forehead}>
      <div
        className={forehead.foreheadLeft}
        style={
          foreheadShape !== 5
            ? {
                backgroundColor: getColor(decorationColor),
              }
            : {
                backgroundColor: "black",
              }
        }
      />
      <div className={forehead.foreheadMid} style={{ backgroundColor: getColor(decorationColor) }} />
      <div
        className={forehead.foreheadRight}
        style={
          foreheadShape !== 5
            ? {
                backgroundColor: getColor(decorationColor),
              }
            : {
                backgroundColor: "white",
              }
        }
      />
    </section>
  );
};
