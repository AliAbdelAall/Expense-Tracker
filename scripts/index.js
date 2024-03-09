const currencies = fetch("https://ivory-ostrich-yoke.cyclic.app/students/available")

currencies.then(response => response.json())
  .then(data => console.log(data))