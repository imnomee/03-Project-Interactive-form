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

// for (let i = 0; i < color.length; i++) {
//     if (color[i].textContent.includes("JS Puns")) {
//         console.log("Js Puns");
//     } else {
//         console.log("Hearts JS");
//     }
// }

function designSelection(theme) {}
