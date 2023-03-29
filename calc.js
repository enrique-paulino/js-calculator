const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.keys');
const display = document.querySelector('.display')

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;

        Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));

        const previousKeyType = calculator.dataset.previousKeyType;

        if (!action) {        
            if (
                displayedNum === '0' || 
                previousKeyType === 'operator' || 
                previousKeyType === 'calculate'
                ) {
                display.textContent = keyContent
            }
            else {
                display.textContent = displayedNum + keyContent;
            }

            calculator.dataset.previousKeyType = 'number';
        }

        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
            ) {
                const firstValue = calculator.dataset.firstValue;
                const operator = calculator.dataset.operator;
                const secondValue = displayedNum;

                if (
                    firstValue && 
                    operator && 
                    previousKeyType !== 'operator' && 
                    previousKeyType !== 'calculate'
                    ) {

                    const calcValue = calculate(firstValue, secondValue, operator);
                    display.textContent = calcValue;

                    calculator.dataset.firstValue = calcValue;
                }
                else {
                    calculator.dataset.firstValue = displayedNum;
                }

                key.classList.add('is-depressed')
                calculator.dataset.previousKeyType = 'operator'
                calculator.dataset.operator = action
        }

        if (action === 'decimal') {
            if (!displayedNum.includes('.')) {            
                display.textContent = displayedNum + '.'            
            }
            else if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
                display.textContent = '0.';
            }
            calculator.dataset.previousKeyType = 'decimal';
        }

        if (action !== 'clear') {
            const clearButton = calculator.querySelector('[data-action=clear]');
            clearButton.textContent = 'CE';
        }

        if (action === 'clear') {
            if (key.textContent === 'AC') {
                calculator.dataset.firstValue = '';
                calculator.dataset.operator = '';
                calculator.dataset.secondValue = '';
                calculator.dataset.modValue = '';
            } else {
                // CE Button Pressed

                const displayedNum = display.textContent;
                const lastChar = displayedNum.slice(-1);

                display.textContent = displayedNum.slice(0, -1);

                if (display.textContent === '') {
                    display.textContent = '0';
                }

                if (lastChar === '.') {
                    calculator.dataset.previousKeyType = 'decimal';
                }

                key.textContent = 'AC';
            }

            const clearButton = calculator.querySelector('[data-action=clear]');
            if (
                display.textContent === '0' ||
                calculator.dataset.previousKeyType === 'operator'
            ) {
                clearButton.textContent = 'AC';
            }
            else {
                clearButton.textContent = 'CE';
            }
        
            
            calculator.dataset.previousKeyType = 'clear';
        }

        

        if (action === 'calculate') {
            let firstValue = calculator.dataset.firstValue;            
            let secondValue = displayedNum;
            const operator = calculator.dataset.operator;
            
            if (firstValue) {
                if (previousKeyType === 'calculate') {
                  firstValue = displayedNum;
                  secondValue = calculator.dataset.modValue;
                }
                
                display.textContent = calculate(firstValue, secondValue, operator);
            }
            
          // Set modValue attribute
            calculator.dataset.modValue = secondValue;
            calculator.dataset.previousKeyType = 'calculate';
        }

    }
});

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
        return 'Invalid operator';
    }
}  