//Random color
function getColor() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return randomColor
}

function genColors(){
    var colors = []
    for(var i = 10; i < 99; i ++){
      var color = getColor()
      colors[i] = color
    }
    return colors
}



/*Body color variations:
************************/

function bodyColor(color,code) {
    $('.head_background, .ear_right, .ear_left, .core_body').css('background-color', '#' + color)  //This changes the color of the cat
    $('#bodycode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnabody').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function mouthColor(color,code) {
    $('.face_body, .inner_body').css('background-color', '#' + color) 
    $('#mouthcode').html('code: '+code)
    $('#dnamouth').html(code)
}

function pawsColor(color,code) {
    $('.inner_ear_right, .inner_ear_left, .foot, .tail').css('background-color', '#' + color)  //This changes the color of the cat
    $('#pawscode').html('code: '+code)
    $('#dnapaws').html(code)
}

function eyesColor(color,code) {
    $('.pupils, .tail_ball').css('background-color', '#' + color)
    $('#eyescode').html('code: '+code)
    $('#dnaeyes').html(code)
}

function decorationColor(color,code) {
    let temp = $('#decorationshape').val()
        if (temp == 5) {
            $('.forehead').css('background-color', '#' + color)
            $('.forehead.line_left').css('background-color', 'black')
            $('.forehead.line_right').css('background-color', 'white')    
        } else {
            $('.forehead').css('background-color', '#' + color)
        }
    $('#decorationcode').html('code: '+code)
    $('#dnadecorationColor').html(code)
}

function collarColor(color,code) {
    $('.collar').css('background-color', '#' + color)
    $('#collarcode').html('code: '+code)
    $('#dnacollar').html(code)
}






/*Eyes variations:
******************/

function switchEyes(num) { 
    switch (num) {
        case 1:
            $('#eyeName').html('Basic') 
            break 
        case 2:                
            $('#eyeName').html('Chill') 
            eyesType1()                
            break
        case 3:
            $('#eyeName').html('Tired')
            eyesType2()
            break
        case 4:
            $('#eyeName').html('Cyclope')
            eyesType3()
            break
        case 5:
            $('#eyeName').html('Asean')
            eyesType4()
            break
        case 6:
            $('#eyeName').html('Surprised')
            eyesType5()
            break
    }
}

function eyeVariation(num) {
    $('#dnashape').html(num)
    resetEyes()
    normalEyes()
    switchEyes(num)

    let eyeAnim = parseInt($('#animation').val());
    if (eyeAnim == 5 || eyeAnim == 6) {
        animationType4(eyeAnim)
    }
}


function normalEyes() { //NORMAL
    $('.eye').css('background-color', 'white')
    $('.eyes_right').css({'visibility': 'visible'})
    $('.eyes_left').css({'transform': 'rotate(0deg)', 'width': '50px', 'height': '41px', 'top': '0px', 'left': '0px'})
    $('.eyes_right').css('transform', 'rotate(0deg)')

    $('.pupils').css({'border-radius': '50%', 'width': '40px', 'height': '36px'})
    $('.pupils.left, .pupils.right').css({'border': 'none', 'transform': 'rotate(0deg)'})
    $('.pupils.left').css({'top': '3px', 'left': '6px'})
    $('.pupils.right').css({'top': '3px', 'left': '4px'})

    $('.inner_pupil.left').css({'top': '11px', 'left': '14px'})
    $('.smaller_inner_pupil.left').css({'top': '17px', 'left': '14px'})
    $('.inner_pupil.right').css({'top': '11px', 'left': '14px'})
    $('.smaller_inner_pupil.right').css({'top': '17px', 'left': '13px'})
}

function eyesType1() { //CHILL
    $('.pupils.left, .pupils.right').css({'border-top': '12px solid'})
    $('.pupils').css('border-color', '#464343')
    
    $('.inner_pupil.left').css({'top': '24px', 'left': '15px'})
    $('.smaller_inner_pupil.left').css({'top': '30px', 'left': '13px'})
    
    $('.inner_pupil.right').css({'top': '24px', 'left': '14px'})
    $('.smaller_inner_pupil.right').css({'top': '31px', 'left': '12px'})
}

function eyesType2() { //TIRED
    $('.pupils.left, .pupils.right').css({'border-top': '12px solid', 'border-bottom': '12px solid'})
    $('.pupils').css({'border-color': '#464343', 'width': '48px', 'height': '35px'})
    
    $('.pupils.left').css({'top': '2px', 'left': '0px'})
    $('.pupils.right').css({'top': '2px', 'left': '0px'})

    $('.inner_pupil.left').css({'top': '15px', 'left': '16px'})
    $('.smaller_inner_pupil.left').css({'top': '20px', 'left': '14px'})

    $('.inner_pupil.right').css({'top': '15px', 'left': '11px'})
    $('.smaller_inner_pupil.right').css({'top': '20px', 'left': '9px'})
}

function eyesType3() { //CYCLOPE
    $('.eyes_right').css({'visibility': 'hidden'})
    $('.eyes_left').css({'width': '45px', 'height': '45px', 'top': '-10px', 'left': '50px'})

    $('.pupils.left').css({'width': '41px', 'height': '41px', 'top': '2px', 'left': '2px'})
    $('.inner_pupil.left').css({'top': '13px', 'left': '19px'})
    $('.smaller_inner_pupil.left').css({'top': '20px', 'left': '18px'})
}

function eyesType4() { //ASEAN
    $('.eyes_left').css({'transform': 'rotate(15deg)'})
    $('.eyes_right').css('transform', 'rotate(-15deg)')

    $('.pupils .left').css('transform', 'rotate(-15deg)')
    $('.pupils .right').css('transform', 'rotate(15deg)')

    $('.inner_pupil.left').css({'top': '16px', 'left': '14px'})
    $('.smaller_inner_pupil.left').css({'top': '23px', 'left': '15px'})
}

function eyesType5() { //SURPRISED
    $('.eyes_left').css({"transform": "rotate(-90deg)"})
    $('.eyes_right').css('transform', 'rotate(-90deg)')

    $('.pupils.left').css({'transform': 'rotate(-90deg)', 'width': '27px', 'height': '36px', 'top': '4px', 'left': '6px'})
    $('.pupils.right').css({'transform': 'rotate(-90deg)', 'width': '27px', 'height': '36px', 'top': '3px', 'left': '8px'})

    $('.inner_pupil.left').css({'top': '14px', 'left': '19px'})
    $('.smaller_inner_pupil.left').css({'top': '14px', 'left': '26px'})

    $('.inner_pupil.right').css({'top': '14px', 'left': '20px'})
    $('.smaller_inner_pupil.right').css({'top': '13px', 'left': '27px'})
}




/*Decorations variations:
*************************/

function decorationVariation(num) {
    $('#dnadecoration').html(num)
    switch (num) {
        case 1:
            normalDecoration()
            $('#decorationName').html('None') //no forehaed deco
            noDecoration()
            break
        case 2:
            normalDecoration()    
            $('#decorationName').html('Basic')
            break
        case 3:
            normalDecoration()
            $('#decorationName').html('Wild')
            wildDecoration()
            break
        case 4:
            normalDecoration()
            $('#decorationName').html('Crescendo')
            crescendoDecoration()
            break
        case 5:
            normalDecoration()
            $('#decorationName').html('Third eye')
            thirdEyeDecoration()
        break
    }
}

function normalDecoration() {   //Remove all style from other decorations
    $('.forehead').css({'display': 'block'})
    $('.forehead').css({ "transform": "rotate(0deg)", "height": "50px", "width": "15px", "top": "-3px", "left": "91px", "border-radius": "40% 40% 40% 40%", "background-color": "#DDD0C9" })
    $('.forehead.line_left').css({ "transform": "rotate(2deg)", "height": "33px", "width": "13px", "top": "5px", "left": "-17px", "border-radius": "40% 40% 40% 40%", "background-color": "#DDD0C9" })
    $('.forehead.line_right').css({ "transform": "rotate(-2deg)", "height": "33px", "width": "13px", "top": "5px", "left": "19px", "border-radius": "40% 40% 40% 40%", "background-color": "#DDD0C9" })
}

function noDecoration() { //NONE
    $('.forehead').css({'display': 'none'})
}

function wildDecoration() { //WILD
    $('.forehead').css({ "transform": "rotate(0deg)", "height": "55px", "width": "15px", "top": "-3px", "left": "92px", "border-radius": "50% 50% 50% 50%" })
    $('.forehead.line_left').css({ "transform": "rotate(30deg)", "height": "40px", "width": "10px", "top": "2px", "left": "-27px", "border-radius": "50% 50% 50% 50%" })
    $('.forehead.line_right').css({ "transform": "rotate(-30deg)", "height": "40px", "width": "10px", "top": "2px", "left": "33px", "border-radius": "50% 50% 50% 50%" })
}

function crescendoDecoration() {   //CRESCENDO
    $('.forehead').css({ "transform": "rotate(0deg)", "height": "43px", "width": "14px", "top": "-15px", "border-radius": "0 0 50% 50%" })
    $('.forehead.line_left').css({ "transform": "rotate(0deg)", "height": "31px", "width": "14px", "top": "1px", "border-radius": "6% 0 50% 50%" })
    $('.forehead.line_right').css({ "transform": "rotate(0deg)", "height": "55px", "width": "14px", "top": "0px", "left": "18px", "border-radius": "0% 40% 50% 50%" })
}

function thirdEyeDecoration() { //THIRD EYE
    $('.forehead').css({ "transform": "rotate(0deg)", "height": "35px", "width": "55px", "top": "6px", "left": "72px", "border-radius": "50%", "background-color": "#b0cff5" })
    $('.forehead.line_left').css({ "transform": "rotate(0deg)", "height": "30px", "width": "30px", "top": "3px", "left": "13px", "border-radius": "50%", "background-color": "black" })
    $('.forehead.line_right').css({ "transform": "rotate(0deg)", "height": "5px", "width": "5px", "top": "14px", "left": "25px", "border-radius": "50%", "background-color": "white" })
}





/*Animations:
**************/

function animationVariation(num) {
    $('#dnaanimation').html(num)
    switch (num) {
        case 1:
            resetAnimation();
            $('#animationName').html('None')
            break;
        case 2:
            resetAnimation();
            $('#animationName').html('Head')
            animationType1();
            break;
        case 3:
            resetAnimation();
            $('#animationName').html('Tail')
            animationType2();
            break;
        case 4:
            resetAnimation();
            $('#animationName').html('Paws')
            animationType3();
            break;
        case 5:
            resetAnimation();
            $('#animationName').html('Eyes')
            animationType4();
            break;
        case 6:
            resetAnimation();
            $('#animationName').html('All')
            animationType5();
            break;
    }
}


function animationType1() { //HEAD MOVING
    $('.head').addClass('movingHead');
}

function animationType2() { //TAIL MOVING
    $('.tail').addClass('movingTail');
}

function animationType3() { //PAWS MOVING
    $('.foot.front.left, .foot.back.left').addClass('movingPawsLeft');
    $('.foot.front.right, .foot.back.right').addClass('movingPawsRight');
}

function animationType4() { //EYES MOVING
    let temp = parseInt($('#eyeshape').val());
    resetEyes()
    if (temp == 3 || temp == 4 || temp == 6) {
        $('.inner_pupil.left, .smaller_inner_pupil.left, .inner_pupil.right, .smaller_inner_pupil.right').addClass('movingInnerEyes');
    } else {
        $('.pupils.left, .pupils.right').addClass('movingEyes');
        $('.inner_pupil.left, .smaller_inner_pupil.left, .inner_pupil.right, .smaller_inner_pupil.right').addClass('movingInnerEyes');
    }
}

function animationType5() { //MOVING ALL
    animationType1()
    animationType2()
    animationType3()
    animationType4()
}

function resetEyes() { //RESET EYES ANIM ONLY
    $('.pupils.left, .pupils.right').removeClass('movingEyes');
    $('.inner_pupil.left, .smaller_inner_pupil.left, .inner_pupil.right, .smaller_inner_pupil.right').removeClass('movingInnerEyes');
}

function resetAnimation() { //RESET ALL ANIMS
    $('.head').removeClass('movingHead');
    $('.tail').removeClass('movingTail');
    $('.foot.front.left, .foot.back.left').removeClass('movingPawsLeft');
    $('.foot.front.right, .foot.back.right').removeClass('movingPawsRight');
    resetEyes();
}