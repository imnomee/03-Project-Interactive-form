const name = document.getElementById("name");
//Set
name.focus();

const other = document.getElementById("other-title");
other.style.display = "none";

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
