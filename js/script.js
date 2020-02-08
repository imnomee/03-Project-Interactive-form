/* I have tried my best to keep it as simple and understanding so if in future
i need to go through this project, i know exactly what the function and listeners are doing.
*/

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

activities.appendChild(h3);
let totalCost = 0; //adding total cost counter under activities

payment[0].style.display = "none"; //Select payment option is hidden
paypal.style.display = "none"; // paypal div is hidden
bitcoin.style.display = "none"; // bitcoin div is hidden

payment.selectedIndex = 1; // selected index is 1 which is credit card

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

/********************
 * EVENT LISTENERS
 ********************/

//Change listener for Job Rolls so it can show and hide Other title option
title.addEventListener("change", e => {
    if (e.target.value != "other") {
        other.style.display = "none";
    } else {
        other.style.display = "";
    }
});

//Change listener for design and Color
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

activities.addEventListener("change", e => {
    let cost = e.target.dataset.cost;
    cost = parseInt(cost);

    if (e.target.checked) {
        totalCost += cost;
    } else if (!e.target.checked) {
        totalCost -= cost;
    }
    h3.textContent = "Total: $" + totalCost;

    const activityTime = e.target.dataset.dayAndTime; //day and time of the target checkbox

    for (let i = 0; i < input.length; i++) {
        const checkbox = input[i].dataset.dayAndTime; // day and time of the checkbox found in loop

        // if the the looped checkbox and the target checkbox has same dayAndTime disable or enable the looped one not checked one
        if (checkbox == activityTime && e.target != input[i]) {
            if (e.target.checked) {
                input[i].disabled = true;
            } else {
                input[i].disabled = false;
            }
        }
    }
});

//Payment Select option listener, on change it will hide other divs which are unselected
//Only selected option div is shown
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

    //Here we are setting the default colors of 3 fields and blank error message.
    // we can use it in real form if we need to clear values if the option is changed
    // for example. user entered card details and now we changed payment option to paypal.
    // we can clear here the values from this function to default or empty
    ccNumber.style.border = "#5e97b0";
    zip.style.border = "#5e97b0";
    cvv.style.border = "#5e97b0";
    errorP.textContent = "";
});

/****************************
 * REAL TIME INPUT LISTENERS
 ***************************/

/* We are getting the values from valArray objects array
 It has got following objects. 
 0 - name
 1 - email
 2 - ccNumber
 3 - zip
 4 - cvv

 these indexes are used in the listeners
 we can save these all in new variables and use them with simple names but here i wanted to leave as it is
 so we can have and idea how it can be used in future. (For my own reference as well)
 */

name.addEventListener("input", () => {
    fieldValidation(valArr[0].regex, valArr[0].tag);
});
email.addEventListener("input", () => {
    fieldValidation(valArr[1].regex, valArr[1].tag);
});
activities.addEventListener("input", () => {
    if (!isActivityValid()) {
        act_legend.style.color = "red";
    } else {
        act_legend.style.color = "rgba(6, 49, 68, 0.9)";
    }
});
ccNumber.addEventListener("input", () => {
    fieldValidation(valArr[2].regex, valArr[2].tag);
});
zip.addEventListener("input", () => {
    fieldValidation(valArr[3].regex, valArr[3].tag);
});
cvv.addEventListener("input", () => {
    fieldValidation(valArr[4].regex, valArr[4].tag);
});

//form Submit listener
form.addEventListener("submit", e => {
    // e.preventDefault();
    /*
    here we passed valArray in the function that return true or false.
    if false, it will run preventDefault, if true it will got for submission.
    */
    if (!formValidation(valArr)) {
        console.log(
            "validator stopped the sumbission. There is some false value."
        );
        e.preventDefault();
    }
});

/********************
 * FUNCTIONS
 ********************/
//function to filter design and themese
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

//Here we have used a different approach than totalCost (you will find that below) if any checkbox is checked return true
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
function fieldValidation(regex, tag) {
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
//This is form Validation function which validates all the fields together
//Using the same valArray of object and getting their regex and tags from there
function formValidation(array) {
    const name_submit = fieldValidation(array[0].regex, array[0].tag);
    const email_submit = fieldValidation(array[1].regex, array[1].tag);
    const ccNum_submit = fieldValidation(array[2].regex, array[2].tag);
    const zip_submit = fieldValidation(array[3].regex, array[3].tag);
    const cvv_submit = fieldValidation(array[4].regex, array[4].tag);

    //activity validation
    if (!isActivityValid()) {
        act_legend.style.color = "red";
    } else {
        act_legend.style.color = "rgba(6, 49, 68, 0.9)";
    }

    /*
    Conditional error message for zip code only.
    If empty it will show a different message.
    If more than 5 or less than 3 digits, it will show different message.
    It will only update on submit button. Its not real time message.
    You can try and check by leaving empty or with 3 digits or 7 digits etc
    */
    if (!zip_submit && zip.value.length == 0) {
        errorP.textContent = "Please enter zip code";
        errorP.style.color = "red";
    } else if (
        (!zip_submit && zip.value.length > 0 && zip.value.length < 3) ||
        zip.value.length > 5
    ) {
        errorP.textContent = "Please enter a number that is 5 digits long.";
    } else if (zip_submit) {
        errorP.textContent = "";
    }

    //Here is the credit card div is displayed
    //Check all the fields for validation
    if (creditCard.style.display != "none") {
        /*
            for activity validation, here we are checking of the total cost is 0,
            initially it was set to zero and added increment if the checkbox is select.
            if it is still 0 then no checkbox is selcted so its Invalid.
            */
        if (
            name_submit &&
            email_submit &&
            totalCost > 0 &&
            ccNum_submit &&
            cvv_submit
        ) {
            return true;
        } else {
            return false;
        }
        //If the credit card div is hidden, its fields won't be validated
    } else if (creditCard.style.display == "none") {
        if (name_submit && email_submit && totalCost > 0) {
            return true;
        } else {
            return false;
        }
    }
}
