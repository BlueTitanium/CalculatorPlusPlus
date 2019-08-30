//concerts unicode string higher than FFFF to UTF16
function toUTF16(codePoint) {
  var TEN_BITS = parseInt('1111111111', 2);
  function u(codeUnit) {
    return '\\u'+codeUnit.toString(16).toUpperCase();
  }

  if (codePoint <= 0xFFFF) {
    return u(codePoint);
  }
  codePoint -= 0x10000;

  // Shift right to get to most significant 10 bits
  var leadSurrogate = 0xD800 + (codePoint >> 10);

  // Mask to get least significant 10 bits
  var tailSurrogate = 0xDC00 + (codePoint & TEN_BITS);

  return u(leadSurrogate) + u(tailSurrogate);
}


// Converts between bases
function base_converter(nbasefrom, basefrom, baseto) {
  // Symbols that we use for the bases
  var SYMBOLS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&";
  if (basefrom<=0 || basefrom>SYMBOLS.length || baseto<=0 || baseto>SYMBOLS.length) {
    console.log("Base unallowed");
    return null;
  }
  var i, nbaseten=0;
  //if the original base is not 10, execute the following code to convert it into base 10
  //else just parse the string into an integer
  if (basefrom!=10) {
    var sizenbasefrom = nbasefrom.length;
    //Special case: if base is 1 just take the size of the string to get the number
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
  //if the base that the number is getting converted into is not 10, execute the following code to
  //correctly print out a string corresponding with the numbered base
  //else just print out the string representation of the number in base 10
  if (baseto!=10) {
    //Special case: if base is 1 just keep it in tally marks or just 1
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
//handles all calculations inside of the calculator
const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
  };
  //handles the input of each digit
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

      calculator.firstOperand = result;

      // Converts result back into the base of whatever the input was
      result = base_converter(String(result), 10, base);
      console.log("Result Binary: " + result);
      calculator.displayValue = String(result);


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

  //resets the calculator
  function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
  }

  //Updates the display on call whenever the calculator display value is adjusted
  function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
  }

  updateDisplay();
  //Creates event listeners for each button on the html page
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

    if (target.classList.contains('all-clear')) {
      resetCalculator();
          updateDisplay();
      return;
    }

    inputDigit(target.value);
    updateDisplay();
  });
