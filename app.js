const display = document.querySelector(".display")
const digits = document.querySelectorAll(".digit")
const feats = document.querySelectorAll(".feat")
const operators = document.querySelectorAll(".operator")
const equal = document.querySelector(".equal")
let firstNum, secondNum, operator, result
let displayVal = "0"
let isClicked = false

const setNumber = e => {
  if (displayVal == "0" && e.target.textContent === ".") {
    displayVal += e.target.textContent
  } else if (displayVal == "0") {
    displayVal = ""
    displayVal += e.target.textContent
  } else if (displayVal.includes(".") && e.target.textContent === ".") {
    return
  } else if (displayVal.length > 14) {
    return
  } else {
    displayVal += e.target.textContent
  }
  display.textContent = displayVal
}

const setFeat = e => {
  if (e.target.innerText !== "") {
    operators.forEach(op => {
      op.classList.remove("hit")
    })
  }

  if (e.target.textContent === "AC") {
    operator = ""
    firstNum = ""
    secondNum = ""
    result = ""
    isClicked = false
    displayVal = "0"
  } else if (e.target.textContent === "+/-") {
    if (displayVal == "0" || displayVal == "0.") {
      displayVal = displayVal
    } else if (display.textContent.slice(0, 1) === "-") {
      displayVal = displayVal.slice(1)
    } else if (displayVal.length > 14) {
      displayVal = "-" + displayVal.slice(0, 14)
    } else {
      displayVal = "-" + displayVal;
    }
  } else {
    displayVal = displayVal.slice(0, -1)
    displayVal === "" || displayVal === "-" ? displayVal = "0" : null
  }

  display.textContent = displayVal
}

const setFirstNumAndSign = (e) => {
  operators.forEach(op => {
    op.classList.remove("hit")
    e.target.classList.add("hit")
  })

  if (isClicked) {
    operate(e)
    operator = e.target.value
    firstNum = result
  } else {
    operator = e.target.value
    firstNum = parseFloat(displayVal)
  }

  isClicked = true
  displayVal = "0"
}

const operate = (e) => {
  if (!firstNum) {
    return
  }

  if (e.target.textContent === "=") {
    operators.forEach(op => {
      op.classList.remove("hit")
    })
  }

  if (isClicked) {
    secondNum = parseFloat(displayVal)
  }

  if (operator === "+") {
    result = firstNum + secondNum
  } else if (operator === "-") {
    result = firstNum - secondNum
  } else if (operator === "*") {
    result = firstNum * secondNum
  } else {
    result = firstNum / secondNum
  }

  if (isNaN(result)) {
    display.textContent = "not a number"
  } else {
    if (result.toString().length > 14) {
      result = Number(result.toString().slice(0, 15))
    }
    const n = result.toString().length - result.toString().indexOf(".")
    display.textContent = (parseFloat(result.toFixed(n))).toString()
  }

  firstNum = result
  secondNum = ""
  operator = ""
  isClicked = false
  displayVal = "0"
}

digits.forEach(digit => digit.addEventListener("click", setNumber))
feats.forEach(feat => feat.addEventListener("click", setFeat))
operators.forEach(op => op.addEventListener("click", setFirstNumAndSign))
equal.addEventListener("click", operate)