let showbookedVehicles = [];

const renderbookedVehicles = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://127.0.0.1:3000/mybookings/",
    });
    showbookedVehicles = res.data

      .map((vehicle) => {
        return `
            <div class="product-card">
          
            <div class="product-tumb">
              <img src="${vehicle.imgurl}" alt="">
            </div>
            <div class="product-details">
              <span class="product-catagory">Status: ${vehicle.status}</span>
              <h4><a href="">${vehicle.model}</a></h4>
              <p>Driver's Name: ${vehicle.clientname} <br> 
              Pick up Date: ${vehicle.pickupdate} <br> 
              Drop off Date: ${vehicle.dropoffdate} <br> 
              Payable Amt: Rs. ${vehicle.payableamt}<br> 
              <div class="product-bottom-details">
                <div class="product-price">OTP: ${vehicle.otp}</div>
              </div>
            </div>
          </div>
      `;
      })
      .join(" ");
    myContent.innerHTML = showbookedVehicles;
  } catch (e) {
    console.log(e);
  }
};

renderbookedVehicles();

const myContent = document.querySelector(".wrapper");
