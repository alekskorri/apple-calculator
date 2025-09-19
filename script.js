document.addEventListener("DOMContentLoaded", function () {
  const display = document.querySelector(".value");
  const buttons = document.querySelector(".buttons-container");

  let firstValue = null;
  let operator = null;
  let waitingForSecondValue = false;

  buttons.addEventListener("click", function (event) {
    const target = event.target;

    if (!target.matches(".button")) {
      return;
    }

    const action = target.textContent;

    switch (true) {
      case target.classList.contains("number-0"):
      case target.classList.contains("number-1"):
      case target.classList.contains("number-2"):
      case target.classList.contains("number-3"):
      case target.classList.contains("number-4"):
      case target.classList.contains("number-5"):
      case target.classList.contains("number-6"):
      case target.classList.contains("number-7"):
      case target.classList.contains("number-8"):
      case target.classList.contains("number-9"):
      case target.classList.contains("decimal"):
        inputNumber(action);
        break;
      case target.classList.contains("operator"):
        handleOperator(target.classList[2]);
        break;
      case target.classList.contains("function"):
        handleFunction(target.classList[2]);
        break;
    }

    updateDisplay();
  });

  function inputNumber(num) {
    if (waitingForSecondValue) {
      display.textContent = num;
      waitingForSecondValue = false;
    } else {
      const currentValue = display.textContent === "0" ? "" : display.textContent;
      const newValue = currentValue + num;
      if (newValue.length <= 7) {
        display.textContent = newValue;
      } else {
        showPopup("Maximum input length is 7 characters.");
      }
    }
  }

  function handleOperator(nextOperator) {
    const value = parseFloat(display.textContent);

    if (firstValue === null && !isNaN(value)) {
      firstValue = value;
    } else if (operator && !waitingForSecondValue) {
      const result = performCalculation[operator](firstValue, value);
      display.textContent = String(result).slice(0, 7);
      firstValue = result;
    }

    waitingForSecondValue = true;
    operator = nextOperator;
  }

  const performCalculation = {
    addition: (first, second) => first + second,
    subtraction: (first, second) => first - second,
    multiplication: (first, second) => first * second,
    division: (first, second) => first / second,
  };

  function handleFunction(func) {
    switch (func) {
      case "ac":
        resetCalculator();
        break;
      case "pm":
        toggleSign();
        break;
      case "percent":
        convertToPercent();
        break;
      case "equal":
        calculate();
        break;
    }
  }

  function resetCalculator() {
    display.textContent = "0";
    firstValue = null;
    operator = null;
    waitingForSecondValue = false;
  }

  function toggleSign() {
    display.textContent = String(parseFloat(display.textContent) * -1).slice(0, 7);
  }

  function convertToPercent() {
    display.textContent = String(parseFloat(display.textContent) / 100).slice(0, 7);
  }

  function calculate() {
    if (operator && !waitingForSecondValue) {
      const secondValue = parseFloat(display.textContent);
      const result = performCalculation[operator](firstValue, secondValue);
      display.textContent = String(result).slice(0, 7);
      firstValue = result;
      operator = null;
      waitingForSecondValue = true;
    }
  }

  function updateDisplay() {
    display.textContent = display.textContent;
  }

  function showPopup(message) {
    alert(message);
  }
});
