import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';

const textField = document.querySelector('input#search-box');
const DEBOUNCE_DELAY = 300;
// Notify.failure('');
// Notify.info('');

textField.addEventListener(
  'input',
  debounce(() => {
      
  }, DEBOUNCE_DELAY),
);
