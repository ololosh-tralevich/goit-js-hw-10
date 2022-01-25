import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const textField = document.querySelector('input#search-box');
const countryList = document.querySelector('ul.country-list');
const countryBlock = document.querySelector('div.country-info');
const DEBOUNCE_DELAY = 300;

function clearPage() {
  countryList.innerHTML = '';
  countryBlock.innerHTML = '';
}

function peaceOfSmallHtml(country) {
  const peaceOfSmallHtml = `<li>
<img src="${country.flags.svg}" width="40px"></img>
<h2>${country.name.common}</h2>
</li>`;
  return peaceOfSmallHtml;
}

function peaceOfBigHtml(data, countryLanguages) {
  const peaceOfBigHtml = `<div class="country-header">
<img src="${data[0].flags.svg}" height="35px"></img>
<h1>${data[0].name.common}</h1>
</div>
<ul>
  <li class="country-info-list">
    <h3>Capital:</h3>
    <p>${data[0].capital}</p>
  </li>
  <li class="country-info-list">
    <h3>Population:</h3>
    <p>${data[0].population}</p>
  </li>
  <li class="country-info-list">
    <h3>Languages:</h3>
    <p>${countryLanguages}</p>
  </li>
</ul>
`;
  return peaceOfBigHtml;
}

textField.addEventListener(
  'input',
  debounce(() => {
    let countryName = textField.value;
    if (!textField.value) {
      clearPage();
      return;
    }

    fetchCountries(countryName)
      .then(data => {
        clearPage();

        if (data.length >= 10) {
          Notify.info('Too many matches found. Please enter a more specific name.');
          return;
        } else if (data.length >= 2) {
          for (let country of data) {
            countryList.insertAdjacentHTML('beforeend', peaceOfSmallHtml(country));
          }
          return;
        }

        const countryLanguages = Object.values(data[0].languages).join(', ');
        countryBlock.insertAdjacentHTML('beforeend', peaceOfBigHtml(data, countryLanguages));
      })
      .catch(err => {
        Notify.failure('Oops, there is no country with that name.');
        countryList.innerHTML = '';

        console.log(err);
      });
  }, DEBOUNCE_DELAY),
);

console.log(peaceOfSmallHtml);
console.log(peaceOfBigHtml);
