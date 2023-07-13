const buttons = Array.from(document.getElementsByTagName("button"));
const display = document.getElementById("display");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const clearDisplay = document.querySelector(".clearDisplay");
const del = document.querySelector(".deleteItem");

let operand1 = 0, operand2 = 0;
let operation;
let count = 0;
let pressedOnce = 0;
let oldOperation;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        
        if (!isNaN(parseInt(button.value))) {
            pressedOnce = 0;    // checks for operator keys being pressed once or more
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

        mathematics(operation);

    });
});

function mathematics(operation) {
    let temp = operand2;
    switch (operation) {

        case "%":
            switch(oldOperation){
                case "*":
                    result = operand1 * (temp/100);
                    break;
                case "+":
                    result = operand1 + (operand1 * (temp/100));
                    break;
                case "-":
                    result = operand1 - (operand1 * (temp/100));
                    break;
                case "/":
                    result = (operand1 / temp) * operand1;
                    break;
            }
            break;
        case "+":
 
            oldOperation = operation;
            result = operand1 + operand2;
            operand1 = result;
            break;

        case "-":
            oldOperation = operation;
            if (count >= 1) {
                result = operand1 - temp;
            } else {
                result = temp - operand1;
            }
            count++;
            operand1 = result;
            break;

        case "*":
            oldOperation = operation;
            if (count < 1) {
                result = temp;
            }
            else {
                if (pressedOnce == 0) {
                    result = operand1 * temp;
                    pressedOnce = 1;
                }
            }
            operand1 = result;
            count++;
            break;

        case "/": 
        oldOperation = operation;
            if (count < 1) {
                result = temp;
            }
            else {
                if (pressedOnce == 0) {
                    if(temp == 0){
                        result = "NaN";
                        break;
                    }
                    result = operand1 / temp;
                    pressedOnce = 1;
                }
            }
            operand1 = result;
            count++;
            break;
    }
    operand2 = 0;

    if (String(result).length > 8) {
        result = result.toExponential(2);
    }
    display.textContent = result.toString();
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
