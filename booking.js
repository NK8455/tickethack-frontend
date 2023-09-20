fetch("http://localhost:3000/trip/booking")
  .then((response) => response.json())
  .then((data) => {
    let bookContent = '';

    
    if (!data || data.length === 0) {
      bookContent = `
        <p>No bookings in your cart.</p>
        <p>Why not plan a trip?</p>
      `;

     
    } else {

      for (let info of data) {


          let currentTime = new Date()

          let currentHours = currentTime.getHours()

          console.log(currentTime.getHours())


          let departureHour = info.time.split(":")[0]


          let inHowMuch =  currentHours - departureHour


          console.log(inHowMuch)

        bookContent += `
            <div class="purchase">
            <div class="date">${info.departure} > ${info.arrival}</div>
            <div class="time">${info.time}</div>
            <div class="price">${info.price}€</div>
            <div class="departuretime">Departure in ${inHowMuch} hours</div></div>
           
         
        `;

     
      }



    }


    const bookElement = document.querySelector("#purchbook");
    bookElement.innerHTML = bookContent;

    console.log(data);




//     <div id="date">Date</div>
//     <div id="time">time</div>
//     <div id="price">price</div>
//  <div id="departuretime">Departure in x hours</div>

  




    console.log(data);
  });

  