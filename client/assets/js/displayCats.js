// File to load cat in HTML Div / Tab / Modal


// Get cats per user, then get cat object per cat Id
async function loadCats(div) {
    pendingNotification();
    var catsToLoad = [];

    try {
        let totalCats = await instanceCatContract.methods.getCatPerOwner(userAddress).call();

        for (i = 0; i < totalCats.length; i++) {
            var cat = await instanceCatContract.methods.getCat(totalCats[i]).call();
            catsToLoad.push(cat);
            userIndex = i;
            appendCat(cat.genes, userIndex, cat.indexId, cat.generation, div);
        }

    } catch (err) {
        errorNotification(err)
        return;
    }

    showNotifications("Your cats have been updated.");
}


// Add cat to html element after CSS rendering
function appendCat(dna, userIndex, id, gen, div) {
    let dnaToRender = catDna(dna);

    catCard(div, userIndex, id);
    renderCat(dnaToRender, userIndex);

    $(`#catDNA${id}`).html(`
    <span class="badge bg-light text-dark" id="selectedId"><h4 class="tsp-2 m-0"><b>ID:</b>${id}</h4></span>
    <br>
    <span class="badge bg-light text-dark"><h4 class="tsp-2 m-0"><b>GEN:</b>${gen}</h4></span>
    <br>
    <span class="badge bg-light text-dark"><h4 class="tsp-2 m-0"><b>DNA:</b>${dna}</h4></span>`)
}


// Add offer to html element after CSS rendering
function appendOffer(dna, userIndex, id, gen, div) {
    let dnaToRender = catDna(dna);

    offerCard(div, userIndex, id);
    renderCat(dnaToRender, userIndex);

    $(`#offerDNA${userIndex}`).html(`
    <span class="badge bg-light text-dark" id="selectedId"><h4 class="tsp-2 m-0"><b>ID:</b>${id}</h4></span>
    <br>
    <span class="badge bg-light text-dark"><h4 class="tsp-2 m-0"><b>GEN:</b>${gen}</h4></span>
    <br>
    <span class="badge bg-light text-dark"><h4 class="tsp-2 m-0"><b>DNA:</b>${dna}</h4></span>`)
}

//Apply cat CSS Styles from buidCat.js
function renderCat(dna, id) {
    bodyColor(dna.bodyColor, id)
    mouthColor(dna.mouthColor, id)
    pawsColor(dna.pawsColor, id)
    eyesColor(dna.eyesColor, id)
    collarColor(dna.collarColor, id)
    switchEyes(dna.eyesShape, id)
    decorationVariation(dna.decorationPattern, dna.decorationColor, id)
    animationVariation(dna.animation, id)
}

//Split the cat DNA to use in the render
function catDna(dnaStr) {
    var dna = {
        //Colors
        "bodyColor": dnaStr.substring(0, 2),
        "mouthColor": dnaStr.substring(2, 4),
        "pawsColor": dnaStr.substring(4, 6),
        "eyesColor": dnaStr.substring(6, 8),
        "collarColor": dnaStr.substring(8, 10),
        //Cattributes
        "eyesShape": dnaStr.substring(10, 11),
        "decorationPattern": dnaStr.substring(11, 12),
        "decorationColor": dnaStr.substring(12, 14),
        "animation": dnaStr.substring(14, 15),
        "lastNum": dnaStr.substring(15, 16)
    }
    return dna;
}


//Cat HTML Div for -My Cats- tab
function catCard(div, userIndex, id) {

    var catDiv = `<div id="catview` + userIndex + `">
                    <div class="catDiv light-b-shadow">${catBody(userIndex)}</div>
                    <div class="catInfos" id="catDNA` + id + `"></div>
                </div>`
    var catView = $(`#catview${userIndex}`)

    if (!catView.length) {
        div.append(catDiv)
    }
}

//Offer HTML Div for -Marketplace- tab
function offerCard(div, userIndex, id) {

    var offerDiv = `<div id="offerview${userIndex}">
                    <div class="catDiv light-b-shadow">${catBody(userIndex)}</div>
                    <div class="catInfos" id="offerDNA${userIndex}"></div>
                </div>`
    var offerView = $(`#offerview${userIndex}`)

    if (!offerView.length) {
        div.append(offerDiv)
    }
}

//HTML Render per CatId:
function catBody(id) {

    var catHTML =
        `<div id="wholeHead${id}" class="head">
            <div id="headColor${id}" class="head_background"></div>
                <div class="ears">
                    <div id="leftEar${id}" class="ear_left">
                        <div id="innerLeftEar${id}" class="inner_ear_left"></div>
                    </div>
                    <div id="rightEar${id}" class="ear_right">
                        <div id="innerRightEar${id}" class="inner_ear_right"></div>
                    </div>
                </div>
            <div id="foreheadMid${id}" class="forehead">
                <div id="foreheadLeft${id}" class="forehead line_left"></div>
                <div id="foreheadRight${id}" class="forehead line_right"></div>
            </div>
            <div class="eyes">
                <div id="eyeLeft${id}" class="eyes_left">
                    <div id="pupilLeft${id}" class="pupils left"></div>
                    <div id="innerPupilLeft${id}" class="inner_pupil left"></div>
                    <div id="smallerInnerPupilLeft${id}" class="smaller_inner_pupil left"></div>
                </div>
                <div id="eyeRight${id}" class="eyes_right">
                    <div id="pupilRight${id}" class="pupils right"></div>
                    <div id="innerPupilRight${id}" class="inner_pupil right"></div>
                    <div id="smallerInnerPupilRight${id}" class="smaller_inner_pupil right"></div>
                </div>
            </div>
            <div id="face${id}" class="face_body">
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
            <div id="collarCol${id}" class="collar"></div>
            <div id="mainBody${id}" class="core_body">
                <div id="bellyCol${id}" class="inner_body"></div>
            </div>
            <div id="footColor${id}" class="feet">
                <div id="footFrontLeft${id}" class="foot front left"></div>
                <div id="footFrontRight${id}" class="foot front right"></div>
                <div id="footBackLeft${id}" class="foot back left"></div>
                <div id="footBackRight${id}" class="foot back right"></div>
            </div>
            <div id="tail${id}" class="tail">
                <div id="tailBallColor${id}" class="tail_ball"></div>
            </div>
        </div>`

    return catHTML;
}