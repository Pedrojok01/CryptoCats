import { FC } from "react";

import { Box, Card } from "@chakra-ui/react";

import RenderCatInfo from "./RenderCatInfo";
import styles from "../../../styles/Cat.module.css";
import { getBgColorString, getColorString } from "../../../utils/catsUtils";
import { useAnimation } from "../../templates/factory/hooks/useAnimation";
import { useEyesShape } from "../../templates/factory/hooks/useEyesShape";
import { useForeheadDecoration } from "../../templates/factory/hooks/useForeheadDecoration";

const RenderCat: FC<RenderCatProps> = ({ dna, id, generation, isFactory }) => {
    const { forehead } = useForeheadDecoration(dna.foreheadShape);
    const { eyes } = useEyesShape(dna.eyesShape);
    const { catAnimation } = useAnimation(dna.animation);

    return (
        <Card
            bgImage={getBgColorString(dna.backgroundColor)}
            borderRadius="10"
            w={!isFactory ? "210px" : undefined}
            h={!isFactory ? "330px" : undefined}
        >
            <Box className={isFactory ? styles.cat : styles.catShow} m="auto">
                <Box
                    className={
                        Number(dna.animation) === 2 || Number(dna.animation) === 6
                            ? `${styles.head} ${catAnimation.head}`
                            : styles.head
                    }
                >
                    <div
                        className={styles.head_background}
                        style={{ backgroundColor: `#${getColorString(dna.headColor)}` }}
                    ></div>
                    <div className={styles.ears}>
                        <div
                            className={styles.ear_left}
                            style={{ backgroundColor: `#${getColorString(dna.headColor)}` }}
                        >
                            <div
                                className={styles.inner_ear_left}
                                style={{ backgroundColor: `#${getColorString(dna.pawsColor)}` }}
                            ></div>
                        </div>
                        <div
                            className={styles.ear_right}
                            style={{ backgroundColor: `#${getColorString(dna.headColor)}` }}
                        >
                            <div
                                className={styles.inner_ear_right}
                                style={{ backgroundColor: `#${getColorString(dna.pawsColor)}` }}
                            ></div>
                        </div>
                    </div>
                    <div className={forehead.forehead}>
                        <div
                            className={forehead.foreheadLeft}
                            style={
                                Number(dna.foreheadShape) !== 5
                                    ? {
                                          backgroundColor: `#${getColorString(dna.decorationColor)}`,
                                      }
                                    : {
                                          backgroundColor: "black",
                                      }
                            }
                        ></div>
                        <div
                            className={forehead.foreheadMid}
                            style={{ backgroundColor: `#${getColorString(dna.decorationColor)}` }}
                        ></div>
                        <div
                            className={forehead.foreheadRight}
                            style={
                                Number(dna.foreheadShape) !== 5
                                    ? {
                                          backgroundColor: `#${getColorString(dna.decorationColor)}`,
                                      }
                                    : {
                                          backgroundColor: "white",
                                      }
                            }
                        ></div>
                    </div>
                    <div className={"eyes"}>
                        <div className={eyes.eyesLeft}>
                            <div
                                className={
                                    (Number(dna.eyesShape) === 1 ||
                                        Number(dna.eyesShape) === 2 ||
                                        Number(dna.eyesShape) === 5) &&
                                    (Number(dna.animation) === 5 || Number(dna.animation) === 6)
                                        ? `${eyes.pupilsLeft} ${catAnimation.eyes}`
                                        : eyes.pupilsLeft
                                }
                                style={{ backgroundColor: `#${getColorString(dna.eyesColor)}` }}
                            ></div>
                            <div
                                className={
                                    Number(dna.animation) === 5 || Number(dna.animation) === 6
                                        ? `${eyes.innerPupilsLeft} ${catAnimation.innerEyes}`
                                        : eyes.innerPupilsLeft
                                }
                            ></div>
                            <div
                                className={
                                    Number(dna.animation) === 5 || Number(dna.animation) === 6
                                        ? `${eyes.smallerInnerPupilsLeft} ${catAnimation.innerEyes}`
                                        : eyes.smallerInnerPupilsLeft
                                }
                            ></div>
                        </div>
                        <div className={eyes.eyesRight}>
                            <div
                                className={
                                    (Number(dna.eyesShape) === 1 ||
                                        Number(dna.eyesShape) === 2 ||
                                        Number(dna.eyesShape) === 5) &&
                                    (Number(dna.animation) === 5 || Number(dna.animation) === 6)
                                        ? `${eyes.pupilsRight} ${catAnimation.eyes}`
                                        : eyes.pupilsRight
                                }
                                style={{ backgroundColor: `#${getColorString(dna.eyesColor)}` }}
                            ></div>
                            <div
                                className={
                                    Number(dna.animation) === 5 || Number(dna.animation) === 6
                                        ? `${eyes.innerPupilsRight} ${catAnimation.innerEyes}`
                                        : eyes.innerPupilsRight
                                }
                            ></div>
                            <div
                                className={
                                    Number(dna.animation) === 5 || Number(dna.animation) === 6
                                        ? `${eyes.smallerInnerPupilsRight} ${catAnimation.innerEyes}`
                                        : eyes.smallerInnerPupilsRight
                                }
                            ></div>
                        </div>
                    </div>
                    <div className={styles.face_body} style={{ backgroundColor: `#${getColorString(dna.mouthColor)}` }}>
                        <div className={styles.nose}></div>
                        <div className={styles.mouth}>
                            <div className={styles.mouth_upper}></div>
                            <div className={styles.mouth_lower_right}></div>
                            <div className={styles.mouth_lower_left}></div>
                        </div>

                        <div className={styles.hairs}>
                            <div className={styles.hair_left_top}></div>
                            <div className={styles.hair_left_mid}></div>
                            <div className={styles.hair_left_bottom}></div>
                            <div className={styles.hair_right_top}></div>
                            <div className={styles.hair_right_mid}></div>
                            <div className={styles.hair_right_bottom}></div>
                        </div>
                    </div>
                </Box>

                <Box className={styles.catBody}>
                    <div
                        className={styles.collar}
                        style={{ backgroundColor: `#${getColorString(dna.collarColor)}` }}
                    ></div>
                    <div className={styles.core_body} style={{ backgroundColor: `#${getColorString(dna.headColor)}` }}>
                        <div
                            className={styles.inner_body}
                            style={{ backgroundColor: `#${getColorString(dna.mouthColor)}` }}
                        ></div>
                    </div>
                    <div className={styles.foot}>
                        <div
                            className={
                                Number(dna.animation) === 4 || Number(dna.animation) === 6
                                    ? `${styles.feet_front_left} ${catAnimation.pawsLeft}`
                                    : styles.feet_front_left
                            }
                            style={{ backgroundColor: `#${getColorString(dna.pawsColor)}` }}
                        ></div>
                        <div
                            className={
                                Number(dna.animation) === 4 || Number(dna.animation) === 6
                                    ? `${styles.feet_front_right} ${catAnimation.pawsRight}`
                                    : styles.feet_front_right
                            }
                            style={{ backgroundColor: `#${getColorString(dna.pawsColor)}` }}
                        ></div>
                        <div
                            className={
                                Number(dna.animation) === 4 || Number(dna.animation) === 6
                                    ? `${styles.feet_back_left} ${catAnimation.pawsLeft}`
                                    : styles.feet_back_left
                            }
                            style={{ backgroundColor: `#${getColorString(dna.pawsColor)}` }}
                        ></div>
                        <div
                            className={
                                Number(dna.animation) === 4 || Number(dna.animation) === 6
                                    ? `${styles.feet_back_right} ${catAnimation.pawsRight}`
                                    : styles.feet_back_right
                            }
                            style={{ backgroundColor: `#${getColorString(dna.pawsColor)}` }}
                        ></div>
                    </div>
                    <div
                        className={
                            Number(dna.animation) === 3 || Number(dna.animation) === 6
                                ? `${styles.tail} ${catAnimation.tail}`
                                : styles.tail
                        }
                        style={{ backgroundColor: `#${getColorString(dna.pawsColor)}` }}
                    >
                        <div
                            className={styles.tail_ball}
                            style={{ backgroundColor: `#${getColorString(dna.eyesColor)}` }}
                        ></div>
                    </div>
                </Box>
            </Box>
            <br></br>
            <RenderCatInfo dna={dna} id={id} generation={generation} isFactory={isFactory} />
        </Card>
    );
};

export default RenderCat;
