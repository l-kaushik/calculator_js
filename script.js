const buttons = Array.from(document.getElementsByTagName("button"));
const display = document.getElementById("display");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const clearDisplay = document.querySelector(".clearDisplay");
const del = document.querySelector(".deleteItem");

let operand1 = 0, operand2 = 0;
let operation;
let count = 0;
let flagEquals = 0;


buttons.forEach(button => {
    button.addEventListener("click", () => {
        if (!isNaN(parseInt(button.value))) {
            if (String(operand2).length > 8) return;
            operand2 = operand2 * 10;
            operand2 = operand2 + parseInt(button.value);
            display.textContent = operand2.toString();
        }
    });
});

operators.forEach(operator => {
    operator.addEventListener("click", (e) => {
        operation = operator.value.toString();

        if(count > 0)
            flagEquals = 1;
            
        mathematics(operation);

    });
});

function mathematics(operation) {
    let temp = operand2;
    switch (operation) {

        case "+":
            result = operand1 + operand2;
            operand1 = result;
            break;

        case "-":
            if (count >= 1) {
                result = operand1 - temp;
            } else {
                result = temp - operand1;
            }
            count++;
            operand1 = result;
            break;

        case "*":
            if(count < 1){
                result = temp * 1;
            }
            else{
                console.log(flagEquals);
                console.log(operand1);
                console.log(temp);
                if(flagEquals != 1){
                    result = operand1 * temp;
                }
                else{
                    result;
                }

            }
            operand1 = result;
            count++;
            break;

        case "/":
            result = operand1 / operand2;
            break;
    }
    operand2 = 0;

    if (String(result).length > 8) {
        result = result.toExponential(2);
    }
    display.textContent = result.toString();
    // flagEquals = 0;

    // console.log(operand1);
}

equals.addEventListener("click", () => {
    mathematics(operation);
});

clearDisplay.addEventListener("click", () => {
    operand2 = 0;
    operand1 = 0;
    count = 0;
    result = 0;
    display.textContent = "0";
});


del.addEventListener("click", () => {
    operand2 = parseInt(operand2 / 10);
    display.textContent = String(operand2);
});
