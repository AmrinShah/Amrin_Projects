let history = [];

function updateHistory(result) {
    history.unshift(result);
    if (history.length > 5) history.pop();
    
    let historyList = document.getElementById("historyList");
    historyList.innerHTML = history.map(item => `<li>${item}</li>`).join("");
}

function calculateLength() {
    let text = document.getElementById("inputText").value;
    let result = `Length: ${text.length}`;
    document.getElementById("result").innerText = result;
    updateHistory(result);
}

function convertCase(type) {
    let text = document.getElementById("inputText").value;
    let result;
    if (type === 'upper') result = text.toUpperCase();
    else if (type === 'lower') result = text.toLowerCase();
    else result = text.replace(/\b\w/g, char => char.toUpperCase());
    
    document.getElementById("result").innerText = result;
    updateHistory(result);
}

function findSubstring() {
    let text = document.getElementById("inputText").value;
    let searchTerm = prompt("Enter text to find:");
    let index = text.indexOf(searchTerm);
    let result = index !== -1 ? `Found at position: ${index}` : "Not found";
    document.getElementById("result").innerText = result;
    updateHistory(result);
}

function replaceText() {
    let text = document.getElementById("inputText").value;
    let oldWord = prompt("Enter word to replace:");
    let newWord = prompt("Enter new word:");
    let result = text.replaceAll(oldWord, newWord);
    document.getElementById("result").innerText = result;
    updateHistory(result);
}

function trimText() {
    let text = document.getElementById("inputText").value;
    let result = text.trim();
    document.getElementById("result").innerText = result;
    updateHistory(result);
}

function splitText() {
    let text = document.getElementById("inputText").value;
    let delimiter = prompt("Enter delimiter (e.g., space, comma):");
    let result = text.split(delimiter).join(" | ");
    document.getElementById("result").innerText = result;
    updateHistory(result);
}

function countWords() {
    let text = document.getElementById("inputText").value.trim();
    let words = text.length > 0 ? text.split(/\s+/).length : 0;
    let result = `Word count: ${words}`;
    document.getElementById("result").innerText = result;
    updateHistory(result);
}

function reverseText() {
    let text = document.getElementById("inputText").value;
    let result = text.split("").reverse().join("");
    document.getElementById("result").innerText = result;
    updateHistory(result);
}
