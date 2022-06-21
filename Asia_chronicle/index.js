const baseLink = 'https://api.publicapis.org/';

let entries = 'entries';
let categories = 'categories';

let titlesFirstLetters = new Set();
let dataEntries = [];
let dataCategories = [];

function getDataCategory() {
  fetch(`${baseLink}${categories}`)
  .then((response) => {
    if (response.status !== 200) {
      return Promise.reject(new Error(response.statusText))
    }
    return Promise.resolve(response)
  })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    dataCategories = data[categories];
    dataCategories.forEach(element => {
        row = `<p class="category">${element}</p>`;
        document.getElementById(categories).insertAdjacentHTML('beforeend', row);
    });
    let category = document.getElementsByClassName('category');
    if (category) {
      Array.prototype.forEach.call(category, el => {
        el.addEventListener('click', showCategoryInfo)
      });
    }
  })
  .catch((error) => {
    console.error(`Fetch problem: ${error.message}`)
  })
}

function getDataTitle() {
  fetch(`${baseLink}${entries}`)
  .then((response) => {
    if (response.status !== 200) {
      return Promise.reject(new Error(response.statusText))
    }
    return Promise.resolve(response)
  })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    dataEntries = data[entries];
    // get titlesFirstLetters unique collection
    dataEntries.forEach(element => {
        titlesFirstLetters.add((element.API).slice(0, 1));
    });
    // transform to array and sort letters collection
    const sortedTitlesFirstLetters = Array.from(titlesFirstLetters).sort();
    // insert rows with letters in dropdown menu
    sortedTitlesFirstLetters.forEach(letter => {
      row = `<p class="api-title">${letter}</p>`;
      document.getElementById('entries').insertAdjacentHTML('beforeend', row);
    })
  
    let apiTitle = document.getElementsByClassName('api-title');
    if (apiTitle) {
      Array.prototype.forEach.call(apiTitle, el => {
        el.addEventListener('click', showApiInfo)
      });
    }
  })
  .catch((error) => {
    console.error(`Fetch problem: ${error.message}`)
  })
}

getDataCategory();
getDataTitle();

function showCategoryInfo() {
  let oldRequest = document.querySelector('.request-info');
  if (oldRequest) {
    oldRequest.textContent = this.textContent;
    Array.prototype.forEach.call(document.querySelectorAll('.api-name'), el => el.remove());
  } else {
    let result = document.createElement('p');
    result.className = 'request-info';
    result.textContent = this.textContent;
    document.querySelector('script').insertAdjacentElement('beforebegin', result);
  }
  getCategoryInfo(baseLink, entries);
}

function showApiInfo() {
  console.log(1);
  // let oldRequest = document.querySelector('.request-title');
  // if (oldRequest) {
  //   oldRequest.textContent = this.textContent;
  //   Array.prototype.forEach.call(document.querySelectorAll('.api-name'), el => el.remove());
  // // } else {
  //   let result = document.createElement('p');
  //   result.className = 'request-title';
  //   result.textContent = this.textContent;
  //   document.querySelector('script').insertAdjacentElement('beforebegin', result);
  // }
}

function getCategoryInfo(url, service) {
  fetch(`${url}${service}`)
  .then((response) => {
    if (response.status !== 200) {
      return Promise.reject(new Error(response.statusText))
    }
    return Promise.resolve(response)
  })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data[service].forEach(element => {
      console.log(element.Category, document.querySelector('.request-info').textContent);
      if (element.Category === document.querySelector('.request-info').textContent) {
        let chosen = document.createElement('span');
        chosen.className = 'api-name';
        chosen.textContent = ` (${element.Description})`;
        chosen.insertAdjacentHTML("afterbegin", `<a href=${element.Link}>${element.API}</a>`);
        document.querySelector('script').insertAdjacentElement('beforebegin', chosen);
      }
    });
  })
  .catch((error) => {
    console.error(`Fetch problem: ${error.message}`)
  })
}

function show(inner) {
  document.getElementById(`${inner}`).classList.toggle('show');
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    let dropdowns = document.getElementsByClassName('dropdown-content');
    for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
