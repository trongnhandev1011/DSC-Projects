function addEmptyList(itemCount) {
  const cartList = document.querySelector('.cart-list');
  // If 0 item was loaded for the current user, add an empty <li> saying "Add something to your cart"
  if (itemCount == 0) {
    var emptyText = document.createTextNode('Add something to your cart');
    var emptyList = document.createElement('li');
    emptyList.className = 'empty-item';
    emptyList.appendChild(emptyText);
    cartList.appendChild(emptyList);
  } else {
    // If some items were loaded, or the user select an item, remove the empty item
    document.querySelector('.empty-item').remove();
  }
}

function topDropDown() {
  // Get all of the required elements
  const burger = document.querySelector('.burger-menu');
  const burgerList = document.querySelector('.nav-list');
  const cart = document.querySelector('.cart-menu');
  const cartList = document.querySelector('.cart-list');
  // Simplified
  function clickDropDown(parent,list,otherList) {
    // Add a click event to the parent element; if clicked, call function()
    parent.addEventListener('click', function () {
      // Check if the list is open
      if (!list.classList.contains('open')) {
        // If not, open it, close the other list
        list.classList.add('open');
        otherList.classList.remove('open');
        // Show the overlay
        document.querySelector('.overlay').style.height = '99vh';
        document.querySelector('.overlay').style.opacity = '0.7';
      }
      else {
        // Else, close it
        list.classList.remove('open');
        // Remove the overlay
        document.querySelector('.overlay').style.height = '0';
        document.querySelector('.overlay').style.opacity = '0';
      }
    }
  )};
  clickDropDown(burger,burgerList,cartList);
  clickDropDown(cart,cartList,burgerList);
}

function start() {
  var itemCount = 0;
  // After the window has loaded, call these functions
  topDropDown();
  addEmptyList(itemCount);
}

window.onload = start;