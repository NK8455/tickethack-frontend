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
            <div class="tickets"><p>${goodDate.departure}</p> > <p>${goodDate.arrival}</p> <p>${formattedTime}</p> <p><b>${goodDate.price}€</b><p>
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
    });
});

//   if (departure === "Paris") {
//     if (arrival === "Lyon") {
//       for (let date of data.data) {
//         let chosenDate = new Date(date.date).toISOString().split("T")[0];

//         if (dateOfTrip === chosenDate) {
//           console.log(data);
//         }
//       }
//     }
//   }
