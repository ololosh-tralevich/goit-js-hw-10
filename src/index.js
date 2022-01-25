import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const textField = document.querySelector('input#search-box');
const countryList = document.querySelector('ul.country-list');
const countryBlock = document.querySelector('div.country-info');
const DEBOUNCE_DELAY = 300;
// Notify.failure('');
// Notify.info('');

// console.log(countryList)

textField.addEventListener(
  'input',
  debounce(() => {
    let countryName = textField.value;
    console.log(textField.value);

    fetchCountries(countryName)
      .then(data => {
        if (data.length >= 10) {
          Notify.info('Too many matches found. Please enter a more specific name.');
          return;
        } else if (data.length >= 2) {
          for (let country of data) {
            console.log(country);
            countryList.insertAdjacentHTML('beforeend',
              `<li>
              <img src="${country.flags.svg}" width="40px"></img>
              <p>${country.name.common}</p>
            </li>`,
            );
          }
          return;
        }
      })
      .catch(err => {
        // Notify.failure('Oops, there is no country with that name.');
        console.log(err);
      });
  }, DEBOUNCE_DELAY),
);
