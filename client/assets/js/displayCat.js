// Fetch cats from smart-contrat and display in front-end 


// Append cat to front-end
function appendCat(dna, id, gen) {
    let dnaToRender = catDna(dna);

    catCard(id);
    renderCat(dnaToRender, id);

    $('#catDNA' + id).html(`
    <span class="badge badge-light"><h4 class="tsp-2 m-0"><b>GEN:</b>`+ gen + `</h4></span>
    <br>
    <span class="badge badge-light"><h4 class="tsp-2 m-0"><b>DNA:</b>`+ dna + `</h4></span>`)
}

/*
//Append cat for breeding
function breedAppend(dna, id, gen, gender) {
    //1 return DNA cat into readable string 
    var KittyDna = catDna(dna)
    //2 build the catCard into HTML    
    catCard(id)
    //3 Render the cats CSS style depending on DNA string
    renderCat(KittyDna, id)
    $('#catDNA' + id).html(`
    <span class="badge badge-light"><h4 class="tsp-2 m-0"><b>GEN:</b>`+ gen + `</h4></span>
    <br>
    <span class="badge badge-light"><h4 class="tsp-2 m-0"><b>DNA:</b>`+ dna + `</h4></span>`)

    $('#catview' + id).attr('onclick', 'selectBreed("' + dna + '","' + id + '","' + gen + '","' + gender + '")')
}

function selectBreed(dna, id, gen, gender) {

    var KittyDna = catDna(dna)
    //2 build the singleCat into HTML
    var body = catBody(gender)
    var Cattributes = cattributes(gender)
    $('#cattributes' + gender).html(Cattributes)
    $('#' + gender).html(body)
    //3 Render the cats CSS style depending on DNA string
    renderCat(KittyDna, gender)
    $('#' + gender).addClass('breedSelect')
    $('#' + gender).attr('data-catid', id)
    $('#' + gender).attr('onclick', 'breedKitties("' + gender + '")')
    $('#catDNA' + gender).html(`
    <span class="badge badge-light"><h4 class="tsp-2 m-0"><b>GEN:</b>`+ gen + `</h4><input class="hidden" id="` + gender + `Id" type="number" value=` + id + `></span>
    <br>
    <span class="badge badge-light"><h4 class="tsp-2 m-0"><b>DNA:</b>`+ dna + `</h4></span>`)
    $('#catSelection').modal('hide')
    removeSelection(id, gender)
    readyToBredd()
}

function readyToBredd() {

    var mumId = $('#DameId').val()
    var dadId = $('#SireId').val()

    if (!empty(mumId) && !empty(dadId)) {
        $('#breed').css('filter', 'none')
        $('#breed').prop('disabled', false)
        $('#breed').attr('onclick', 'breed("' + dadId + '","' + mumId + '")')
        return true
    }
    $('#breed').prop('disabled', true)
    $('#breed').css('filter', ' grayscale()')
    return false
}

//If user select a selected cat from any gender, its remove it from the selection box
function removeSelection(id, gender) {

    var selectionDiv = `<div align="center">
                                <div class="egg">
                                </div>
                                <h4>Select a cat as `+ gender + `</h4>
                            </div>
                        </div>`

    if (gender == 'Dame') {
        var catData = $('#Sire').attr('data-catid')
        if (catData == id) {
            $('#Sire').attr('data-catid', 0)
            $('#Sire').attr('onclick', 'breedKitties(this.id)')
            $('#Sire').html(selectionDiv)
            $('#Sire').removeClass('breedSelect')
            $('#catDNASire').html('')
        }
    }
    if (gender == 'Sire') {
        var catData = $('#Dame').attr('data-catid')
        if (catData == id) {
            $('#Dame').attr('data-catid', 0)
            $('#Dame').attr('onclick', 'breedKitties(this.id)')
            $('#Dame').html(selectionDiv)
            $('#Dame').removeClass('breedSelect')
            $('#catDNADame').html('')
        }
    }
}
*/


async function singleCat(dna, id, gen) {

    var cat_Dna = catDna(dna)
    // build the singleCat into HTML
    var body = catBody(id)
    //var Cattributes = cattributes(id)
    //$('#cattributes').html(Cattributes)
    $('#singleCat').html(body)
    // Render the cats CSS style depending on DNA string
    renderCat(cat_Dna, id)
    $('#catDNA').html(`
    <span class="badge badge-light"><h4 class="tsp-2 m-0"><b>GEN:</b>`+ gen + `</h4></span>
    <br>
    <span class="badge badge-light"><h4 class="tsp-2 m-0"><b>DNA:</b>`+ dna + `</h4></span>`)

    await catOffer(id)
}


/*
// Checks the Kitty on market situation
async function catOffer(id) {

    //Checking if this cat is for Sale
    var offer = await checkOffer(id)
    var seller = offer.seller.toLocaleLowerCase()
    if (offer.onsale == true && seller != user) {
        $('#buyBox').removeClass('hidden')
        $('#priceBtn').html('<b>' + offer.price + ' ETH</b>')
        $('#buyBtn').attr('onclick', 'buyKitten(' + id + ',"' + offer.price + '")')
    }

    var ownership = await catOwnership(id)
    //If user owns the cat
    if (ownership == true) {
        //If is not on sale
        if (offer.onsale == false) {
            $('#sellBox').removeClass('hidden')
            $('#sellBtn').attr('onclick', 'sellCat(' + id + ')')
        } else {
            $('#sellBox').removeClass('hidden')
            $('#cancelBox').removeClass('hidden')
            $('#cancelBtn').attr('onclick', 'deleteOffer(' + id + ')')
            $('#sellBtn').addClass('btn-success')
            $('#sellBtn').html('<b>For sale at:</b>')
            $('#catPrice').val(offer.price)
            $('#catPrice').prop('readonly', true)
        }
    }
}
*/


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
function catCard(id) {

    var catDiv = `<div id="catview` + id + `">
                    <div class="catDiv">`+ catBody(id) + `</div>
                    <div class="catInfos" id="catDNA`+ id + `"></div>
                </div>`
    var catView = $('#catview' + id)

    if (!catView.length) {
        $('#cats-collection').append(catDiv)
    }
}



//HTML Render per CatId:
function catBody(id) {

    var catHTML =
        `<div id="wholeHead` + id + `" class="head">
            <div id="head`+ id + `" class="head_background"></div>
                <div class="ears">
                    <div id="leftEar`+ id + `" class="ear_left">
                        <div id="innerLeftEar`+ id + `" class="inner_ear_left"></div>
                    </div>
                    <div id="rightEar`+ id + `" class="ear_right">
                        <div id="innerRightEar`+ id + `" class="inner_ear_right"></div>
                    </div>
                </div>
            <div id="foreheadMid`+ id + `" class="forehead">
                <div id="foreheadLeft`+ id + `" class="forehead line_left"></div>
                <div id="foreheadRight`+ id + `" class="forehead line_right"></div>
            </div>
            <div class="eyes">
                <div id="eyeLeft`+ id + `" class="eyes_left">
                    <div id="pupilLeft`+ id + `" class="pupils left"></div>
                    <div id="innerPupilLeft`+ id + `" class="inner_pupil left"></div>
                    <div id="smallerInnerPupilLeft`+ id + `" class="smaller_inner_pupil left"></div>
                </div>
                <div id="eyeRight`+ id + `" class="eyes_right">
                    <div id="pupilRight`+ id + `" class="pupils right"></div>
                    <div id="innerPupilRight`+ id + `" class="inner_pupil right"></div>
                    <div id="smallerInnerPupilRight`+ id + `" class="smaller_inner_pupil right"></div>
                </div>
            </div>
            <div id="face`+ id + `" class="face_body">
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
            <div id="collarCol`+ id + `" class="collar"></div>
            <div id="mainBody`+ id + `" class="core_body">
                <div id="bellyCol`+ id + `" class="inner_body"></div>
            </div>
            <div id="footColor`+ id + `" class="feet">
                <div id="footFrontLeft`+ id + `" class="foot front left"></div>
                <div id="footFrontRight`+ id + `" class="foot front right"></div>
                <div id="footBackLeft`+ id + `" class="foot back left"></div>
                <div id="footBackRight`+ id + `" class="foot back right"></div>
            </div>
            <div id="tail`+ id + `" class="tail">
                <div id="tailBallColor`+ id + `" class="tail_ball"></div>
            </div>
        </div>`

    return catHTML;
}

