const total_balance = document.getElementById("total-balance")
const total_income = document.getElementById("total-income")
const total_expence = document.getElementById("total-expense")
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

const createTransaction = (type, amount, currency, info) => {
  if (!amount || !info) {
    input_handler.classList.remove("hidden")
    return
  }
  input_handler.classList.remove("hidden")
  const outer_div = createElement("div", ["flex", "align-center", "dark-grey-background", "padding-7-15", "radius-10", "space-between", "transaction"], null)
  const info_div = createElement("div", ["flex", "gap-10", "transaction-info"], null)
  const edit_delete_div = createElement("div", ["flex", "gap-10", "wrap", "edit-delete"], null)
  const amount_currency_div = createElement("div", [], null)
  const type_ele = createElement("i", ["fa-solid", `${type === "expense" ? "fa-arrow-down" : "fa-arrow-up"}`], null)
  const amount_ele = createElement("span", ["amount"], amount)
  const currency_ele = createElement("span", ["currency"], currency)
  const description = createElement("span", ["currency"], info)
  const edit_ele = createElement("div", ["bg-primary-color", "padding-7-15", "radius-10", "no-bor", "no-outln", "white", "edit"], "Edit")
  const delele_ele = createElement("div", ["bg-color-red", "padding-7-15", "radius-10", "no-bor", "no-outln", "white", "delete"], "Delete")

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





/* <div class="flex align-center dark-grey-background padding-7-15 radius-10 space-between transaction">
  <div class="flex gap-10 wrap transaction-info white" >
    <span class="type">Expense</span>
    <div>
      <span class="amount">50</span>
      <span class="currency">USD</span>
    </div>
    <span class="description">Groceries</span>
  </div>
  <div class="flex wrap gap-10 edit-delete">
    <button class="bg-primary-color white padding-7-15 radius-10 no-bor no-outln edit">Edit</button>
    <button class="bg-color-red white padding-7-15 radius-10 no-bor no-outln delete">Delete</button>
  </div>
</div> */


const currencies = fetch("https://crowded-cyan-wildebeest.cyclic.app/students/available")

currencies.then(response => response.json())
  .then(data => console.log(data))
  .catch(reject => console.log(reject))
