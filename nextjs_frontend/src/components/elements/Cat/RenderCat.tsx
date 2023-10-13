import type { FC } from "react";

import { Box, Card } from "@chakra-ui/react";

import { useAnimation, useEyesShape, useForeheadDecoration } from "@/components/templates/factory/hooks";
import styles from "@/styles/Cat.module.css";
import { getBgColorString, getColorString } from "@/utils/catsUtils";

import RenderCatInfo from "./RenderCatInfo";

const getColor = (color: number) => `#${getColorString(color)}`;

const RenderCat: FC<RenderCatProps> = ({ dna, id, generation, isFactory }) => {
  const {
    foreheadShape,
    eyesShape,
    animation,
    headColor,
    pawsColor,
    decorationColor,
    eyesColor,
    mouthColor,
    collarColor,
    backgroundColor,
  } = dna;
  const { forehead } = useForeheadDecoration(foreheadShape);
  const { eyes } = useEyesShape(eyesShape);
  const { catAnimation } = useAnimation(animation);

  return (
    <Card
      bgImage={getBgColorString(backgroundColor)}
      borderRadius="10"
      w={!isFactory ? "210px" : undefined}
      h={!isFactory ? "330px" : undefined}
      className="box-shadow"
    >
      <Box className={isFactory ? styles.cat : styles.catShow} m="auto">
        <Box className={animation === 2 || animation === 6 ? `${styles.head} ${catAnimation.head}` : styles.head}>
          <section className={styles.head_background} style={{ backgroundColor: getColor(headColor) }} />
          <section className={styles.ears}>
            <div className={styles.ear_left} style={{ backgroundColor: getColor(headColor) }}>
              <div className={styles.inner_ear_left} style={{ backgroundColor: getColor(pawsColor) }} />
            </div>
            <div className={styles.ear_right} style={{ backgroundColor: getColor(headColor) }}>
              <div className={styles.inner_ear_right} style={{ backgroundColor: getColor(pawsColor) }} />
            </div>
          </section>
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
          <section className={styles.face_body} style={{ backgroundColor: getColor(mouthColor) }}>
            <div className={styles.nose} />
            <div className={styles.mouth}>
              <div className={styles.mouth_upper} />
              <div className={styles.mouth_lower_right} />
              <div className={styles.mouth_lower_left} />
            </div>

            <div className={styles.hairs}>
              <div className={styles.hair_left_top} />
              <div className={styles.hair_left_mid} />
              <div className={styles.hair_left_bottom} />
              <div className={styles.hair_right_top} />
              <div className={styles.hair_right_mid} />
              <div className={styles.hair_right_bottom} />
            </div>
          </section>
        </Box>

        <Box className={styles.catBody}>
          <section className={styles.collar} style={{ backgroundColor: getColor(collarColor) }} />
          <section className={styles.core_body} style={{ backgroundColor: getColor(headColor) }}>
            <div className={styles.inner_body} style={{ backgroundColor: getColor(mouthColor) }} />
          </section>
          <section className={styles.foot}>
            <div
              className={
                animation === 4 || animation === 6
                  ? `${styles.feet_front_left} ${catAnimation.pawsLeft}`
                  : styles.feet_front_left
              }
              style={{ backgroundColor: getColor(pawsColor) }}
            />
            <div
              className={
                animation === 4 || animation === 6
                  ? `${styles.feet_front_right} ${catAnimation.pawsRight}`
                  : styles.feet_front_right
              }
              style={{ backgroundColor: getColor(pawsColor) }}
            />
            <div
              className={
                animation === 4 || animation === 6
                  ? `${styles.feet_back_left} ${catAnimation.pawsLeft}`
                  : styles.feet_back_left
              }
              style={{ backgroundColor: getColor(pawsColor) }}
            />
            <div
              className={
                animation === 4 || animation === 6
                  ? `${styles.feet_back_right} ${catAnimation.pawsRight}`
                  : styles.feet_back_right
              }
              style={{ backgroundColor: getColor(pawsColor) }}
            />
          </section>
          <section
            className={animation === 3 || animation === 6 ? `${styles.tail} ${catAnimation.tail}` : styles.tail}
            style={{ backgroundColor: getColor(pawsColor) }}
          >
            <div className={styles.tail_ball} style={{ backgroundColor: getColor(eyesColor) }} />
          </section>
        </Box>
      </Box>
      <br></br>
      <RenderCatInfo dna={dna} id={id} generation={generation} isFactory={isFactory} />
    </Card>
  );
};

export default RenderCat;
