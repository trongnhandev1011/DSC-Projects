// Get all of the required elements
const burger = document.querySelector(".burger-menu");
const burgerList = document.querySelector(".nav-list");
const cart = document.querySelector(".cart-menu");
const cartList = document.querySelector(".cart-list");
const buy = document.querySelectorAll(".card-buy");
const card = document.querySelector(".card-container");
// If 0 item was loaded for the current user, add an placeholder <li> saying "Add something to your cart"
function addEmptyList() {
  var emptyText = document.createTextNode("Add something to your cart");
  var emptyList = document.createElement("li");
  emptyList.className = "empty-item";
  emptyList.appendChild(emptyText);
  cartList.appendChild(emptyList);
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
    });
  }
  clickDropDown(burger, burgerList, cartList);
  clickDropDown(cart, cartList, burgerList);
}
function loadItems(file) {
  var items = file.querySelectorAll("Book");
  items.forEach(function (item) {
    // Create Card
    var empCard = document.createElement("div");
    empCard.className = "card";
    empCard.id = item.id;
    // Create Image
    var empImg = document.createElement("img");
    empImg.className = "card-img";
    empImg.setAttribute("srcset", "https://picsum.photos/300/300");
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
    var empPrice = document.createElement("div");
    empPrice.className = "price";
    empPrice.innerHTML = "$" + item.querySelector("Price").innerHTML;
    empFooter.appendChild(empPrice);
    // Create Buy Button
    var empBtn = document.createElement("button");
    empBtn.className = "card-buy";
    empBtn.innerHTML = "Add to cart ";
    var empIcon = document.createElement("i");
    empIcon.className = "fas fa-cart-plus";
    empBtn.appendChild(empIcon);
    empFooter.appendChild(empBtn);
    empCard.appendChild(empFooter);
    // Add card to container
    card.appendChild(empCard);
  });
  addingButtons = [...document.querySelectorAll(".card-buy")];
  console.log(addingButtons);
  for (let i = 0; i < addingButtons.length; i++) {
    addingButtons[i].addEventListener("click", addToCart);
  }
}

var addingButtons;
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
  loadFile();
  // Check user localStorage for previous selected item; if undefined, create a new item; else load the item
  var totalCount =
    localStorage.getItem("totalCount") == undefined
      ? localStorage.setItem("totalCount", "0")
      : localStorage.getItem("totalCount");
  // After the window has loaded, call these functions
  //addEmptyList();
  topDropDown();
}
window.onload = start;

cartContainer = document.querySelector(".cart-container");

var i = 0;
function changeCartContainer() {
  if (i % 2 == 1) cartContainer.style.display = "none";
  else cartContainer.style.display = "block";
  i++;
}

/* <div class="cart-item" id="">
                <div class="item-img"></div>
                <div class="item-nested">
                  <div class="item-name">NAME</div>
                  <div class="item-price">PRICE</div>
                </div>
                <div class="item-count">
                  <button
                    class="minus"
                    onclick="this.parentNode.querySelector('.quantity').stepDown()"
                  ></button>
                  <input
                    class="quantity"
                    min="0"
                    name="quantity"
                    value="1"
                    type="number"
                  />
                  <button
                    class="plus"
                    onclick="this.parentNode.querySelector('.quantity').stepUp()"
                  ></button>
                </div>
                <div class="item-subtotal">TOTAL</div>
              </div> */
function addToCart() {
  // Create Item
  var cartItem = document.createElement("div");
  cartItem.className = "cart-item";

  // Image
  var cartImg = document.createElement("div");
  cartImg.className = "item-img";
  cartItem.appendChild(cartImg);

  // Name & Price
  var itemNested = document.createElement("div");
  itemNested.className = "item-nested";
  var itemName = document.createElement("div");
  itemName.className = "item-name";
  itemName.innerHTML = "NAME";
  var itemPrice = document.createElement("div");
  itemPrice.className = "item-price";
  itemPrice.innerHTML = "PRICE";

  itemNested.appendChild(itemName);
  itemNested.appendChild(itemPrice);
  cartItem.appendChild(itemNested);

  // Quantity
  var itemCount = document.createElement("div");
  itemCount.className = "item-count";
  var minusButton = document.createElement("button");
  minusButton.className = "minus";
  minusButton.onclick = "this.parentNode.querySelector('.quantity').stepDown()";
  var input = document.createElement("input");
  input.className = "quantity";
  input.min = 0;
  input.name = "quantity";
  input.value = 1;
  input.type = "number";
  var plusButton = document.createElement("button");
  plusButton.className = "plus";
  plusButton.onclick = "this.parentNode.querySelector('.quantity').stepUp()";

  itemCount.appendChild(minusButton);
  itemCount.appendChild(input);
  itemCount.appendChild(plusButton);
  cartItem.appendChild(itemCount);

  //
  var total = document.createElement("div");
  var subTotal = document.createElement("div");
  subTotal.className = "item-subtotal";
  subTotal.innerHTML = "TOTAL";
  total.appendChild(subTotal);
  cartItem.appendChild(total);

  cartContainer.appendChild(cartItem);

  count = 0;

  plusButtons = document.querySelectorAll(".plus");
  console.log(plusButtons);

  minusButtons = document.querySelectorAll(".minus");
  console.log(minusButtons);

  function clickPlus(node) {
    countNumber.innerHTML = ++count;
    // console.log(count)
    node.parentNode.querySelector(".quantity").stepUp();
    // console.log(count)
  }

  function clickMinus(node) {
    countNumber.innerHTML = --count;
    node.parentNode.querySelector(".quantity").stepDown();
  }

  for (let i = 0; i < plusButtons.length; i++) {
    plusButtons[i].addEventListener("click", clickPlus);
  }

  for (let i = 0; i < minusButtons.length; i++) {
    minusButtons[i].addEventListener("click", clickMinus);
  }
}

items = document.querySelectorAll(".cart-item");

countNumber = document.querySelector(".cart-item-count");
countNumber.innerHTML = 0;
