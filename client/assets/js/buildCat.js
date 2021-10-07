// CSS properties to build each cat depending on the DNA got from blockchain
var colors = Object.values(allColors())


/* Display cat colors:
************************/

function bodyColor(code, id) {
    var color = colors[code];
    $('#head'+ id + ', #rightEar'+ id + ', #leftEar'+ id + ', #mainBody'+ id).css('background-color', '#' + color)
}

function mouthColor(code, id) {
    var color = colors[code];
    $('#face'+ id + ', #innerBody'+ id).css('background-color', '#' + color) 
}

function pawsColor(code, id) {
    var color = colors[code];
    $('#innerRightEar'+ id + ', #innerLeftEar'+ id + ', #footColor'+ id + ', #tail'+ id).css('background-color', '#' + color)  
}

function eyesColor(code, id) {
    var color = colors[code];
    $('#pupilLeft'+ id + ', #pupilRight'+ id + '#tailBallColor'+ id).css('background-color', '#' + color)
}

function collarColor(color,code) {
    var color = colors[code]
    $('#tailCollor'+ id).css('background-color', '#' + color)
}



/*Eyes variations:
******************/

function switchEyes(num, id) { 
    normalEyes(id);
    switch (num) {
        case 1:
            $('#eyeName' + id).html('Basic') 
            break 
        case 2:               
            $('#eyeName' + id).html('Chill')                 
            break
        case 3:
            $('#eyeName' + id).html('Tired')
            eyesType2(id)
            break
        case 4:
            $('#eyeName' + id).html('Cyclope')
            eyesType3(id)
            break
        case 5:
            $('#eyeName' + id).html('Asean')
            eyesType4(id)
            break
        case 6:
            $('#eyeName' + id).html('Surprised')
            eyesType5(id)
            break
    }
}

// CSS for eyes variations:
function normalEyes(id) { //NORMAL
    $('#EyeRight' +id).css({'visibility': 'visible', 'transform': 'rotate(0deg)'})
    $('#EyeLeft' +id).css({'transform': 'rotate(0deg)', 'width': '50px', 'height': '41px', 'top': '0px', 'left': '0px'})

    $('#pupilLeft'+ id + ', #pupilRight'+ id).css({'border-radius': '50%', 'border': 'none', 'transform': 'rotate(0deg)', 'width': '40px', 'height': '36px'})
    $('#pupilLeft'+ id).css({'top': '3px', 'left': '6px'})
    $('#pupilRight'+ id).css({'top': '3px', 'left': '4px'})

    $('#innerPupilLeft'+ id).css({'top': '11px', 'left': '14px'})
    $('#smallerInnerPupilLeft'+ id).css({'top': '17px', 'left': '14px'})
    $('#innerPupilRight'+ id).css({'top': '11px', 'left': '14px'})
    $('#smallerInnerPupilRight'+ id).css({'top': '17px', 'left': '13px'})
}

function eyesType1(id) { //CHILL
    $('#pupilLeft'+ id + ', #pupilRight'+ id).css({'border-top': '12px solid', 'border-color': '#464343'})
    
    $('#innerPupilLeft'+ id).css({'top': '24px', 'left': '15px'})
    $('#smallerInnerPupilLeft'+ id).css({'top': '30px', 'left': '13px'})
    
    $('#innerPupilRight'+ id).css({'top': '24px', 'left': '14px'})
    $('#smallerInnerPupilRight'+ id).css({'top': '31px', 'left': '12px'})
}

function eyesType2(id) { //TIRED
    $('#pupilLeft'+ id + ', #pupilRight'+ id).css({'border-color': '#464343', 'border-top': '12px solid', 'border-bottom': '12px solid', 'width': '48px', 'height': '35px', 'top': '2px', 'left': '0px'})

    $('#innerPupilLeft'+ id).css({'top': '15px', 'left': '16px'})
    $('#smallerInnerPupilLeft'+ id).css({'top': '20px', 'left': '14px'})

    $('#innerPupilRight'+ id).css({'top': '15px', 'left': '11px'})
    $('#smallerInnerPupilRight'+ id).css({'top': '20px', 'left': '9px'})
}

function eyesType3(id) { //CYCLOPE
    $('#EyeRight' +id).css({'visibility': 'hidden'})
    $('#EyeLeft' +id).css({'width': '45px', 'height': '45px', 'top': '-10px', 'left': '50px'})

    $('#pupilLeft'+ id).css({'width': '41px', 'height': '41px', 'top': '2px', 'left': '2px'})
    $('#innerPupilLeft'+ id).css({'top': '13px', 'left': '19px'})
    $('#smallerInnerPupilLeft'+ id).css({'top': '20px', 'left': '18px'})
}

function eyesType4(id) { //ASEAN
    $('#EyeLeft' +id).css({'transform': 'rotate(15deg)'})
    $('#EyeRight' +id).css('transform', 'rotate(-15deg)')

    $('#pupilLeft'+ id).css('transform', 'rotate(-15deg)')
    $('#pupilRight'+ id).css('transform', 'rotate(15deg)')

    $('#innerPupilLeft'+ id).css({'top': '16px', 'left': '14px'})
    $('#smallerInnerPupilLeft'+ id).css({'top': '23px', 'left': '15px'})
}

function eyesType5(id) { //SURPRISED
    $('#EyeLeft' +id).css({"transform": "rotate(-90deg)"})
    $('#EyeRight' +id).css('transform', 'rotate(-90deg)')

    $('#pupilLeft'+ id).css({'transform': 'rotate(-90deg)', 'width': '27px', 'height': '36px', 'top': '4px', 'left': '6px'})
    $('#pupilRight'+ id).css({'transform': 'rotate(-90deg)', 'width': '27px', 'height': '36px', 'top': '3px', 'left': '8px'})

    $('#innerPupilLeft'+ id).css({'top': '14px', 'left': '19px'})
    $('#smallerInnerPupilLeft'+ id).css({'top': '14px', 'left': '26px'})

    $('#innerPupilRight'+ id).css({'top': '14px', 'left': '20px'})
    $('#smallerInnerPupilRight'+ id).css({'top': '13px', 'left': '27px'})
}




/*Decorations variations:
*************************/

function decorationVariation(num, id) {
    normalDecoration(id)
    switch (num) {
        case 1:
            $('#decorationName' + id).html('None') //no forehaed deco
            noDecoration(id)
            break
        case 2:    
            $('#decorationName' + id).html('Basic')
            break
        case 3:
            $('#decorationName' + id).html('Wild')
            wildDecoration(id)
            break
        case 4:
            $('#decorationName' + id).html('Crescendo')
            crescendoDecoration(id)
            break
        case 5:
            $('#decorationName' + id).html('Third eye')
            thirdEyeDecoration(id)
        break
    }
}

function normalDecoration(id) {   //Remove all style from other decorations
    $('#foreheadMid'+ id).css({ 'display': 'block', "transform": "rotate(0deg)", "height": "50px", "width": "15px", "top": "-3px", "left": "91px", "border-radius": "40% 40% 40% 40%", "background-color": "#DDD0C9" })
    $('#foreheadLeft'+ id).css({ "transform": "rotate(2deg)", "height": "33px", "width": "13px", "top": "5px", "left": "-17px", "border-radius": "40% 40% 40% 40%", "background-color": "#DDD0C9" })
    $('#foreheadRight'+ id).css({ "transform": "rotate(-2deg)", "height": "33px", "width": "13px", "top": "5px", "left": "19px", "border-radius": "40% 40% 40% 40%", "background-color": "#DDD0C9" })
}

function noDecoration(id) { //NONE
    $('#foreheadMid'+ id).css({'display': 'none'})
}

function wildDecoration(id) { //WILD
    $('#foreheadMid'+ id).css({ "transform": "rotate(0deg)", "height": "55px", "width": "15px", "top": "-3px", "left": "92px", "border-radius": "50% 50% 50% 50%" })
    $('#foreheadLeft'+ id).css({ "transform": "rotate(30deg)", "height": "40px", "width": "10px", "top": "2px", "left": "-27px", "border-radius": "50% 50% 50% 50%" })
    $('#foreheadRight'+ id).css({ "transform": "rotate(-30deg)", "height": "40px", "width": "10px", "top": "2px", "left": "33px", "border-radius": "50% 50% 50% 50%" })
}

function crescendoDecoration(id) {   //CRESCENDO
    $('#foreheadMid'+ id).css({ "transform": "rotate(0deg)", "height": "43px", "width": "14px", "top": "-15px", "border-radius": "0 0 50% 50%" })
    $('#foreheadLeft'+ id).css({ "transform": "rotate(0deg)", "height": "31px", "width": "14px", "top": "1px", "border-radius": "6% 0 50% 50%" })
    $('#foreheadRight'+ id).css({ "transform": "rotate(0deg)", "height": "55px", "width": "14px", "top": "0px", "left": "18px", "border-radius": "0% 40% 50% 50%" })
}

function thirdEyeDecoration(id) { //THIRD EYE
    $('#foreheadMid'+ id).css({ "transform": "rotate(0deg)", "height": "35px", "width": "55px", "top": "6px", "left": "72px", "border-radius": "50%", "background-color": "#b0cff5" })
    $('#foreheadLeft'+ id).css({ "transform": "rotate(0deg)", "height": "30px", "width": "30px", "top": "3px", "left": "13px", "border-radius": "50%", "background-color": "black" })
    $('#foreheadRight'+ id).css({ "transform": "rotate(0deg)", "height": "5px", "width": "5px", "top": "14px", "left": "25px", "border-radius": "50%", "background-color": "white" })
}


function decorationColor(code,id) {
    var color = colors[code]
    let temp = parseInt($('#decorationName' + id).val()); // CHANGE AFTER DECOSHAPE!
        if (temp == 5) {
            $('#foreheadMid'+ id).css('background-color', '#' + color)
            $('#foreheadLeft'+ id).css('background-color', 'black')
            $('#foreheadRight'+ id).css('background-color', 'white')    
        } else {
            $('#foreheadMid'+ id).css('background-color', '#' + color)
        }
}



/*Animations:
**************/

// Switch animations:
function animationVariation(num, id) {
    resetAnimation(id);
    switch (num) {
        case 1:
            $('#animationName' + id).html('None')
            break;
        case 2:
            $('#animationName' + id).html('Head')
            animationType1(id);
            break;
        case 3:
            $('#animationName' + id).html('Tail')
            animationType2(id);
            break;
        case 4:
            $('#animationName' + id).html('Paws')
            animationType3(id);
            break;
        case 5:
            $('#animationName' + id).html('Eyes')
            animationType4(id);
            break;
        case 6:
            $('#animationName' + id).html('All')
            animationType5(id);
            break;
    }
}

// Add CSS animation class:
function animationType1(id) { //HEAD MOVING
    $('#wholeHead'+ id).addClass('movingHead');
}

function animationType2(id) { //TAIL MOVING
    $('#tail'+ id).addClass('movingTail');
}

function animationType3(id) { //PAWS MOVING
    $('#footFrontLeft'+ id + ', #footBackLeft' + id).addClass('movingPawsLeft');
    $('#footFrontRight'+ id + ', #footBackRight' + id).addClass('movingPawsRight');
}

function animationType4(id) { //EYES MOVING
    let temp = parseInt($('#eyeName' + id).val()); // CHANGE AFTER EYES SHAPE
    resetEyes(id)
    if (temp == 3 || temp == 4 || temp == 6) {
        $('#innerPupilLeft' + id + ', #smallerInnerPupilLeft' + id + ', #innerPupilRight' + id + ', #smallerInnerPupilRight' + id).addClass('movingInnerEyes');
    } else {
        $('#pupilLeft' + id + ', #pupilRight' + id).addClass('movingEyes');
        $('#innerPupilLeft' + id + ', #smallerInnerPupilLeft' + id + ', #innerPupilRight' + id + ', #smallerInnerPupilRight' + id).addClass('movingInnerEyes');
    }
}

function animationType5(id) { //MOVING ALL
    animationType1(id)
    animationType2(id)
    animationType3(id)
    animationType4(id)
}

function resetEyes(id) { //RESET EYES ANIM ONLY
    $('#pupilLeft' + id + ', #pupilRight' + id).removeClass('movingEyes');
    $('#innerPupilLeft' + id + ', #smallerInnerPupilLeft' + id + ', #innerPupilRight' + id + ', #smallerInnerPupilRight' + id).removeClass('movingInnerEyes');
}

function resetAnimation(id) { //RESET ALL ANIMS
    $('#wholeHead'+ id).removeClass('movingHead');
    $('#tail'+ id).removeClass('movingTail');
    $('#footFrontLeft'+ id + ', #footBackLeft' + id).removeClass('movingPawsLeft');
    $('#footFrontRight'+ id + ', #footBackRight' + id).removeClass('movingPawsRight');
    resetEyes(id);
}