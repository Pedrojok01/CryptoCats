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
