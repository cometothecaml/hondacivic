if (typeof(window.ethereum) === "undefined"){
    var element = document.getElementById("con")
    element.hidden=true
    var element2 = document.getElementById("buybutton")
    element2.hidden=true
    var element3 = document.getElementById("sellbutton")
    element3.hidden=true
    const newDiv = document.createElement("div")
    var newContent = document.createElement("p")
    newContent.innerHTML="Please install Metamask to continue"
    newContent.className += "myfont"
    newDiv.appendChild(newContent)  
    const currentDiv = document.getElementById("div1")
    document.body.insertBefore(newDiv, document.getElementById("buyButton"))
    console.log("Eth wallet not detected")
}