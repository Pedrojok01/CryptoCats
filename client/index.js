const web3 = new Web3(Web3.givenProvider);

const CAT_CONTRACT_ADD = "0xbf697401e188dfD69794A88d99853Cf42E75127B";
const MARKETPLACE_CONTRACT_ADD = "0xD889F921c53D0FA7657E18605B47856b35cc1724";
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


    // NAV BAR TAB UPDATE
    const currentNavbarTab = $("#menu .nav-link.active").attr("id");
    if (currentNavbarTab == "nav-my-kitties-tab") {
        await showMyCats();
    } else if (currentNavbarTab == "nav-marketplace-tab") {
        await loadMarketplace();
    } else if (currentNavbarTab == "nav-factory-tab") {
        await updateGen0Count();
    }


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


    $(".createCatBtn").removeClass("disabled");
    $("#gen0CountText").removeClass("hidden");
    await updateGen0Count();


    /***********
        
    //MARKETPLACE LISTENER TO ADD!
    
    ***********/

    // Disconnect (the button!) from MetaMask
    connectButton.removeEventListener('click', loginWithMetaMask)
    setTimeout(() => {
        connectButton.addEventListener('click', logoutOfMetaMask)
    }, 200)

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


// Create Cat NFT from the Factory
async function createCat() {

    if (!notConnected()) {
        var dna = getDna();
        let dnaStr = web3.utils.toBN(dna).toString();
        await instanceCatContract.methods.createCatGen0(dnaStr).send({}, function (error, txHash) {
            let msg = "<b>Tx:</b> " + txHash;
            if (error)
                errorNotification(error);
            else
                showNotifications(msg);
        })
        await updateGen0Count();
    };
}

// Create button listener
$(".btn.createCatBtn").click(() => {
    createCat();
})


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
        const res = await instanceCatContract.methods.breed(dadId, mumId).send({})
    } catch (err) {
        errorNotification(err);
    }

    resetBreed();
}

// breed button listener
$("#breedBtn").click(() => {
    breedCat();
})



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
    };
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