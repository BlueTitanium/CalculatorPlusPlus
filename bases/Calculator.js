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
  var SYMBOLS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()" + toUTF16(0x1F601)+ toUTF16(0x1F602)+ toUTF16(0x1F603)+ toUTF16(0x1F604)+ toUTF16(0x1F605)+ toUTF16(0x1F606)+ toUTF16(0x1F607)+ toUTF16(0x1F608)+ toUTF16(0x1F609)+ toUTF16(0x1F610)+ toUTF16(0x1F611)+ toUTF16(0x1F612)+ toUTF16(0x1F613)+ toUTF16(0x1F614)+ toUTF16(0x1F615)+ toUTF16(0x1F616)+ toUTF16(0x1F617)+ toUTF16(0x1F618)+ toUTF16(0x1F619)+ toUTF16(0x1F620)+ toUTF16(0x1F621)+ toUTF16(0x1F622)+ toUTF16(0x1F623)+ toUTF16(0x1F624)+ toUTF16(0x1F625)+ toUTF16(0x1F626)+ toUTF16(0x1F627)+ toUTF16(0x1F628)+ toUTF16(0x1F629)+ toUTF16(0x1F630)+ toUTF16(0x1F631)+ toUTF16(0x1F632)+ toUTF16(0x1F633)+ toUTF16(0x1F634)+ toUTF16(0x1F635)+ toUTF16(0x1F636)+ toUTF16(0x1F637)+ toUTF16(0x1F638)+ toUTF16(0x1F639)+ toUTF16(0x1F640)+ toUTF16(0x1F641)+ toUTF16(0x1F642)+ toUTF16(0x1F643)+ toUTF16(0x1F644)+ toUTF16(0x1F645)+ toUTF16(0x1F646)+ toUTF16(0x1F647)+ toUTF16(0x1F648)+ toUTF16(0x1F649)+ toUTF16(0x1F980)+ toUTF16(0x1F981)+ toUTF16(0x1F982)+ toUTF16(0x1F983)+ toUTF16(0x1F984)+ toUTF16(0x1F985)+ toUTF16(0x1F986)+ toUTF16(0x1F987)+ toUTF16(0x1F988)+ toUTF16(0x1F930)+ toUTF16(0x1F931)+ toUTF16(0x1F932)+ toUTF16(0x1F933)+ toUTF16(0x1F934)+ toUTF16(0x1F935)+ toUTF16(0x1F936)+ toUTF16(0x1F937)+ toUTF16(0x1F938)+ toUTF16(0x1F939)+ toUTF16(0x1F950)+ toUTF16(0x1F951)+ toUTF16(0x1F952)+ toUTF16(0x1F953)+ toUTF16(0x1F954)+ toUTF16(0x1F955)+ toUTF16(0x1F956)+ toUTF16(0x1F957)+ toUTF16(0x1F958)+ toUTF16(0x1F959)+ toUTF16(0x1F960)+ toUTF16(0x1F680)+ toUTF16(0x1F681)+ toUTF16(0x1F682)+ toUTF16(0x1F683)+ toUTF16(0x1F684)+ toUTF16(0x1F685)+ toUTF16(0x1F686)+ toUTF16(0x1F687)+ toUTF16(0x1F688)+ toUTF16(0x1F689)+ toUTF16(0x1F690)+ toUTF16(0x1F691)+ toUTF16(0x1F692)+ toUTF16(0x1F693)+ toUTF16(0x1F694)+ toUTF16(0x1F695)+ toUTF16(0x1F696)+ toUTF16(0x1F697)+ toUTF16(0x1F698)+ toUTF16(0x1F699)+ toUTF16(0x1F400)+ toUTF16(0x1F401)+ toUTF16(0x1F402)+ toUTF16(0x1F403)+ toUTF16(0x1F404)+ toUTF16(0x1F405)+ toUTF16(0x1F406)+ toUTF16(0x1F407)+ toUTF16(0x1F408)+ toUTF16(0x1F409)+ toUTF16(0x1F410)+ toUTF16(0x1F411)+ toUTF16(0x1F412)+ toUTF16(0x1F413)+ toUTF16(0x1F414)+ toUTF16(0x1F415)+ toUTF16(0x1F416)+ toUTF16(0x1F417)+ toUTF16(0x1F418)+ toUTF16(0x1F419)+ toUTF16(0x1F420)+ toUTF16(0x1F421)+ toUTF16(0x1F422)+ toUTF16(0x1F423)+ toUTF16(0x1F424)+ toUTF16(0x1F425)+ toUTF16(0x1F426)+ toUTF16(0x1F427)+ toUTF16(0x1F428)+ toUTF16(0x1F429)+ toUTF16(0x1F430)+ toUTF16(0x1F431)+ toUTF16(0x1F432)+ toUTF16(0x1F433)+ toUTF16(0x1F434)+ toUTF16(0x1F435)+ toUTF16(0x1F436)+ toUTF16(0x1F437)+ toUTF16(0x1F438)+ toUTF16(0x1F439)+ toUTF16(0x1F440)+ toUTF16(0x1F441)+ toUTF16(0x1F442)+ toUTF16(0x1F443)+ toUTF16(0x1F444)+ toUTF16(0x1F445)+ toUTF16(0x1F446)+ toUTF16(0x1F447)+ toUTF16(0x1F448)+ toUTF16(0x1F449)+ toUTF16(0x1F450)+ toUTF16(0x1F451)+ toUTF16(0x1F452)+ toUTF16(0x1F453)+ toUTF16(0x1F454)+ toUTF16(0x1F455)+ toUTF16(0x1F456)+ toUTF16(0x1F457)+ toUTF16(0x1F458)+ toUTF16(0x1F459)+ toUTF16(0x1F460)+ toUTF16(0x1F461)+ toUTF16(0x1F462)+ toUTF16(0x1F463)+ toUTF16(0x1F464)+ toUTF16(0x1F465)+ toUTF16(0x1F466)+ toUTF16(0x1F467)+ toUTF16(0x1F468)+ toUTF16(0x1F469)+ toUTF16(0x1F470)+ toUTF16(0x1F471)+ toUTF16(0x1F472)+ toUTF16(0x1F473)+ toUTF16(0x1F474)+ toUTF16(0x1F475)+ toUTF16(0x1F476)+ toUTF16(0x1F477)+ toUTF16(0x1F478)+ toUTF16(0x1F479)+ toUTF16(0x1F480)+ toUTF16(0x1F481)+ toUTF16(0x1F482)+ toUTF16(0x1F483)+ toUTF16(0x1F484)+ toUTF16(0x1F485)+ toUTF16(0x1F486);
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
