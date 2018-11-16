import createHTMLElement from './service';
import { DataService } from './data.service';
import { Product } from './product.model';

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

(async function loadData() {
  const products = await getCartProducts();

  // Creating cart header
  createHeader(products.length);

  products.forEach((e) => {
    // console.log(e);
    // Creating product
    createProduct(e);
  });

  createCheckout(products);
}());

async function getCartProducts() {
  const productArray = [];
  const dataService = new DataService();
  const products = await dataService.getCartProducts();
  products.forEach((e) => {
    // console.log(e);
    const prod = new Product(e.id, e.productId, e.productName, e.productDetails,
      e.imageURL, e.brand, e.color, e.price, e.quantity, e.size);
    // console.log(prod);
    productArray.push(prod);
  });

  return productArray;
}

function createHeader(size) {
  const headerRef = document.getElementById('cart-header');
  headerRef.appendChild(createHTMLElement(`<div class="col-lg-8 col-md-8 col-sm-8 col-8">${size} ITEMS</div>`));
  headerRef.appendChild(createHTMLElement('<div class="col-lg-2 col-md-2 col-sm-2 col-2">SIZE</div>'));
  headerRef.appendChild(createHTMLElement('<div class="col-lg-1 col-md-1 col-sm-1 col-1">QTY</div>'));
  headerRef.appendChild(createHTMLElement('<div class="col-lg-1 col-md-1 col-sm-1 col-1">PRICE</div>'));
}
function createProduct(prod) {
  const cartProductRef = document.getElementById('cart-products');
  const productElement = createHTMLElement(
    `<div class="row" id="${prod.id}">
  <div class="col-lg-8 col-md-8 col-sm-8 col-8">
      <div class="row">
          <div class="col-lg-11 col-md-11 col-sm-11 col-11">
              <div class="row">
                  <div class="col-lg-4 col-md-4 col-sm-4 col-4">
                      <img class="img-fluid" alt="t-shirt" id="image_${prod.id}" src="${prod.imageURL}">
                  </div>
                  <div class="col-lg-8 col-md-8 col-sm-8 col-8">
                      <div class="row h-100">
                          <div class="col-lg-12 col-md-12 col-sm-12 col-12 p-0">
                              <div style="font-size: 1rem; font-weight: bold" id="name_${prod.id}">${prod.productName}</div>
                              <div style="font-size: .7rem">Style #: ${prod.productId}</div>
                              <div style="font-size: .7rem">Color: ${prod.color}</div>
                          </div>
                          <div style="font-size: .7rem" class="col-lg-12 col-md-12 col-sm-12 col-12">  
                              <div class="row h-100 align-items-end">
                                  <span class="mb-1">
                                      <a href="#" data-toggle="modal" data-target=".bd-example-modal-lg" id="edit_${prod.id}">EDIT</a> | 
                                      <a href="#" id="remove_${prod.id}">X REMOVE</a> | 
                                      <a href="#" id="save_for_later_${prod.id}">SAVE FOR LATER</a>
                                  </span>
                              </div>      
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
  <div class="col-lg-2 col-md-2 col-sm-2 col-2" id="size_${prod.id}">${prod.size}</div>
  <div class="col-lg-1 col-md-1 col-sm-1 col-1"><input type="text" value="1" class="quantity-input" readonly></div>
  <div class="col-lg-1 col-md-1 col-sm-1 col-1" id="price_${prod.id}">$${prod.price}</div>
  </div>`,
  );

  productElement.querySelector(`#edit_${prod.id}`).addEventListener('click', (event) => {
    const id = event.target.id.split('_')[1];

    const modalProductNameRef = document.getElementById('modal_product_name');
    const modalProductPriceRef = document.getElementById('modal_product_price');
    const modalProductImageRef = document.getElementById('modal_product_image');

    modalProductNameRef.innerHTML = document.getElementById(`name_${id}`).innerText;
    modalProductPriceRef.innerHTML = document.getElementById(`price_${id}`).innerText;
    modalProductImageRef.src = document.getElementById(`image_${id}`).src;
  });

  productElement.querySelector(`#remove_${prod.id}`).addEventListener('click', (event) => {
    const id = event.target.id.split('_')[1];
    const parentElementRef = document.getElementById('cart-products');
    const childElementRef = document.getElementById(id);
    parentElementRef.removeChild(childElementRef);
  });

  cartProductRef.appendChild(productElement);
  cartProductRef.appendChild(createHTMLElement('<hr>'));
}

function createCheckout(products) {
  let amount = 0;
  let promoCode;

  products.forEach((e) => {
    amount += e.price;
  });
  // console.log(amount);

  const checkoutRef = document.getElementById('checkout');
  checkoutRef.appendChild(createHTMLElement(
    `<div class="col-10 offset-2">
      <div class="row">
        <div class="col-10">SUBTOTAL</div>
        <div class="col-2 text-right">$${amount}.00</div>
      </div> <br>
      <div class="row">
        <div class="col-10">PROMOTION CODE <b>JF10</b> APPLIED</div>
        <div class="col-2 text-right">-$0.00</div>
      </div> <br>
      <div class="row">
        <div class="col-10">
            <span>ESTIMATED SHIPPING*</span><br>
            <span style="font-size: .7rem">You qualify for free shipping because your order is over $50*</span>
        </div>
        <div class="col-2 text-right">FREE</div>
      </div>
      <hr>
      <div class="row">
        <div class="col-10">
            <span>ESTIMATED TOTAL</span><br>
            <span style="font-size: .7rem">Tax will be applied during checkout</span>
        </div>
        <div class="col-2 text-right">$${amount}.00</div>
      </div>
      <hr style="border: none;height: 6px;color:rgba(0, 0, 0, 0.1);background-color:rgba(0, 0, 0, 0.1)">
      <div class="row">
        <div class="col-9 text-right">
            <a href="#">CONTINUE SHOPPING</a>
        </div>
        <div class="col-3 text-right">
            <button class="btn btn-primary">CHECKOUT</button>
        </div>
      </div><br>
      <div class="row">
        <div class="col-12 text-right">
            <span style="font-size: .7rem">Secure checkout. Shopping is always safe & secure</span>
        </div>
      </div>
    </div>
  `,
  ));
}
