
const currencies = fetch("https://crowded-cyan-wildebeest.cyclic.app/students/available")

currencies.then(response => response.json())
  .then(data => console.log(data))
  .catch(reject => console.log(reject))
