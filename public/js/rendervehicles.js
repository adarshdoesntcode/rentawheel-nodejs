let showVehicles = [];

const renderVehicles = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://127.0.0.1:3000/vehicles/?sortBy=createdAt:desc",
    });
    showVehicles = res.data
      .map((vehicle) => {
        return `
            <div class="product-card">
          
            <div class="product-tumb">
              <img src="${vehicle.imgurl}" alt="">
            </div>
            <div class="product-details">
              <span class="product-catagory">${vehicle.type}</span>
              <h4><a href="">${vehicle.model}</a></h4>
              <p>Seat Capacity: ${vehicle.seatcapacity} adults<br> 
              Boot Capacity: ${vehicle.bootcapacity} ltrs.<br> 
              Kilometers Driven: ${vehicle.kilometersdriven} km.<br> 
              Available Units: ${vehicle.availablestock}<br> 
              <div class="product-bottom-details">
                <div class="product-price">Rs.${vehicle.rate}</div>
              </div>
            </div>
          </div>
      `;
      })
      .join(" ");
    myContent.innerHTML = showVehicles;
  } catch (e) {
    console.log(e);
  }
};

renderVehicles();

const myContent = document.querySelector(".wrapper");
