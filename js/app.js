topDropDown();
addEmptyList();

function addEmptyList() {
  var itemCount = 0;
  const cartList = document.querySelector('.cart-list');
  if (itemCount == 0) {
    var emptyText = document.createTextNode('Add something to your cart');
    var emptyList = document.createElement('li');
    emptyList.className = 'empty-item';
    emptyList.appendChild(emptyText);
    cartList.appendChild(emptyList);
  } else {
    document.querySelector('.empty-item').remove();
  }
}

function topDropDown() {
  const burger = document.querySelector('.burger-menu');
  const burgerList = document.querySelector('.nav-list');
  const cart = document.querySelector('.cart-menu');
  const cartList = document.querySelector('.cart-list');
  function clickDropDown(parent,list,otherList) {
    parent.addEventListener('click', function () {
      if (!list.classList.contains('open')) {
        list.classList.add('open');
        otherList.classList.remove('open');
        document.querySelector('.overlay').style.height = '99vh';
        document.querySelector('.overlay').style.opacity = '0.7';
      }
      else {
        list.classList.remove('open');
        document.querySelector('.overlay').style.height = '0';
        document.querySelector('.overlay').style.opacity = '0';
      }
    }
  )};
  clickDropDown(burger,burgerList,cartList);
  clickDropDown(cart,cartList,burgerList);
}