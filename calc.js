const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.keys');

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;

        if (!action) {
            console.log('number key pressed');
        }

        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
            ) {
                console.log('operator key pressed');
            }

        if (action === 'decimal') {
            console.log('decimal key pressed');
        }

        if (action === 'clear') {
            console.log('clear key pressed');
        }

        if (action === 'calculate') {
            console.log('equal key pressed');
        }

    }
});