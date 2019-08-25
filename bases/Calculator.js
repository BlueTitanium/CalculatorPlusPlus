// Converts between bases
function base_converter(nbasefrom, basefrom, baseto) {
  var SYMBOLS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()\U0001F601\U0001F602\U0001F603\U0001F604\U0001F605\U0001F606\U0001F607\U0001F608\U0001F609\U0001F610\U0001F611\U0001F612\U0001F613\U0001F614\U0001F615\U0001F616\U0001F617\U0001F618\U0001F619\U0001F620\U0001F621\U0001F622\U0001F623\U0001F624\U0001F625\U0001F626\U0001F627\U0001F628\U0001F629\U0001F630\U0001F631\U0001F632\U0001F633\U0001F634\U0001F635\U0001F636\U0001F637\U0001F638\U0001F639\U0001F640\U0001F641\U0001F642\U0001F643\U0001F644\U0001F645\U0001F646\U0001F647\U0001F648\U0001F649\U0001F980\U0001F981\U0001F982\U0001F983\U0001F984\U0001F985\U0001F986\U0001F987\U0001F988\U0001F930\U0001F931\U0001F932\U0001F933\U0001F934\U0001F935\U0001F936\U0001F937\U0001F938\U0001F939\U0001F950\U0001F951\U0001F952\U0001F953\U0001F954\U0001F955\U0001F956\U0001F957\U0001F958\U0001F959\U0001F960\U0001F680\U0001F681\U0001F682\U0001F683\U0001F684\U0001F685\U0001F686\U0001F687\U0001F688\U0001F689\U0001F690\U0001F691\U0001F692\U0001F693\U0001F694\U0001F695\U0001F696\U0001F697\U0001F698\U0001F699\U0001F400\U0001F401\U0001F402\U0001F403\U0001F404\U0001F405\U0001F406\U0001F407\U0001F408\U0001F409\U0001F410\U0001F411\U0001F412\U0001F413\U0001F414\U0001F415\U0001F416\U0001F417\U0001F418\U0001F419\U0001F420\U0001F421\U0001F422\U0001F423\U0001F424\U0001F425\U0001F426\U0001F427\U0001F428\U0001F429\U0001F430\U0001F431\U0001F432\U0001F433\U0001F434\U0001F435\U0001F436\U0001F437\U0001F438\U0001F439\U0001F440\U0001F441\U0001F442\U0001F443\U0001F444\U0001F445\U0001F446\U0001F447\U0001F448\U0001F449\U0001F450\U0001F451\U0001F452\U0001F453\U0001F454\U0001F455\U0001F456\U0001F457\U0001F458\U0001F459\U0001F460\U0001F461\U0001F462\U0001F463\U0001F464\U0001F465\U0001F466\U0001F467\U0001F468\U0001F469\U0001F470\U0001F471\U0001F472\U0001F473\U0001F474\U0001F475\U0001F476\U0001F477\U0001F478\U0001F479\U0001F480\U0001F481\U0001F482\U0001F483\U0001F484\U0001F485\U0001F486";
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
  /*
  function inputDecimal(dot) {
      if (calculator.waitingForSecondOperand === true) return;

    // If the `displayValue` does not contain a decimal point
    if (!calculator.displayValue.includes(dot)) {
      // Append the decimal point
      calculator.displayValue += dot;
    }
  }*/



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
