// Converts between bases
function base_converter(nbasefrom, basefrom, baseto) {
  var SYMBOLS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()";
  if (basefrom<=0 || basefrom>SYMBOLS.length || baseto<=0 || baseto>SYMBOLS.length) {
    console.log("Base unallowed");
    return null;
  }
  var i, nbaseten=0;
  if (basefrom!=10) {
    var sizenbasefrom = nbasefrom.length;
    if(basefrom == 1){
      nbaseten = sizenbasefrom;
    }else{
    for (i=0; i<sizenbasefrom; i++) {
      var mul, mul_ok=-1;
      for (mul=0; mul<SYMBOLS.length; mul++) {
        if (nbasefrom[i]==SYMBOLS[mul]) {
          mul_ok = 1;
          break;
        }
      }
      if (mul>=basefrom) {
        console.log("Symbol unallowed in basefrom");
        return null;
      }
      if (mul_ok==-1) {
        console.log("Symbol not found");
        return null;
      }
      var exp = (sizenbasefrom-i-1);
      if (exp==0) nbaseten += mul;
      else nbaseten += mul*Math.pow(basefrom, exp);
    }
  }
  } else nbaseten = parseInt(nbasefrom);
  if (baseto!=10) {
    if(baseto == 1) {
      var result = "";
      var j;
      for(j = 0; j < nbaseten; j++){
        result += "1";
      }
      return result;
    } else {
    var nbaseto = [];
    while (nbaseten>0) {
      var mod = nbaseten%baseto;
      if (mod<0 || mod>=SYMBOLS.length) {
        console.log("Out of bounds error");
        return null;
      }
      nbaseto.push(SYMBOLS[mod]);
      nbaseten = parseInt(nbaseten/baseto);
    }
    return nbaseto.reverse().toString().replace(/,/g, '');
  }
  } else {
    return nbaseten.toString();
  }
  return "0";
}

const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
  };

  function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand === true) {
      calculator.displayValue = digit;
      calculator.waitingForSecondOperand = false;
    } else {
      calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }

    console.log("Calculator: " + calculator);
  }

  function inputDecimal(dot) {
      if (calculator.waitingForSecondOperand === true) return;

    // If the `displayValue` does not contain a decimal point
    if (!calculator.displayValue.includes(dot)) {
      // Append the decimal point
      calculator.displayValue += dot;
    }
  }



  function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator

    // Gets the base of whatever the html page is for
    var base = document.getElementById('base').getAttribute('data-value');

    //const inputValue = parseFloat(displayValue);

    // Converts inputted stuff into decimal
    const inputValue = parseFloat(base_converter(displayValue, base, 10));
    console.log("Operand: " + inputValue);



    if (operator && calculator.waitingForSecondOperand)  {
      calculator.operator = nextOperator;
      return;
    }

    if (firstOperand == null) {
      calculator.firstOperand = inputValue;
    } else if (operator) {
      const currentValue = firstOperand || 0;

      var result = performCalculation[operator](currentValue, inputValue);
      console.log("Result decimal: " + result);

      // Converts result back into the base of whatever the input was
      result = base_converter(String(result), 10, base);
      console.log("Result Binary: " + result);
      calculator.displayValue = String(result);

      calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;

    console.log("Calculator: " + calculator);
  }

  const performCalculation = {



    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,

    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,

    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,

    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

    '=': (firstOperand, secondOperand) => secondOperand
  };

  function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
  }

  function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
  }

  updateDisplay();

  const keys = document.querySelector('.calculator-keys');
  keys.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) {
      return;
    }

    if (target.classList.contains('operator')) {
      handleOperator(target.value);
          updateDisplay();
      return;
    }

    if (target.classList.contains('decimal')) {
      inputDecimal(target.value);
          updateDisplay();
      return;
    }

    if (target.classList.contains('all-clear')) {
      resetCalculator();
          updateDisplay();
      return;
    }

    inputDigit(target.value);
    updateDisplay();
  });
