var colors = Object.values(allColors())

var defaultDNA = {
  //Colors
  "bodyColor": 79,
  "mouthColor": 13,
  "pawsColor": 20,
  "eyesColor": 31,
  "collarColor": 25,

  //Cattributes
  "eyesShape": 1,
  "decorationPattern": 2,
  "decorationColor": 67,
  "animation": 1,
  "background": 1
}


// when page load
$(document).ready(function () {
  defaultPage();
});


// Default DNA value
function defaultPage() {
  resetCatToDefault();
  $(".tab.cattributesBtn").hide();
  $(".tab.catColorsBtn").show();
  renderCatFactory(defaultDNA)
}


function resetCatToDefault() {
  $('#dnabody').html(defaultDNA.bodyColor);
  $('#dnamouth').html(defaultDNA.mouthColor);
  $('#dnapaws').html(defaultDNA.pawsColor);
  $('#dnaeyes').html(defaultDNA.eyesColor);
  $('#dnacollar').html(defaultDNA.collarColor)
  $('#dnashape').html(defaultDNA.eyesShape)
  $('#dnadecoration').html(defaultDNA.decorationPattern)
  $('#dnadecorationColor').html(defaultDNA.decorationColor)
  $('#dnaanimation').html(defaultDNA.animation)
  $('#dnabackground').html(defaultDNA.background)
}


function getDna() {
  let dna = "";
  dna += $('#dnabody').html();
  dna += $('#dnamouth').html();
  dna += $('#dnapaws').html();
  dna += $('#dnaeyes').html();
  dna += $('#dnacollar').html();
  dna += $('#dnashape').html();
  dna += $('#dnadecoration').html();
  dna += $('#dnadecorationColor').html();
  dna += $('#dnaanimation').html();
  dna += $('#dnabackground').html();

  return parseInt(dna);
}


function renderCatFactory(dna) {
  bodyColorFactory(colors[dna.bodyColor], dna.bodyColor)
  $('#bodycolor').val(dna.bodyColor)
  mouthColorFactory(colors[dna.mouthColor], dna.mouthColor)
  $('#mouthcolor').val(dna.mouthColor)
  pawsColorFactory(colors[dna.pawsColor], dna.pawsColor)
  $('#pawscolor').val(dna.pawsColor)
  eyesColorFactory(colors[dna.eyesColor], dna.eyesColor)
  $('#eyescolor').val(dna.eyesColor)
  collarColorFactory(colors[dna.collarColor], dna.collarColor)
  $('#collarcolor').val(dna.collarColor)
  eyeVariationFactory(dna.eyesShape)
  $('#eyeshape').val(dna.eyesShape)
  decorationVariationFactory(dna.decorationPattern)
  $('#decorationshape').val(dna.decorationPattern)
  decorationColorFactory(colors[dna.decorationColor], dna.decorationColor)
  $('#decorationcolor').val(dna.decorationColor)
  animationVariationFactory(dna.animation)
  $('#animation').val(dna.animation)
  backgroundVariationFactory(dna.background)
  $('#background').val(dna.background)
}


/*Tabs settings in Cattributes:
*******************************/

$(".btn.catColorsBtn").click(() => {
  $(".tab.cattributesBtn").hide();
  $(".tab.catColorsBtn").show();
})

$(".btn.cattributesBtn").click(() => {
  $(".tab.catColorsBtn").hide();
  $(".tab.cattributesBtn").show();
})

$(".btn.default").click(() => {
  defaultPage();
})

$(".btn.random").click(() => {
  var randomDNA = {
    "bodyColor": Math.floor(Math.random() * 89) + 10,
    "mouthColor": Math.floor(Math.random() * 89) + 10,
    "pawsColor": Math.floor(Math.random() * 89) + 10,
    "eyesColor": Math.floor(Math.random() * 89) + 10,
    "collarColor": Math.floor(Math.random() * 89) + 10,
    "eyesShape": Math.floor(Math.random() * 6) + 1,
    "decorationPattern": Math.floor(Math.random() * 5) + 1,
    "decorationColor": Math.floor(Math.random() * 89) + 10,
    "animation": Math.floor(Math.random() * 6) + 1,
    "background": Math.floor(Math.random() * 4) + 1,
  }
  $('#dnabody').html(randomDNA.bodyColor);
  $('#dnamouth').html(randomDNA.mouthColor);
  $('#dnapaws').html(randomDNA.pawsColor);
  $('#dnaeyes').html(randomDNA.eyesColor);
  $('#dnacollar').html(randomDNA.collarColor);
  $('#dnashape').html(randomDNA.eyesShape);
  $('#dnadecoration').html(randomDNA.decorationPattern);
  $('#dnadecorationCollor').html(randomDNA.decorationColor);
  $('#dnaanimation').html(randomDNA.animation);
  $('#dnabackground').html(randomDNA.background);
  renderCatFactory(randomDNA)
})


/* To edit color ranges manually:
*********************************/

function changeFaceColor() {
  var colorVal = $('#bodycolor').val();
  bodyColorFactory(colors[colorVal], colorVal);
}

function changeMouthColor() {
  var colorVal = $('#mouthcolor').val();
  mouthColorFactory(colors[colorVal], colorVal);
}

function changePawsColor() {
  var colorVal = $('#pawscolor').val();
  pawsColorFactory(colors[colorVal], colorVal);
}

function changeEyesColor() {
  var colorVal = $('#eyescolor').val();
  eyesColorFactory(colors[colorVal], colorVal);
}

function changeCollarColor() {
  var colorVal = $('#collarcolor').val();
  collarColorFactory(colors[colorVal], colorVal);
}

/* To edit cattributes ranges manually:
***************************************/

function changeEyesShape() {
  var shape = parseInt($('#eyeshape').val());
  eyeVariationFactory(shape);
}

function changeDecoShape() {
  var decoShape = parseInt($('#decorationshape').val());
  decorationVariationFactory(decoShape);
}

function changeDecoColor() {
  var colorVal = $('#decorationcolor').val();
  decorationColorFactory(colors[colorVal], colorVal);
}

function changeAnim() {
  var animationVal = parseInt($('#animation').val());
  animationVariationFactory(animationVal);
}

function changeBG() {
  var bgVal = parseInt($('#background').val());
  backgroundVariationFactory(bgVal);
}
