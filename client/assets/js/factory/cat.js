// when page load
$(document).ready(function () {
    cat();
});


// Display HTML code for catin Factory
function cat() {

    var cat = 
    `<div class="col-lg-4 catBox m-2 light-b-shadow d-flex justify-content-center">
        <div class="cat">
            <div class="head">
                <div class="head_background"></div>
                <div class="ears">
                    <div class="ear_left">
                        <div class="inner_ear_left"></div>
                    </div>
                    <div class="ear_right">
                        <div class="inner_ear_right"></div>
                    </div>
                </div>
                <div class="forehead">
                    <div class="forehead line_left"></div>
                    <div class="forehead line_right"></div>
                </div>
                <div class="eyes">
                    <div class="eyes_left">
                        <div class="pupils left"></div>
                        <div class="inner_pupil left"></div>
                        <div class="smaller_inner_pupil left"></div>
                    </div>
                    <div class="eyes_right">
                        <div class="pupils right"></div>
                        <div class="inner_pupil right"></div>
                        <div class="smaller_inner_pupil right"></div>
                    </div>
                </div>
                <div class="face_body">
                    <div class="nose"></div>
                    <div class="mouth">
                        <div class="mouth_upper"></div>
                        <div class="mouth_lower_right"></div>
                        <div class="mouth_lower_left"></div>
                    </div>
                    <div class="hairs">
                        <div class="hair left top"></div>
                        <div class="hair left middle"></div>
                        <div class="hair left bottom"></div>
                        <div class="hair right top"></div>
                        <div class="hair right middle"></div>
                        <div class="hair right bottom"></div>
                    </div>
                </div>
            </div>

            <div class="catBody">
                <div class="collar"></div>
                <div class="core_body">
                    <div class="inner_body"></div>
                </div>
                <div class="feet">
                    <div class="foot front left"></div>
                    <div class="foot front right"></div>
                    <div class="foot back left"></div>
                    <div class="foot back right"></div>
                </div>
                <div class="tail">
                    <div class="tail_ball"></div>
                </div>
            </div>
        </div>

        </ br>

        <div class="dnaDiv" id="catDNA">
            <b>
                DNA:
                <!--Colors-->
                <span id="dnabody"></span>
                <span id="dnamouth"></span>
                <span id="dnapaws"></span>
                <span id="dnaeyes"></span>
                <span id="dnacollar"></span>

                <!--Cattributes-->
                <span id="dnashape"></span>
                <span id="dnadecoration"></span>
                <span id="dnadecorationCollor"></span>
                <span id="dnaanimation"></span>

                <span id="dnaspecial"></span>
            </b>
        </div>
    </div >

    <div class="col-lg-6 cattributes m-2 light-b-shadow">

        <!-- Tabs -->
        <ul class="nav nav-pills mb-5 justify-content-center" role="tablist">
            <li class="nav-item">
                <button class="nav-link active"
                    id="catColors-tab" type="button" role="tab"
                    data-bs-toggle="tab" data-bs-target="#catColors">Cat Colors
                </button>
            </li>
            <li class="nav-item">
                <button class="nav-link"
                    id="cattributes-tab" type="button" role="tab"
                    data-bs-toggle="tab" data-bs-target="#cattributes">Cattributes
                </button>
            </li>
        </ul>

        <!-- Cat colors -->
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="catColors" role="tabpanel">
                <div class="form-group" style="margin-bottom: 1rem">
                    <label for="formControlRange" style="margin-bottom: 1rem"><b>Head and body color</b><span
                        class="badge bg-dark ml-2" id="bodycode"></span></label>
                    <input type="range" min="10" max="98" class="form-range" id="bodycolor" style="width: 100%"
                    onchange="changeFaceColor()">
                </div>
                <div class="form-group" style="margin-bottom: 1rem">
                    <label for="formControlRange"><b>Mouth and belly color</b><span
                        class="badge bg-dark ml-2" id="mouthcode"></span></label>
                    <input type="range" min="10" max="98" class="form-range" id="mouthcolor" style="width: 100%"
                    onchange="changeMouthColor()">
                </div>
                <div class="form-group" style="margin-bottom: 1rem">
                    <label for="formControlRange"><b>Paws, ears and tail color</b><span
                        class="badge bg-dark ml-2" id="pawscode"></span></label>
                    <input type="range" min="10" max="98" class="form-range" id="pawscolor" style="width: 100%"
                    onchange="changePawsColor()">
                </div>
                <div class="form-group" style="margin-bottom: 1rem">
                    <label for="formControlRange"><b>Eyes and tail-ball color</b><span
                        class="badge bg-dark ml-2" id="eyescode"></span></label>
                    <input type="range" min="10" max="98" class="form-range" id="eyescolor" style="width: 100%"
                    onchange="changeEyesColor()">
                </div>
                <div class="form-group" style="margin-bottom: 1rem">
                    <label for="formControlRange"><b>Collar color</b><span class="badge bg-dark ml-2"
                        id="collarcode"></span></label>
                    <input type="range" min="10" max="98" class="form-range" id="collarcolor" style="width: 100%"
                    onchange="changeCollarColor()">
                </div>
            </div>

            <!-- Cattributes -->
            <div class="tab-pane fade" id="cattributes" role="tabpanel">
                <div class="form-group" style="margin-bottom: 2.1rem">
                    <label for="formControlRange"><b>Eyes shape</b><span class="badge bg-dark ml-2"
                        id="eyeNameFactory"></span></label>
                    <input type="range" min="1" max="6" class="form-range" id="eyeshape" style="width: 100%"
                    onchange="changeEyesShape()">
                </div>
                <div class="form-group" style="margin-bottom: 2.1rem">
                    <label for="formControlRange"><b>Forehead shape</b><span class="badge bg-dark ml-2"
                        id="decorationNameFactory"></span></label>
                    <input type="range" min="1" max="5" class="form-range" id="decorationshape" style="width: 100%"
                    onchange="changeDecoShape()">
                </div>
                <div class="form-group" style="margin-bottom: 2.1rem">
                    <label for="formControlRange"><b>Forehead's color</b><span class="badge bg-dark ml-2"
                        id="decorationcodeFactory"></span></label>
                    <input type="range" min="10" max="98" class="form-range" id="decorationcolor" style="width: 100%"
                    onchange="changeDecoColor()">
                </div>
                <div class="form-group" style="margin-bottom: 2.1rem">
                    <label for="formControlRange"><b>Animation</b><span class="badge bg-dark ml-2"
                        id="animationNameFactory"></span></label>
                    <input type="range" min="1" max="6" class="form-range" id="animation" style="width: 100%"
                    onchange="changeAnim()">
                </div>
            </div>
        </div>
    </div>`

    $('#catAndCattibutes').html(cat)

}
