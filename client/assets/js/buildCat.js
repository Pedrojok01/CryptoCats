// CSS properties to build each cat based on the DNA fetch from blockchain
var colors = Object.values(allColors());

/* Display cat colors:
 ************************/

function bodyColor(code, id) {
  var color = colors[code];
  $(`#headColor${id}, #rightEar${id}, #leftEar${id}, #mainBody${id}`).css("background-color", "#" + color);
}

function mouthColor(code, id) {
  var color = colors[code];
  $(`#face${id}, #bellyCol${id}`).css("background-color", "#" + color);
}

function pawsColor(code, id) {
  var color = colors[code];
  $(`#innerRightEar${id}, #innerLeftEar${id}, #tail${id}`).css("background-color", "#" + color);
  $(`#footColor${id}, #footFrontLeft${id}, #footFrontRight${id}, #footBackLeft${id}, #footBackRight${id}`).css(
    "background-color",
    "#" + color
  );
}

function eyesColor(code, id) {
  var color = colors[code];
  $(`#pupilLeft${id}, #pupilRight${id}, #tailBallColor${id}`).css("background-color", "#" + color);
}

function collarColor(code, id) {
  var color = colors[code];
  $(`#collarCol${id}`).css("background-color", "#" + color);
}

/*Eyes variations:
 ******************/

function switchEyes(num, id) {
  switch (num) {
    case "1":
      resetEyes(id);
      normalEyes(id);
      $("#eyeNameFactory").html("Basic");
      break;
    case "2":
      resetEyes(id);
      normalEyes(id);
      $("#eyeNameFactory").html("Chill");
      eyesType1(id);
      break;
    case "3":
      resetEyes(id);
      normalEyes(id);
      $("#eyeNameFactory").html("Tired");
      eyesType2(id);
      break;
    case "4":
      resetEyes(id);
      normalEyes(id);
      $("#eyeNameFactory").html("Cyclope");
      eyesType3(id);
      break;
    case "5":
      resetEyes(id);
      normalEyes(id);
      $("#eyeNameFactory").html("Asean");
      eyesType4(id);
      break;
    case "6":
      resetEyes(id);
      normalEyes(id);
      $("#eyeNameFactory").html("Surprised");
      eyesType5(id);
      break;
  }
}

// CSS for eyes variations:
function normalEyes(id) {
  //NORMAL
  $(`#eyeRight${id}`).css({ visibility: "visible", transform: "rotate(0deg)" });
  $(`#eyeLeft${id}`).css({ transform: "rotate(0deg)", width: "50px", height: "41px", top: "0px", left: "0px" });

  $(`#pupilLeft${id}, #pupilRight${id}`).css({
    "border-radius": "50%",
    border: "none",
    transform: "rotate(0deg)",
    width: "40px",
    height: "36px",
  });
  $(`#pupilLeft${id}`).css({ top: "3px", left: "6px" });
  $(`#pupilRight${id}`).css({ top: "3px", left: "4px" });

  $(`#innerPupilLeft${id}`).css({ top: "11px", left: "14px" });
  $(`#smallerInnerPupilLeft${id}`).css({ top: "17px", left: "14px" });
  $(`#innerPupilRight${id}`).css({ top: "11px", left: "14px" });
  $(`#smallerInnerPupilRight${id}`).css({ top: "17px", left: "13px" });
}

function eyesType1(id) {
  //CHILL
  $(`#pupilLeft${id}, #pupilRight${id}`).css({ "border-top": "12px solid", "border-color": "#464343" });

  $(`#innerPupilLeft${id}`).css({ top: "24px", left: "15px" });
  $(`#smallerInnerPupilLeft${id}`).css({ top: "30px", left: "13px" });

  $(`#innerPupilRight${id}`).css({ top: "24px", left: "14px" });
  $(`#smallerInnerPupilRight${id}`).css({ top: "31px", left: "12px" });
}

function eyesType2(id) {
  //TIRED
  $(`#pupilLeft${id}, #pupilRight${id}`).css({
    "border-color": "#464343",
    "border-top": "12px solid",
    "border-bottom": "12px solid",
    width: "48px",
    height: "35px",
    top: "2px",
    left: "0px",
  });

  $(`#innerPupilLeft${id}`).css({ top: "15px", left: "16px" });
  $(`#smallerInnerPupilLeft${id}`).css({ top: "20px", left: "14px" });

  $(`#innerPupilRight${id}`).css({ top: "15px", left: "11px" });
  $(`#smallerInnerPupilRight${id}`).css({ top: "20px", left: "9px" });
}

function eyesType3(id) {
  //CYCLOPE
  $(`#eyeRight${id}`).css({ visibility: "hidden" });
  $(`#eyeLeft${id}`).css({ width: "45px", height: "45px", top: "-10px", left: "50px" });

  $(`#pupilLeft${id}`).css({ width: "41px", height: "41px", top: "2px", left: "2px" });
  $(`#innerPupilLeft${id}`).css({ top: "13px", left: "19px" });
  $(`#smallerInnerPupilLeft${id}`).css({ top: "20px", left: "18px" });
}

function eyesType4(id) {
  //ASEAN
  $(`#eyeLeft${id}`).css({ transform: "rotate(15deg)" });
  $(`#eyeRight${id}`).css("transform", "rotate(-15deg)");

  $(`#pupilLeft${id}`).css("transform", "rotate(-15deg)");
  $(`#pupilRight${id}`).css("transform", "rotate(15deg)");

  $(`#innerPupilLeft${id}`).css({ top: "16px", left: "14px" });
  $(`#smallerInnerPupilLeft${id}`).css({ top: "23px", left: "15px" });
}

function eyesType5(id) {
  //SURPRISED
  $(`#eyeLeft${id}`).css({ transform: "rotate(-90deg)" });
  $(`#eyeRight${id}`).css("transform", "rotate(-90deg)");

  $(`#pupilLeft${id}`).css({ transform: "rotate(-90deg)", width: "27px", height: "36px", top: "4px", left: "6px" });
  $(`#pupilRight${id}`).css({ transform: "rotate(-90deg)", width: "27px", height: "36px", top: "3px", left: "8px" });

  $(`#innerPupilLeft${id}`).css({ top: "14px", left: "19px" });
  $(`#smallerInnerPupilLeft${id}`).css({ top: "14px", left: "26px" });

  $(`#innerPupilRight${id}`).css({ top: "14px", left: "20px" });
  $(`#smallerInnerPupilRight${id}`).css({ top: "13px", left: "27px" });
}

/*Decoration variations:
 ************************/

function decorationVariation(numShape, numColor, id) {
  switch (numShape) {
    case "1":
      normalDecoration(id);
      //$(`#decorationName${id}`).html('None') //no forehaed deco
      noDecoration(id);
      decorationColor(numShape, numColor, id);
      break;
    case "2":
      //$(`#decorationName${id}`).html('Basic')
      normalDecoration(id);
      decorationColor(numShape, numColor, id);
      break;
    case "3":
      normalDecoration(id);
      //$(`#decorationName${id}`).html('Wild')
      wildDecoration(id);
      decorationColor(numShape, numColor, id);
      break;
    case "4":
      normalDecoration(id);
      //$(`#decorationName${id}`).html('Crescendo')
      crescendoDecoration(id);
      decorationColor(numShape, numColor, id);
      break;
    case "5":
      normalDecoration(id);
      //$(`#decorationName${id}`).html('Third eye')
      thirdEyeDecoration(id);
      decorationColor(numShape, numColor, id);
      break;
  }
}

// CSS for decorations
function normalDecoration(id) {
  //Remove all style from other decorations
  $(`#foreheadMid${id}`).css({
    display: "block",
    transform: "rotate(0deg)",
    height: "50px",
    width: "15px",
    top: "-3px",
    left: "91px",
    "border-radius": "40% 40% 40% 40%",
    "background-color": "#DDD0C9",
  });
  $(`#foreheadLeft${id}`).css({
    transform: "rotate(2deg)",
    height: "33px",
    width: "13px",
    top: "5px",
    left: "-17px",
    "border-radius": "40% 40% 40% 40%",
    "background-color": "#DDD0C9",
  });
  $(`#foreheadRight${id}`).css({
    transform: "rotate(-2deg)",
    height: "33px",
    width: "13px",
    top: "5px",
    left: "19px",
    "border-radius": "40% 40% 40% 40%",
    "background-color": "#DDD0C9",
  });
}

function noDecoration(id) {
  //NONE
  $(`#foreheadMid${id}`).css({ display: "none" });
}

function wildDecoration(id) {
  //WILD
  $(`#foreheadMid${id}`).css({
    transform: "rotate(0deg)",
    height: "55px",
    width: "15px",
    top: "-3px",
    left: "92px",
    "border-radius": "50% 50% 50% 50%",
  });
  $(`#foreheadLeft${id}`).css({
    transform: "rotate(30deg)",
    height: "40px",
    width: "10px",
    top: "2px",
    left: "-27px",
    "border-radius": "50% 50% 50% 50%",
  });
  $(`#foreheadRight${id}`).css({
    transform: "rotate(-30deg)",
    height: "40px",
    width: "10px",
    top: "2px",
    left: "33px",
    "border-radius": "50% 50% 50% 50%",
  });
}

function crescendoDecoration(id) {
  //CRESCENDO
  $(`#foreheadMid${id}`).css({
    transform: "rotate(0deg)",
    height: "43px",
    width: "14px",
    top: "-15px",
    "border-radius": "0 0 50% 50%",
  });
  $(`#foreheadLeft${id}`).css({
    transform: "rotate(0deg)",
    height: "31px",
    width: "14px",
    top: "1px",
    "border-radius": "6% 0 50% 50%",
  });
  $(`#foreheadRight${id}`).css({
    transform: "rotate(0deg)",
    height: "55px",
    width: "14px",
    top: "0px",
    left: "18px",
    "border-radius": "0% 40% 50% 50%",
  });
}

function thirdEyeDecoration(id) {
  //THIRD EYE
  $(`#foreheadMid${id}`).css({
    transform: "rotate(0deg)",
    height: "35px",
    width: "55px",
    top: "6px",
    left: "72px",
    "border-radius": "50%",
    "background-color": "#b0cff5",
  });
  $(`#foreheadLeft${id}`).css({
    transform: "rotate(0deg)",
    height: "30px",
    width: "30px",
    top: "3px",
    left: "13px",
    "border-radius": "50%",
    "background-color": "black",
  });
  $(`#foreheadRight${id}`).css({
    transform: "rotate(0deg)",
    height: "5px",
    width: "5px",
    top: "14px",
    left: "25px",
    "border-radius": "50%",
    "background-color": "white",
  });
}

// Decoration colors --- Has been included in decorationVariation rendering
function decorationColor(codeShape, codeColor, id) {
  var color = colors[codeColor];
  if (codeShape === 5) {
    $(`#foreheadMid${id}`).css("background-color", "#" + color);
    $(`#foreheadLeft${id}`).css("background-color", "black");
    $(`#foreheadRight${id}`).css("background-color", "white");
  } else {
    $(`#foreheadMid${id}, #foreheadLeft${id}, #foreheadRight${id}`).css("background-color", "#" + color);
  }
}

/*Animations:
 **************/

// Switch animations:
function animationVariation(num, id) {
  switch (num) {
    case "1":
      resetAnimation(id);
      break;
    case "2":
      resetAnimation(id);
      animationType1(id);
      break;
    case "3":
      resetAnimation(id);
      animationType2(id);
      break;
    case "4":
      resetAnimation(id);
      animationType3(id);
      break;
    case "5":
      resetAnimation(id);
      animationType4(id);
      break;
    case "6":
      resetAnimation(id);
      animationType5(id);
      break;
  }
}

// Add CSS animation class:
function animationType1(id) {
  //HEAD MOVING
  $(`#wholeHead${id}`).addClass("movingHead");
}

function animationType2(id) {
  //TAIL MOVING
  $(`#tail${id}`).addClass("movingTail");
}

function animationType3(id) {
  //PAWS MOVING
  $(`#footFrontLeft${id}, #footBackLeft${id}`).addClass("movingPawsLeft");
  $(`#footFrontRight${id}, #footBackRight${id}`).addClass("movingPawsRight");
}

function animationType4(id) {
  //EYES MOVING
  let temp = $(`#eyeName${id}`).html(); // CHANGE AFTER EYES SHAPE

  if (temp === "Tired" || temp === "Cyclope" || temp === "Surprised") {
    $(
      `#innerPupilLeft${id}, #smallerInnerPupilLeft${id}, #innerPupilRight${id}, #smallerInnerPupilRight${id}`
    ).addClass("movingInnerEyes");
  } else {
    $(`#pupilLeft${id}, #pupilRight${id}`).addClass("movingEyes");
    $(
      `#innerPupilLeft${id}, #smallerInnerPupilLeft${id}, #innerPupilRight${id}, #smallerInnerPupilRight${id}`
    ).addClass("movingInnerEyes");
  }
}

function animationType5(id) {
  //MOVING ALL
  animationType1(id);
  animationType2(id);
  animationType3(id);
  animationType4(id);
}

function resetEyes(id) {
  //RESET EYES ANIM ONLY
  $(`#pupilLeft${id}, #pupilRight${id}`).removeClass("movingEyes");
  $(
    `#innerPupilLeft${id}, #smallerInnerPupilLeft${id}, #innerPupilRight${id}, #smallerInnerPupilRight${id}`
  ).removeClass("movingInnerEyes");
}

function resetAnimation(id) {
  //RESET ALL ANIMS
  $(`#wholeHead${id}`).removeClass("movingHead");
  $(`#tail${id}`).removeClass("movingTail");
  $(`#footFrontLeft${id}, #footBackLeft${id}`).removeClass("movingPawsLeft");
  $(`#footFrontRight${id}, #footBackRight${id}`).removeClass("movingPawsRight");
  resetEyes(id);
}

/*Background variations:
 ************************/

function backgroundVariation(num, id) {
  switch (num) {
    case "1":
      normalBG(id);
      break;
    case "2":
      normalBG(id);
      BG1(id);
      break;
    case "3":
      normalBG(id);
      BG2(id);
      break;
    case "4":
      normalBG(id);
      BG3(id);
      break;
    case "5":
      normalBG(id);
      BG4(id);
      break;
  }
}

function normalBG(id) {
  //NORMAL BACKGROUND
  $(`#catCardDiv${id}`).css({ "background-color": "#e2efff" });
  $(`#catCardDiv${id}`).removeClass("blue-gr silver-gr gold-gr black-gr");
  $(`#offerCardDiv${id}`).css({ "background-color": "#e2efff" });
  $(`#offerCardDiv${id}`).removeClass("blue-gr silver-gr gold-gr black-gr");
}

function BG1(id) {
  //BLUE
  $(`#catCardDiv${id}`).addClass("blue-gr");
  $(`#offerCardDiv${id}`).addClass("blue-gr");
}

function BG2(id) {
  //SILVER
  $(`#catCardDiv${id}`).addClass("silver-gr");
  $(`#offerCardDiv${id}`).addClass("silver-gr");
}

function BG3(id) {
  //GOLD
  $(`#catCardDiv${id}`).addClass("gold-gr");
  $(`#offerCardDiv${id}`).addClass("gold-gr");
}

function BG4(id) {
  //BLACK
  $(`#catCardDiv${id}`).addClass("black-gr");
  $(`#offerCardDiv${id}`).addClass("black-gr");
}
