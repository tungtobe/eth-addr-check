const web3 = new Web3();

let addressesCheck = [];
let parameters = [];
let isToWeiCheck = false;

// Language: javascript
// checksum ethereum address

function handleAddressInput(e) {
    addressesCheck = []
    tmp = e.target.value.split("\n");
    tmp.forEach((address) => {
        if (address) {
            addressesCheck.push(address)
        }
    });
    console.log(addressesCheck);
}

function handleParameterInput(e) {
    parameters = []
    tmp = e.target.value.split("\n");
    tmp.forEach((parameter) => {
        if (parameter) {
            parameters.push(parameter)
        }
    });
    console.log(parameters);

}

function toWeiChange(e) {
    if (this.checked) {
        isToWeiCheck = true;
        console.log("Checkbox is checked..");
    } else {
        isToWeiCheck = false;
        console.log("Checkbox is not checked..");
    }
}

function toArrayParameters() {
    let arrayParameter = "[";
    for (i = 0; i < parameters.length; i++) {
        if (isToWeiCheck) {
            arrayParameter = arrayParameter + "\"" + parameters[i] + "000000000000000000" + "\"" + ",";
        } else {
            arrayParameter = arrayParameter + "\"" + parameters[i] + "\"" + ",";
        }
        if (i == (parameters.length - 1)) {
            arrayParameter = arrayParameter.slice(0, -1);
        }
    }
    arrayParameter = arrayParameter + "]";
    document.querySelector("#to-array-param-result").innerHTML = arrayParameter;
}

function toChecksum() {
    let check = [];
    for (i = 0; i < addressesCheck.length; i++) {
        try {
            check[i] = web3.utils.toChecksumAddress(addressesCheck[i]);
        } catch (e) {
            check[i] = "error";
        }
    }
    document.querySelector("#to-checksum-result").innerHTML = "";
    result = resultChecksum(check)
    document.querySelector("#to-checksum-result").appendChild(result);
}


function resultChecksum(addressesResult) {
    let element = document.createElement("div");
    for (i = 0; i < addressesResult.length; i++) {
        let item = document.createElement("p");
        if (addressesResult[i] == "error") {
            item.classList.add("w3-red");
            item.innerText = addressesCheck[i] + " is not valid";
        } else {

            item.innerText = addressesResult[i];
        }
        element.appendChild(item);
    }
    return element;
}

function toChecksumResultCopy() {
    var range = document.createRange();
    range.selectNode(document.getElementById("to-checksum-result"));
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges(); // to deselect
    alert("Copied to clipboard");

}

function toArrayParametersResultCopy() {
    var range = document.createRange();
    range.selectNode(document.getElementById("to-array-param-result"));
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges(); // to deselect
    alert("Copied to clipboard");
}

document.querySelector('#addresses-check').addEventListener('input', handleAddressInput);
document.querySelector("#parameters-input").addEventListener("input", handleParameterInput);
document.querySelector("#to-wei").addEventListener("change", toWeiChange);

document.querySelector("#checksum").addEventListener("click", toChecksum);
document.querySelector('#to-array-param').addEventListener('click', toArrayParameters);
document.querySelector('#to-checksum-result-copy').addEventListener('click', toChecksumResultCopy);
document.querySelector('#to-array-param-result-copy').addEventListener('click', toArrayParametersResultCopy);