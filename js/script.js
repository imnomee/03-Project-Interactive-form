/********************
 * MAIN FORM FIELDS
 ********************/
const form = document.querySelector("form"); //Main form
const name = document.getElementById("name"); //Name input
const email = document.getElementById("mail"); //Email input
const title = document.getElementById("title"); //Jobs title
const design = document.getElementById("design"); //Shirt Design
const color = document.getElementById("color"); // Shirt Colors
const colorsDiv = document.getElementById("colors-js-puns"); //Color Div includes Field label and options
const activities = document.querySelector(".activities"); //Activities Div
const act_legend = activities.querySelector("legend");

const input = activities.querySelectorAll("input"); //All input checkboxes

const payment = document.getElementById("payment"); //Payment Type
const creditCard = document.getElementById("credit-card"); //Credit Card option
const paypal = document.getElementById("paypal"); //Paypal option
const bitcoin = document.getElementById("bitcoin"); //Bitcoin option
const ccNumber = document.getElementById("cc-num"); //Card number input
const zip = document.getElementById("zip"); //zip input
const cvv = document.getElementById("cvv"); //cvv input

name.focus();
/*********************
 * EXTRA FIELDS
 ********************/
const h3 = document.createElement("h3"); //Heading for total cost
const other = document.getElementById("other-title"); //Other option
const zipParent = zip.parentNode; //Zip code parent Node to add p child
const errorP = document.createElement("p"); //Error paragaraph for zip code

errorP.textContent = ""; //Initially error p is empty
zipParent.appendChild(errorP);
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
//disable all colors until theme is selected
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
paypal.style.display = "none";
bitcoin.style.display = "none";

payment.selectedIndex = 1;
payment.addEventListener("change", e => {
    const value = e.target.value;
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
    ccNumber.style.border = "#5e97b0";
    zip.style.border = "#5e97b0";
    cvv.style.border = "#5e97b0";
});

//REGEX TEMPLATES
const valArr = [
    {
        tag: name,
        regex: /^[\w\s]+$/i
    },
    {
        tag: email,
        regex: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    },
    {
        tag: ccNumber,
        regex: /^\d{4}\s?\d{4}\s?\d{4}\s?\d{1,4}$/
    },
    {
        tag: zip,
        regex: /^\d{5}$/
    },
    {
        tag: cvv,
        regex: /^\d{3}$/
    }
];

// const nameT = /^[\w\s]+$/i;
// const emailT = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// const cardT = /^\d{4}\s?\d{4}\s?\d{4}\s?\d{1,4}$/;
// const zipT = /^\d{5}$/;
// const cvvT = /^\d{3}$/;

/********************
 * EVENT LISTENERS
 ********************/

name.addEventListener("input", fieldValidation(valArr[0].regex));
email.addEventListener("input", fieldValidation(valArr[1].regex));
activities.addEventListener("input", e => {
    if (!isActivityValid()) {
        act_legend.style.color = "red";
    } else {
        act_legend.style.color = "rgba(6, 49, 68, 0.9)";
    }
});
ccNumber.addEventListener("input", fieldValidation(valArr[2].regex));
zip.addEventListener("input", fieldValidation(valArr[3].regex));
cvv.addEventListener("input", fieldValidation(valArr[4].regex));

//form Submit listener
form.addEventListener("submit", e => {
    e.preventDefault();
    /*
    here we passed valArray in the function that return true or false.
    if false, it will run preventDefault, if true it will got for submission.
    */
    if (!formValidation(valArr)) {
        console.log("validator stopped running");
        e.preventDefault();
    }
});

/********************
 * FUNCTIONS
 ********************/

//Here we have used a different approach of counting the checked checkboxes, if any, it will return true.
function isActivityValid() {
    let valid = false;
    for (let i = 0; i < input.length; i++) {
        if (input[i].checked) {
            valid = true;
        }
    }
    return valid;
}

//This function is validate the single field against a regex

function isFieldValid(regex, text) {
    return regex.test(text);
}

// this function is used with all the input listeners for real time validation

function fieldValidation(template) {
    return e => {
        const target = e.target;
        const text = target.value;

        const valid = isFieldValid(template, text);
        if (text != "" && valid) {
            target.style.border = "#5e97b0";
        } else {
            target.style.border = "3px solid red";
        }
    };
}

function fieldValidation2(regex, tag) {
    const text = tag.value;

    const valid = isFieldValid(regex, text);
    if (text != "" && valid) {
        tag.style.border = "#5e97b0";
        return true;
    } else {
        tag.style.border = "3px solid red";
        return false;
    }
}

function formValidation(array) {
    const name_submit = fieldValidation2(array[0].regex, array[0].tag);
    const email_submit = fieldValidation2(array[1].regex, array[1].tag);
    const ccNum_submit = fieldValidation2(array[2].regex, array[2].tag);
    const zip_submit = fieldValidation2(array[3].regex, array[3].tag);
    const cvv_submit = fieldValidation2(array[4].regex, array[4].tag);

    console.log(
        name_submit,
        email_submit,
        ccNum_submit,
        zip_submit,
        cvv_submit
    );
    if (
        name_submit &&
        email_submit &&
        ccNum_submit &&
        zip_submit &&
        cvv_submit
    ) {
        return true;
    } else {
        return false;
    }
}

//This is form Validation function which validates all the fields together
// function formValidation(array) {
//     let length = 0; //actual length of array
//     let result = false;

//     //If credit card div is not shown, then drop the length to only first 3 objects in array.
//     if (creditCard.style.display != "none") {
//         length = array.length;
//     } else {
//         length = array.length - 3;
//     }

//     /*
//     for activity validation, here we are checking of the total cost is 0,
//     initially it was set to zero and added increment if the checkbox is select.
//     if it is still 0 then no checkbox is selcted so its Invalid.
//     */
//     if (totalCost == 0) {
//         act_legend.style.color = "red";
//         result = false;
//     } else {
//         act_legend.style.color = "rgba(6, 49, 68, 0.9)";
//         result = true;
//     }

//     /* We have set an array of objects and getting values like name regex, label etc from there
//     here we are looping thourgh all the object values and running validity function
//     this will return true or false for only fields that are validated and change their color
//     to red if invalid
//     */
//     for (let i = 0; i < length; i++) {
//         const tag = array[i].tag;
//         const regex = array[i].regex;
//         const text = array[i].tag.value;

//         const valid = isFieldValid(regex, text);
//         if (text != "" && valid) {
//             tag.style.border = "#5e97b0";
//             errorP.textContent = "";
//             console.log("true");
//         } else if (text == "" && !valid) {
//             tag.style.border = "3px solid red";
//             console.log("false");
//         }
//     }

//     /*
//     Conditional error message for zip code only.
//     If empty it will show a different message.
//     If more than 5 or less than 3 digits, it will show different message.
//     */
//     if (zip.value.length == 0) {
//         errorP.textContent = "Please enter zip code";
//         errorP.style.color = "red";
//     } else if (
//         (zip.value.length > 0 && zip.value.length < 3) ||
//         zip.value.length > 5
//     ) {
//         errorP.textContent = "Please enter a number that is 5 digits long.";
//     }

//     return result; // return result (true or false);
// }
