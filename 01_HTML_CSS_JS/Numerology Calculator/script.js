function reduceToSingleDigit(num) {
    while (num > 9) {
        num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return num;
}

function calculateDOBNumbers() {
    const dob = document.getElementById("dobInput").value.replace(/-/g, "");
    if (!dob) { alert("Please enter your DOB"); return; }
    const mulank = reduceToSingleDigit(parseInt(dob.slice(-2)));
    const bhagyank = reduceToSingleDigit(dob.split('').reduce((sum, d) => sum + parseInt(d), 0));
    document.getElementById("mulank").innerText = mulank;
    document.getElementById("bhagyank").innerText = bhagyank;
}

const numerologyChart = {
    1: ['A', 'I', 'J', 'Q', 'Y'],
    2: ['B', 'K', 'R'],
    3: ['C', 'G', 'L', 'S'],
    4: ['D', 'M', 'T'],
    5: ['E', 'H', 'N', 'X'],
    6: ['U', 'V', 'W'],
    7: ['O', 'Z'],
    8: ['F', 'P']
};

function getNumerologyValue(letter) {
    letter = letter.toUpperCase();
    for (const [num, letters] of Object.entries(numerologyChart)) {
        if (letters.includes(letter)) return parseInt(num);
    }
    return 0;
}

function calculateDestinyNumber() {
    const name = document.getElementById("nameInput").value.trim();
    if (name === "") { alert("Please enter a name."); return; }
    let sum = 0;
    for (let letter of name) {
        if (letter.match(/[A-Za-z]/)) sum += getNumerologyValue(letter);
    }
    document.getElementById("nameDestiny").innerText = reduceToSingleDigit(sum);
}
function calculateContactNumber() {
    const contact = document.getElementById("contactInput").value.trim();
    if (!contact.match(/^\d{10}$/)) { 
        alert("Please enter a valid 10-digit contact number."); 
        return; 
    }
    const sum = contact.split('').reduce((total, num) => total + parseInt(num), 0);
    document.getElementById("contactDestiny").innerText = reduceToSingleDigit(sum);
}
