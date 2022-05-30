const baseLink = 'https://api.publicapis.org/';

let entries = 'entries';
let categories = 'categories';

function getInfo(url, sbj) {
  fetch(`${url}${sbj}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data[sbj].forEach(element => {
      let row = `<a href="${url}${sbj}/${element}">${element}</a>`;
      document.getElementById(`${sbj}`).insertAdjacentHTML('beforeend', row);
    });
  })
  .catch((error) => {
    handleError(error);
  })
}

function getInfo1(url, sbj) {
  fetch(`${url}${sbj}`)
  .then(errorHandler)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data[sbj].forEach(element => {
      let row = `<a href="${element.Link}">${element.API}</a>`;
      document.getElementById(`${sbj}`).insertAdjacentHTML('beforeend', row);
    });
  })
  .catch((error) => {
    handleError(error);
  })
}

getInfo(baseLink, categories);
getInfo1(baseLink, entries);

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

function errorHandler(response) {

  if (!response.ok) {
    console.log('response');
      if (response.status === '401' || response.status === '404')
          console.log(`Sorry, but there is ${response.status} error: ${response.statusText}`);
      throw Error(response.statusText);
  }
  return response;
}

function showTitle() {
  document.getElementById("entries").classList.toggle("show");
}

function showCategory() {
  document.getElementById("categories").classList.toggle("show");
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
