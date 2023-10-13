import { allColors } from "./colors";

const colors = Object.values(allColors());

export const getColorString = (color: number): string => {
  return colors[color] || "#e2efff";
};

export const getBgColorString = (color: number): string => {
  switch (Number(color)) {
    case 1:
      return "linear-gradient(to right, #e2efff, #e2efff)";
    case 2:
      return "linear-gradient(to right, #008ed4, #94bed1)";
    case 3:
      return "linear-gradient(to right, #5e6069, #d9dde6)";
    case 4:
      return "linear-gradient(to right, #e0e400, #f1edb5)";
    case 5:
      return "linear-gradient(to right, #1b1b1b, #444444)";
    default:
      return "#e2efff";
  }
};

//Split the cat DNA to use in the render
export const catDna = (dnaBN: bigint): DNA => {
  const dnaStr = dnaBN.toString();
  const dna: DNA = {
    //Colors
    headColor: Number(dnaStr.substring(0, 2)),
    mouthColor: Number(dnaStr.substring(2, 4)),
    pawsColor: Number(dnaStr.substring(4, 6)),
    eyesColor: Number(dnaStr.substring(6, 8)),
    collarColor: Number(dnaStr.substring(8, 10)),
    //Cattributes
    eyesShape: Number(dnaStr.substring(10, 11)),
    foreheadShape: Number(dnaStr.substring(11, 12)),
    decorationColor: Number(dnaStr.substring(12, 14)),
    animation: Number(dnaStr.substring(14, 15)),
    backgroundColor: Number(dnaStr.substring(15, 16)),
  };
  return dna;
};
