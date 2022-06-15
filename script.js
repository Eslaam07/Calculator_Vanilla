const numbersButtons = document.querySelectorAll("[data-number]");
const operationsButtons = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equal]");
const allClearButton = document.querySelector("[data-all-clear]");
const dotButton = document.querySelector("[data-dot]");

const calcHistory = document.querySelector("p");

const output = document.querySelector("[data-output]");

let firstNum = 0;
let operationSymbol = "";
let secondNum = 0;
let pressingOperation = false;
let pressingEqual = false;
let pressingDot = false;
let arr = [];
let calculation = "";

numbersButtons.forEach((numberBtn) => {
  numberBtn.addEventListener("click", () =>
    displayNumber(numberBtn.textContent)
  );
});

dotButton.addEventListener("click", () => {
  if (!pressingDot) {
    displayNumber(dotButton.textContent);
    pressingDot = true;
  }
});

function displayNumber(numberText) {
  if (!pressingOperation && !pressingEqual) {
    output.textContent = `${output.textContent}${numberText}`;
  } else {
    output.textContent = "";
    pressingOperation = false;
    output.textContent = `${output.textContent}${numberText}`;
    pressingEqual = false;
    pressingDot = false;
  }
}

operationsButtons.forEach((operationBtn) => {
  operationBtn.addEventListener("click", () =>
    handleOperation(operationBtn.textContent)
  );
});

function handleOperation(operationText) {
  if (!pressingOperation && output.textContent !== "") {
    arr.push(output.textContent);
    operationText === "÷" ? (operationText = "/") : "";
    operationText === "×" ? (operationText = "*") : "";
    operationSymbol = operationText;
    arr.push(operationSymbol);
    console.log(arr);
    pressingOperation = true;
    calculation = arr.join("");
    console.log(calculation);
    calcHistory.textContent = `${calculation}`;
    console.log(arr);
  }
}

equalButton.addEventListener("click", calculate);

function calculate() {
  if (!pressingEqual) {
    if (output.textContent) {
      arr.push(output.textContent);
      calculation = arr.join("");
      output.textContent = eval(calculation);
      console.log(calculation);
      calcHistory.textContent = `${calculation} =`;
      console.log(arr);
      pressingEqual = true;
      arr = [];
      pressingDot = false;
    }
  }
}

allClearButton.addEventListener("click", resetAll);

function resetAll() {
  output.textContent = "";
  pressingOperation = false;
  console.clear();
  arr = [];
  calcHistory.textContent = "";
  pressingEqual = false;
  pressingDot = false;
}
