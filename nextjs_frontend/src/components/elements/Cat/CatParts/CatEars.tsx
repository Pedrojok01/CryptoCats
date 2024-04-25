import type { FC } from "react";

import styles from "@/styles/Cat.module.css";

interface CatEarsProps {
  getColor: (color: number) => string;
  headColor: number;
  pawsColor: number;
}

export const CatEars: FC<CatEarsProps> = ({ getColor, headColor, pawsColor }) => (
  <section className={styles.ears}>
    <div className={styles.ear_left} style={{ backgroundColor: getColor(headColor) }}>
      <div className={styles.inner_ear_left} style={{ backgroundColor: getColor(pawsColor) }} />
    </div>
    <div className={styles.ear_right} style={{ backgroundColor: getColor(headColor) }}>
      <div className={styles.inner_ear_right} style={{ backgroundColor: getColor(pawsColor) }} />
    </div>
  </section>
);
