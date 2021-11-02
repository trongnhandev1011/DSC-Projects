// Get all of the required elements
var cartCount;
const burger = document.querySelector(".burger-menu");
const burgerList = document.querySelector(".nav-list");
const cart = document.querySelector(".cart-menu");
const cartList = document.querySelector(".cart-list");
const buy = document.querySelectorAll(".card-buy");
const card = document.querySelector(".card-container");
const cartContainer = document.querySelector(".cart");
const card_sort = document.querySelector(".card-sort");
// If 0 item was loaded for the current user, add an placeholder <li> saying "Add something to your cart"
function addEmpty() {
  var emptyText = document.createTextNode("Add something to your cart");
  var emptyList = document.createElement("li");
  emptyList.className = "empty-item";
  emptyList.appendChild(emptyText);
  cartList.appendChild(emptyList);
}

function lockAddCart(current) {
  current.classList.add("in-cart");
  current.innerHTML = "In cart";

}

function setStorage(id, count, cartCount) {
  document.querySelector(".cart-item-count").innerHTML = cartCount;
  localStorage.setItem("totalCount", cartCount);
  localStorage.setItem(id, count);
}

function loadStorage(id) {
  return +localStorage.getItem(id);
}

function getTotal() {
  var total = 0;
  var totalPrice = document.querySelector(".total");
  var subTotalList = document.getElementsByClassName("item-subtotal");
  for (let i = 0; i < subTotalList.length; i++) {
    total += Number(subTotalList[i].innerHTML);
  }
  totalPrice.innerHTML = total.toFixed(2);
}

function updateSubTotal() {
  document.querySelectorAll(".cart-item").forEach(function (item) {
    item.querySelector(".item-subtotal").innerHTML = (
      item.querySelector(".quantity").value *
      item.querySelector(".item-price").innerHTML
    ).toFixed(2);
    getTotal();
  });
}

function updateStorage(subTotal, value, price, id) {
  // Update the subtotal
  subTotal.innerHTML = (value * price).toFixed(2);
  // Update Total
  getTotal();
  // Update the local storage
  setStorage(id, value, cartCount);
}

function clickDropDown(parent, list, otherList) {
  // Add a click event to the parent element; if clicked, call function()
  parent.addEventListener("click", function () {
    // Check if the list is open
    if (!list.classList.contains("open")) {
      // If not, open it, close the other list
      list.classList.add("open");
      otherList.classList.remove("open");
      // Show the overlay
      document.querySelector(".overlay").style.height = "99vh";
      document.querySelector(".overlay").style.opacity = "0.7";
    } else {
      // Else, close it
      list.classList.remove("open");
      // Remove the overlay
      document.querySelector(".overlay").style.height = "0";
      document.querySelector(".overlay").style.opacity = "0";
    }
  });
}

function createContainer(element, className, id = undefined) {
  var container = document.createElement(element);
  container.className = className;
  if (id) {
    container.id = id;
  }
  return container;
}

function loadItems(file) {
  var items = file.querySelectorAll("Book");
  items.forEach(function (item) {
    // Create Card
    var empCard = createContainer("div", "card", item.id);

    // Create Image
    var empImg = createContainer("div", "card-img");
    empImg.style.backgroundImage = "url('./img/" + item.querySelector("ImageURI").innerHTML + "')";
    empCard.appendChild(empImg);

    // Create Card Body
    var empBody = createContainer("div", "card-body");

    // Create Title
    var empTitle = document.createElement("h3");
    empTitle.innerHTML = item.querySelector("Title").innerHTML;
    empBody.appendChild(empTitle);

    // Create SubTitle
    var empSubTitle = document.createElement("div");
    empSubTitle.innerHTML = "By " + item.querySelector("Author").innerHTML;
    empBody.appendChild(empSubTitle);
    empCard.appendChild(empBody);

    // Create Card Footer
    var empFooter = createContainer("div", "card-footer");

    // Get Price
    var priceContainer = document.createElement("div");
    var empPrice = createContainer("span", "price");
    var dollarIcon = createContainer("span", "dollar");
    dollarIcon.innerHTML = "$ ";
    empPrice.innerHTML = item.querySelector("Price").innerHTML;
    priceContainer.appendChild(dollarIcon);
    priceContainer.appendChild(empPrice);
    empFooter.appendChild(priceContainer);

    // Create Buy Button
    var empBtn = createContainer("button", "card-buy");
    empBtn.className = "card-buy";
    empBtn.innerHTML = "Add to cart ";
    var empIcon = createContainer("i", "fas fa-cart-plus");
    empBtn.appendChild(empIcon);
    empBtn.addEventListener("click", addToCart);
    empBtn.addEventListener("click", getTotal);
    empFooter.appendChild(empBtn);
    empCard.appendChild(empFooter);
    // Add card to container
    card.appendChild(empCard);

    // Load LocalStorage; if some items are loaded, invoke addToCart()
    if (loadStorage(item.id) > 0) {
      empBtn.click();
    }
  });
}

function addToCart() {
  // First item added should remove the empty placeholder
  if (cartCount == 0) {
    document.querySelector(".empty-item").remove();
  }
  // Set the item to be in cart and lock the add to cart button
  var buyBtn = this;
  // Lock the add to cart button
  lockAddCart(buyBtn);
  const card = buyBtn.parentNode.parentNode;
  // Create Item
  var cartItem = createContainer("div", "cart-item", card.id);

  // Input for quantity
  var input = createContainer("input", "quantity");
  input.type = "number";
  input.min = 0;
  input.name = "quantity";
  if (loadStorage(card.id) > 0) {
    // If loadStorage has a value larger > 0; load the value
    input.value = loadStorage(card.id);
    setStorage(card.id, input.value, cartCount);
  } else {
    // Set the counter to 1 and increase the cart by 1. update storage accordingly
    input.value = 1;
    cartCount++;
    setStorage(card.id, input.value, cartCount);
  }
  // Manually changing the input instead of using buttons
  input.addEventListener("change", function () {
    if (input.value != "") {
      cartCount = cartCount - loadStorage(card.id) + +input.value;
      setStorage(card.id, input.value, cartCount)
      updateStorage(subTotal, input.value, itemPrice.innerHTML, card.id);
      if (input.value == 0) {
        buyBtn.classList.remove("in-cart");
        buyBtn.innerHTML = 'Add to cart <i class="fas fa-cart-plus"></i>';
        cartList.removeChild(cartItem);
        if (cartCount == 0) {
          addEmpty();
        }
      }
    }
    else {
      input.value = loadStorage(card.id);
    }
  })

  // Add the number of item
  // Image
  var cartImg = createContainer("div", "item-img");
  cartImg.style.backgroundImage = card.querySelector(".card-img").style.backgroundImage;
  cartItem.appendChild(cartImg);

  // Name
  var itemName = createContainer("h3", "item-name");
  itemName.innerHTML = card.querySelector("h3").innerHTML;

  // Price
  var itemPrice = createContainer("span", "item-price");
  itemPrice.innerHTML = card.querySelector(".price").innerHTML;
  cartItem.appendChild(itemName);
  cartItem.appendChild(itemPrice);

  // Counter
  var itemCount = document.createElement("div");
  itemCount.className = "item-count";

  // Minus
  var minusButton = createContainer("button", "minus");
  minusButton.addEventListener("click", function () {
    // Decrease the counter by 1
    this.parentNode.querySelector(".quantity").stepDown();
    // If cartCount is 0, stop reducing
    cartCount = cartCount ? --cartCount : 0;
    // Update storage/subtotal/total
    updateStorage(subTotal, input.value, itemPrice.innerHTML, card.id);
    // If the item has 0 item, remove it from the cart; add empty if necessary
    if (input.value == 0) {
      buyBtn.classList.remove("in-cart");
      buyBtn.innerHTML = 'Add to cart <i class="fas fa-cart-plus"></i>';
      cartList.removeChild(cartItem);
      if (cartCount == 0) {
        addEmpty();
      }
    }
  });

  // Plus
  var plusButton = createContainer("button", "plus");
  plusButton.addEventListener("click", function () {
    // Increase the counter by 1
    this.parentNode.querySelector(".quantity").stepUp();
    cartCount++;
    // Update storage/subtotal/total
    updateStorage(subTotal, input.value, itemPrice.innerHTML, card.id);
  });
  itemCount.appendChild(minusButton);
  itemCount.appendChild(input);
  itemCount.appendChild(plusButton);
  cartItem.appendChild(itemCount);

  // Item subtotal
  var total = document.createElement("div");
  var subTotal = createContainer("div", "item-subtotal");
  subTotal.innerHTML = itemPrice.innerHTML;
  total.appendChild(subTotal);
  cartItem.appendChild(total);
  cartList.appendChild(cartItem);
}

async function loadFile() {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      loadItems(xhttp.responseXML);
    }
  };
  xhttp.open("GET", "test.xml");
  xhttp.send();
}

function start() {
  // Check user localStorage for previous selected item; if undefined, create a new item; else load the item
  if (localStorage.getItem("totalCount") == undefined) {
    cartCount = 0;
    localStorage.setItem("totalCount", "0");
  } else {
    cartCount = +localStorage.getItem("totalCount");
  }
  if (cartCount == 0) {
    addEmpty();
  }
  // Load file from the server
  loadFile();

  // Call dropdown function
  clickDropDown(burger, burgerList, cartList);
  clickDropDown(cart, cartList, burgerList);

  // Every time cart is opened, update the subtotal and total
  cart.addEventListener("click", updateSubTotal);

  // Clicking the overlay will close menu
  document.querySelector('.overlay').addEventListener('click', function () {
    document.querySelector('.open').classList.remove('open');
    document.querySelector(".overlay").style.height = "0";
    document.querySelector(".overlay").style.opacity = "0";
  });
}
window.onload = start;
