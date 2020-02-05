const name = document.getElementById("name");
//Set
name.focus();

const title = document.getElementById("title");
const other = document.getElementById("other-title");
other.style.display = "none";
title.addEventListener("change", e => {
    if (e.target.value != "other") {
        other.style.display = "none";
    } else {
        other.style.display = "";
    }
});

// other.style.display = "none";

const design = document.getElementById("design");
design.firstElementChild.style.display = "none";

const color = document.getElementById("color");

const colorOption = document.createElement("option");
colorOption.text = "Please Select T-Shirt Theme.";

//add new option at index 0 of select element
color.add(colorOption, 0);
//select it by default to it stays on top and selected
colorOption.defaultSelected = true;

for (let i = 0; i < color.length; i++) {
    color[i].style.display = "none";
}

design.addEventListener("change", e => {
    switch (e.target.value) {
        case "js puns":
            DesignAndTheme("JS Puns", 1);
            break;
        case "heart js":
            DesignAndTheme("♥ JS", 4);

            break;
        default:
            break;
    }
});

function DesignAndTheme(text, index) {
    for (let i = 0; i < color.length; i++) {
        //set all the themes to none
        color[i].style.display = "none";

        //if the text content of option includes the required text, display it
        if (color[i].textContent.includes(text)) {
            color[i].style.display = "";
        }
    }

    //select the index you want to display as selected
    color.selectedIndex = index;
}
var totalCost = 0;
const activities = document.querySelector(".activities");
const input = activities.querySelectorAll("input");
const label = activities.querySelectorAll("label");
const p = document.createElement("p");

activities.appendChild(p);

for (let i = 0; i < input.length; i++) {
    console.log(input[i].dataset.cost);
}

activities.addEventListener("change", e => {
    let cost = e.target.dataset.cost;
    cost = parseInt(cost);

    if (e.target.checked) {
        totalCost += cost;
    } else if (!e.target.checked) {
        totalCost -= cost;
    }
    p.textContent = "Total: $" + totalCost;

    const activityTime = e.target.dataset.dayAndTime;

    for (let i = 0; i < input.length; i++) {
        const checkbox = input[i].dataset.dayAndTime;
        if (checkbox == activityTime && e.target != input[i]) {
            if (e.target.checked) {
                console.log(
                    "Checked ",
                    e.target.dataset.dayAndTime,
                    input[i].dataset.dayAndTime
                );
                input[i].disabled = true;
            } else {
                console.log(
                    "Uncheced",
                    e.target.dataset.dayAndTime,
                    input[i].dataset.dayAndTime
                );
                input[i].disabled = false;
            }
        }
    }
});

const payment = document.getElementById("payment");
payment[0].style.display = "none";

const creditCard = document.getElementById("credit-card");
const paypal = document.getElementById("paypal");
const bitcoin = document.getElementById("bitcoin");
payment.selectedIndex = 1;
payment.addEventListener("change", e => {
    const value = e.target.value;
    console.log(value);

    switch (value) {
        case "credit card":
            creditCard.style.display = "";
            paypal.style.display = "none";
            bitcoin.style.display = "none";
            break;
        case "paypal":
            creditCard.style.display = "none";
            bitcoin.style.display = "none";
            paypal.style.display = "";
            break;
        case "bitcoin":
            creditCard.style.display = "none";
            paypal.style.display = "none";
            bitcoin.style.display = "";
            break;
        default:
            break;
    }
});
const form = document.querySelector("form");
const email = document.getElementById("mail");
const ccNumber = document.getElementById("cc-num");
const zip = document.getElementById("zip");
const cvv = document.getElementById("cvv");

form.addEventListener("submit", e => e.preventDefault());

name.addEventListener("input", e => {
    const text = e.target.value;
    const valid = isNameValid(text);
    if (text != "" && valid) {
        name.style.border = "#5e97b0";
    } else {
        name.style.border = "thick solid red";
    }
});
email.addEventListener("input", e => {
    const text = e.target.value;
    const valid = isEmailValid(text);
    if (valid) {
        email.style.border = "#5e97b0";
    } else {
        email.style.border = "thick solid red";
    }
});

activities.addEventListener("input", e => {
    const valid = isActivityValid();
    if (valid == false) {
        for (let i = 0; i < label.length; i++) {
            label[i].style.color = "red";
            label[i].style.fontSize = "1.05em";
        }
    } else {
        for (let i = 0; i < label.length; i++) {
            label[i].style.color = "";
            label[i].style.fontSize = "1em";
        }
    }
});

ccNumber.addEventListener("input", e => {
    const text = e.target.value;
    const valid = isCardValid(text);
    if (text != "" && valid) {
        ccNumber.style.border = "#5e97b0";
    } else {
        ccNumber.style.border = "thick solid red";
    }
});

zip.addEventListener("input", e => {
    const text = e.target.value;
    const valid = isZipValid(text);
    if (text != "" && valid) {
        zip.style.border = "#5e97b0";
    } else {
        zip.style.border = "thick solid red";
    }
});

cvv.addEventListener("input", e => {
    const text = e.target.value;
    const valid = isCvvValid(text);
    if (text != "" && valid) {
        cvv.style.border = "#5e97b0";
    } else {
        cvv.style.border = "thick solid red";
    }
});

function isNameValid(text) {
    text = text.trim();
    return /^[\w\s]+$/i.test(text);
}
function isEmailValid(email) {
    return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
    );
}

function isActivityValid() {
    let valid = false;
    for (let i = 0; i < input.length; i++) {
        if (input[i].checked) {
            valid = true;
        }
    }
    return valid;
}

function isCardValid(number) {
    return /^\d{4}\s?\d{4}\s?\d{4}\s?\d{1,4}$/.test(number);
    // return /^\d{4}\s?\d{1,4}$/.test(number);
}

function isZipValid(number) {
    return /^\d{5}$/.test(number);
}

function isCvvValid(number) {
    return /^\d{3}$/.test(number);
}
