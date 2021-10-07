const web3 = new Web3(Web3.givenProvider);

const CAT_CONTRACT_ADD = "0xE8c845172788F360C5044D08Ea944D90D9f12EDA";
const MARKETPLACE_CONTRACT_ADD = "";
const connectButton = document.querySelector('#loginButton');

var userAddress = undefined;
let userCats = [];
var instanceCatContract;
var instanceMarketplaceContract;

let lastBirthEvent = "";
let lastMarketTransactionEvent = "";



$(document).ready(async function () {
    const menu = document.getElementById("menu");
    menu.addEventListener("hide.bs.tab", function (event) {
        $("#notification").css({ 'visibility': 'hidden' })
    });
    toggleButton()

    ethereum.on("accountsChanged", function (accounts) {
        restartApp();
    });
    ethereum.on("chainChanged", function (accounts) {
        restartApp();
    });
})



// Check provider and wait for MetaMask connection:
function toggleButton() {
    if (!window.ethereum) {
        connectButton.innerText = "MetaMask not installed"
        connectButton.classList.add('cursor-not-allowed')
        return false
    }
    connectButton.addEventListener('click', loginWithMetaMask)
}


// Connect to MetaMask:
async function loginWithMetaMask() {

    accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    userAddress = accounts[0];

    //Show only first and last part of userAddress:
    diplayAcc = userAddress.substring(0, 5) + " ... " + userAddress.substring(userAddress.length - 5);
    connectButton.innerText = diplayAcc;

    //Initiate contracts instances:
    instanceCatContract = await new web3.eth.Contract(abi, CAT_CONTRACT_ADD, { from: userAddress })
    instanceMarketplaceContract = undefined;


    //Contract Event Listeners:
    await instanceCatContract.events.Birth({ filter: { owner: userAddress }, fromBlock: "latest" },).on('data', (error, event) => {
        if (error) {
            showNotifications(error);
            return;
        }
        if (isDuplicatedContractEvent("Birth", event.transactionHash)) {
            return;
        }

        const owner = event.returnValues.owner;
        const catId = event.returnValues.catId;
        const dadId = event.returnValues.dadId;
        const mumId = event.returnValues.mumId;
        const genes = event.returnValues.genes;
        const transactionHash = event.transactionHash;

        let message1 = "<b>Your cat has been succesfully created!</b>" + "<br/>" + "owner: " + owner + "<br/>" + "catId: " + catId + " dadId: " + dadId + " mumId: " + mumId + " genes: " + genes + "<br/>" + transactionHash;
        showNotifications(message1);

        //Update userCat, myCat, breed
        const cat = getCat(catId);
        userCats.push(catId);
        appendNewCat(cat.catId, cat.generation, cat.genes);
    })


    // NAV BAR TAB UPDATE
    const currentNavbarTab = $("#menu .nav-link.active").attr("id");
    if (currentNavbarTab == "nav-my-kitties-tab") {
        await loadMyCats();
    } else if (currentNavbarTab == "nav-marketplace-tab") {
        await loadMarketplace();
    } else if (currentNavbarTab == "nav-factory-tab") {
        await updateGen0Count();
    }

    connectButton.removeEventListener('click', loginWithMetaMask)
    setTimeout(() => {
        connectButton.addEventListener('click', logoutOfMetaMask)
    }, 200)

    //MARKETPLACE LISTENER TO ADD!

}


// Disconnect from Metamask:
function logoutOfMetaMask() {
    userAddress = undefined;
    connectButton.innerText = "Connect MetaMask"

    connectButton.removeEventListener('click', logoutOfMetaMask)
    setTimeout(() => {
        connectButton.addEventListener('click', loginWithMetaMask)
    }, 200)
}

function notConnected() {
    if (userAddress === undefined) {
        showNotifications("Metamask not connected!");
        return;
    }
}


function restartApp() {
    if (userAddress !== undefined) {
        // reload website
        window.location.reload();
    }
}





//Create Cat NFT when the button is clicked
function createCat() {
    notConnected();

    var dnaStr = getDna();
    instanceCatContract.methods.createCatGen0(dnaStr).send({}, function (error, txHash) {
        if (error)
            console.log(error);
        else
            console.log(txHash);
    })
}

$(".btn.createCatBtn").click(() => {
    createCat();
})



/* NOTIFICATIONS:
*****************/

//Display notifications for 5s
function showNotifications(message) {
    $("#notification").css({ visibility: 'visible' });
    $("#notification").html(message);
    setTimeout(function () {
        $("#notification").css({ visibility: 'hidden', size: 'initial' });
    }, 5000);
}


function pendingNotification() {
    const msg = 
        `<div class="spinner-border spinner-border-sm text-dark" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>`;
    showNotifications(msg);
}

function errorNotification(error) {
    if (error.message === undefined) {
        console.error(error);
    } else {
        showNotifications(error.message);
    }
}




/* MENU TABS DISPLAY:
*********************/

function showHomeTab() {
    const tabToDisplay = document.querySelector("#nav-home-tab");
    const tab = new bootstrap.Tab(tabToDisplay);
    tab.show();
}

async function showNavMyKittiesTab() {
    const tabToDisplay = document.querySelector("#nav-my-cats-tab");
    const tab = new bootstrap.Tab(tabToDisplay);
    tab.show();

    await loadMyCats();
}

async function showNavMarketplaceTab() {
    const tabToDisplay = document.querySelector("#nav-marketplace-tab");
    const tab = new bootstrap.Tab(tabToDisplay);
    tab.show();

    await loadMarketplace();
}

// Cat interactions
async function loadMyCats() {
    const tabToDisplay = document.querySelector("#nav-show-tab");
    const tab = new bootstrap.Tab(tabToDisplay);
    tab.show();

    await loadCats();
}


async function loadMarketplace() {
    $("#marketplace-collection").empty();

    notConnected();

    pendingNotification();
    /*
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
            errorNotification(err);
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
    */
    $("#notification").empty();
}



async function loadCats() {
    notConnected();
    pendingNotification();

    // Get cats: 
    let userCatsToLoad = [];

    try {
        userCatsToLoad = await instanceCatContract.methods.tokensPerOwner(userAddress).call();
    } catch (err) {
        errorNotification(err);
        return;
    }

    // Load cats to -My cats- tab:
    userCatsToLoad.forEach((cat) => {
        appendCat(cat.catId, cat.generation, cat.genes);
    });
    userCats = userCatsToLoad;

    console.log("User kitties updated.");
}



/* VARIOUS UTILS:
*****************/


async function updateGen0Count() {
    notConnected();

    try {
        const count = await instanceCatContract.methods.Gen0Count().call();
        $("#gen0Count").html(count);
    } catch (err) {
        errorNotification(err);
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
        //console.log(eventName, "event duplication handled.");
        return true;
    } else {
        return false;
    }
}