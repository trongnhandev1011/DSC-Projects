// Get all of the required elements
const burger = document.querySelector(".burger-menu");
const burgerList = document.querySelector(".nav-list");
const cart = document.querySelector(".cart-menu");
const cartList = document.querySelector(".cart-list");
const buy = document.querySelectorAll(".card-buy");
const card = document.querySelector(".card-container");
var cartCount;
const cartContainer = document.querySelector(".cart");
// If 0 item was loaded for the current user, add an placeholder <li> saying "Add something to your cart"
function addEmpty() {
  var emptyText = document.createTextNode("Add something to your cart");
  var emptyList = document.createElement("li");
  emptyList.className = "empty-item";
  emptyList.appendChild(emptyText);
  cartList.appendChild(emptyList);
}
function removeEmpty(current) {
  current.classList.add("in-cart");
  current.innerHTML = "In cart";
  document.querySelector(".cart-item-count").innerHTML = cartCount;
}
function checkEmpty() {
  if (cartCount == 0) {
    addEmpty();
  }
}

var i = 0;
function setStorage(id, count, cartCount) {
  document.querySelector(".cart-item-count").innerHTML = cartCount;
  localStorage.setItem("totalCount", cartCount);
  localStorage.setItem(id, count);
}
function loadStorage(id) {
  return +localStorage.getItem(id);
}
function topDropDown() {
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

      if (i % 2 == 1) totalContainer.style.display = "none";
      else totalContainer.style.display = "block";
      i++;
    });
  }

  clickDropDown(burger, burgerList, cartList);
  clickDropDown(cart, cartList, burgerList);
}
function createContainer(className, id) {
  var container = document.createElement("div");
  container.className = className;
  container.id = id;
  return container;
}
function loadItems(file) {
  var items = file.querySelectorAll("Book");
  items.forEach(function (item) {
    // Create Card
    var empCard = createContainer("card", item.id);
    // Create Image
    var empImg = document.createElement("div");
    empImg.className = "card-img";
    empImg.style.backgroundImage =
      "url('../img/" + item.querySelector("ImageURI").innerHTML + "')";
    empCard.appendChild(empImg);
    // Create Card Body
    var empBody = document.createElement("div");
    empBody.className = "card-body";
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
    var empFooter = document.createElement("div");
    empFooter.className = "card-footer";
    // Get Price
    var priceContainer = document.createElement("div");
    var dollarIcon = document.createElement("span");
    var empPrice = document.createElement("span");
    empPrice.className = "price";
    dollarIcon.innerHTML = "$";
    dollarIcon.className = "dollar";
    empPrice.innerHTML = item.querySelector("Price").innerHTML;
    priceContainer.appendChild(dollarIcon);
    priceContainer.appendChild(empPrice);
    empFooter.appendChild(priceContainer);
    // Create Buy Button
    var empBtn = document.createElement("button");
    empBtn.className = "card-buy";
    empBtn.innerHTML = "Add to cart ";
    var empIcon = document.createElement("i");
    empIcon.className = "fas fa-cart-plus";
    empBtn.appendChild(empIcon);
    empBtn.addEventListener("click", addToCart);
    empBtn.addEventListener("click", Total);
    
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
  if (cartCount == 0 && document.querySelector(".empty-item")) {
    document.querySelector(".empty-item").remove();
  }
  // Set the item to be in cart and lock the add to cart button
  var buyBtn = this;
  removeEmpty(buyBtn);
  const card = buyBtn.parentNode.parentNode;
  // Create Item
  var cartItem = createContainer("cart-item", card.id);
  // Input for quantity
  var input = document.createElement("input");
  input.className = "quantity";
  input.type = "number";
  input.min = 0;
  input.name = "quantity";
  if (loadStorage(card.id) > 0) {
    // If loadStorage has a value larger > 0; load the value
    input.value = loadStorage(card.id);
  } else {
    // Set the counter to 1 and increase the cart by 1. update storage accordingly
    input.value = 1;
    cartCount++;
    setStorage(card.id, input.value, cartCount);
  }
  // Add the number of item
  // Image
  var cartImg = document.createElement("div");
  cartImg.className = "item-img";
  cartImg.style.backgroundImage =
    card.querySelector(".card-img").style.backgroundImage;
  cartItem.appendChild(cartImg);
  // Name & Price
  var itemName = document.createElement("h3");
  itemName.className = "item-name";
  itemName.innerHTML = card.querySelector("h3").innerHTML;
  var itemPrice = document.createElement("span");
  var itemPrice = document.createElement("span");
  itemPrice.className = "item-price";
  itemPrice.innerHTML = card.querySelector(".price").innerHTML;
  cartItem.appendChild(itemName);
  cartItem.appendChild(itemPrice);
  // Minus and Plus button
  var itemCount = document.createElement("div");
  itemCount.className = "item-count";
  var minusButton = document.createElement("button");
  minusButton.className = "minus";
  minusButton.addEventListener("click", function () {
    // Decrease the counter by 1
    this.parentNode.querySelector(".quantity").stepDown();
    subTotal.innerHTML = (input.value * itemPrice.innerHTML).toFixed(2);
    Total();
    // If cartCount is 0, stop reducing
    cartCount = cartCount ? --cartCount : 0;
    // Update the local storage
    setStorage(card.id, input.value, cartCount);
    // If the item has 0 item, remove it from the cart; add empty if necessary
    if (input.value == 0) {
      buyBtn.classList.remove("in-cart");
      buyBtn.innerHTML = 'Add to cart <i class="fas fa-cart-plus"></i>';
      cartList.removeChild(cartItem);
      checkEmpty();
    }
  });

  var plusButton = document.createElement("button");
  plusButton.className = "plus";
  plusButton.addEventListener("click", function () {
    // Increase the counter by 1
    this.parentNode.querySelector(".quantity").stepUp();
    cartCount++;
    subTotal.innerHTML = (input.value * itemPrice.innerHTML).toFixed(2);
    Total();
    // Update the local storage
    setStorage(card.id, input.value, cartCount);
  });
  itemCount.appendChild(minusButton);
  itemCount.appendChild(input);
  itemCount.appendChild(plusButton);
  cartItem.appendChild(itemCount);
  //
  var total = document.createElement("div");
  var subTotal = document.createElement("div");
  subTotal.className = "item-subtotal";
  subTotal.innerHTML = itemPrice.innerHTML;
  total.appendChild(subTotal);
  cartItem.appendChild(total);
  cartList.appendChild(cartItem);
}

var totalContainer = document.createElement("div");
totalContainer.className = "total-container";
var totalText = document.createElement("span");
var totalPrice = document.createElement("span");
totalText.innerHTML = "TOTAL: ";

Total = function () {
  var subTotalList = document.getElementsByClassName("item-subtotal");
  var Total = 0;
  for (let i = 0; i < subTotalList.length; i++) {
    Total += Number(subTotalList[i].innerHTML);
  }
  totalPrice.innerHTML = Total.toFixed(2);
};

// totalPrice.innerHTML =
totalContainer.appendChild(totalText);
totalContainer.appendChild(totalPrice);
cartList.appendChild(totalContainer);

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
  checkEmpty();
  loadFile();
  document.querySelector(".cart-item-count").innerHTML = cartCount;
  // After the window has loaded, call these functions
  topDropDown();
}
window.onload = start;
