//Cat fetching from SM

//Cat HTML Div for catalogue
function catBox(id) {

    var catDiv = `<div class="col-lg-4 pointer fit-content" id="catview` + id + `">
                 <div class="featureBox catDiv">
                 `+ catBody(id) + `                           
                 </div>
                 <div class="dnaDiv" id="catDNA`+ id + `"></div>
                 `+ cattributes(id) + `
                </div>`
    var catView = $('#catview' + id)
    if (!catView.length) {
        $('#catsDiv').append(catDiv)
    }
}


//Simple body of a cat
function catBody(id) {

    var single = `<div class="cat__ear">
                        <div id="leftEar`+ id + `" class="cat__ear--left">
                            <div class="cat__ear--left-inside"></div>
                        </div>
                        <div id="rightEar`+ id + `" class="cat__ear--right">
                            <div class="cat__ear--right-inside"></div>
                        </div>
                    </div>
                    <div id="head`+ id + `" class="cat__head">
                        <div id="midDot`+ id + `" class="cat__head-dots">
                            <div id="leftDot`+ id + `" class="cat__head-dots_first"></div>
                            <div id="rightDot`+ id + `" class="cat__head-dots_second"></div>
                        </div>
                        <div id="catEye`+ id + `" class="cat__eye">
                            <div class="cat__eye--left">
                                <span class="pupil-left"></span>
                            </div>
                            <div class="cat__eye--right">
                                <span class="pupil-right"></span>
                            </div>
                        </div>
                        <div class="cat__nose"></div>
                        <div id="mouth-contour`+ id + `" class="cat__mouth-contour"></div>
                        <div class="cat__mouth-left"></div>
                        <div class="cat__mouth-right"></div>
                        <div class="cat__whiskers-left"></div>
                        <div class="cat__whiskers-right"></div>
                    </div>
                    <div class="cat__body">
                        <div id="chest`+ id + `" class="cat__chest"></div>
                        <div id="chest_inner`+ id + `" class="cat__chest_inner"></div>
                        <div id="pawLeft`+ id + `" class="cat__paw-left"></div>
                        <div id="pawLeftInner`+ id + `" class="cat__paw-left_inner"></div>
                        <div id="pawRight`+ id + `" class="cat__paw-right"></div>
                        <div id="pawRightInner`+ id + `" class="cat__paw-right_inner"></div>
                        <div id="tail`+ id + `" class="cat__tail"></div>
                    </div>`
    return single
}

function cattributes(id) {

    var Cattributes = `<ul class="ml-5 cattributes">
                            <li><span id="eyeName`+ id + `"></span> eyes</li>
                            <li><span id="decorationName`+ id + `"></span> decoration</li>
                            <li><span id="animationName`+ id + `"></span></li>
                        </ul>`
    return Cattributes


}