var element2 = document.getElementById("buybutton")
element2.hidden=true
var element3 = document.getElementById("sellbutton")
var element = document.getElementById("con")
element3.hidden=true
if (typeof(window.ethereum) === "undefined"){
    nometamaskwarn()
}
if (typeof(window.ethereum) !== "undefined"&& window.ethereum.isConnected === true){
    walletConnected()
}
document.getElementById("con").addEventListener("click", function(){console.log("connect attempt"); attemptConnect();});
async function attemptConnect(){
    try{
        await(window.ethereum.enable())
        walletConnected()

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
function walletConnected(){
    element.hidden=true
    element2.hidden=false
    element3.hidden=false
    document.getElementById("wallet").innerHTML="Wallet connected: "+window.ethereum.selectedAddress
    setInterval(function(){if (!window.ethereum.isConnected){disconnected();}},100)
}
function disconnected(){
    element.hidden = false
    element2.hidden = true
    element3.hidden = true
}