document.addEventListener('DOMContentLoaded', (event) => {

  const countries = [
    {
      n: 1,
      name: "Германия",
      capital: "Берлин",
      population: 83149300,
      square: 357409,
      language: "немецкий"
    },
    {
      n: 2,
      name: "Греция",
      capital: "Афины",
      population: 10800000,
      square: 131957,
      language: "греческий"
    },
    {
      n: 3,
      name: "Бельгия",
      capital: "Брюссель",
      population: 11414214,
      square: 30528,
      language: "французский, нидерландский, немецкий"
    },
    {
      n: 4,
      name: "Польша",
      capital: "Варшава",
      population: 37881262,
      square: 312679,
      language: "польский"
    },
    {
      n: 5,
      name: "Албания",
      capital: "Тирана",
      population: 2829741,
      square: 28748,
      language: "албанский"
    },
    {
      n: 6,
      name: "Швейцария",
      capital: "- (де-юре), Берн (де-факто)",
      population: 8500000,
      square: 41285,
      language: "немецкий, итальянский, французский, романшский"
    },
    {
      n: 7,
      name: "Австрия",
      capital: "Вена",
      population: 8920000,
      square: 83879,
      language: "немецкий"
    },
  ];

  let body = document.querySelector('.body');
  let table = createEl('table', 'table', body, '');

  let thead = document.createElement('thead');
  let tbody = document.createElement('tbody');

  table.append(thead, tbody);

  let tableRow1 = createEl('tr', 'tr', thead, '');
  createEl('th', 'th', tableRow1, 'N');
  createEl('th', 'th', tableRow1, 'Страна');
  createEl('th', 'th', tableRow1, 'Столица');
  createEl('th', 'th', tableRow1, 'Численность населения, чел.');
  createEl('th', 'th', tableRow1, 'Площадь территории, км2');
  createEl('th', 'th', tableRow1, 'Официальный язык');

  let cols = document.querySelectorAll('.th');
  create_tableContent(countries.length, cols.length, tbody);

  function create_tableContent(tableRows, tableCols, tBody) {

    for (let i = 0; i < tableRows; i++) {
      let tableRow = tBody.insertRow(-1);

      for(let el in countries[i]) {
        let tableCell = tableRow.insertCell(-1);
        tableCell.innerHTML = countries[i][el];
      };
    }
  }

  function createEl(el, elClass, elParent, elContent) {
    const elem = document.createElement(el);
    elem.className = elClass;
    elem.innerHTML = elContent;
    elParent.append(elem);
    return elem;
  }

});
