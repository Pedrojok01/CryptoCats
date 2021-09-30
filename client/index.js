var web3 = new Web3(Web3.givenProvider);
var instance;
var user;
var contractAddress = "0xbE711E370edf860bED917a516aa3e928520EB2fd";


$(document).ready(function(){
    window.ethereum.enable().then(accounts => {
        user = accounts[0];
        instance = new web3.eth.Contract(abi, contractAddress, { from: accounts[0] });
        console.log(instance);
    

        instance.events.Birth().on('data', function(event){
            console.log(event);
            let owner = event.returnValues.owner;
            let catId = event.returnValues.catId;
            let dadId = event.returnValues.dadId;
            let mumId = event.returnValues.mumId;
            let genes = event.returnValues.genes;
            
            let message1 = "<b>Your cat has been succesfully created!</b>" + "<br/>" + "owner: " + owner + "<br/>" + "catId: " + catId + " dadId: " + dadId + " mumId: " + mumId + " genes: " + genes;
            showNotifications(message1);
        })
        .on('error', console.error);
    })
})


//Display notifications for 5s
function showNotifications (message) {
    $("#notification").css({visibility: 'visible'});
    $("#notification").html(message);
    setTimeout(function(){
        $("#notification").css({visibility: 'hidden'});
        },5000);
}

//Create Cat NFT when the button is clicked
function createCat() {
    var dnaStr = getDna();
    instance.methods.createCatGen0(dnaStr).send({}, function(error, txHash){
        if (error)
            console.log(error);
        else
            console.log(txHash);
    })
}


$(".btn.createCatBtn").click(()=>{
    createCat();
  })
