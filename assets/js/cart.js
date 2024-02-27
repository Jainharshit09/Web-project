
const carsJson = 
 [
      {
          "name":"Toyota RAV 4",
          "rate":4400,
          "model":"2021",
          "id":"1"
      },
      {
          "name":"BMW 3 Series",
          "rate":5050,
          "model":"2019",
          "id":"2"
      },
      {
          "name":"Volkswagen T-Cross",
          "rate":5000,
          "model":"2020",
          "id":"3"
      },
      {
          "name":"Cadillac Escalade",
          "rate":6200,
          "model":"2020",
          "id":"4"
      },
      {
          "name":"BMW 4 Series GTI",
          "rate":5300,
          "model":"2021",
          "id":"5"
      },
      {
          "name":"Mercedes-Benz SLC Class AMG LINE",
          "rate":4900,
          "model":"2019",
          "id":"6"
      }
  ]



window.onload= async ()=>{
  const name = localStorage.getItem("user");
  
const cartItemElement = document.getElementById('cart-body');
  let cartItems = await fetch(`/cart`).then((data)=>data.json()).then((data)=>data);
  console.log(cartItems);
  
  cartItems.forEach((cartItem,i)=>{
    let car = carsJson[cartItem.productId]
    cartItemElement.innerHTML+=
    `<tr>
    <td>${car.name}</td>
    <td>${car.rate}</td>
    <td>
      <button class="add-remove-quantity-button minus">-</button>
      <input class='${cartItem.productId} ${i} quantity' type="number" name="quantity" value=${cartItem.quantity} min="1">
      <button class="add-remove-quantity-button plus">+</button>
    </td>
    <td class='rate ${cartItem.productId}'>${car.rate*cartItem.quantity}</td>
  </tr>`;
})

subtotalChange(cartItems);
}


const quantity = Array.from(document.getElementsByClassName('quantity'));
const rate = Array.from(document.getElementsByClassName('rate'));
const subtotal = document.getElementById('subtotal');

const subtotalChange=(cartItems)=>{
    let total = 0;
    cartItems.forEach((cartItem)=>{
        total += (carsJson[cartItem.productId].rate * cartItem.quantity);
    })
    subtotal.innerText = total;
    const shippingMethod = document.getElementById('shipping-method');
    const totalElement = document.getElementById('total');
   
    const updateTotal = () => {
      
      const subtotalValue = parseFloat(subtotal.innerText.replace('$', '').trim());
      const shippingMethodValue = parseFloat(shippingMethod.innerText.slice(-6));
  
      if (!isNaN(subtotalValue) && !isNaN(shippingMethodValue)) {
        console.log(shippingMethod.value);
        const total = subtotalValue + parseFloat(shippingMethod.value);
        console.log(total); 
        totalElement.innerText = total;
      } else {
        console.log(shippingMethodValue)
        console.log(subtotalValue)
        totalElement.innerText = "Invalid values";
      }
    };
  
    shippingMethod.addEventListener('change', updateTotal);
  
    updateTotal();
}

subtotalChange();
quantity.forEach((q,i)=>{
    q.addEventListener("change", function(){
        const index = parseInt(q.classList.value.split(" ")[0])
        const value = q.value;
        rate[i].innerText = carsJson[index].rate*value;
        cartItems[parseInt(q.classList.value.split(" ")[1])].quantity=value;
        localStorage.setItem('cartItems',JSON.stringify(cartItems))
        subtotalChange();
    })
})

document.addEventListener('DOMContentLoaded', function () {
    
  });
  
  


