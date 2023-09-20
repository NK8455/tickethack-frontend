let totalPrice = 0;

fetch("http://localhost:3000/trip/cart")
  .then((response) => response.json())
  .then((data) => {
    let cartContent = '';
  

    if (!data || data.length === 0) {
      cartContent = `
        <p>No tickets in your cart.</p>
        <p>Why not plan a trip?</p>
      `;

      document.querySelector(".allprice").textContent = `${totalPrice}€`;
    } else {
      for (let info of data) {
        cartContent += `
          <div class="purchase" data-id=${info._id}>
            <div class="date">${info.departure} > ${info.arrival}</div>
            <div class="time">${info.time}</div>
            <div class="price">${info.price}€</div>
            <button class="deletecart">X</button>
          </div>
        `;

        totalPrice += info.price;
      }

      document.querySelector(".allprice").textContent = `${totalPrice}€`;
    }

    const cartElement = document.querySelector("#cart");
    cartElement.innerHTML = cartContent;

    console.log(data);
  });

document.querySelector("#cart").addEventListener("click", function (event) {
  if (event.target.classList.contains("deletecart")) {
    let idOfDelete =event.target.parentNode.getAttribute("data-id")
   
    const purchaseElement = event.target.closest(".purchase");


    const priceElement = purchaseElement.querySelector(".price");


    const price = parseFloat(priceElement.textContent);

  
    totalPrice -= price;


    document.querySelector(".allprice").textContent = `${totalPrice}€`;





   
    purchaseElement.remove();

    fetch("http://localhost:3000/trip/deletecart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: idOfDelete }),


    })
  .then((response) => response.json())
  .then((data) => {

    console.log(data)




  })
  }





});


fetch("http://localhost:3000/trip/cart")
  .then((response) => response.json())
  .then((data) => {

    document.querySelector(".purchasebutton").addEventListener("click", function () {


     

      for (let purchases of data) {
       

      const departure = purchases.departure
      const arrival = purchases.arrival
      const price = purchases.price
      const time = purchases.time
      const departureTime = purchases.time


        console.log(time)


        fetch("http://localhost:3000/trip/booking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ departure, price, arrival, time, departureTime}),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          });



      }

      // const departure = document.querySelector(".departure").value;
      // const arrival = document.querySelector(".arrival").value;
      // const date = document.querySelector(".datevalue").value;
      // const price = document.querySelector(".pricevalue").textContent;
      // const time = document.querySelector(".time").textContent;
    
    
     
      console.log("Purchase button clicked");
    });

  })








// document.querySelector(".bookticket").addEventListener("click", function () {
//   // const departure = document.querySelector(".departure").value;
//   // const arrival = document.querySelector(".arrival").value;
//   // const date = document.querySelector(".datevalue").value;

//   console.log("hi")

//   // fetch("http://localhost:3000/trip", {
//   //   method: "POST",
//   //   headers: { "Content-Type": "application/json" },
//   //   body: JSON.stringify({ departure, arrival, date }),
//   // })
//   //   .then((response) => response.json())
//   //   .then((data) => {
     
//   //   });
// });
