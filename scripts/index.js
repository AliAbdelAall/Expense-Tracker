const total_balance = document.getElementById("total-balance")
const total_income = document.getElementById("total-income")
const total_expence = document.getElementById("total-expense")
const filter_type = document.getElementById("filter-type")
const filter_currency = document.getElementById("filter-currency")
const amount_to = document.getElementById("amount-to")
const amount_from = document.getElementById("amount-from")
const add_btn = document.getElementById("add-btn")
const add_type = document.getElementById("add-type")
const add_currency = document.getElementById("add-currency")
const add_amount = document.getElementById("add-amount")
const add_input = document.getElementById("add-input")
const transactions = document.getElementById("transactions")

// function createTransation(type, classes, value) {
//   const element1 = document.createElement(type)

//   for (const className of classes) {
//      element1.classList.add(className)
//   }

//   element1.innerText = value
// }

// function adTransaction() {
//   const div = createTransation("div", ["flex, background-black", "justify-content"], "50")
//   const p = createTransation("p", ["flex, background-black", "justify-content"], "50")

//   div.appendChild(p)

// }


const createElement = (type, classes, value) => {
  const element = document.createElement(type)

  for (let i = 0; i < classes.length; i++) {
    element.classList.add(classes[i])
  }
  if (value) {
    element.innerText = value
  }
}

const currencies = fetch("https://crowded-cyan-wildebeest.cyclic.app/students/available")

currencies.then(response => response.json())
  .then(data => console.log(data))
  .catch(reject => console.log(reject))
