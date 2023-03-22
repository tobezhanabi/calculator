const blueRadio = document.querySelector("input[value='blue']");
const lightRadio = document.querySelector("input[value='light']");
const violetRadio = document.querySelector("input[value='violet']");
const body = document.querySelector("body");

blueRadio.addEventListener("click", () => {
  body.classList.add("theme-blue");
  body.classList.remove("theme-light");
  body.classList.remove("theme-violet");
});

lightRadio.addEventListener("click", () => {
  body.classList.add("theme-light");
  body.classList.remove("theme-violet");
  body.classList.remove("theme-blue");
});

violetRadio.addEventListener("click", () => {
  body.classList.add("theme-violet");
  body.classList.remove("theme-blue");
  body.classList.remove("theme-light");
});

const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator-key");
const display = document.querySelector(".display-metric");

keys.addEventListener("click", (e) => {
  if (e.target.matches("p")) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayed = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;

    // remove is-depressed from all keys

    if (!action) {
      if (
        displayed === "0" ||
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        display.textContent = keyContent;
      } else {
        display.textContent = displayed + keyContent;
      }
      calculator.dataset.previousKeyType = "number";
      console.log("number key");
    }

    if (action === "decimal") {
      if (!displayed.includes(".")) {
        display.textContent = displayed + ".";
      } else if (
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        display.textContent = "0.";
      }
      calculator.dataset.previousKeyType = "decimal";
      console.log("decimal key");
    }

    if (
      action === "subtract" ||
      action === "add" ||
      action === "multiply" ||
      action === "divide"
    ) {
      let firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      let secondValue = displayed;
      console.log(`0perand of first ${firstValue}`);
      console.log(`0perand is ${secondValue}`);
      if (
        firstValue &&
        operator &&
        previousKeyType !== "operator" &&
        previousKeyType !== "calculate"
      ) {
        const calcValue = calculate(firstValue, operator, secondValue);
        display.textContent = calcValue;
        calculator.dataset.firstValue = calcValue;
      } else {
        calculator.dataset.firstValue = displayed;
      }

      key.classList.add("is-depressed");
      calculator.dataset.previousKeyType = "operator";

      calculator.dataset.operator = action; // this is a custom attribute that help us store
      // test
      console.log("operator key");
    }
    if (action === "delete") {
      console.log("delete key");
      display.textContent = 0;
      calculator.dataset.previousKeyType = "delete";
    }

    if (action === "calculate") {
      let firstValue = calculator.dataset.firstValue;

      const operator = calculator.dataset.operator;
      let secondValue = displayed;
      console.log(`0perand is ${firstValue}`);
      if (firstValue) {
        if (previousKeyType === "calculate") {
          firstValue = displayed;
          secondValue = calculator.dataset.modValue;
        }

        display.textContent = calculate(firstValue, operator, secondValue);
        console.log(display.textContent);
      }

      console.log("equal key");
      calculator.dataset.modValue = secondValue;
      calculator.dataset.previousKeyType = "calculate";
    }
    if (action === "clear") {
      calculator.dataset.firstValue = "0";
      calculator.dataset.operator = "";
      calculator.dataset.modValue = "";
      calculator.dataset.previousKeyType = "";
      display.textContent = 0;
      calculator.dataset.previousKeyType = "clear";
      console.log("clear key");
    }
    Array.from(key.parentNode.children).forEach((k) =>
      k.classList.remove("is-depressed")
    );
  }
});

const calculate = (n1, operator, n2) => {
  let result = "";
  if (operator === "add") {
    result = parseFloat(n1) + parseFloat(n2);
  } else if (operator === "subtract") {
    result = parseFloat(n1) - parseFloat(n2);
  } else if (operator === "divide") {
    return parseFloat(n1) / parseFloat(n2);
  } else if (operator === "multiply") {
    result = parseFloat(n1) * parseFloat(n2);
  }

  console.log(result);
  return result;
};
