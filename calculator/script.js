const calcDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

function sendNumberValue(number) {
  //   replace current display value if first value is entere
  if (awaitingNextValue) {
    calcDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    const displayValue = calcDisplay.textContent;
    calcDisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
}

function addDecimal() {
  if (awaitingNextValue) return;
  // if no dicimal, add one
  if (!calcDisplay.textContent.includes(".")) {
    calcDisplay.textContent = `${calcDisplay.textContent}.`;
  }
}

// calculate first and second values depending on operator
const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,

  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,

  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,

  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,

  "=": (firstNumber, secondNumber) => secondNumber,
};

function useOperator(operator) {
  const currentValue = Number(calcDisplay.textContent);
  //   prevent multiple operators
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
  //   assign first value if no value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calcDisplay.textContent = calculation;
    firstValue = calculation;
  }
  //    Ready for next value to store our operator
  awaitingNextValue = true;
  operatorValue = operator;
}

// add event listeners for numbers, operators, and decimal buttons
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => addDecimal());
  }
});

// reset display
function resetAll() {
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
  calcDisplay.textContent = "0";
}

// event listener
clearBtn.addEventListener("click", resetAll);
