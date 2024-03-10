const total_balance = document.getElementById("total-balance")
const total_income = document.getElementById("total-income")
const total_expense = document.getElementById("total-expense")
const filter_type = document.getElementById("filter-type")
const filter_currency = document.getElementById("filter-currency")
const amount_to = document.getElementById("amount-to")
const amount_from = document.getElementById("amount-from")
const add_btn = document.getElementById("add_btn")
const add_type = document.getElementById("add-type")
const add_currency = document.getElementById("add-currency")
const add_amount = document.getElementById("add-amount")
const add_input = document.getElementById("add-input")
const transactions = document.getElementById("transactions")
const input_handler = document.getElementById("input_handler")

let currencies;
let total_income_update = 0
let total_expense_update = 0
let total_balance_update = 0

const result_currencies = fetch("https://rich-erin-angler-hem.cyclic.app/students/available");

const getCurrencies = async () => {
  try {
    const response = await result_currencies;
    const data = await response.json()
    currencies = data
    console.log(currencies)
  } catch (error) {
    console.error("Failed to fetch currencies:", error)
  }
};

getCurrencies();

const convertCurrencies = async (cur, amount) => {
  const response = fetch("https://ivory-ostrich-yoke.cyclic.app/students/convert", {
    method: "POST",
    from: cur,
    to: "USD",
    amount: amount
  })
  const data = await response.json()

  return data
}

const createElement = (type, classes, value) => {
  const element = document.createElement(type)

  for (let i = 0; i < classes.length; i++) {
    element.classList.add(classes[i])
  }
  if (value) {
    element.innerText = value
  }
  return element
}

const updateTotalBalance = (type_ele, amount, currency) => {
  let new_amount
  if (currency.innerText !== "USD") {
    new_amount = convertCurrencies = (currency.innerText, amount.innerText)
  } else {
    new_amount = amount.innerText
  }
  if (type_ele === "expense") {
    total_expense_update += new_amount
    total_balance_update -= new_amount
  } else {
    total_income_update += new_amount
    total_balance_update += new_amount
  }
  total_expense.innerText = total_expense_update
  total_income.innerText = total_income_update
  total_balance.innerText = total_balance_update

}


const createTransaction = (type, amount, currency, info) => {
  if (!amount || !info) {
    input_handler.classList.remove("hidden")
    return
  }
  input_handler.classList.add("hidden")
  const outer_div = createElement("div", ["flex", "align-center", "dark-grey-background", "padding-7-15", "radius-10", "space-between", "transaction"], null)
  const info_div = createElement("div", ["flex", "gap-10", "transaction-info", "white"], null)
  const edit_delete_div = createElement("div", ["flex", "wrap", "gap-10", "edit-delete"], null)
  const amount_currency_div = createElement("div", [], null)
  const type_ele = createElement("i", ["fa-solid", `${type === "expense" ? "fa-arrow-down" : "fa-arrow-up"}`], null)
  const amount_ele = createElement("span", ["amount"], `${type === "expense" ? `- ${amount}` : `+ ${amount}`}`)
  const currency_ele = createElement("span", ["currency"], currency)
  const description = createElement("span", ["info"], info)
  const edit_ele = createElement("button", ["bg-primary-color", "padding-7-15", "radius-10", "no-bor", "no-outln", "white", "edit"], "Edit")
  const delele_ele = createElement("button", ["bg-color-red", "padding-7-15", "radius-10", "no-bor", "no-outln", "white", "delete"], "Delete")


  amount_currency_div.appendChild(amount_ele)
  amount_currency_div.appendChild(currency_ele)
  edit_delete_div.appendChild(edit_ele)
  edit_delete_div.appendChild(delele_ele)
  info_div.appendChild(type_ele)
  info_div.appendChild(amount_currency_div)
  info_div.appendChild(description)
  outer_div.appendChild(info_div)
  outer_div.appendChild(edit_delete_div)

  return outer_div
}

const addTransaction = (transaction) => {
  if (transaction) {
    transactions.appendChild(transaction)
    saveTransactions()
    add_amount.value = ""
    add_input.value = ""
  }
}

const deleteElement = (element) => {
  if (element.target.tagName === "BUTTON") {
    if (element.target.innerText === "Delete") {
      element.target.parentElement.parentElement.remove()
      saveTransactions()
    }
  }
}

filter_type.addEventListener("change", (element) => {
  console.log(element.target.value);
})

transactions.addEventListener("click", (element) => {
  deleteElement(element)
})

add_btn.addEventListener("click", () => {
  addTransaction(createTransaction(add_type.value, add_amount.value, add_currency.value, add_input.value))
})

function saveTransactions() {
  localStorage.setItem("transactions", transactions.innerHTML)
}

function loadTransactions() {
  transactions.innerHTML = localStorage.getItem("transactions")
}

loadTransactions()