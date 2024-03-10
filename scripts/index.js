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
let total_income_update = parseFloat(total_income.innerText)
let total_expense_update = parseFloat(total_expense.innerText)
let total_balance_update = parseFloat(total_balance.innerText)

const result_currencies = fetch("https://rich-erin-angler-hem.cyclic.app/students/available")

const getCurrencies = async () => {
  try {
    const response = await result_currencies;
    const data = await response.json()
    currencies = data
    console.log(currencies)
  } catch (error) {
    console.error("Failed to fetch currencies:", error)
  }
}

getCurrencies();

const convertCurrencies = async (cur, amount) => {
  try {
    const response = await fetch("https://ivory-ostrich-yoke.cyclic.app/students/convert", {
      method: "POST",
      body: JSON.stringify({
        from: cur,
        to: "USD",
        amount: amount
      })
    })
    const data = await response.json()
    return data.convertedAmount
  } catch (error) {
    console.error("Failed to convert currencies:", error)

  }
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

const updateTotalBalance = async (type, amount_ele, currency_ele) => {
  console.log(total_income_update, typeof (total_income_update))
  let new_amount = 0
  if (currency_ele.innerText !== "USD") {
    new_amount = await convertCurrencies(currency_ele.innerText, parseFloat(amount_ele.innerText))
  } else {
    new_amount = parseFloat(amount_ele.innerText)
    console.log(new_amount, type)
  }
  if (type === "expense") {
    total_expense.innerText = parseFloat(total_expense.innerText) + new_amount
    total_balance.innerText = parseFloat(total_balance.innerText) + new_amount
  } else {
    total_income.innerText = parseFloat(total_income.innerText) + new_amount
    total_balance.innerText = parseFloat(total_balance.innerText) + new_amount
  }

}


const createTransaction = (type, amount, currency, info) => {
  const transactionId = `transaction-${Date.now()}`
  const amountId = `amount-${Date.now()}`
  if (!amount || !info) {
    input_handler.classList.remove("hidden")
    return
  }
  input_handler.classList.add("hidden")
  const outer_div = createElement("div", ["flex", "align-center", "dark-grey-background", "padding-7-15", "radius-10", "space-between", "transaction"], null)
  outer_div.id = transactionId
  const info_div = createElement("div", ["flex", "gap-10", "transaction-info", "white"], null)
  const edit_delete_div = createElement("div", ["flex", "wrap", "gap-10", "edit-delete"], null)
  const amount_currency_div = createElement("div", [], null)
  const type_ele = createElement("i", ["fa-solid", `${type === "expense" ? "fa-arrow-down" : "fa-arrow-up"}`], null)
  const amount_ele = createElement("span", ["amount"], `${type === "expense" ? `${- amount}` : `${amount}`}`)
  amount_ele.id = amountId
  const currency_ele = createElement("span", ["currency"], currency)
  const description = createElement("span", ["info"], info)
  const edit_ele = createElement("button", ["bg-primary-color", "padding-7-15", "radius-10", "no-bor", "no-outln", "white", "edit"], "Edit")
  const delete_ele = createElement("button", ["bg-color-red", "padding-7-15", "radius-10", "no-bor", "no-outln", "white", "delete"], "Delete")

  updateTotalBalance(type, amount_ele, currency_ele)

  amount_currency_div.appendChild(amount_ele)
  amount_currency_div.appendChild(currency_ele)
  edit_delete_div.appendChild(edit_ele)
  edit_delete_div.appendChild(delete_ele)
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

const deleteTransaction = (transaction_id, amount_id) => {
  const transaction_div = document.getElementById(transaction_id)
  const amount_span = document.getElementById(amount_id)
  const amount = parseFloat(amount_span.innerText)
  console.log(amount)
  const type = amount < 0 ? "expense" : "income"

  if (type === "expense") {
    total_expense.innerText = parseFloat(total_expense.innerText) - amount
    total_balance.innerText = parseFloat(total_balance.innerText) - amount
  } else {
    total_income.innerText = parseFloat(total_income.innerText) - amount
    total_balance.innerText = parseFloat(total_balance.innerText) - amount
  }

  transaction_div.remove()
  saveTransactions()
};

filter_type.addEventListener("change", (element) => {
  console.log(element.target.value);
})

transactions.addEventListener("click", (element) => {
  const target = element.target
  if (element.target.classList.contains("delete")) {
    const transaction_id = target.closest(".transaction").id
    const amount_id = target.closest(".transaction").querySelector(".amount").id
    deleteTransaction(transaction_id, amount_id)
  }
})

add_btn.addEventListener("click", () => {
  addTransaction(createTransaction(add_type.value, add_amount.value, add_currency.value, add_input.value))
  console.log(add_currency.value, add_amount.value, add_type.value)
})

function saveTransactions() {
  localStorage.setItem("transactions", transactions.innerHTML)
}

function loadTransactions() {
  transactions.innerHTML = localStorage.getItem("transactions")
}

// loadTransactions()