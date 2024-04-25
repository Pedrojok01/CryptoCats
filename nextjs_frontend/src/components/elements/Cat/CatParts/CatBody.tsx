import type { FC } from "react";

import { Box } from "@chakra-ui/react";

import styles from "@/styles/Cat.module.css";

interface CatBodyProps {
  getColor: (color: number) => string;
  dna: DNA;
  animation: number;
  catAnimation: CatAnimation;
}

export const CatBody: FC<CatBodyProps> = ({ getColor, dna, animation, catAnimation }) => {
  const { headColor, pawsColor, eyesColor, mouthColor, collarColor } = dna;
  return (
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
  );
};
