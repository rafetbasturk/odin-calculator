const display = document.querySelector(".display")
const digits = document.querySelectorAll(".digit")
const feats = document.querySelectorAll(".feat")
const operators = document.querySelectorAll(".operator")
const equal = document.querySelector(".equal")
let firstNum, secondNum, operator, result
let displayVal = "0"
let isClicked = false

const displayNum = val => {
  if (displayVal == "0" && val === ".") {
    displayVal += val
  }
  else if (displayVal == "0") {
    displayVal = ""
    displayVal += val
  }
  else if (displayVal.includes(".") && val === ".") {
    return
  }
  else if (displayVal.length > 11) {
    return
  }
  else {
    displayVal += val
  }
  display.textContent = displayVal
}

const setFeat = val => {
  if (val === "AC" || val === "c") {
    operators.forEach(op => {
      op.classList.remove("hit")
    })
  }

  if (val === "AC" || val === "c") {
    operator = ""
    firstNum = ""
    secondNum = ""
    result = ""
    isClicked = false
    displayVal = "0"
  }
  else if (val === "+/-" || val === "m") {
    if (displayVal == "0" || displayVal == "0.") {
      displayVal = displayVal
    } else if (display.textContent.slice(0, 1) === "-") {
      displayVal = displayVal.slice(1)
    } else if (displayVal.length > 11) {
      displayVal = "-" + displayVal.slice(0, 12)
    } else {
      displayVal = "-" + displayVal;
    }
  }
  else {
    displayVal = displayVal.slice(0, -1)
    displayVal === "" || displayVal === "-" ? displayVal = "0" : null
  }

  display.textContent = displayVal
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
    : e.key === "=" || e.key === "Enter" ? operate(e)
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

  if (isClicked) {
    operate(e)
    if (e.key) {
      operator = e.key
    }
    else {
      operator = e.target.value
    }
    firstNum = result
  }
  else {
    if (e.key) {
      operator = e.key
    }
    else {
      operator = e.target.value
    }
    firstNum = parseFloat(displayVal)
  }

  isClicked = true
  displayVal = "0"
}

const operate = e => {
  if (!firstNum || !operator) {
    return
  }

  if (e.target.textContent === "=" || e.key === "=" || e.key === "Enter") {
    operators.forEach(op => {
      op.classList.remove("hit")
    })
  }

  if (isClicked) {
    secondNum = parseFloat(displayVal)
  }

  if (operator === "+") {
    result = firstNum + secondNum
  }
  else if (operator === "-") {
    result = firstNum - secondNum
  }
  else if (operator === "*") {
    result = firstNum * secondNum
  }
  else {
    result = firstNum / secondNum
  }

  if (isNaN(result)) {
    display.textContent = "not a number"
  }
  else {
    if (result.toString().length > 11) {
      result = Number(result.toString().slice(0, 12))
    }
    const n = result.toString().length - result.toString().indexOf(".")
    display.textContent = parseFloat(result.toFixed(n))
  }

  firstNum = result
  secondNum = 0
  operator = ""
  isClicked = false
  displayVal = "0"
}

digits.forEach(digit => digit.addEventListener("click", setDigitBtns))
feats.forEach(feat => feat.addEventListener("click", setFeatBtns))
operators.forEach(op => op.addEventListener("click", setFirstNumAndSign))
equal.addEventListener("click", operate)
window.addEventListener("keydown", setKeyboardBtns)