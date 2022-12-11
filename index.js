const balance = document.getElementById('balance-amount')
const userIncome = document.getElementById('income')
const userExpense = document.getElementById('expense')
const concept = document.getElementById('add-concept')
const amount = document.getElementById('add-amount')
const history = document.getElementById('transaction-history')
const form = document.getElementById('transaction-data')

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];



function newTransaction(event) {
    event.preventDefault();

    const transaction = {
        concept: concept.value,
        amount: parseInt(amount.value),
        id: Math.floor(Math.random() * 100000),
    }

    transactions.push(transaction)
    addTransaction(transaction);
    updateValues();
    updateLocalStorage();

    concept.value = '';
    amount.value = '';

}

function addTransaction(transaction) {
    const sign = transaction.amount < 0 ? '' : '+';
    const newItem = document.createElement('li');
    newItem.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    newItem.innerHTML = `
        ${transaction.concept} <span>${sign}${transaction.amount}</span>
        <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">x</button>
    `
    history.appendChild(newItem)
}

function updateValues() {

    const amounts = transactions.map(transaction => transaction.amount);
    console.log(amounts)
    const totalBalance = amounts.reduce((acc, item) => acc += item, 0).toFixed(2);
    
    const totalIncome = amounts.filter(amount => amount > 0).reduce((acc, newIncome) => acc += newIncome, 0).toFixed(2);

    const totalExpenses = (amounts.filter(amount => amount < 0).reduce((acc, newExpense)=> acc += newExpense, 0) * -1).toFixed(2);
    

    userIncome.innerText = `${totalIncome} €`;
    userExpense.innerText = `${totalExpenses} €`;
    balance.innerText = `${totalBalance} €`;
}


function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();
    init();
}


function init() {
    history.innerHTML = "";
    transactions.forEach(addTransaction);
    updateValues();
}

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

init();
form.addEventListener('submit', newTransaction);
