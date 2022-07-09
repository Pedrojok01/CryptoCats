const web3 = new Web3(Web3.givenProvider);
const connectButton = document.querySelector("#loginButton");

const CAT_CONTRACT_ADD = "0x40397710a4C27F880f68A8BCB377031E818dE1e5";
const MARKETPLACE_CONTRACT_ADD = "0xD62f74220c5281A29dDC257eFF5b7FA918A895d2";

var userAddress = undefined;
var instanceCatContract;
var instanceMarketplaceContract;

let lastBirthEvent = "";
let lastMarketTransactionEvent = "";

$(document).ready(async function () {
  const menu = document.getElementById("menu");
  menu.addEventListener("hide.bs.tab", function (event) {
    $("#notification").css({ visibility: "hidden" });
  });
  toggleButton();

  window.ethereum.on("accountsChanged", function (accounts) {
    restartApp();
  });
  window.ethereum.on("chainChanged", function (accounts) {
    restartApp();
  });
});

// Check provider and wait for MetaMask connection:
function toggleButton() {
  if (!window.ethereum) {
    connectButton.innerText = "MetaMask not installed";
    connectButton.classList.add("cursor-not-allowed");
    return false;
  }
  connectButton.addEventListener("click", loginWithMetaMask);
}

// Connect to MetaMask:
async function loginWithMetaMask() {
  accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  userAddress = accounts[0];

  //Show only first and last part of userAddress:
  diplayAcc = userAddress.substring(0, 5) + " ... " + userAddress.substring(userAddress.length - 5);
  connectButton.innerText = diplayAcc;

  //Initiate contracts instances:
  instanceCatContract = await new web3.eth.Contract(abi.Catcontract, CAT_CONTRACT_ADD, { from: userAddress });
  instanceMarketplaceContract = await new web3.eth.Contract(abi.CatMarketplace, MARKETPLACE_CONTRACT_ADD, {
    from: userAddress,
  });

  // NAV BAR TAB UPDATE
  const currentNavbarTab = $("#menu .nav-link.active").attr("id");
  if (currentNavbarTab === "nav-my-cats-tab") {
    await showMyCats();
  } else if (currentNavbarTab === "nav-marketplace-tab") {
    await loadMarketplace();
  } else if (currentNavbarTab === "nav-factory-tab") {
    await updateGen0Count();
  }

  // Listeners for birth tx events:
  await instanceCatContract.events
    .Birth({ filter: { owner: userAddress }, fromBlock: "latest" })
    .on("data", (event) => {
      /*if (isDuplicatedContractEvent("Birth", event.transactionHash)) {
            return;
        }
        */
      let owner = event.returnValues.owner;
      let catId = event.returnValues.catId;
      let dadId = event.returnValues.dadId;
      let mumId = event.returnValues.mumId;
      let genes = event.returnValues.genes;
      let transactionHash = event.transactionHash;

      let message1 = `<b>Your cat has been succesfully created!</b><br/><b>owner:</b> ${owner}<br/><b>Cat Id:</b> ${catId} <b>Dad Id:</b> ${dadId} <b>Mum Id:</b> ${mumId} <b>Genes:</b> ${genes}<br/> <b>Tx hash:</b> ${transactionHash}`;
      showNotifications(message1);
    });

  $(".createCatBtn").removeClass("disabled");
  $("#gen0CountText").removeClass("hidden");
  await updateGen0Count();

  // Listeners for market tx events:
  instanceMarketplaceContract.events.MarketTransaction(
    { filter: { owner: userAddress }, fromBlock: "latest" },
    async (error, event) => {
      if (error) {
        errorNotification(error);
        return;
      }

      const txType = event.returnValues.TxType;
      const tokenId = event.returnValues.tokenId;
      const transactionHash = event.transactionHash;

      if (txType === "Cancel offer" || isDuplicatedContractEvent("MarketTransaction", event.transactionHash)) {
        return;
      }

      var offer;
      try {
        offer = await instanceMarketplaceContract.methods.getOffer(tokenId).call();
      } catch (err) {
        errorNotification(err);
        return;
      }

      const priceEther = web3.utils.fromWei(offer.price, "ether");

      if (txType === "Create offer") {
        let message2 = `Your sale offer has been succesfully created!<br/><b>Cat Id:</b> ${tokenId}, <b>Price:</b> ${priceEther} ETH,<br/> <b>Tx hash:</b> ${transactionHash}`;
        showNotifications(message2);
      } else if (txType === "Cancel offer") {
        let message3 = `Your sale offer has been succesfully cancelled!<br/><b>Cat Id:</b> ${tokenId}, <b>Price:</b> ${priceEther} ETH,<br/> <b>Tx hash:</b> ${transactionHash}`;
        showNotifications(message3);
      } else if (txType === "Buy") {
        let message4 = `You have succesfully bought the cat ${tokenId} for ${priceEther}ETH!<br/><b>Tx hash:</b> ${transactionHash}`;
        showNotifications(message4);
      } else {
        console.warn("Unhandled MarketTransaction event with 'txType' =", txType);
      }
    }
  );

  // Disconnect (the button only!) from MetaMask
  connectButton.removeEventListener("click", loginWithMetaMask);
  setTimeout(() => {
    connectButton.addEventListener("click", logoutOfMetaMask);
  }, 200);
}

// Disconnect from Metamask:
function logoutOfMetaMask() {
  userAddress = undefined;
  connectButton.innerText = "Connect MetaMask";

  connectButton.removeEventListener("click", logoutOfMetaMask);
  setTimeout(() => {
    connectButton.addEventListener("click", loginWithMetaMask);
  }, 200);
  window.location.reload();
}

function notConnected() {
  if (userAddress === undefined) {
    showNotifications("Metamask not connected!");
    return true;
  }
}

function restartApp() {
  if (userAddress !== undefined) {
    userAddress = undefined;
    window.location.reload();
  }
}

// Create Cat NFT from the Factory
async function createCat() {
  if (!notConnected()) {
    var dna = getDna();
    let dnaStr = web3.utils.toBN(dna).toString();
    await instanceCatContract.methods.createCatGen0(dnaStr).send({}, function (error, txHash) {
      let msg = "<b>Tx:</b> " + txHash;
      if (error) errorNotification(error);
      else showNotifications(msg);
    });
    await updateGen0Count();
    scrollToTop();
  }
}

// Create button listener
$(".btn.createCatBtn").click(() => {
  createCat();
});

// Get all cats per user as an array of object -cat-
async function getUserCats() {
  var catsArr = [];
  try {
    let cats = await instanceCatContract.methods.getCatPerOwner(userAddress).call();

    for (i = 0; i < cats.length; i++) {
      var cat = await instanceCatContract.methods.getCat(cats[i]).call();
      catsArr.push(cat);
    }
  } catch (err) {
    errorNotification(err);
    return;
  }
  return catsArr;
}

/* VARIOUS:
 ***********/

async function updateGen0Count() {
  if (!notConnected()) {
    try {
      const count = await instanceCatContract.methods.Gen0Count().call();
      $("#gen0Count").html(count);
    } catch (err) {
      errorNotification(err);
    }
  }
}

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
    return true;
  } else {
    return false;
  }
}
