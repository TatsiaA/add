const baseLink = 'https://api.publicapis.org/';

const entries = 'entries';
const categories = 'categories';

const titlesFirstLetters = new Set();
let dataEntries = [];
let dataCategories = [];

getDataCategory().then(() => workWithCategories(dataCategories));
getDataTitle().then(() => workWithTitles(dataEntries));

async function getDataCategory() {
    let response = await fetch(`${baseLink}${categories}`);
    if (response.status !== 200) {
        return Promise.reject(new Error(response.statusText))
    }
    let commits = await response.json();
    dataCategories = [...commits[categories]];
}

function workWithCategories(arr) {
    arr.forEach(element => {
        let row = `<p class="category">${element}</p>`;
        document.getElementById(categories).insertAdjacentHTML('beforeend', row);
    });
    let category = document.getElementsByClassName('category');
    if (category) {
        Array.prototype.forEach.call(category, el => {
            el.addEventListener('click', showCategoryInfo)
        });
    }
}

async function getDataTitle() {
    let response = await fetch(`${baseLink}${entries}`);
    if (response.status !== 200) {
        return Promise.reject(new Error(response.statusText))
    }
    let commits = await response.json();
    dataEntries = [...commits[entries]];
}

function workWithTitles(arr) {
    // get titlesFirstLetters unique collection
    arr.forEach(element => {
        titlesFirstLetters.add((element.API).slice(0, 1).toUpperCase());
    });
    // transform to array and sort letters collection
    const sortedTitlesFirstLetters = Array.from(titlesFirstLetters).sort();
    // insert rows with letters in dropdown menu
    sortedTitlesFirstLetters.forEach(letter => {
        let row = `<p class="api-title">${letter}</p>`;
        document.getElementById('entries').insertAdjacentHTML('beforeend', row);
    })
    // add listener to dropdown title
    let apiTitle = document.getElementsByClassName('api-title');
    if (apiTitle) {
        Array.prototype.forEach.call(apiTitle, el => {
            el.addEventListener('click', showApiInfo)
        });
    }
}

function showCategoryInfo() {
    // remove previous responses info
    if (document.querySelector('.request-title')) {
        document.querySelector('.request-title').remove();
        Array.prototype.forEach.call(document.querySelectorAll('.api-title-name'), el => el.remove());
    }

    if (document.querySelector('.request-info')) {
        document.querySelector('.request-info').textContent = this.textContent;
        Array.prototype.forEach.call(document.querySelectorAll('.api-name'), el => el.remove());
    } else {
        // create and render new response info title
        let result = document.createElement('p');
        result.className = 'request-info';
        result.textContent = `The list of APIs in category ${this.textContent}`;
        document.querySelector('script').insertAdjacentElement('beforebegin', result);
    }

    // create and render new response info items
    let chosenCategory = this.textContent;
    dataEntries.forEach(element => {
        if (element.Category === chosenCategory) {
            let chosen = document.createElement('p');
            chosen.className = 'api-name';
            chosen.textContent = ` (${element.Description})`;
            chosen.insertAdjacentHTML("afterbegin", `<a href=${element.Link}>${element.API}</a>`);
            document.querySelector('script').insertAdjacentElement('beforebegin', chosen);
        }
    })
}

function showApiInfo() {
    // remove previous responses info
    if (document.querySelector('.request-info')) {
        document.querySelector('.request-info').remove();
        Array.prototype.forEach.call(document.querySelectorAll('.api-name'), el => el.remove());
    }

    if (document.querySelector('.request-title')) {
        document.querySelector('.request-title').textContent = this.textContent;
        Array.prototype.forEach.call(document.querySelectorAll('.api-title-name'), el => el.remove());
    } else {
        // create and render new response info title
        let result = document.createElement('p');
        result.className = 'request-title';
        result.textContent = this.textContent;
        document.querySelector('script').insertAdjacentElement('beforebegin', result);
    }

    // create and render new response info items
    let chosenTitleLetter = this.textContent;
    dataEntries.forEach(entry => {
        if ((entry.API).slice(0, 1).toUpperCase() === chosenTitleLetter) {
            let chosenTitle = document.createElement('p');
            chosenTitle.className = 'api-title-name';
            chosenTitle.textContent = ` (${entry.Description})`;
            chosenTitle.insertAdjacentHTML("afterbegin", `<a href=${entry.Link}>${entry.API}</a>`);
            document.querySelector('script').insertAdjacentElement('beforebegin', chosenTitle);
        }
    })
}

// show the dropdown menu by click the button
function show(inner) {
    document.getElementById(`${inner}`).classList.toggle('show');
}

// Close the dropdown menu if the user clicks outside it
window.onclick = function (event) {
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
