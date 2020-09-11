var element2 = document.getElementById("buybutton")
element2.hidden=true
var element3 = document.getElementById("sellbutton")
var element = document.getElementById("con")
element3.hidden=true
if (typeof(window.ethereum) === "undefined"){
    nometamaskwarn()
}else{
    ethereum.on('accountsChanged', function (accounts) {
        if (accounts[0]===undefined){
            disconnected()
        }
        else{
            updateBalance(accounts[0])
        }
    })
}
document.getElementById("con").addEventListener("click", function(){console.log("connect attempt"); attemptConnect();});
async function attemptConnect(){
    try{
        ethereum.request({ method: 'eth_requestAccounts' }).then(function(res){updateBalance(res[0]);})
        
    }
    catch(error){
        document.getElementById("wallet").innerHTML="Connection fail, try again"
    }
}
function nometamaskwarn(){
    element.hidden=true
    const newDiv = document.createElement("div")
    var newContent = document.createElement("p")
    newContent.innerHTML="Please install Metamask to continue. Reload when done"
    newContent.className += "myfont"
    newDiv.appendChild(newContent)  
    const currentDiv = document.getElementById("div1")
    document.body.insertBefore(newDiv, document.getElementById("buyButton"))
    console.log("Eth wallet not detected")
}
function updateBalance(add){
    
    element.hidden=true
    element2.hidden=false
    element3.hidden=false
    document.getElementById("wallet").innerHTML="Wallet connected: "+add

}
function disconnected(){
    element.hidden = false
    element2.hidden = true
    element3.hidden = true
    document.getElementById("wallet").innerHTML="Connection fail, try again"
}