// const { verify } = require("jsonwebtoken");

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


let showAllBookings = [];
const renderAllBookings = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://127.0.0.1:3000/allbookings/",
    });

    showAllBookings = res.data

      .map((booking) => {
        // const pickup = booking.pickupdate
        // const dropoff =booking.dropoffdate
        // console.log(pickup,dropoff);
        return `
            <div class="product-card">
          
  
            <div class="product-details">
              <span class="product-catagory">Status: ${booking.status}</span>
              <h4><a href="">${booking.model}</a></h4>
              <p >Booking ID:<span id="boid">${booking._id} <span><br>
              Driver's Name: ${booking.clientname} <br> 
              Driver's Contact: ${booking.clientcontact} <br> 
              Driver's License: ${booking.clientlicense} <br> 
              Pickup Date: ${new Date(booking.pickupdate).toLocaleDateString("en-US", options)}<br> 
              Dropoff Date: ${new Date(booking.dropoffdate).toLocaleDateString("en-US", options)}<br> 
              <div class="product-bottom-details">
                <div class="product-price">Rs.${booking.payableamt}</div>
                <div>
                <a href="/selectbooking/${booking._id}"><input type="button" id="verify" value="Select"> </a>
                
                </div>

              </div>
            </div>
          </div>
      `;
      })
      .join(" ");
    myContent.innerHTML = showAllBookings;
  } catch (e) {
    console.log(e);
  }
};

renderAllBookings();


const myContent = document.querySelector(".wrapper");



