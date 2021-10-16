const display = document.querySelector(".display")
const digits = document.querySelectorAll(".digit")
const feats = document.querySelectorAll(".feat")
const operators = document.querySelectorAll(".operator")
const equal = document.querySelector(".equal")
const calculator = {
  firstNum: 0,
  secondNum: 0,
  operator: "",
  result: 0,
  displayVal: "0",
  isClicked: false
}

const displayNum = val => {
  if (calculator.displayVal == "0" && val === ".") {
    calculator.displayVal += val
  }
  else if (calculator.displayVal == "0") {
    calculator.displayVal = ""
    calculator.displayVal += val
  }
  else if (calculator.displayVal.includes(".") && val === ".") {
    return
  }
  else if (calculator.displayVal.length > 11) {
    return
  }
  else {
    calculator.displayVal += val
  }
  display.textContent = calculator.displayVal
}

const setFeat = val => {
  if (val === "AC" || val === "c") {
    operators.forEach(op => {
      op.classList.remove("hit")
    })
  }

  if (val === "AC" || val === "c") {
    calculator.operator = ""
    calculator.firstNum = ""
    calculator.secondNum = ""
    calculator.result = ""
    calculator.isClicked = false
    calculator.displayVal = "0"
  }
  else if (val === "+/-" || val === "m") {
    if (calculator.displayVal == "0" || calculator.displayVal == "0.") {
      return
    } else if (display.textContent.slice(0, 1) === "-") {
      calculator.displayVal = calculator.displayVal.slice(1)
    } else if (calculator.displayVal.length > 11) {
      calculator.displayVal = "-" + calculator.displayVal.slice(0, 12)
    } else {
      calculator.displayVal = "-" + calculator.displayVal;
    }
  }
  else {
    calculator.displayVal = calculator.displayVal.slice(0, -1)
    calculator.displayVal === "" || calculator.displayVal === "-" ? calculator.displayVal = "0" : null
  }

  display.textContent = calculator.displayVal
}

const setDigitBtns = e => {
  displayNum(e.target.textContent)
}

const setFeatBtns = e => {
  setFeat(e.target.textContent)
}

const setKeyboardBtns = e => {
  e.key >= 0 && e.key <= 9 || e.key === "." ? displayNum(e.key)
    : e.key === "Backspace" || e.key === "c" || e.key === "m" ? setFeat(e.key)
    : e.key === "+" || e.key === "-" || e.key === "/" || e.key === "*" ? setFirstNumAndSign(e)
    : e.key === "=" ? operate(e)
    : null
}

const setFirstNumAndSign = (e) => {
  operators.forEach(op => {
    op.classList.remove("hit")
    if (e.key) {
      op.value === e.key ? op.classList.add("hit") : null
    }
    else {
      e.target.classList.add("hit")
    }
  })

  if (calculator.isClicked) {
    operate(e)
    if (e.key) {
      calculator.operator = e.key
    }
    else {
      calculator.operator = e.target.value
    }
    calculator.firstNum = calculator.result
  }
  else {
    if (e.key) {
      calculator.operator = e.key
    }
    else {
      calculator.operator = e.target.value
    }
    calculator.firstNum = parseFloat(calculator.displayVal)
  }

  calculator.isClicked = true
  calculator.displayVal = "0"
}

const operate = e => {
  console.log(e.key);
  if (!calculator.firstNum || !calculator.operator) {
    return
  }

  if (e.target.textContent === "=" || e.key === "=") {
    operators.forEach(op => {
      op.classList.remove("hit")
    })
  }

  if (calculator.isClicked) {
    calculator.secondNum = parseFloat(calculator.displayVal)
  }

  if (calculator.operator === "+") {
    calculator.result = calculator.firstNum + calculator.secondNum
  }
  else if (calculator.operator === "-") {
    calculator.result = calculator.firstNum - calculator.secondNum
  }
  else if (calculator.operator === "*") {
    calculator.result = calculator.firstNum * calculator.secondNum
  }
  else {
    calculator.result = calculator.firstNum / calculator.secondNum
  }

  if (isNaN(calculator.result)) {
    display.textContent = "not a number"
  }
  else {
    if (calculator.result.toString().length > 11) {
      calculator.result = Number(result.toString().slice(0, 12))
    }
    const n = calculator.result.toString().length - calculator.result.toString().indexOf(".")
    display.textContent = parseFloat(calculator.result.toFixed(n))
  }

  calculator.firstNum = calculator.result
  calculator.secondNum = 0
  calculator.operator = ""
  calculator.isClicked = false
  calculator.displayVal = "0"
}

digits.forEach(digit => digit.addEventListener("click", setDigitBtns))
feats.forEach(feat => feat.addEventListener("click", setFeatBtns))
operators.forEach(op => op.addEventListener("click", setFirstNumAndSign))
equal.addEventListener("click", operate)
window.addEventListener("keydown", setKeyboardBtns)