import type { FC } from "react";

import { useEyesShape } from "@/components/templates/factory/hooks";

interface CatEyesProps {
  getColor: (color: number) => string;
  eyesShape: number;
  eyesColor: number;
  animation: number;
  catAnimation: CatAnimation;
}

export const CatEyes: FC<CatEyesProps> = ({ getColor, eyesShape, eyesColor, animation, catAnimation }) => {
  const { eyes } = useEyesShape(eyesShape);

  return (
    <section className={"eyes"}>
      <div className={eyes.eyesLeft}>
        <div
          className={
            eyesShape === 1 || eyesShape === 2 || (eyesShape === 5 && animation === 5) || animation === 6
              ? `${eyes.pupilsLeft} ${catAnimation.eyes}`
              : eyes.pupilsLeft
          }
          style={{ backgroundColor: getColor(eyesColor) }}
        />
        <div
          className={
            animation === 5 || animation === 6
              ? `${eyes.innerPupilsLeft} ${catAnimation.innerEyes}`
              : eyes.innerPupilsLeft
          }
        />
        <div
          className={
            animation === 5 || animation === 6
              ? `${eyes.smallerInnerPupilsLeft} ${catAnimation.innerEyes}`
              : eyes.smallerInnerPupilsLeft
          }
        />
      </div>
      <div className={eyes.eyesRight}>
        <div
          className={
            eyesShape === 1 || eyesShape === 2 || (eyesShape === 5 && animation === 5) || animation === 6
              ? `${eyes.pupilsRight} ${catAnimation.eyes}`
              : eyes.pupilsRight
          }
          style={{ backgroundColor: getColor(eyesColor) }}
        />
        <div
          className={
            animation === 5 || animation === 6
              ? `${eyes.innerPupilsRight} ${catAnimation.innerEyes}`
              : eyes.innerPupilsRight
          }
        />
        <div
          className={
            animation === 5 || animation === 6
              ? `${eyes.smallerInnerPupilsRight} ${catAnimation.innerEyes}`
              : eyes.smallerInnerPupilsRight
          }
        />
      </div>
    </section>
  );
};
