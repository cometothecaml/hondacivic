window.onload = function() {
    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
    } else {
      web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io"));
    }
    console.log(web3.version);
  }

  function getERC20TokenBalance(tokenAddress, walletAddress) {

    let minABI = [
      // balanceOf
      {
        "constant":true,
        "inputs":[{"name":"_owner","type":"address"}],
        "name":"balanceOf",
        "outputs":[{"name":"balance","type":"uint256"}],
        "type":"function"
      },
      // decimals
      {
        "constant":true,
        "inputs":[],
        "name":"decimals",
        "outputs":[{"name":"","type":"uint8"}],
        "type":"function"
      }
    ];

    let contract = web3.eth.Contract(minABI, tokenAddress);
    var bal = 0
    contract.methods.balanceOf(walletAddress).call((err, result) => { bal=result })
    var dec = 0
    contract.methods.decimals().call((err, result) => { dec=result })
    return bal/(Math.pow(10.0,dec))
  }

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
            DAIaddress = '0xdf82c9014f127243ce1305dfe54151647d74b27a'
            HCVaddress = '0x84943F3547ADE0DcA32bef319E735A83ec0B352c'
            a=getERC20TokenBalance(DAIaddress, accounts[0], )
            b=getERC20TokenBalance(HCVaddress, accounts[0], )
            document.getElementById("daibalance").innerHTML="Your MOON balance: "+ a.toString()
            document.getElementById("hcvbalance").innerHTML="Your HCV balance: "+ b.toString()

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

