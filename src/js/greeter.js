import createHTMLElement from './service';

// Creating element.
function createElement(name) {
  const element = createHTMLElement(`<h1><span>Hello ${name}<span></h1>`);
  // console.log(element);

  element.querySelector('span').addEventListener('click', () => {
    // console.log('Hello');
  });

  return element;
}

// console.log(createElement());

// JavaScript
// document.querySelector('body').appendChild(createElement('Ocean'));

// JQuery
// $('body').append(createElement('Life'));
