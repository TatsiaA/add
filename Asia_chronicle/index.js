const baseLink = 'https://api.publicapis.org/';

let entries = 'entries';
let categories = 'categories';

function getInfo(url, sbj) {
  fetch(`${url}${sbj}`)
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
    data[sbj].forEach(element => {
      let row = !element.Link
        ? `<p class="category">${element}</p>`
        : `<a href="${element.Link}">${element.API}</a>`;
      document.getElementById(`${sbj}`).insertAdjacentHTML('beforeend', row);
    });
    let category = document.getElementsByClassName('category');
    if(category) {
      Array.prototype.forEach.call(category, el => {
        el.addEventListener('click', showCategoryInfo)
      });
    }
  })
  .catch((error) => {
    handleError(error);
  })
}

getInfo(baseLink, categories);
getInfo(baseLink, entries);

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

function getCategoryInfo(url, sbj) {
  fetch(`${url}${sbj}`)
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
    data[sbj].forEach(element => {
      if (element.Category === document.querySelector('.request-info').textContent) {
        let chosen = document.createElement('span');
        chosen.className = 'api-name';
        chosen.textContent = '\n' + element.API + ' (' + element.Description + ')';
        document.querySelector('script').insertAdjacentElement('beforebegin', chosen);
      }
    });
  })
  .catch((error) => {
    handleError(error);
  })
}

function handleError(error) {
    if (error instanceof TypeError) {
      console.log('TypeError: ', error.message);
    } else if (error instanceof RangeError) {
      console.log('RangeError: ', error.message);
    } else if (error instanceof EvalError) {
      console.log('EvalError: ', error.message);
    } else if (error instanceof ReferenceError) {
      console.log('ReferenceError: ', error.message);
    } else {
      throw error.status;
    }
}

function show(inner) {
  document.getElementById(`${inner}`).classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    let dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
