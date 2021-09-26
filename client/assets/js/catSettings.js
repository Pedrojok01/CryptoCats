var colors = Object.values(allColors())

var defaultDNA = {
    //Colors
    "bodyColor" : 79,
    "mouthColor" : 13,
    "pawsColor" : 20,
    "eyesColor" : 31,
    "collarColor" : 25,
    
    //Cattributes
    "eyesShape" : 1,
    "decorationPattern" : 2,
    "decorationColor" : 67,
    "animation" :  1,

    "lastNum" :  1
    }

// when page load
$( document ).ready(function() {
  $('#dnabody').html(defaultDNA.bodyColor);
  $('#dnamouth').html(defaultDNA.mouthColor);
  $('#dnapaws').html(defaultDNA.pawsColor);
  $('#dnaeyes').html(defaultDNA.eyesColor);
  $('#dnacollar').html(defaultDNA.collarColor)
 
  $('#dnashape').html(defaultDNA.eyesShape)
  $('#dnadecoration').html(defaultDNA.decorationPattern)
  $('#dnadecorationCollor').html(defaultDNA.decorationColor)
  $('#dnaanimation').html(defaultDNA.animation)

  $('#dnaspecial').html(defaultDNA.lastNum)
  
  renderCat(defaultDNA)
});

function getDna(){
    var dna = ''
    dna += $('#dnabody').html()
    dna += $('#dnamouth').html()
    dna += $('#dnapaws').html()
    dna += $('#dnaeyes').html()
    dna += $('#dnacollar').html()
    dna += $('#dnashape').html()
    dna += $('#dnadecoration').html()
    dna += $('#dnadecorationCollor').html()
    
    dna += $('#dnaanimation').html()

    dna += $('#dnaspecial').html()

    return parseInt(dna)
}


function renderCat(dna){
    bodyColor(colors[dna.bodyColor],dna.bodyColor)
    $('#bodycolor').val(dna.bodyColor)
    mouthColor(colors[dna.mouthColor],dna.mouthColor)
    $('#mouthcolor').val(dna.mouthColor)
    pawsColor(colors[dna.pawsColor],dna.pawsColor)
    $('#pawscolor').val(dna.pawsColor)
    eyesColor(colors[dna.eyesColor],dna.eyesColor)
    $('#eyescolor').val(dna.eyesColor)
    collarColor(colors[dna.collarColor],dna.collarColor)
    $('#collarcolor').val(dna.collarColor)
    eyeVariation(dna.eyesShape)
    $('#eyeshape').val(dna.eyesShape)
    decorationVariation(dna.decorationPattern)
    $('#decorationshape').val(dna.decorationPattern)
    decorationColor(colors[dna.decorationColor],dna.decorationColor)
    $('#decorationcolor').val(dna.decorationColor)
    animationVariation(dna.animation)
    $('#animation').val(dna.animation)
}


/*Colors listeners:
******************/

//Face and body
$('#bodycolor').change(()=>{
    var colorVal = $('#bodycolor').val()
    bodyColor(colors[colorVal],colorVal)
})

//Mouth and belly
$('#mouthcolor').change(()=>{
  var colorVal = $('#mouthcolor').val()
  mouthColor(colors[colorVal],colorVal)
})

//Paws, ears and tail
$('#pawscolor').change(()=>{
  var colorVal = $('#pawscolor').val()
  pawsColor(colors[colorVal],colorVal)
})

//Eyes, collar and tail-ball
$('#eyescolor').change(()=>{
  var colorVal = $('#eyescolor').val()
  eyesColor(colors[colorVal],colorVal)
})

//Collar color
$('#collarcolor').change(()=>{
  var colorVal = $('#collarcolor').val()
  collarColor(colors[colorVal],colorVal)
})



/*Cattributes listeners:
************************/

//Eyes shape
$('#eyeshape').change(()=>{
  var shape = parseInt($('#eyeshape').val())
  eyeVariation(shape)
})

//Decorations
$('#decorationshape').change(()=>{
  var decoShape = parseInt($('#decorationshape').val())
  decorationVariation(decoShape)
})

//Decorations color
$('#decorationcolor').change(()=>{
  var colorVal = $('#decorationcolor').val()
  decorationColor(colors[colorVal],colorVal)
})

//Animations
$('#animation').change(()=>{
  var animationVal = parseInt($('#animation').val())
  animationVariation(animationVal)
})