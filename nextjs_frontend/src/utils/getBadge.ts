export const getShapeBadge = (num: number) => {
  switch (parseInt(num.toString())) {
    case 1:
      return "None";
    case 2:
      return "Basic";
    case 3:
      return "Wild";
    case 4:
      return "Crescendo";
    case 5:
      return "Third Eyes";
    default:
      return "Basic";
  }
};

export const getEyesBadge = (num: number) => {
  switch (parseInt(num.toString())) {
    case 1:
      return "Basic";
    case 2:
      return "Chill";
    case 3:
      return "Tired";
    case 4:
      return "Cyclope";
    case 5:
      return "Asean";
    default:
      return "Surprised";
  }
};

export const getBgBadge = (num: number) => {
  switch (parseInt(num.toString())) {
    case 1:
      return "Basic";
    case 2:
      return "Blue";
    case 3:
      return "Silver";
    case 4:
      return "Gold";
    case 5:
      return "Black";
    default:
      return "Basic";
  }
};

export const getAnimBadge = (num: number) => {
  switch (parseInt(num.toString())) {
    case 1:
      return "None";
    case 2:
      return "Head";
    case 3:
      return "Tail";
    case 4:
      return "Paws";
    case 5:
      return "Eyes";
    default:
      return "All";
  }
};
