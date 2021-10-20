// Display cat selection modal for breeding and marketplace:


// Display available cats into modal
function fillSelectionModal(domId) {

  resetModal();

  const dadId = $("#breedMale ~ * .generalId").html();
  const mumId = $("#breedFemale ~ * .generalId").html();
  const sellCatId = $("#sellCat ~ * .generalId").html();

  for (i = 0; i < userCats.length; i++) {

    const catCopy = $("#catview" + i).clone();
    catCopy.addClass("pointer");
    const tokenId = userCats[i].indexId;

    let functionName = "selectForBreeding";
    if (domId == "sellCat") {
      functionName = "selectForSale";
    }

    if ( tokenId != dadId && tokenId != mumId && tokenId != sellCatId) {
      catCopy.addClass("pointer");
      catCopy.attr("onclick", `${functionName}("${domId}", "${i}", "${tokenId}")`);
      catCopy.appendTo("#catSelection");
    }
  }
}


// Select one parent for breeding:
function selectForBreeding(domId, userIndex, tokenId) {

  showSelectedCat(domId, userIndex);

  $("#selectCatModal").modal("hide");
  $(`#${domId} ~ * .selectedId`).html(tokenId);
  $(".card-body").css({ "visibility": "visible" });

  if ($("#breedFemale").html() != "" && $("#breedMale").html() != "") {
    $("#breedBtn").removeClass("disabled");
  }

}


// Display selected parent for breeding:
function showSelectedCat(domId, userIndex) {

  let div = $(`#catview${userIndex}`).clone();
  $(`#wholeHead${userIndex}`).css({ "width": "26vh" });

  $("#" + domId).empty();
  $("#" + domId).removeClass("btn");
  $("#" + domId).removeClass("dark-btn");
  $("#" + domId).append(div);

}




// Reset modal window, clear all cats:
function resetModal() {
  $("#catSelection").empty();
}


function resetBreed() {

  $("#breedFemale").html("Select Mummy");
  $("#breedFemale").addClass("btn");
  $("#breedFemale").addClass("dark-btn");

  $("#breedMale").html("Select Daddy");
  $("#breedMale").addClass("btn");
  $("#breedMale").addClass("dark-btn");

  $(".selectedId").html("");
  $(".card-body").css({ "visibility": "hidden" });
  $("#breedBtn").addClass("disabled");

  $("#breedFemale").addClass("pointer");
  $("#breedMale").addClass("pointer");
  $("#breedFemale").attr("data-bs-toggle", "modal");
  $("#breedMale").attr("data-bs-toggle", "modal");
  $("#breedFemale").attr("onclick", "fillSelectionModal(this.id)");
  $("#breedMale").attr("onclick", "fillSelectionModal(this.id)");
}


$("#resetBreedBtn").click(() => {
  resetBreed();
})


/*
function resetSell() {
  $("#sellCat").empty();
  $("#sellPrice").val("");

  $("#sellCat + .card-body").html(EMPTY_CARD_BODY);
  $("#sellCat").removeClass("silverBorder goldBorder");

  $("#sellBtn").addClass("disabled");
  $("#sellPrice").removeAttr("disabled");

  $("#sellCat").addClass("pointer");
  $("#sellCat").attr("data-bs-toggle", "modal");
  $("#sellCat").attr("onclick", "fillSelectCatModal(this.id)");
}

*/