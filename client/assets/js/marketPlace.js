// Load marketPlace tab
async function loadMarketplace() {
    $("#marketplace-collection").empty();
    pendingNotification();

    var marketOffers = [];
    
    try {
        let offers = await instanceMarketplaceContract.methods.getAllTokenOnSale().call();

        for (i = 0; i < offers.length; i++) {
            let res = await instanceMarketplaceContract.methods.getOffer(offers[i]).call();
            let priceEther = web3.utils.fromWei(res.price, "ether");
            let offer = {
                catId: res.tokenId,
                seller: res.seller,
                price: priceEther,
            };
            marketOffers.push(offer);
        }
    } catch (err) {
        errorNotification(err)
        return;
    }

    if (marketOffers.length == 0) {
        $("#marketplace-collection").append("<p class='text-light'>There are currently no cats for sale...</p>");
    }

    for (i = 0; i < marketOffers.length; i++) {
        offerIndex = i;
        let catId = marketOffers[i].catId;
        var cat = await instanceCatContract.methods.getCat(catId).call();
        appendOffer(cat.genes, offerIndex, catId, cat.generation, $("#marketplace-collection"))
        var offerCard = $(`#offerview${i}`);

        if (marketOffers[i].seller.toLowerCase() === userAddress.toLowerCase()) {
            const action = marketActionHtml(marketOffers[i].seller, marketOffers[i].price, marketOffers[i].catId, true);
            offerCard.append(action);

        } else {
            const action = marketActionHtml(marketOffers[i].seller, marketOffers[i].price, marketOffers[i].catId, false);
            offerCard.append(action);
        }
    }
}

// Define "CANCEL" or "BUY" function and display HTML action div
function marketActionHtml(owner, priceEther, catId, isCancelAction = false) {
    let actionLabel = "Buy";
    let functionCall = `buyCat(${catId}, ${priceEther})`;
    let color = "primary";

    if (isCancelAction) {
        actionLabel = "Cancel";
        functionCall = `cancelOffer(${catId})`;
        color = "secondary";
    }

    const ownerTrimmed = owner.slice(0, 5) + "..." + owner.slice(-3);

    const html = `
      <div id="marketAction" class="row p-2 rounded d-flex align-items-center cattributes mx-5 light-b-shadow text-${color} d-flex">
        <span class="col">Owner:</span>
        <a type="button" class="col btn btn-link text-${color}" 
            href="https://kovan.etherscan.io/address/${owner}"
            target="_blank" rel="noopener noreferrer">
            ${ownerTrimmed}
        </a>
        <div class="row-cols-2 p-2 rounded d-flex align-items-center">
            <div class="col text-${color} fw-bold">
                <span class="offerPrice">${priceEther}</span> ETH
            </div>
            <button
            type="button"
            class="col btn btn-${color} light-b-shadow"
            onclick="${functionCall}"
            >
            <b>${actionLabel}</b>
            </button>
        </div>
      </div>
    `;

    return html;
}

// Display the selection modal
function selectForSale(domId, userIndex, tokenId) {
    showSelectedCat(domId, userIndex);

    $("#selectCatModal").modal("hide");
    $(`#${domId} ~ * .selectedId`).html(tokenId);
    $(".card-body").css({ "visibility": "visible" });

    const sellPrice = $("#sellPrice").val();
    if (tokenId != "" && sellPrice != "" && sellPrice >= 0) {
        $("#sellBtn").removeClass("disabled");
    }
}


async function sellCat() {
    const tokenId = $("#sellCat ~ * .selectedId").html();
    const price = parseFloat($("#sellPrice").val());

    if (Number.isNaN(price)) {
        console.error("sellCat: NaN");
        return;
    }
    const priceWeiStr = web3.utils.toWei(String(price), "ether");

    // freeze interface after sent transaction while waiting for the on-chain event
    $("#sellPrice").attr("disabled", "");
    $("#sellBtn").addClass("disabled");
    $("#sellCat").removeClass("pointer");
    $("#sellCat").removeAttr("data-bs-toggle");
    $("#sellCat").removeAttr("onclick");

    try {
        pendingNotification();

        const marketplaceIsOperator = await instanceCatContract.methods
            .isApprovedForAll(userAddress, MARKETPLACE_CONTRACT_ADD)
            .call();

        if (!marketplaceIsOperator) {
            const contractLink =
                `<a class="alert-link" href="https://kovan.etherscan.io/address/${MARKETPLACE_CONTRACT_ADD}"
            target="_blank" rel="noopener noreferrer" style="font-size: 0px;">
            <span class="fs-6">CryptoCat - NFTs | Marketplace Smart-Contract</span>
          </a>`;

            let message = `Approval needed.<br>You must first approve the ${contractLink}
        &nbsp;in order to create a sale offer.`;

            showNotifications(message);

            const res = await instanceCatContract.methods
                .setApprovalForAll(MARKETPLACE_CONTRACT_ADD, "true")
                .send();
        }

        pendingNotification();
        const res = await instanceMarketplaceContract.methods
            .setOffer(priceWeiStr, tokenId)
            .send();
    } catch (err) {
        errorNotification(err);
        console.log(err)
    }
    resetSell();
    scrollToTop();
}


async function cancelOffer(catId) {
    try {
        pendingNotification();

        const res = await instanceMarketplaceContract.methods.removeOffer(catId).send();

        removeCatOffer(catId);
    } catch (err) {
        errorNotification(err);
    }
}

async function buyCat(catId, priceEther) {
    const priceWei = web3.utils.toWei(String(priceEther), "ether");

    try {
        pendingNotification();

        const res = await instanceMarketplaceContract.methods
            .buyCat(catId)
            .send({ value: priceWei });

        removeCatOffer(catId);
    } catch (err) {
        errorNotification(err);
    }
    scrollToTop();
}

function removeCatOffer(catId) {
    $(`#marketplace-collection #offerview${catId}`).remove();
}


function resetSell() {
    $("#sellCat").html("Select a cat to sell");
    $("#sellCat").addClass("btn");
    $("#sellCat").addClass("dark-btn");
    $("#sellPrice").val("");

    $(".selectedId").html("");
    $(".card-body").css({ "visibility": "hidden" });
    $("#sellBtn").addClass("disabled");
    $("#sellPrice").removeAttr("disabled");

    $("#sellCat").addClass("pointer");
    $("#sellCat").attr("data-bs-toggle", "modal");
    $("#sellCat").attr("onclick", "fillSelectionModal(this.id)");
}

$("#resetSellBtn").click(() => {
    resetSell();
})
