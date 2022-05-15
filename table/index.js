document.addEventListener('DOMContentLoaded', () => {

  const countries = [
    {
      n: 1,
      country: "Германия",
      capital: "Берлин",
      population: 83149300,
      square: 357409,
      language: "немецкий"
    },
    {
      n: 2,
      country: "Греция",
      capital: "Афины",
      population: 10800000,
      square: 131957,
      language: "греческий"
    },
    {
      n: 3,
      country: "Бельгия",
      capital: "Брюссель",
      population: 11414214,
      square: 30528,
      language: "французский, нидерландский, немецкий"
    },
    {
      n: 4,
      country: "Польша",
      capital: "Варшава",
      population: 37881262,
      square: 312679,
      language: "польский"
    },
    {
      n: 5,
      country: "Албания",
      capital: "Тирана",
      population: 2829741,
      square: 28748,
      language: "албанский"
    },
    {
      n: 6,
      country: "Швейцария",
      capital: "- (де-юре), Берн (де-факто)",
      population: 8500000,
      square: 41285,
      language: "немецкий, итальянский, французский, романшский"
    },
    {
      n: 7,
      country: "Австрия",
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

  let tableHeadRow = createEl('tr', 'tr', thead, '');
  let tableFields = [
    'N',
    'Страна',
    'Столица',
    'Численность населения, чел.',
    'Площадь территории, км2',
    'Официальный язык'
  ]

  tableFields.forEach(el => {
    createEl('th', 'th', tableHeadRow, el);
  });

  let cols = document.querySelectorAll('.th');
  createTableContent(countries.length, cols.length, tbody);
  sortColumn();
  editCell();

  function sortColumn() {
    // получаем массив с названиями полей для сортировки
    let arrKeys = Object.keys(countries[0]);
    // вешаем слушателя на событие клика по полю заголовка таблицы
    document.querySelector('.tr').addEventListener('click', function sortByField(el) {
      let field = arrKeys[tableFields.indexOf(el.target.textContent)];

      countries.sort(function(a, b) {
        return typeof field === 'number' ?
        parseFloat(a[field]) - parseFloat(b[field]) :
        a[field] > b[field] ? 1 : -1;
      });

      // заменяем содержимое таблицы
      tbody.innerHTML = '';
      createTableContent(countries.length, cols.length, tbody);
      // добавляем возможность редактирования
      editCell();
    });
  }

  function editCell() {
    let tds = document.querySelectorAll('td');
    tds.forEach(td => {
      td.addEventListener('click', function editField(el) {
        td.contentEditable = "true";
        // получаем № страны из первой колонки таблицы
        let theRowN = +el.target.parentElement.firstChild.textContent;
        // получаем название изменяемого поля/ячейки
        let field = el.target.className;

        let count = 0;
        countries.forEach((theCountry) => {
          console.log(theCountry.n === theRowN);
          if(theCountry.n === theRowN) {
            countries[count][field] = (typeof theCountry[field] === 'number') ?
            +el.target.textContent :
            el.target.textContent;
          }
          count++;
        });
        td.onblur = function() {
          this.click();
          this.contentEditable = 'false';
        }
      })
    });
  };

  function createTableContent(tableRows, tableCols, tBody) {
    for (let i = 0; i < tableRows; i++) {
      let tableRow = tBody.insertRow(-1);

      for(let el in countries[i]) {
        let tableCell = tableRow.insertCell(-1);
        tableCell.innerHTML = countries[i][el];
        tableCell.className = el;
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
