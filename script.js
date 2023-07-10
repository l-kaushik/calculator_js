const buttons = Array.from(document.getElementsByTagName("button"));
const display = document.getElementById("display");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");

let operand1 = 0, operand2 = 0;
let operation;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        if (!isNaN(parseInt(button.value))){
            operand2 = operand2 * 10;
            operand2 = operand2 + parseInt(button.value);
            display.textContent = operand2.toString();
        }
    });
});

operators.forEach(operator => {
    operator.addEventListener("click", (e) => {
        operation = operator.value.toString();
        operand1 = operand2;
        operand2 = 0;
    });
});


equals.addEventListener("click",()=>{
    if(operation == "+"){
        console.log(operand1 + operand2);
        display.textContent = (operand1 + operand2).toString();
    }
});