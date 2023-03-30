const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.keys');
const display = document.querySelector('.display')

// On Button Click
keys.addEventListener('click', e => {
  if (!e.target.matches('button')) return

  const key = e.target;
  const displayedNum = display.textContent;

  const resultString = createResultString(key, displayedNum, calculator.dataset);
  display.textContent = resultString;

  updateCalculatorState(key, calculator, resultString, displayedNum);
  updateVisualState(key, calculator, displayedNum, calculator.dataset.previousKeyType);

  console.log(calculator.dataset.previousKeyType);
})

// Performs the basic arithmetic operations 
const calculate = (n1, n2, operator) => {

    n1 = parseFloat(n1);
    n2 = parseFloat(n2);

    switch (operator) {
      case 'add':
        return n1 + n2;
      case 'subtract':
        return n1 - n2;
      case 'multiply':
        return n1 * n2;
      case 'divide':
        return n1 / n2;
      default:
        throw new Error('Invalid Operator');
    }
}  

// Returns the type of action based on the button pressed
const getKeyType = (key) => {
    const {action} = key.dataset;

    if (!action) return 'number';

    if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
    ) return 'operator';

    return action;
}

// Returns the string that is shown in the display after the user presses any of the buttons
const createResultString = (key, displayedNum, state) => {
    
    const keyContent = key.textContent;
    const keyType = getKeyType(key);
    const {
        firstValue,
        operator,
        modValue,
        previousKeyType
    } = state;

    if (keyType === 'number') {
        return displayedNum === '0' ||
        previousKeyType === 'operator' ||
        previousKeyType === 'calculate'
        ? keyContent
        : displayedNum + keyContent;
    }

    if (keyType === 'decimal') {
        if (!displayedNum.includes('.')) return displayedNum + '.';
        if (previousKeyType === 'operator' || previousKeyType === 'calculate') return '0.';
        return displayedNum;
    }

    if (keyType === 'operator') {
        return firstValue &&
          operator &&
          previousKeyType !== 'operator' &&
          previousKeyType !== 'calculate'
          ? calculate(firstValue, displayedNum, operator)
          : displayedNum;
        }

    if (keyType === 'clear') {

        const clearButton = calculator.querySelector('[data-action=clear]');

        if (clearButton.textContent === 'AC') return '0';

        else if (clearButton.textContent === 'CE') {
            const lastChar = displayedNum.slice(-1);
            if (lastChar === '.') {
                calculator.dataset.previousKeyType = 'decimal';
            }
    
            let slicedDisplay = displayedNum.slice(0, -1);
            return keyContent !== 'AC' &&
            slicedDisplay === ''
                ? '0'
                : displayedNum === '0'
                ? 0
                : slicedDisplay;
        }

    }

    if (keyType === 'calculate') {
        
        return firstValue
          ? previousKeyType === 'calculate'
            ? calculate(displayedNum, modValue, operator)
            : calculate(firstValue, displayedNum, operator)
          : displayedNum;
    }
     
}

// Updates the calculator dataset 
const updateCalculatorState = (key, calculator, calculatedValue, displayedNum) => {
    const keyType = getKeyType(key);
    const clearButton = calculator.querySelector('[data-action=clear]');

    const {
        firstValue,
        operator,
        modValue,
        previousKeyType
    } = calculator.dataset;

    calculator.dataset.previousKeyType = keyType;

    if (keyType === 'operator') {
        calculator.dataset.operator = key.dataset.action;
        calculator.dataset.firstValue = firstValue &&
          operator &&
          previousKeyType !== 'operator' &&
          previousKeyType !== 'calculate'
          ? calculatedValue
          : displayedNum;
    }

    if (keyType === 'clear' && clearButton.textContent === 'AC') {
        calculator.dataset.firstValue = '';
        calculator.dataset.operator = '';
        calculator.dataset.secondValue = '';
        calculator.dataset.modValue = '';
    }

    if (keyType === 'calculate') {
        calculator.dataset.modValue = firstValue && previousKeyType === 'calculate'
            ? modValue
            : displayedNum;
    }
}

// Updates the visuals in the calculator such as highlighted operator, or clear button text value
const updateVisualState = (key, calculator, displayedNum, previousKeyType) => {
    const keyType = getKeyType(key);

    let clearButton = calculator.querySelector('[data-action=clear]');
    Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));

    if (keyType === 'operator') key.classList.add('is-depressed');

    if (keyType === 'clear') {
        if (
            displayedNum === '0' ||
            displayedNum === ''
        ) {
            clearButton.textContent = 'AC';
        }

        else {
            clearButton.textContent = 'CE';
        }

        if (previousKeyType === 'calculate') {
            displayedNum = '0';
        }
        
    }
    
    if (keyType === 'calculate') clearButton.textContent = 'AC';
    else if (keyType !== 'clear') clearButton.textContent = 'CE';
}