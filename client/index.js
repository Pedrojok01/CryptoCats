const web3 = new Web3(Web3.givenProvider);

const CAT_CONTRACT_ADD = "0x723149fBDfF4B1f2a7B5f9c80CB0BfA449154eC4";
const MARKETPLACE_CONTRACT_ADD = "0x587Ab46502Ee3F6F08df3b6F217e1b252Adf2e4b";
const connectButton = document.querySelector('#loginButton');

var userAddress = undefined;
let userCats = []; //cat object
var userCatsArr = []; //cat Id array
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

    window.ethereum.on("accountsChanged", function (accounts) {
        restartApp();
    });
    window.ethereum.on("chainChanged", function (accounts) {
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
    instanceCatContract = await new web3.eth.Contract(abi.Catcontract, CAT_CONTRACT_ADD, { from: userAddress })
    instanceMarketplaceContract = await new web3.eth.Contract(abi.CatMarketplace, MARKETPLACE_CONTRACT_ADD, { from: userAddress })


    //Contract Event Listeners:
    await instanceCatContract.events.Birth({ filter: { owner: userAddress }, fromBlock: "latest" }).on('data', (event) => {
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
    window.location.reload();
}


function notConnected() {
    if (userAddress == undefined) {
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


//Create Cat NFT when the button is clicked
function createCat() {

    if (!notConnected()) {
        var dnaStr = getDna();
        instanceCatContract.methods.createCatGen0(dnaStr).send({}, function (error, txHash) {
            let msg = "Tx: " + txHash;
            if (error)
                errorNotification(error);
            else
                showNotifications(msg);
        })
    };
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
    resetMessage = '';
    setTimeout(function () {
        $("#notification").css({ visibility: 'hidden' }).html(resetMessage)
    }, 10000);
}


function pendingNotification() {
    const msg =
        `<div class="spinner-border spinner-border-sm text-dark" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>`;
    showNotifications(msg);
}

function errorNotification(error) {
    if (error.message == undefined) {
        showNotifications(error);
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

// Load -My Cats- tab
async function loadMyCats() {
    $("#nav-breed").removeClass("active show");
    $("#nav-show").addClass("active show");
    const tabToDisplay = document.querySelector("#nav-show-tab");
    const tab = new bootstrap.Tab(tabToDisplay);
    tab.show();
    if (!notConnected()) {
        await loadCats($('#cats-collection'));
    };
}

// Load -MarketPlace- tab
async function showNavMarketplaceTab() {
    const tabToDisplay = document.querySelector("#nav-marketplace-tab");
    const tab = new bootstrap.Tab(tabToDisplay);
    tab.show();
    if (!notConnected()) {
        await loadMarketplace();
    };
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