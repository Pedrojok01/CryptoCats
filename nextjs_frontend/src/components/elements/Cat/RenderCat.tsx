import { memo, type FC } from "react";

import { Box, Card } from "@chakra-ui/react";

import { useAnimation } from "@/components/templates/factory/hooks";
import styles from "@/styles/Cat.module.css";
import { getBgColorString, getColorString } from "@/utils/catsUtils";

import { CatBody, CatEars, CatEyes, CatForehead, CatHairs } from "./CatParts";
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
    backgroundColor,
  } = dna;

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

          <CatEars getColor={getColor} headColor={headColor} pawsColor={pawsColor} />

          <CatForehead getColor={getColor} foreheadShape={foreheadShape} decorationColor={decorationColor} />

          <CatEyes
            getColor={getColor}
            eyesShape={eyesShape}
            eyesColor={eyesColor}
            animation={animation}
            catAnimation={catAnimation}
          />

          <section className={styles.face_body} style={{ backgroundColor: getColor(mouthColor) }}>
            <div className={styles.nose} />
            <div className={styles.mouth}>
              <div className={styles.mouth_upper} />
              <div className={styles.mouth_lower_right} />
              <div className={styles.mouth_lower_left} />
            </div>

            <CatHairs />
          </section>
        </Box>

        <CatBody getColor={getColor} dna={dna} animation={animation} catAnimation={catAnimation} />
      </Box>
      <br></br>
      <RenderCatInfo dna={dna} id={id} generation={generation} isFactory={isFactory} />
    </Card>
  );
};

export default memo(RenderCat);
