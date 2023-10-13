import { getAnimBadge, getBgBadge, getEyesBadge, getShapeBadge } from "@/utils/getBadge";

const COLOR_RANGE = { min: "10", max: "98" };
const SHAPE_RANGE_5 = { min: "1", max: "5" };
const SHAPE_RANGE_6 = { min: "1", max: "6" };

export const colorAttributes = [
  { colorName: "headColor", name: "Head and body color", range: COLOR_RANGE },
  { colorName: "mouthColor", name: "Mouth and belly color", range: COLOR_RANGE },
  { colorName: "pawsColor", name: "Paws, ears and tail color", range: COLOR_RANGE },
  { colorName: "eyesColor", name: "Eyes and tail-ball color", range: COLOR_RANGE },
  { colorName: "collarColor", name: "Collar color", range: COLOR_RANGE },
];

export const catAttributes = [
  { colorName: "eyesShape", name: "Eyes shape", range: SHAPE_RANGE_6, badge: getEyesBadge },
  { colorName: "foreheadShape", name: "Forehead shape", range: SHAPE_RANGE_5, badge: getShapeBadge },
  { colorName: "decorationColor", name: "Forehead's color", range: COLOR_RANGE },
  { colorName: "animation", name: "Animation", range: SHAPE_RANGE_6, badge: getAnimBadge },
  { colorName: "backgroundColor", name: "Background", range: SHAPE_RANGE_5, badge: getBgBadge },
];
