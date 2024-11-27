let expenses = [];

// Load expenses from local storage
if (localStorage.getItem('expenses')) {
    expenses = JSON.parse(localStorage.getItem('expenses'));
    displayExpenses();
}

// Add event listener to add expense button
document.getElementById('add-expense-btn').addEventListener('click', addExpense);

// Function to add expense
function addExpense(e) {
    e.preventDefault();
    let expenseName = document.getElementById('expense-name').value;
    let expenseAmount = parseFloat(document.getElementById('expense-amount').value);
    let expense = {
        name: expenseName,
        amount: expenseAmount
    };
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();
    document.getElementById('expense-name').value = '';
    document.getElementById('expense-amount').value = '';
}

// Function to display expenses
function displayExpenses() {
    let expenseTableBody = document.getElementById('expense-table-body');
    expenseTableBody.innerHTML = '';
    let totalExpense = 0;
    expenses.forEach((expense, index) => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.name}</td>
            <td>$${expense.amount}</td>
            <td>
                <button class="edit-btn" onclick="editExpense(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteExpense(${index})">Delete</button>
            </td>
        `;
        expenseTableBody.appendChild(row);
        totalExpense += expense.amount;
    });
    document.getElementById('total-expense').innerText = `Total Expense: $${totalExpense}`;
}

// Function to edit expense
function editExpense(index) {
    let expenseName = prompt('Enter new expense name:');
    let expenseAmount = parseFloat(prompt('Enter new expense amount:'));
    expenses[index].name = expenseName;
    expenses[index].amount = expenseAmount;
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();
}

// Function to delete expense
function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();
}
