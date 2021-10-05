const factoryTab = $("#nav-factory-tab");
factoryTab.addEventListener("click", factory);



function factory() {

    var factory =

        `<div class="factory container p-5" style="margin-top: 12vh; margin-bottom: 10vh;">
            <div class="factoryTitle" align="center">
                <h1 class="c-white">Cats-Factory</h1>
                <p class="c-white">Create your custom NFT Cat from scratch!
                    <span id="gen0CountText" class="hidden">(<span id="gen0Count">?</span> out of 50!)</span>
                </p>
            </div>


            <div class="row justify-content-center mt-5">
                <div class="col-lg-4 catBox m-2 light-b-shadow position-relative d-flex justify-content-center">
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

                    <br>

                    <div class ="dnaDiv" id="catDNA">
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
                    <span id="dnadecorationColor"></span>
                    <span id="dnaanimation"></span>

                    <span id="dnaspecial"></span>
                    </b>
                    </div>
                </div>

                <div class="col-lg-6 cattributes m-2 light-b-shadow">

                    <!-- Tabs -->
                    <div align="center">
                        <div class="tabs">
                            <button type="button" class="btn btn-primary catColorsBtn">Cat Colors</button>
                            <button type="button" class="btn btn-primary cattributesBtn">Cattributes</button>
                        </div>
                    </div>

                    <!-- Cat colors -->
                    <div class="tab catColorsBtn">
                        <div class="form-group">
                            <label for="formControlRange"><b>Head and body color</b><span class="badge badge-dark ml-2"
                                id="bodycode"></span></label>
                            <input type="range" min="10" max="98" class="form-control-range" id="bodycolor">
                        </div>
                        <div class="form-group">
                            <label for="formControlRange"><b>Mouth and belly color</b><span class="badge badge-dark ml-2"
                                id="mouthcode"></span></label>
                            <input type="range" min="10" max="98" class="form-control-range" id="mouthcolor">
                        </div>
                        <div class="form-group">
                            <label for="formControlRange"><b>Paws, ears and tail color</b><span class="badge badge-dark ml-2"
                                id="pawscode"></span></label>
                            <input type="range" min="10" max="98" class="form-control-range" id="pawscolor">
                        </div>
                        <div class="form-group">
                            <label for="formControlRange"><b>Eyes and tail-ball color</b><span class="badge badge-dark ml-2"
                                id="eyescode"></span></label>
                            <input type="range" min="10" max="98" class="form-control-range" id="eyescolor">
                        </div>
                        <div class="form-group">
                            <label for="formControlRange"><b>Collar color</b><span class="badge badge-dark ml-2"
                                id="collarcode"></span></label>
                            <input type="range" min="10" max="98" class="form-control-range" id="collarcolor">
                        </div>
                    </div>

                    <!-- Cattributes -->
                    <div class="tab cattributesBtn">
                        <div class="form-group">
                            <label for="formControlRange"><b>Eyes shape</b><span class="badge badge-dark ml-2"
                                id="eyeName"></span></label>
                            <input type="range" min="1" max="6" class="form-control-range" id="eyeshape">
                        </div>
                        <div class="form-group">
                            <label for="formControlRange"><b>Forehead shape</b><span class="badge badge-dark ml-2"
                                id="decorationName"></span></label>
                            <input type="range" min="1" max="5" class="form-control-range" id="decorationshape">
                        </div>
                        <div class="form-group">
                            <label for="formControlRange"><b>Forehead's color</b><span class="badge badge-dark ml-2"
                                id="decorationcode"></span></label>
                            <input type="range" min="10" max="98" class="form-control-range" id="decorationcolor">
                        </div>
                        <div class="form-group">
                            <label for="formControlRange"><b>Animation</b><span class="badge badge-dark ml-2"
                                id="animationName"></span></label>
                            <input type="range" min="1" max="6" class="form-control-range" id="animation">
                        </div>
                    </div>
                </div>
            </div>
            <br>
                <div class="row">
                    <div align="center" class="col-lg-6 catBox m-2 light-b-shadow">
                        <button type="button" class="btn btn-primary default btn-lg">Default DNA</button>
                        <button type="button" class="btn btn-warning random btn-lg">Random DNA</button>
                    </div>
                    <div align="center" class="col-lg-5 catBox m-2 light-b-shadow">
                        <button type="button" class="btn btn-success btn-lg btn-block createCatBtn">CREATE</button>
                    </div>
                </div>
                <br>

                <div class="alert alert-success" role="alert" id="notification"></div>
        </div>`

    $('#nav-factory').html(factory)
}
