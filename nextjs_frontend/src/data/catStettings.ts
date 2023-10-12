export const defaultDNA: DNA = {
  //Colors
  headColor: 79,
  mouthColor: 13,
  pawsColor: 20,
  eyesColor: 31,
  collarColor: 25,

  //Cattributes
  eyesShape: 1,
  foreheadShape: 2,
  decorationColor: 90,
  animation: 1,
  backgroundColor: 1,
};

// FOREHEAD

export const none: ForeheadShape = {
  forehead: "forehead_none",
};

export const basic: ForeheadShape = {
  forehead: "forehead",
  foreheadMid: "forehead_mid",
  foreheadLeft: "forehead_left",
  foreheadRight: "forehead_right",
};

export const wild: ForeheadShape = {
  forehead: "forehead",
  foreheadMid: "forehead_mid_wild",
  foreheadLeft: "forehead_left_wild",
  foreheadRight: "forehead_right_wild",
};

export const crescendo: ForeheadShape = {
  forehead: "forehead",
  foreheadMid: "forehead_mid_crescendo",
  foreheadLeft: "forehead_left_crescendo",
  foreheadRight: "forehead_right_crescendo",
};

export const thirdEyes: ForeheadShape = {
  forehead: "forehead",
  foreheadMid: "forehead_mid_thirdEyes",
  foreheadLeft: "forehead_left_thirdEyes",
  foreheadRight: "forehead_right_thirdEyes",
};

// EYES SHAPES

export const basicEyes: EyesShape = {
  eyesLeft: "eyes_left",
  eyesRight: "eyes_right",
  pupilsLeft: "pupils_left",
  pupilsRight: "pupils_right",
  innerPupilsLeft: "inner_pupils_left",
  innerPupilsRight: "inner_pupils_right",
  smallerInnerPupilsLeft: "smaller_inner_pupils_left",
  smallerInnerPupilsRight: "smaller_inner_pupils_right",
};

export const chillEyes: EyesShape = {
  eyesLeft: "eyes_left_chill",
  eyesRight: "eyes_right_chill",
  pupilsLeft: "pupils_left_chill",
  pupilsRight: "pupils_right_chill",
  innerPupilsLeft: "inner_pupils_left_chill",
  innerPupilsRight: "inner_pupils_right_chill",
  smallerInnerPupilsLeft: "smaller_inner_pupils_left_chill",
  smallerInnerPupilsRight: "smaller_inner_pupils_right_chill",
};

export const tiredEyes: EyesShape = {
  eyesLeft: "eyes_left_tired",
  eyesRight: "eyes_right_tired",
  pupilsLeft: "pupils_left_tired",
  pupilsRight: "pupils_right_tired",
  innerPupilsLeft: "inner_pupils_left_tired",
  innerPupilsRight: "inner_pupils_right_tired",
  smallerInnerPupilsLeft: "smaller_inner_pupils_left_tired",
  smallerInnerPupilsRight: "smaller_inner_pupils_right_tired",
};

export const cyclopeEyes: EyesShape = {
  eyesLeft: "eyes_left_cyclope",
  eyesRight: "eyes_right_cyclope",
  pupilsLeft: "pupils_left_cyclope",
  pupilsRight: "pupils_right_cyclope",
  innerPupilsLeft: "inner_pupils_left_cyclope",
  innerPupilsRight: "inner_pupils_right_cyclope",
  smallerInnerPupilsLeft: "smaller_inner_pupils_left_cyclope",
  smallerInnerPupilsRight: "smaller_inner_pupils_right_cyclope",
};

export const aseanEyes: EyesShape = {
  eyesLeft: "eyes_left_asean",
  eyesRight: "eyes_right_asean",
  pupilsLeft: "pupils_left_asean",
  pupilsRight: "pupils_right_asean",
  innerPupilsLeft: "inner_pupils_left_asean",
  innerPupilsRight: "inner_pupils_right_asean",
  smallerInnerPupilsLeft: "smaller_inner_pupils_left_asean",
  smallerInnerPupilsRight: "smaller_inner_pupils_right_asean",
};

export const surprisedEyes: EyesShape = {
  eyesLeft: "eyes_left_surprised",
  eyesRight: "eyes_right_surprised",
  pupilsLeft: "pupils_left_surprised",
  pupilsRight: "pupils_right_surprised",
  innerPupilsLeft: "inner_pupils_left_surprised",
  innerPupilsRight: "inner_pupils_right_surprised",
  smallerInnerPupilsLeft: "smaller_inner_pupils_left_surprised",
  smallerInnerPupilsRight: "smaller_inner_pupils_right_surprised",
};

/* ANIMATIONS: */

export const noAnim: CatAnimation = {
  head: "",
};

export const movingHead: CatAnimation = {
  head: "movingHead",
};

export const movingTail: CatAnimation = {
  tail: "movingTail",
};

export const movingPaws: CatAnimation = {
  pawsLeft: "movingPawsLeft",
  pawsRight: "movingPawsRight",
};

export const movingEyes: CatAnimation = {
  eyes: "movingEyes",
  innerEyes: "movingInnerEyes",
};

export const movingAll: CatAnimation = {
  head: "movingHead",
  tail: "movingTail",
  pawsLeft: "movingPawsLeft",
  pawsRight: "movingPawsRight",
  eyes: "movingEyes",
  innerEyes: "movingInnerEyes",
};
