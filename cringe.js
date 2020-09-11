var element2 = document.getElementById("buybutton")
element2.hidden=true
var element3 = document.getElementById("sellbutton")
element3.hidden=true
if (typeof(window.ethereum) === "undefined"){
    var element = document.getElementById("con")
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
if (typeof(window.ethereum) !== "undefined"&& window.ethereum.isConnected === true){
    var element = document.getElementById("con")
    element.hidden=true
    element2.hidden=false
    element3.hidden=false
    document.getElementById("wallet").innerHTML="Wallet connected: "+window.ethereum.selectedAddress
}
document.getElementById("con").addEventListener("click", function(){console.log("connect attempt"); attemptConnect();});
async function attemptConnect(){
    try{
        await(window.ethereum.enable())
        var element = document.getElementById("con")
        element.hidden=true
        element2.hidden=false
        element3.hidden=false
        document.getElementById("wallet").innerHTML="Wallet connected: "+window.ethereum.selectedAddress

    }
    catch(error){
        document.getElementById("wallet").innerHTML="Connection fail, try again"

    }
}