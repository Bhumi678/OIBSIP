const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".btn");

buttons.forEach(function(button) {
    button.addEventListener("click", function() {
       if (button.innerText === "AC") {

    display.value = "";

} else if (button.innerText === "DEL") {

        display.value = display.value.slice(0, -1);

} else if (button.innerText === "=") {

        try {
    display.value = eval(display.value);
} catch {
    display.value = "Error";
}

    } else {

        display.value += button.innerText;

    }
    });
});