'use strict';

/**
 * navbar toggle
 */

const displayNo = document.getElementById("no");


var noOfItems = 0;




window.onload=async()=>{
  const rentBtns = document.getElementsByClassName("rentBtn");
  let cartItems =  await fetch(`/cart`).then((data)=>data.json()).then((data)=>data);
  displayNo.classList.add('inactive');

  let btns = Array.from(rentBtns);
btns.forEach((rentBtn,i)=>{
  rentBtn.addEventListener('click', async(e) => {
    if(noOfItems===0){
      displayNo.classList.remove('inactive');
    }
    let found = false;
    cartItems.forEach((cartItem)=>{if(cartItem.productId===i){cartItem.quantity++;found=true;}})
    if(!found){
      cartItems.push({productId:i,quantity:1});
    }
    console.log(cartItems);
    await fetch(`http://localhost:3000/addItem`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({cartItems:cartItems})})
    noOfItems++;
    displayNo.innerText = noOfItems;
  })
})
}




const overlay = document.querySelector("[data-overlay]");
const navbar = document.querySelector("[data-navbar]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

const navToggleFunc = function () {
  navToggleBtn.classList.toggle("active");
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

navToggleBtn.addEventListener("click", navToggleFunc);
overlay.addEventListener("click", navToggleFunc);

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", navToggleFunc);
}



/**
 * header active on scroll
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  window.scrollY >= 10 ? header.classList.add("active")
    : header.classList.remove("active");
});

//login user name dispaly
const isLoggedIn = localStorage.getItem('user')||false;

const userBtn = document.querySelector('.user-btn');

if (isLoggedIn!=="false"&&isLoggedIn!==false) {
  console.log(isLoggedIn)
  userBtn.innerHTML = `<ion-icon name="person-outline"></ion-icon> ${isLoggedIn}`;
  userBtn.href = "";
  userBtn.addEventListener('click',()=>{
    localStorage.setItem('user',false);
  }) 
  userBtn.setAttribute('aria-label', 'User Profile');
}
else {
  userBtn.innerHTML = `<ion-icon name="person-outline"></ion-icon>`;
  userBtn.href = "login.html"; 
  userBtn.setAttribute('aria-label', 'Login');
}
function pasteUsername() {
  // Get the username input value
  const usernameInput = document.getElementById('loginusername');
  const username = usernameInput.innerText;

  // Copy the username to the clipboard
  navigator.clipboard.writeText(username)
      .then(() => {
          console.log('Username copied to clipboard:', username);
          // Optionally, you can provide user feedback here (e.g., display a success message)
      })
      .catch(err => {
          console.error('Error copying username to clipboard:', err);
          // Handle the error, if any
      });
}