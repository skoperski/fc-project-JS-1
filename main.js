`use strict`;

const budgetValueDOM = document.querySelector("#budgetValue");

const incomeFormDOM = document.querySelector("#incomeForm");
const incomeTitleDOM = document.querySelector("#incomeTitle");
const incomeValueDOM = document.querySelector("#incomeValue");
const incomeSubmitDOM = document.querySelector("#incomeSubmit");
const incomeMsgDOM = document.querySelector("#incomeMsg");
const incomesListDOM = document.querySelector("#incomesList");
const incomesValueDOM = document.querySelector("#incomesValue");

const expenseFormDOM = document.querySelector("#expenseForm");
const expenseTitleDOM = document.querySelector("#expenseTitle");
const expenseValueDOM = document.querySelector("#expenseValue");
const expenseSubmitDOM = document.querySelector("#expenseSubmit");
const expenseMsgDOM = document.querySelector("#expenseMsg");
const expensesListDOM = document.querySelector("#expensesList");
const expensesValueDOM = document.querySelector("#expensesValue");

let state = { nextIncomeId: 0, nextExpenseId: 0, incomes: [], expenses: [] };

// ++++++++++ INCOMES ++++++++++

const renderIncome = () => {
  renderIncomeUI();
  renderIncomeSumUI();
  renderBudget();
};

const renderIncomeUI = () => {
  // reset currently rendered incomings
  incomesListDOM.innerHTML = "";

  // create new incomings
  state.incomes.forEach((item) => {
    var liInnerHTML = null;

    if (item.isEditable) {
      liInnerHTML = `
        <div class="item">
          <span data-id="${item.id}" contenteditable>${item.name}</span> - <span data-id="${item.id}" contenteditable>${item.amount}</span> PLN   
        </div>
        <div class="budget__list__item__buttons__wrapper">
        <button id="incomeConfirm" class="budget__list__item__button budget__list__item__button--edit" data-id="${item.id}">Yes</button> 
        <button id="incomeEditCancel" class="budget__list__item__button budget__list__item__button--delete" data-id="${item.id}">No</button>
        </div>
      `;
    } else {
      liInnerHTML = `
      ${item.name} - ${item.amount} PLN
        <div class="budget__list__item__buttons__wrapper">
        <button id="incomeEdit" class="budget__list__item__button budget__list__item__button--edit" data-id="${item.id}">Edit</button> 
        <button id="incomeRemove" class="budget__list__item__button budget__list__item__button--delete" data-id="${item.id}">Delete</button>
        </div>
      `;
    }
    let newLi = document.createElement("li");
    newLi.dataset.name = item.name;
    newLi.innerHTML = liInnerHTML;
    newLi.classList.add("flex", "flex--space-between", "budget__list__item");
    incomesListDOM.append(newLi);
  });

  let incomeEdit = document.querySelectorAll("#incomeEdit");
  incomeEdit.forEach((i) =>
    i.addEventListener("click", toggleIncomeItemEditable)
  );

  let incomeConfirm = document.querySelectorAll("#incomeConfirm");
  incomeConfirm.forEach((i) => {
    i.addEventListener("click", confirmIncomeEditItem);
  });

  let incomeEditCancel = document.querySelectorAll("#incomeEditCancel");
  incomeEditCancel.forEach((i) => {
    i.addEventListener("click", toggleIncomeItemEditable);
  });

  let incomeRemove = document.querySelectorAll("#incomeRemove");
  incomeRemove.forEach((i) => {
    i.addEventListener("click", removeIncomeItem);
  });
};

function renderIncomeSumUI() {
  incomesValueDOM.innerHTML = sum(state.incomes);
}

function sum(arr) {
  return arr.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);
}

incomeSubmitDOM.addEventListener("click", addNewIncomeItem);

function addNewIncomeItem(e) {
  e.preventDefault();

  var newItem = {
    id: state.nextIncomeId,
    name: incomeTitleDOM.value,
    amount: Number(incomeValueDOM.value),
  };
  if (incomeTitleDOM.value === "" || incomeValueDOM.value === "") {
    incomeMsgDOM.innerHTML = "Name or value missing";
  } else {
    state.incomes.push(newItem); //update of data
    incomeMsgDOM.innerHTML = "";
  }

  renderIncome();
  resetNewForm(incomeTitleDOM, incomeValueDOM);
  state.nextIncomeId = state.nextIncomeId + 1;
}

// MAKE AN ITEM EDITABLE OR NOT-EDITABLE
// (switch/toggle isEditable property)
function toggleIncomeItemEditable(e) {
  var id = Number(e.target.dataset.id); //number
  state.incomes = state.incomes.map((i) =>
    i.id === id ? { ...i, isEditable: !i.isEditable } : i
  );

  renderIncome();
}

// CONFIRM EDITING AN ITEM
function confirmIncomeEditItem(e) {
  var id = Number(e.target.dataset.id);
  var spans = document.querySelectorAll(`div.item span[data-id="${id}"]`); //array of <span>
  var newName = spans[0].innerText; //string
  var newAmount = Number(spans[1].innerText); //number
  state.incomes = state.incomes.map((i) =>
    i.id === id
      ? { ...i, name: newName, amount: newAmount, isEditable: false }
      : i
  ); //new array (replaces old incomings array)

  renderIncome();
}

// REMOVE AN ITEM
function removeIncomeItem(e) {
  e.preventDefault();

  const idToRemove = Number(e.target.dataset.id);
  state.incomes = state.incomes.filter((i) => i.id !== idToRemove);

  renderIncome();
}

// ++++++++++ EXPENSES ++++++++++

const renderExpense = () => {
  renderExpenseUI();
  renderExpenseSumUI();
  renderBudget();
};

const renderExpenseUI = () => {
  // reset currently rendered expenses
  expensesListDOM.innerHTML = "";

  // create new expenses
  state.expenses.forEach((item) => {
    var liInnerHTML = null;

    if (item.isEditable) {
      liInnerHTML = `
        <div class="item">
          <span data-id="${item.id}" contenteditable>${item.name}</span> - <span data-id="${item.id}" contenteditable>${item.amount}</span> PLN   
        </div>
        <div class="budget__list__item__buttons__wrapper">
        <button id="expenseConfirm" class="budget__list__item__button budget__list__item__button--edit" data-id="${item.id}">Yes</button> 
        <button id="expenseEditCancel" class="budget__list__item__button budget__list__item__button--delete" data-id="${item.id}">No</button>
        </div>
      `;
    } else {
      liInnerHTML = `
      ${item.name} - ${item.amount} PLN
        <div class="budget__list__item__buttons__wrapper">
        <button id="expenseEdit" class="budget__list__item__button budget__list__item__button--edit" data-id="${item.id}">Edit</button> 
        <button id="expenseRemove" class="budget__list__item__button budget__list__item__button--delete" data-id="${item.id}">Delete</button>
        </div>
      `;
    }
    let newLi = document.createElement("li");
    newLi.dataset.name = item.name;
    newLi.innerHTML = liInnerHTML;
    newLi.classList.add("flex", "flex--space-between", "budget__list__item");
    expensesListDOM.append(newLi);
  });

  let expenseEdit = document.querySelectorAll("#expenseEdit");
  expenseEdit.forEach((i) =>
    i.addEventListener("click", toggleExpenseItemEditable)
  );

  let expenseConfirm = document.querySelectorAll("#expenseConfirm");
  expenseConfirm.forEach((i) => {
    i.addEventListener("click", confirmExpenseEditItem);
  });

  let expenseEditCancel = document.querySelectorAll("#expenseEditCancel");
  expenseEditCancel.forEach((i) => {
    i.addEventListener("click", toggleExpenseItemEditable);
  });

  let expenseRemove = document.querySelectorAll("#expenseRemove");
  expenseRemove.forEach((i) => {
    i.addEventListener("click", removeExpenseItem);
  });
};

function renderExpenseSumUI() {
  expensesValueDOM.innerHTML = sum(state.expenses);
}

expenseSubmitDOM.addEventListener("click", addNewExpenseItem);

function addNewExpenseItem(e) {
  e.preventDefault();

  var newItem = {
    id: state.nextExpenseId,
    name: expenseTitleDOM.value,
    amount: Number(expenseValueDOM.value),
  };

  if (expenseTitleDOM.value === "" || expenseValueDOM.value === "") {
    expenseMsgDOM.innerHTML = "Name or value missing";
  } else {
    state.expenses.push(newItem); //update of data
    expenseMsgDOM.innerHTML = "";
  }

  renderExpense();
  resetNewForm(expenseTitleDOM, expenseValueDOM);
  state.nextExpenseId = state.nextExpenseId + 1;
}

// MAKE AN ITEM EDITABLE OR NOT-EDITABLE
// (switch/toggle isEditable property)
function toggleExpenseItemEditable(e) {
  var id = Number(e.target.dataset.id); //number
  state.expenses = state.expenses.map((i) =>
    i.id === id ? { ...i, isEditable: !i.isEditable } : i
  );

  renderExpense();
}

// CONFIRM EDITING AN ITEM
function confirmExpenseEditItem(e) {
  var id = Number(e.target.dataset.id);
  var spans = document.querySelectorAll(`div.item span[data-id="${id}"]`); //array of <span>
  var newName = spans[0].innerText; //string
  var newAmount = Number(spans[1].innerText); //number
  state.expenses = state.expenses.map((i) =>
    i.id === id
      ? { ...i, name: newName, amount: newAmount, isEditable: false }
      : i
  ); //new array (replaces old expenses array)

  renderExpense();
}

// REMOVE AN ITEM
function removeExpenseItem(e) {
  e.preventDefault();

  const idToRemove = Number(e.target.dataset.id);
  state.expenses = state.expenses.filter((i) => i.id !== idToRemove);

  renderExpense();
}

// RESET FORM
function resetNewForm(name, amount) {
  name.value = "";
  amount.value = "";
}

// UPDATE BUDGET
function renderBudget() {
  let incomeSum = sum(state.incomes);
  let expenseSum = sum(state.expenses);
  let budgetSum = incomeSum - expenseSum;
  if (budgetSum > 0) {
    return (budgetValueDOM.innerHTML = `You can still spend ${budgetSum}`);
  } else if (budgetSum < 0) {
    return (budgetValueDOM.innerHTML = `Your balance is negative. You are missing ${budgetSum}`);
  } else {
    budgetValueDOM.innerHTML = `Your balance is ${budgetSum}`;
  }
}

renderIncome();
renderExpense();
