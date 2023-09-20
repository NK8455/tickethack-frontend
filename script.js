document.querySelector(".searchbutton").addEventListener("click", function () {
  const departure = document.querySelector(".departure").value;
  const arrival = document.querySelector(".arrival").value;
  const date = document.querySelector(".datevalue").value;

  fetch("http://localhost:3000/trip", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ departure, arrival, date }),
  })
    .then((response) => response.json())
    .then((data) => {
      let htmlContent = "";
      let tripFound = false;

      for (let goodDate of data) {
        let chosenDate = new Date(goodDate.date).toISOString().split("T")[0];

        let chosenTime = new Date(goodDate.date);

        let hours = chosenTime.getHours();
        let minutes = chosenTime.getMinutes();

        let formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`;

        if (
          chosenDate === date &&
          departure === goodDate.departure &&
          arrival === goodDate.arrival
        ) {
          htmlContent += `
            <div class="tickets"><p>${goodDate.departure}</p> > <p>${goodDate.arrival}</p> <div class="time"><p>${formattedTime}</p></div> <p><b><div class="pricevalue">${goodDate.price}</div>€</b><p>
             <button type="button" class="bookticket">Book</button>
            </div>
         `;
          tripFound = true;
        }
      }

      if (!tripFound) {
        htmlContent = `
        <img src="images/notfound.png">
        <p class="line">__________________</p>
            NO TRIP FOUND
          `;
      }

      const rowElement = document.querySelector(".listing");
      rowElement.innerHTML = htmlContent;

      const allBooks = document.querySelectorAll(".bookticket");

      for (let i = 0; i < allBooks.length; i++) {
        allBooks[i].addEventListener("click", function (e) {


          console.log(e.target.parentNode.parentNode)


          const departure = document.querySelector(".departure").value;
          const arrival = document.querySelector(".arrival").value;
          const date = document.querySelector(".datevalue").value;
          const price = e.target.parentNode.parentNode.querySelector(".pricevalue").textContent;
          const time = e.target.parentNode.parentNode.querySelector(".time").textContent;

          console.log(time);

          fetch("http://localhost:3000/trip/newTrip", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ departure, price, date, arrival, time }),
          })
            .then((response) => response.json())
            .then((data) => {

              window.location.replace(
                "cart.html",
              );

              console.log(data);
            });
        });
      }
    });
});

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

// let cartContent =  `<p>My cart</p>

//     <div id="purchase">
//         <div id="date">Date</div>
//         <div id="time">time</div>
//         <div id="price">price</div>

//      <div id="deletecart">X</div>

//     </div>
//     <div id="footer">Total : 100€
//         <button type="button" class="purchasebutton">Purchase</button>
//     </div>`;

//     const cartElement = document.querySelector("#cart");
//         cartElement.innerHTML = cartContent;

//     console.log(departure, arrival, date)

//     document.querySelector("#cart").innerHTML +=

//     fetch("http://localhost:3000/trip", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ departure, arrival, date }),
//     })
//       .then((response) => response.json())
//       .then((data) => {

//       });
