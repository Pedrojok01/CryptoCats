import type { FC } from "react";

import styles from "@/styles/Cat.module.css";

export const CatHairs: FC = () => (
  <div className={styles.hairs}>
    <div className={styles.hair_left_top} />
    <div className={styles.hair_left_mid} />
    <div className={styles.hair_left_bottom} />
    <div className={styles.hair_right_top} />
    <div className={styles.hair_right_mid} />
    <div className={styles.hair_right_bottom} />
  </div>
);
