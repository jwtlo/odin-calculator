let left = document.querySelector(".display-text.left-operand");
let operator = document.querySelector(".display-text.display-operator");
let right = document.querySelector(".display-text.right-operand");
let result = document.querySelector(".display-text.result");

// Digits 0-9 buttons
const numbers = document.querySelectorAll(".number");

numbers.forEach((el) => {
  el.addEventListener("click", () => {
    if (result.textContent !== "") clearAll(); // If result is nonempty, start a new expression

    if (operator.textContent === "") {
      if (left.textContent === "0") {
        if (el.textContent === "0") return; //special case for 0 button
        left.textContent = "";
      }
      left.textContent += el.textContent;
    } else {
      if (right.textContent === "0") {
        if (el.textContent === "0") return;
        right.textContent = "";
      }
      right.textContent += el.textContent;
    }
  })
})

// Decimal dot
const dot = document.querySelector(".dot");
dot.addEventListener("click",   () => {
  if (operator.textContent === "") {
    if (left.textContent==="") left.textContent=0;
    if (!left.textContent.includes(".")) left.textContent += ".";
  } else {
    if (right.textContent==="") right.textContent=0;
    if (!right.textContent.includes(".")) right.textContent += ".";
  }
})

// +, -, *, / operators buttons
const operators = document.querySelectorAll(".operator");
operators.forEach((el) => {
  el.addEventListener("click", () => {

    // Three cases: Either there is no number at all
    // or there is no operation locked in (by right textContent)
    // or an equation is already written and pressing "equals" is first implied
    if (left.textContent === "") {
      return;
    } else if (right.textContent === "") {
      operator.textContent = el.textContent;
    } else {
      operate();
      nextOperator()
      operator.textContent = el.textContent;
    }
  })
})

// = equals button
const equals = document.querySelector(".equals");
equals.addEventListener("click", () => {
  if (left.textContent !== "" && operator.textContent !== "" && right.textContent !== "") {
    operate();
  }
})

// Evaluates the expression
// Assumes that left, operator, and right are nonempty and correct
function operate() {
  let l = left.textContent;
  let o = operator.textContent;
  let r = right.textContent;

  switch (o) {
    case "+":
      show = +l + +r;
      break;
    case "-":
      show = +l - +r;
      break;
    case "*":
      show = +l * +r;
      break;
    case "/":
      show = +l / +r;
      break;
    default: 
      throw new Error("Unimplemented operator");
  }
  if (show === Infinity || isNaN(show)) {
    console.log(show);
    result.textContent = "ERROR"
  }
  else {
    result.textContent = (Math.round(show * 1e12) / 1e12);
  }
}

// Sets up a new operator being clicked AFTER a result has been shown
// Assumes that left, operator, right, and result are nonempty and correct
function nextOperator() {
  let temp = result.textContent;
  clearAll();
  left.textContent = temp;
}

function clearAll() {
  left.textContent = "";
  operator.textContent = "";
  right.textContent = "";
  result.textContent = "";
}

const clr = document.querySelector(".clear");
clr.addEventListener("click", clearAll)

const del = document.querySelector(".delete");
del.addEventListener("click", () => {
  if (result.textContent !== "") { // if result exists, first clear result
    result.textContent = "";
  }

  if (right.textContent !== "") {
    right.textContent = right.textContent.slice(0, -1);
  } else if (operator.textContent !== "") {
    operator.textContent = "";
  } else if (left.textContent !== "") {
    if (left.textContent === "ERROR") left.textContent = "";
    else if (left.textContent.includes("e")) {
      left.textContent = left.textContent.slice(0, left.textContent.indexOf("e"));
    }  else {
      left.textContent = left.textContent.slice(0, -1);
    }
  }
})