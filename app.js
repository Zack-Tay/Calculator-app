const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operations]");
const clearButton = document.querySelector("#clear-button");
const deleteButton = document.querySelector("#delete-button");
const operationResultText = document.querySelector("[data-operations-result]");
const operationWorkingText = document.querySelector("[data-operations-working]");
const equalButton = document.querySelector("[data-equals]");

class Calculator {
    // will take all the functions and data used for the calculator
    constructor(operationResultText, operationWorkingText) {
        this.operationResultText = operationResultText;
        this.operationWorkingText = operationWorkingText;
        this.clear();
    }

    // list down the functions that is required for the calculator
    clear() {
        this.operationResult = '';
        this.operationWorking = '';
        this.operation = undefined;
    } // clear fucntion will delete the whole current operand

    delete() {
        this.operationWorking = this.operationWorking.toString().slice(0, -1);
        // slice method returns all the selected items with the index number 
        // as the paramete, it returns the array up to but not including the last parameter passed
        // passed into the slice function
    }

    appendNumber(number) {
        if (number === "." && this.operationWorking.includes(".")) return;
        // return will jus stop our function from executing further
        this.operationWorking = this.operationWorking.toString() + number.toString();
    } // a function to append the number 
    // that the user clicks on

    chooseOperation(operation) {
        if (this.operationWorking === '') return
        if (this.operationResult !== '') {
            this.compute();
        };
        this.operation = operation;
        this.operationResult = this.operationWorking; // = computation;
        this.operationWorking = '';
    } // the operation that the user selected

    compute() {
        let computation;
        const prev = parseFloat(this.operationResult);
        const current = parseFloat(this.operationWorking);
        if (isNaN(prev) || isNaN(current)) return
        // switch statement for all the math of the calculator
        switch (this.operation) {
            case "+":
                computation = prev + current;
                break
            
            case "-":
                computation = prev - current;
                break
            
            case "x":
                computation = prev * current;
                break

            case "÷":
                computation = prev / current;
                break

            default:
                return;
        }
        this.operationWorking = computation;
        this.operation = undefined;
        this.operationResult = "";
    } 

    updateDisplay(number) {
        this.operationWorkingText.innerText = this.operationWorking;
        if (this.operation != null) { // meaning you have click on an operation
            this.operationResultText.innerText = `${this.operationResult} ${this.operation}`;
        } else {
            this.operationResultText.innerText = '';
        }

    } // update the UI to display the reuslt  
}

const calculator = new Calculator(operationResultText, operationWorkingText);

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalButton.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
})

clearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
})