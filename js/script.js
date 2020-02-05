//MAIN FORM FIELDS
const form = document.querySelector("form"); //Main form
const name = document.getElementById("name"); //Name input
const email = document.getElementById("mail"); //Email input
const title = document.getElementById("title"); //Jobs title
const design = document.getElementById("design"); //Shirt Design
const color = document.getElementById("color"); // Shirt Colors
const colorsDiv = document.getElementById("colors-js-puns"); //Color Div includes Field label and options
const activities = document.querySelector(".activities"); //Activities Div
const input = activities.querySelectorAll("input"); //All input checkboxes
const label = activities.querySelectorAll("label"); // All labels for checkboxes

const payment = document.getElementById("payment"); //Payment Type
const creditCard = document.getElementById("credit-card"); //Credit Card option
const paypal = document.getElementById("paypal"); //Paypal option
const bitcoin = document.getElementById("bitcoin"); //Bitcoin option
const ccNumber = document.getElementById("cc-num"); //Card number input
const zip = document.getElementById("zip"); //zip input
const cvv = document.getElementById("cvv"); //cvv input

name.focus();

// EXTRA FIELDS ADDED TO FROM
const h3 = document.createElement("h3"); //Heading for total cost
const other = document.getElementById("other-title"); //Other option
other.style.display = "none";

title.addEventListener("change", e => {
    if (e.target.value != "other") {
        other.style.display = "none";
    } else {
        other.style.display = "";
    }
});

// Previous option of Select Theme is disabled here.
design.firstElementChild.style.display = "none";

/* I am hiding the colodDiv if the user haven't selected the design. 
below the code is not displayed if the colorDiv is hidden so I have commented it out.

// ------- START OF THE NEW OPTION CODE -------//
// New Shirt Colors Option
const colorOption = document.createElement("option");
colorOption.text = "Please Select T-Shirt Theme.";

//add new option at index 0 of select element
color.add(colorOption, 0);

//select it by default to it stays on top and selected
colorOption.defaultSelected = true;

// -------- END OF THE NEW OPTION CODE -------//

*/

//colodDiv is not displayed here
colorsDiv.style.display = "none";
//disable all colors until theme is selcted
for (let i = 0; i < color.length; i++) {
    color[i].style.display = "none";
}

//Change listener for design and Color
//TODO try some other approach for not adding hard coded values like array
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

//Universal Function for design and colour change
//TODO add arrays approach
function DesignAndTheme(text, index) {
    for (let i = 0; i < color.length; i++) {
        //set all the themes to none
        color[i].style.display = "none";

        //if the text content of option includes the required text, display it
        if (color[i].textContent.includes(text)) {
            color[i].style.display = "";
            //display the colorDiv Now
            colorsDiv.style.display = "";
        }
    }
    //select the index you want to display as selected
    color.selectedIndex = index;
}

activities.appendChild(h3);
let totalCost = 0;
activities.addEventListener("change", e => {
    let cost = e.target.dataset.cost;
    cost = parseInt(cost);

    if (e.target.checked) {
        totalCost += cost;
    } else if (!e.target.checked) {
        totalCost -= cost;
    }
    h3.textContent = "Total: $" + totalCost;

    const activityTime = e.target.dataset.dayAndTime;

    for (let i = 0; i < input.length; i++) {
        const checkbox = input[i].dataset.dayAndTime;
        if (checkbox == activityTime && e.target != input[i]) {
            if (e.target.checked) {
                input[i].disabled = true;
            } else {
                input[i].disabled = false;
            }
        }
    }
});

payment[0].style.display = "none";

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

form.addEventListener("submit", e => {
    e.preventDefault();
});

//REGEX TEMPLATES
const nameT = /^[\w\s]+$/i;
const emailT = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const cardT = /^\d{4}\s?\d{4}\s?\d{4}\s?\d{1,4}$/;
const zipT = /^\d{5}$/;
const cvvT = /^\d{3}$/;

//VALIDATIONS
name.addEventListener("input", fieldValidation(nameT));
email.addEventListener("input", fieldValidation(emailT));
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
ccNumber.addEventListener("input", fieldValidation(cardT));
zip.addEventListener("input", fieldValidation(zipT));
cvv.addEventListener("input", fieldValidation(cvvT));

//HELPER FUNCTIONS TO VALIDATE THE FIELDS
function isActivityValid() {
    let valid = false;
    for (let i = 0; i < input.length; i++) {
        if (input[i].checked) {
            valid = true;
        }
    }
    return valid;
}

function isFieldValid(regex, text) {
    return regex.test(text);
}

//Universal Field Validator function
/*
This function takes regext Template
finds text content from e.target and then uses
isFieldValid (a validation funtion) to validate true or false status of field
*/
function fieldValidation(template) {
    return e => {
        const target = e.target;
        const text = target.value;

        const valid = isFieldValid(template, text);
        if (text != "" && valid) {
            target.style.border = "#5e97b0";
        } else {
            target.style.border = "thick solid red";
        }
    };
}
