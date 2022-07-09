// Display cats selection modal for both Breeding & Sell:

// Display available cats into modal
async function fillSelectionModal(domId) {
  resetModal();

  const dadId = $("#breedMale ~ * .selectedId").html();
  const mumId = $("#breedFemale ~ * .selectedId").html();
  const sellCatId = $("#sellCat ~ * .selectedId").html();

  var userCats = await getUserCats();

  for (i = 0; i < userCats.length; i++) {
    const catCopy = $(`#catview${i}`).clone();
    catCopy.addClass("pointer");
    const tokenId = userCats[i].indexId;

    let functionName = "selectForBreeding";
    if (domId === "sellCat") {
      functionName = "selectForSale";
    }

    if (tokenId !== dadId && tokenId !== mumId && tokenId !== sellCatId) {
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
  $(".card-body").css({ visibility: "visible" });

  if ($("#breedFemale").html() !== "" && $("#breedMale").html() !== "") {
    $("#breedBtn").removeClass("disabled");
  }
}

// Display selected parent for breeding:
function showSelectedCat(domId, userIndex) {
  let div = $(`#catview${userIndex}`).clone();

  $("#" + domId).empty();
  $("#" + domId).removeClass("btn");
  $("#" + domId).removeClass("dark-btn");
  $("#" + domId).append(div);
}

// Create Cat NFT from 2 selected parents
async function breedCat() {
  const dadId = $("#breedMale ~ * .selectedId").html();
  const mumId = $("#breedFemale ~ * .selectedId").html();
  // While waiting for event:
  $("#breedBtn").addClass("disabled");
  $("#breedFemale, #breedMale").removeClass("pointer");
  $("#breedFemale, #breedMale").removeAttr("data-bs-toggle");
  $("#breedFemale, #breedMale").removeAttr("onclick");

  try {
    const res = await instanceCatContract.methods.breed(dadId, mumId).send({});
  } catch (err) {
    errorNotification(err);
  }

  resetBreed();
  scrollToTop();
}

// Reset modal window, clear all cats:
function resetModal() {
  $("#catSelection").empty();
}

// Reset the -Breed- tab:
function resetBreed() {
  $("#breedFemale").html("Select Mummy");
  $("#breedFemale").addClass("btn");
  $("#breedFemale").addClass("dark-btn");

  $("#breedMale").html("Select Daddy");
  $("#breedMale").addClass("btn");
  $("#breedMale").addClass("dark-btn");

  $(".selectedId").html("");
  $(".card-body").css({ visibility: "hidden" });
  $("#breedBtn").addClass("disabled");

  $("#breedFemale").addClass("pointer");
  $("#breedMale").addClass("pointer");
  $("#breedFemale").attr("data-bs-toggle", "modal");
  $("#breedMale").attr("data-bs-toggle", "modal");
  $("#breedFemale").attr("onclick", "fillSelectionModal(this.id)");
  $("#breedMale").attr("onclick", "fillSelectionModal(this.id)");
}

// **** BUTTONS LISTENERS **** //

// Breed button listener
$("#breedBtn").click(() => {
  breedCat();
});

// Reset button listener
$("#resetBreedBtn").click(() => {
  resetBreed();
});
