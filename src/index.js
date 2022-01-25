import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const textField = document.querySelector('input#search-box');
const countryList = document.querySelector('ul.country-list');
const countryBlock = document.querySelector('div.country-info');
const DEBOUNCE_DELAY = 300;

textField.addEventListener(
  'input',
  debounce(() => {
    let countryName = textField.value;
    console.log(textField.value)
    if (!textField.value) {
      countryList.innerHTML = '';
      countryBlock.innerHTML = '';
      return;
    }

    fetchCountries(countryName)
    .then(data => {
        countryList.innerHTML = '';
        countryBlock.innerHTML = '';

        if (data.length >= 10) {
          Notify.info('Too many matches found. Please enter a more specific name.');
          return;
        } else if (data.length >= 2) {
          for (let country of data) {
            console.log(country);
            countryList.insertAdjacentHTML(
              'beforeend',
              `<li>
              <img src="${country.flags.svg}" width="40px"></img>
              <h2>${country.name.common}</h2>
            </li>`,
            );
          }
          return;
        }

        const countryLanguages = Object.values(data[0].languages).join(', ');
        countryBlock.insertAdjacentHTML(
          'beforeend',
          `<div class="country-header">
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
          `,
        );
      })
      .catch(err => {
        Notify.failure('Oops, there is no country with that name.');
        countryList.innerHTML = '';

        console.log(err);
      });
  }, DEBOUNCE_DELAY),
);
