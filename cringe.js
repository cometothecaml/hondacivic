
window.onload = function() {
    var address = "0x00000000000000000000000000000000f00dbaBE"
    var moonbalance = 0
    var hcvbalance = 0
    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
  
    } else {
      web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io"));
    }
   

    console.log(web3.version);
    if (typeof(window.ethereum) === "undefined"){
        nometamaskwarn()
    }else{
        setInterval(function(){update()}, 1000)
        ethereum.on('accountsChanged', function (accounts) {
            if (accounts[0]===undefined){
                disconnected()
            }
            else{
                updateBalance(accounts[0])
                
            }
        })
    }

  }
var DAIcontract
var DAIaddress
var HCVaddress
var HCVcontract
var ABIHCV=JSON.parse('[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokens","type":"uint256"}],"name":"create","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"civics","type":"uint256"}],"name":"sell","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Burn","type":"event"}]')
var element = document.getElementById("con")
var element2 = document.getElementById("buybutton")
 element2.hidden=true
 var element3 = document.getElementById("sellbutton")
 var element = document.getElementById("con")
element3.hidden=true

document.getElementById("con").addEventListener("click", function(){console.log("connect attempt"); attemptConnect();});
document.getElementById("buybutton").addEventListener("click", function(){buyHCV(0);});
document.getElementById("sellbutton").addEventListener("click", function(){sellHCV(0);});
document.getElementById("quantity").addEventListener("input", function(x){updateBox();})
document.getElementById("maxbutton").addEventListener("click", function(x){maxBox();})

document.getElementById("executebutton").addEventListener("click", function(x){execute();})
function execute(){
    k=document.getElementById("trade0").innerHTML
    if (k.charAt(0)==="B"){
        v=document.getElementById("quantity").value
        if (v===undefined){
            document.getElementById("txerror").hidden=false
            document.getElementById("txerror").innerHTML="Nothing entered"
        }
        else if(parseInt(v)*21000>parseInt(moonbalance)){
            document.getElementById("txerror").hidden=false
            document.getElementById("txerror").innerHTML="Balance too low"
        }
        else{
            document.getElementById("txerror").hidden=true
            DAIcontract.methods.approve(HCVaddress, v*21000).send().catch(function (err){txfail();})
            HCVcontract.methods.create(v*21000).send().catch(function (err){txfail();})
        }
    }
    else{
        v=document.getElementById("quantity").value
        if (v===undefined){
            document.getElementById("txerror").hidden=false
            document.getElementById("txerror").innerHTML="Nothing entered"
        }
        else if(parseInt(v)>parseInt(hcvbalance)){
            document.getElementById("txerror").hidden=false
            document.getElementById("txerror").innerHTML="Balance too low"
        }
        else{
            document.getElementById("txerror").hidden=true
            DAIcontract.methods.approve(HCVaddress, v).send().catch(function (err){txfail();})
            HCVcontract.methods.sell(v).send().catch(function (err){txfail();})
        }
    }
}
function txfail(){
    document.getElementById("txerror").hidden=false
    document.getElementById("txerror").innerHTML="TX failed"

}
function updateBox(){
    k=document.getElementById("trade0").innerHTML

    document.getElementById("amt").innerHTML=parseFloat(document.getElementById("quantity").value)*21000

}
function maxBox(){
    k=document.getElementById("trade0").innerHTML
    if (k.charAt(0)==="B"){
        document.getElementById("quantity").value=moonbalance/21000
        updateBox()
    }
    else{
        document.getElementById("quantity").value=hcvbalance
        updateBox()
    }
}
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
   
    address = add
    element.hidden=true
    element2.hidden=false
    element3.hidden=false
    document.getElementById("trade0").hidden = false
    document.getElementById("maxbutton").hidden = false
    document.getElementById("executebutton").hidden = false
    document.getElementById("wallet").innerHTML="Wallet connected: "+add
    ercabi = JSON.parse(`[
        {
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_spender",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_from",
                    "type": "address"
                },
                {
                    "name": "_to",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "name": "",
                    "type": "uint8"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_owner",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "name": "balance",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_to",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_owner",
                    "type": "address"
                },
                {
                    "name": "_spender",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "payable": true,
            "stateMutability": "payable",
            "type": "fallback"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        }
    ]`)
    
     HCVaddress = "0x84943F3547ADE0DcA32bef319E735A83ec0B352c"
     DAIaddress = "0xDF82c9014F127243CE1305DFE54151647d74B27A"
     HCVcontract=new web3.eth.Contract(ABIHCV, HCVaddress, {from:add, gasPrice:1000000000})
     DAIcontract=new web3.eth.Contract(ercabi, DAIaddress, {from:add, gasPrice:1000000000})
     DAIcontract.methods.balanceOf(add).call().then(function(res){moonbalance = res;document.getElementById("daibalance").innerHTML = "Your MOON balance: "+res;})
     HCVcontract.methods.balanceOf(add).call().then(function(res){hcvbalance = res;document.getElementById("hcvbalance").innerHTML = "Your HCV balance: "+res;})

        

}
function disconnected(){
    address=undefined
    element.hidden = false
    element2.hidden = true
    element3.hidden = true
    document.getElementById("trade0").hidden = true
    document.getElementById("maxbutton").hidden = true
    document.getElementById("executebutton").hidden = true
    document.getElementById("wallet").innerHTML="Wallet disconnected"
}

function buyHCV(num){
    // try{
    //     DAIcontract.methods.approve(HCVaddress, "21000").send()
    //     HCVcontract.methods.create("21000").send()
    // }
    // catch(err){
    //     console.log("ERROR!")
        
    // }
    document.getElementById("trade0").innerHTML='Buy <input type="number" id="quantity" name="quantity" > HCV for <div id="amt"> 0</div> MOONS'
    document.getElementById("quantity").addEventListener("input", function(x){updateBox();})


}
function sellHCV(num){
    // try{
    //     HCVcontract.methods.approve(HCVaddress, "1").send()
    //     HCVcontract.methods.sell("1").send()
    // }
    // catch(err){
    //     console.log(err)
    //     console.log("ERROR!")
        
    // }
    document.getElementById("trade0").innerHTML=`Sell <input type="number" id="quantity" name="quantity" > HCV for <div id="amt"> 0</div> MOONS`
    document.getElementById("quantity").addEventListener("input", function(x){updateBox();})




}
function update(){
    if (typeof(address) !== "undefined"){
    updateBalance(address)
}
}