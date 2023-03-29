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
            if (displayedNum === '0' || previousKeyType === 'operator') {
                display.textContent = keyContent
            }
            else {
                display.textContent = displayedNum + keyContent;
            }

        }

        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
            ) {
                key.classList.add('is-depressed');
                calculator.dataset.firstValue = displayedNum;
                calculator.dataset.previousKeyType = 'operator';
                calculator.dataset.operator = action;
            }

        if (action === 'decimal') {
            display.textContent = displayedNum + '.'
        }

        if (action === 'clear') {
            console.log('clear key pressed');
        }

        if (action === 'calculate') {
            const firstValue = calculator.dataset.firstValue;
            const secondValue = displayedNum;
            const operator = calculator.dataset.operator;

            display.textContent = calculate(firstValue, secondValue, operator);
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