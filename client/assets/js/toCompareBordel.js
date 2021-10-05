const web3 = new Web3(Web3.givenProvider);

const KITTIES_CONTRACT_ADDRESS = "0xE039ac91C3F05742Be310a16d7A873FEe103c462";
const KITTY_MARKETPLACE_CONTRACT_ADDRESS =
  "0x816e69c94aF2Aa269e09B71Acd425364Da7bA457";

let userAddress = undefined;
let kittiesContract;
let userKitties = [];
let marketplaceContract;

let lastBirthEvent = "";
let lastMarketTransactionEvent = "";

$(document).ready(function () {

  // set up MetaMask event listeners
  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is installed.");

    ethereum.on("accountsChanged", function (accounts) {
      restartApp();
    });
    ethereum.on("chainChanged", function (accounts) {
      restartApp();
    });
  } else {
    console.error("MetaMask is inaccessible.");
  }
});

function restartApp() {
  if (userAddress !== undefined) {
    // reload website
    window.location.reload();
  }
}

async function connectMetamask() {
  if (typeof window.ethereum === "undefined") {
    alert("This action requires the MetaMask browser extension.");
    return;
  }

  $("#notification").empty();

  // will start the MetaMask extension
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  userAddress = accounts[0];

  if (accounts.length > 0) {
    console.log("MetaMask connected.");
    $("#connect-metamask-btn").hide();
  } else {
    // user canceled connection request
    return;
  }

  // load contracts
  kittiesContract = new web3.eth.Contract(
    abi.Kitties,
    KITTIES_CONTRACT_ADDRESS,
    { from: userAddress }
  );
  marketplaceContract = new web3.eth.Contract(
    abi.KittyMarketplace,
    KITTY_MARKETPLACE_CONTRACT_ADDRESS,
    { from: userAddress }
  );

  // set up contract event listeners
  kittiesContract.events.Birth(
    { filter: { owner: userAddress }, fromBlock: "latest" },
    async (error, event) => {
      if (error) {
        onchainAlertMsgDanger(error);
        return;
      }

      if (isDuplicatedContractEvent("Birth", event.transactionHash)) {
        return;
      }

      const kittyId = event.returnValues.kittyId;
      const genes = event.returnValues.genes;
      const mumId = event.returnValues.mumId;
      const dadId = event.returnValues.dadId;
      const owner = event.returnValues.owner;
      const transactionHash = event.transactionHash;
      onchainAlertMsg(
        "success",
        "Kitty born.",
        `kittyId: ${kittyId}, mumId: ${mumId}, dadId: ${dadId}, genes: ${genes}, owner: ${owner},`,
        transactionHash
      );

      // update 'userKitties'
      const kitty = await getKitty(kittyId);
      userKitties.push(kitty);
      // update 'My Kitties' tab
      appendKittiesCollection(kitty.kittyId, kitty.generation, kitty.genes);


/*TO ADD:
 *********/
      // update 'Breed' tab if currently visible and unchanged
      const breedMumId = $("#breedFemale ~ * .catId").html();
      const breedDadId = $("#breedMale ~ * .catId").html();
      if (
        $("#nav-breed-tab").hasClass("active") &&
        $("#nav-my-kitties-tab").hasClass("active") &&
        breedMumId == mumId &&
        breedDadId == dadId
      ) {
        $("#catCol" + kitty.kittyId)
          .clone()
          .appendTo("#nav-breed > .row:first-child");
      }
    }
  );




 /*TO ADD:
 *********/

  marketplaceContract.events.MarketTransaction(
    { filter: { caller: userAddress }, fromBlock: "latest" },
    async (error, event) => {
      if (error) {
        onchainAlertMsgDanger(error);
        return;
      }

      const txType = event.returnValues.txType;
      const tokenId = event.returnValues.tokenId;
      const transactionHash = event.transactionHash;

      if (
        txType == "Remove offer" ||
        isDuplicatedContractEvent("MarketTransaction", event.transactionHash)
      ) {
        return;
      }

      if (txType == "Create offer") {
        let offer;
        try {
          offer = await marketplaceContract.methods.getOffer(tokenId).call();
        } catch (err) {
          onchainAlertMsgDanger(err);
          return;
        }

        const priceEther = web3.utils.fromWei(offer.price, "ether");
        onchainAlertMsg(
          "success",
          "Sales offer created.",
          `kittyId: ${tokenId}, price: ${priceEther} ETH,`,
          transactionHash
        );

        const currentNavbarTab = $("#menu .nav-link.active").attr("id");
        if (currentNavbarTab == "nav-marketplace-tab") {
          // update marketplace
          const kittyEl = $("#marketplace-collection #catCol" + tokenId);
          if (kittyEl.length != 0) {
            kittyEl.find("span.offerPrice").html(priceEther);
          } else {
            await appendMarketplaceCollection(
              offer.seller,
              priceEther,
              tokenId
            );
          }
        }
      } else if (txType == "Cancel offer") {
        onchainAlertMsg(
          "success",
          "Sales offer canceled.",
          `kittyId: ${tokenId},`,
          transactionHash
        );
      } else if (txType == "Buy") {
        onchainAlertMsg(
          "success",
          "Kitty bought.",
          `kittyId: ${tokenId},`,
          transactionHash
        );
      } else {
        console.warn(
          "Unhandled MarketTransaction event with 'txType' =",
          txType
        );
        $("#notification").empty();
      }
    }
  );

  $("#createKittyBtn").removeClass("disabled");
  $("#gen0CountText").removeClass("hidden");
  await updateGen0Count();

  const currentNavbarTab = $("#menu .nav-link.active").attr("id");
  if (currentNavbarTab == "nav-my-kitties-tab") {
    await loadKitties();
  } else if (currentNavbarTab == "nav-marketplace-tab") {
    await loadMarketplace();
  } else if (currentNavbarTab == "nav-factory-tab") {
    await updateGen0Count();
  }
}

async function createKitty() {
  try {
    onchainAlertMsgPending();

    let price = "0";
    const owner = await kittiesContract.methods.owner().call();
    if (owner.toLowerCase() !== userAddress.toLowerCase()) {
      price = await kittiesContract.methods.gen0Price().call();
    }

    const res = await kittiesContract.methods
      .createKittyGen0(getDNAString())
      .send({ value: price });

    await updateGen0Count();
  } catch (err) {
    onchainAlertMsgDanger(err);
  }
}

/* DONE!
function onchainAlertMsgPending() {
  const msgConcise = `
    <div class="spinner-border spinner-border-sm text-dark" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  `;
  const msgDetails = "Pending ...";

  onchainAlertMsg("dark", msgConcise, msgDetails);
}

function onchainAlertMsgDanger(error) {
  if (error.message === undefined) {
    console.error(error);
  } else {
    onchainAlertMsg("danger", "Action failed.", error.message);
  }
}

function onchainAlertMsg(type, msgConcise, msgDetails, txHash = "") {
  let txHashMsg = "";
  if (txHash.length > 0) {
    const txHashTrimmed = txHash.slice(0, 5) + "..." + txHash.slice(-3);
    txHashMsg = `
    transactionHash:
    <a
      class="alert-link"
      href="https://ropsten.etherscan.io/tx/${txHash}"
      target="_blank"
      rel="noopener noreferrer"
      >
      ${txHashTrimmed}
    </a>
    `;
  }

  const alertHtml = `
    <div
    class="alert alert-${type} alert-dismissible fade show text-start"
    role="alert"
    >
    <strong>${msgConcise}</strong>
    ${msgDetails}
    ${txHashMsg}
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
    ></button>
    </div>
  `;
  $("#notification").html(alertHtml);
  scrollToTop();
}

*/

function scrollToTop() {
  $(window).scrollTop(0);
}



/* MENU TABS DISPLAY:
*********************/
function showNavHomeTab() {
  const tabEl = document.querySelector("#nav-home-tab");
  const tab = new bootstrap.Tab(tabEl);
  tab.show();
}

async function showNavMyKittiesTab() {
  const tabEl = document.querySelector("#nav-my-kitties-tab");
  const tab = new bootstrap.Tab(tabEl);
  tab.show();

  await myKittiesTabClicked();
}

async function showNavMarketplaceTab() {
  const tabEl = document.querySelector("#nav-marketplace-tab");
  const tab = new bootstrap.Tab(tabEl);
  tab.show();

  await loadMarketplace();
}

async function myKittiesTabClicked() {
  // set active sub-tab
  const tabEl = document.querySelector("#nav-show-tab");
  const tab = new bootstrap.Tab(tabEl);
  tab.show();

  await loadKitties();
}




// TO ADD !!!!!!
async function loadKitties(useTestKitties = false) {
  if (userAddress === undefined) {
    return;
  }

  onchainAlertMsgPending();

  const userKittiesBackend = [];
  if (useTestKitties) {
    userKittiesBackend = getTestKitties();
  } else {
    // get kitties from blockchain
    try {
      const totalTokens = parseInt(
        await kittiesContract.methods.balanceOf(userAddress).call()
      );
      for (let i = 0; i < totalTokens; i++) {
        const tokenId = await kittiesContract.methods
          .tokenOfOwnerByIndex(userAddress, i)
          .call();
        const kitty = await getKitty(tokenId);
        userKittiesBackend.push(kitty);
      }
    } catch (err) {
      onchainAlertMsgDanger(err);
      return;
    }
  }

  if (
    userKitties.length !== userKittiesBackend.length ||
    !userKitties.every(
      (value, index) => value.kittyId === userKittiesBackend[index].kittyId
    )
  ) {
    // clear 'userKitties'
    userKitties.length = 0;
    $("#kitties-collection").empty();

    // add kitties to user collection in 'My Kitties' tab
    userKittiesBackend.forEach((kitty) => {
      appendKittiesCollection(kitty.kittyId, kitty.generation, kitty.genes);
    });

    userKitties = userKittiesBackend;

    console.log("User kitties updated.");
  }

  $("#notification").empty();
}

async function getKitty(kittyId) {
  try {
    const token = await kittiesContract.methods.getKitty(kittyId).call();
    const kitty = new Kitty(
      kittyId,
      token.genes,
      token.birthTime,
      token.mumId,
      token.dadId,
      token.generation
    );
    return kitty;
  } catch (err) {
    onchainAlertMsgDanger(err);
  }
}

function getTestKitties() {
  testKitties = [
    new Kitty("1", "60842070003200", "0", "0", "0", "0"),
    new Kitty("2", "15873571102911", "0", "0", "0", "1"),
    new Kitty("3", "20842670103720", "0", "0", "0", "0"),
    new Kitty("4", "60492871002232", "0", "0", "0", "2"),
    new Kitty("5", "11072791113921", "0", "0", "0", "3"),
    new Kitty("6", "30843570011201", "0", "0", "0", "2"),
    new Kitty("7", "70841290111002", "0", "0", "0", "1"),
  ];
  return testKitties;
}

class Kitty {
  constructor(kittyId, genes, birthTime, mumId, dadId, generation) {
    this.kittyId = kittyId;
    this.genes = genes;
    this.birthTime = birthTime;
    this.mumId = mumId;
    this.dadId = dadId;
    this.generation = generation;
  }
}

async function fillSelectCatModal(domId) {
  const breedMumId = $("#breedFemale ~ * .catId").html();
  const breedDadId = $("#breedMale ~ * .catId").html();
  const sellCatId = $("#sellCat ~ * .catId").html();
  userKitties.forEach((kitty) => {
    if (
      kitty.kittyId != breedMumId &&
      kitty.kittyId != breedDadId &&
      kitty.kittyId != sellCatId
    )
      appendSelectCatModal(domId, kitty.kittyId);
  });
}

function selectForBreeding(domId, kittyId) {
  renderSelectedCatCol(domId, kittyId);

  $("#selectCatModal").modal("hide");

  if ($("#breedFemale").html() != "" && $("#breedMale").html() != "") {
    $("#breedBtn").removeClass("disabled");
  }
}

function renderSelectedCatCol(domId, kittyId) {
  const selectedCat = userKitties.find((kitty) => kitty.kittyId == kittyId);
  const selectedCatEl = $("#cat" + kittyId);
  if (!selectedCat || selectedCatEl.length == 0) {
    console.error(
      "renderSelectedCatCol: 'selectedCat' or 'selectedCatEl' not found"
    );
    return;
  }
  $("#" + domId).empty();
  $("#" + domId).append(selectedCatEl.clone());

  const dnaObject = getDnaFromString(selectedCat.genes);
  const awardClass = calcCattributesAward(kittyId, dnaObject);
  $("#" + domId).addClass(awardClass);

  renderSelectedCatInfo(
    domId,
    selectedCat.kittyId,
    selectedCat.generation,
    selectedCat.genes
  );
}

async function breedKitty() {
  const breedMumId = $("#breedFemale ~ * .catId").html();
  const breedDadId = $("#breedMale ~ * .catId").html();

  // freeze interface after sent transaction while waiting for the on-chain event
  $("#breedBtn").addClass("disabled");
  $("#breedFemale").removeClass("pointer");
  $("#breedMale").removeClass("pointer");
  $("#breedFemale").removeAttr("data-bs-toggle");
  $("#breedMale").removeAttr("data-bs-toggle");
  $("#breedFemale").removeAttr("onclick");
  $("#breedMale").removeAttr("onclick");

  try {
    onchainAlertMsgPending();

    const breedCost = await kittiesContract.methods.breedCost().call();
    const res = await kittiesContract.methods
      .breed(breedMumId, breedDadId)
      .send({ value: breedCost });
  } catch (err) {
    onchainAlertMsgDanger(err);
  }
}

function selectForSale(domId, kittyId) {
  renderSelectedCatCol(domId, kittyId);
  $("#selectCatModal").modal("hide");

  const sellPrice = $("#sellPrice").val();
  const tokenId = $("#sellCat ~ * .catId").html();
  if (tokenId != "" && sellPrice != "" && sellPrice >= 0) {
    $("#sellBtn").removeClass("disabled");
  }
}

async function sellKitty() {
  const tokenId = $("#sellCat ~ * .catId").html();
  const priceStr = $("#sellPrice").val();
  const price = parseFloat(priceStr);
  if (Number.isNaN(price)) {
    console.error("sellKitty: NaN");
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
    onchainAlertMsgPending();

    const marketplaceIsOperator = await kittiesContract.methods
      .isApprovedForAll(userAddress, KITTY_MARKETPLACE_CONTRACT_ADDRESS)
      .call();

    if (!marketplaceIsOperator) {
      const contractLink = `
        <a
          class="alert-link"
          href="https://ropsten.etherscan.io/address/${KITTY_MARKETPLACE_CONTRACT_ADDRESS}"
          target="_blank"
          rel="noopener noreferrer"
          style="font-size: 0px;"
          >
          <span class="fs-6">Moon-Kitties marketplace smart contract</span>
        </a>
      `;

      onchainAlertMsg(
        "warning",
        "Operator status requested.",
        `In order to create any sales offers on-chain,
        you must first approve the ${contractLink}
        &nbsp;as operator for your Moon-Kitties NFTs.`
      );
      const res = await kittiesContract.methods
        .setApprovalForAll(KITTY_MARKETPLACE_CONTRACT_ADDRESS, "true")
        .send();
    }

    onchainAlertMsgPending();
    const res = await marketplaceContract.methods
      .setOffer(priceWeiStr, tokenId)
      .send();
  } catch (err) {
    onchainAlertMsgDanger(err);
  }
}


/*
// work around for web3 bug firing duplicated events
function isDuplicatedContractEvent(eventName, newTxHash) {
  let lastTxHash;
  switch (eventName) {
    case "Birth":
      lastTxHash = lastBirthEvent;
      lastBirthEvent = newTxHash;
      break;

    case "MarketTransaction":
      lastTxHash = lastMarketTransactionEvent;
      lastMarketTransactionEvent = newTxHash;
      break;

    default:
      console.error("isDuplicatedBirthEvent: eventName unknown.");
      return false;
  }

  if (lastTxHash === newTxHash) {
    //console.log(eventName, "event duplication handled.");
    return true;
  } else {
    return false;
  }
}
*/


async function loadMarketplace() {
  $("#marketplace-collection").empty();

  if (userAddress === undefined) {
    return;
  }

  onchainAlertMsgPending();

  const marketplaceOffers = [];
  try {
    const offeredTokenIds = await marketplaceContract.methods
      .getAllTokenOnSale()
      .call();
    for (tokenId of offeredTokenIds) {
      const res = await marketplaceContract.methods.getOffer(tokenId).call();
      const priceEther = web3.utils.fromWei(res.price, "ether");
      const offer = {
        kittyId: tokenId,
        seller: res.seller,
        price: priceEther,
      };
      marketplaceOffers.push(offer);
    }
  } catch (err) {
    onchainAlertMsgDanger(err);
    return;
  }

  for (offer of marketplaceOffers) {
    await appendMarketplaceCollection(offer.seller, offer.price, offer.kittyId);
  }

  if (marketplaceOffers.length == 0) {
    $("#marketplace-collection").append(
      "<p class='text-light'>Currently, there are no kitties for sale ...</p>"
    );
  }

  $("#notification").empty();
}

async function appendMarketplaceCollection(seller, priceEther, kittyId) {
  if (seller.toLowerCase() === userAddress.toLowerCase()) {
    // handle offers that the current user owns
    const catCol = $("#catCol" + kittyId);
    if (catCol.length == 0) {
      await loadKitties();
    }
    appendMarketplaceCollectionClone(seller, priceEther, kittyId);
  } else {
    const kitty = await getKitty(kittyId);
    appendMarketplaceCollectionNew(
      seller,
      priceEther,
      kittyId,
      kitty.generation,
      kitty.genes
    );
  }
}

async function cancelKittyOffer(kittyId) {
  try {
    onchainAlertMsgPending();

    const res = await marketplaceContract.methods.removeOffer(kittyId).send();

    removeMarketplaceKitty(kittyId);
  } catch (err) {
    onchainAlertMsgDanger(err);
  }
}

async function buyKitty(kittyId, priceEther) {
  const priceWei = web3.utils.toWei(String(priceEther), "ether");

  try {
    onchainAlertMsgPending();

    const res = await marketplaceContract.methods
      .buyKitty(kittyId)
      .send({ value: priceWei });

    removeMarketplaceKitty(kittyId);
  } catch (err) {
    onchainAlertMsgDanger(err);
  }
}

async function updateGen0Count() {
  if (userAddress === undefined) {
    return;
  }

  try {
    const count = await kittiesContract.methods.countKittiesGen0().call();
    $("#gen0Count").html(count);
  } catch (err) {
    onchainAlertMsgDanger(err);
  }
}