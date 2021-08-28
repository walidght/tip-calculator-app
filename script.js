const BILL_COST_INPUT = document.querySelector('#bill-input');
const PEOPLE_NUMBER_INPUT = document.querySelector('#num-of-ppl-input');
const PEOPLE_NUMBER_ERR_MESSAGE = document.querySelector('#num-ppl-err');
const TIP_INPUT = document.querySelector('#custom-tip-rate');

const TIP_AMOUNT = document.querySelector('#tip-amount');
const TOTAL_AMOUNT = document.querySelector('#total-amount');

let bill = null;
let tip = null;
let people = null;

BILL_COST_INPUT.addEventListener('input', (e) => {
    const value = parseFloat(e.target.value) || 0;
    bill = value;
    if (value == 0) e.target.value = '';
    calculateTotal();
});

// value should be an int
// hides and displayes number of people input err
function numberOfPeopleInput() {
    if (!people) {
        PEOPLE_NUMBER_ERR_MESSAGE.style.display = 'block';
        PEOPLE_NUMBER_INPUT.classList.add('inputs-input-invalid');
        return false;
    } else {
        PEOPLE_NUMBER_ERR_MESSAGE.style.display = 'none';
        PEOPLE_NUMBER_INPUT.classList.remove('inputs-input-invalid');
        PEOPLE_NUMBER_INPUT.value = `${people}`;
        return true;
    }
}

PEOPLE_NUMBER_INPUT.addEventListener('input', (event) => {
    people = parseInt(event.target.value) || 0;
    numberOfPeopleInput();
    calculateTotal();
});

// tip percentage buttons event listener
document.querySelectorAll('.inputs-button').forEach((element) => {
    element.addEventListener('click', (event) => {
        deselectLastClickedButton();
        event.target.classList.add('inputs-button-clicked');
        event.target.classList.remove('inputs-button-not-clicked');
        tip = parseInt(event.target.dataset.value);
        document.querySelector('#custom-tip-rate').value = '';
        calculateTotal();
    });
});

// tip percentage input event listener
TIP_INPUT.addEventListener('input', (event) => {
    const value = parseInt(event.target.value) || 0;
    event.target.value = `${value}`;
    tip = value;
    deselectLastClickedButton();
    calculateTotal();
});

// deselected previously clicked button
function deselectLastClickedButton() {
    const buttons = document.querySelectorAll('.inputs-button');

    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].classList.contains('inputs-button-clicked')) {
            buttons[i].classList.remove('inputs-button-clicked');
            buttons[i].classList.add('inputs-button-not-clicked');
            break;
        }
    }
}

// update the data
function calculateTotal() {
    if (!(bill && tip != null && numberOfPeopleInput())) return;
    makeResetButtonClickable();
    const totalAmount = parseFloat(bill / people);
    const tipAmount = parseFloat((bill * tip) / 100 / people);
    TIP_AMOUNT.innerHTML =
        '$' + Number(Math.round(tipAmount + 'e2') + 'e-2').toFixed(2);
    TOTAL_AMOUNT.innerHTML =
        '$' + Number(Math.round(totalAmount + 'e2') + 'e-2').toFixed(2);
}

// reset button

function makeResetButtonUnclickable() {
    document
        .querySelector('#display-button')
        .classList.remove('display-button-hover');
    document
        .querySelector('#display-button')
        .removeEventListener('click', resetButtonAction, false);
}

function makeResetButtonClickable() {
    document
        .querySelector('#display-button')
        .classList.add('display-button-hover');

    document
        .querySelector('#display-button')
        .addEventListener('click', resetButtonAction);
}

function resetButtonAction() {
    bill = null;
    tip = null;
    people = null;
    BILL_COST_INPUT.value = '';
    PEOPLE_NUMBER_INPUT.value = '';
    TIP_INPUT.value = '';
    deselectLastClickedButton();
    PEOPLE_NUMBER_ERR_MESSAGE.style.display = 'none';
    PEOPLE_NUMBER_INPUT.classList.remove('inputs-input-invalid');
    makeResetButtonUnclickable();
    TIP_AMOUNT.innerHTML = '$0.00';
    TOTAL_AMOUNT.innerHTML = '$0.00';
}
