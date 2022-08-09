let dashboardProducts = [];

const renderDashboard = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://127.0.0.1:3000/dashboardvehicles/?sortBy=createdAt:desc",
    });
    dashboardProducts = res.data
      .map((product) => {
        return `
        <figure class="snip1171">
        <img src="${product.imgurl}" alt="sample71"/>
        <div class="price">Rs. ${product.rate}/d</div>
        <figcaption>
          <h3>${product.model}</h3>
          <p>
          Type: ${product.type} <br>
          Seat Capacity: ${product.seatcapacity} adults<br> 
          Boot Capacity: ${product.bootcapacity} ltrs.<br> 
          Kilometers Driven: ${product.kilometersdriven} km.<br> 
          <strong>Available Units: ${product.availablestock}</strong><br> 
          <a href="/clients/rent/${product._id}">Rent.</a>
        </figcaption>
      </figure>
      `;
      })
      .join(" ");
    myContent.innerHTML = dashboardProducts;
  } catch (e) {
    console.log(e);
  }
};

const logoutClient = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://127.0.0.1:3000/logoutclient",
    });
    location.assign("/");
  } catch (e) {
    console.log(e);
  }
};

renderDashboard();

const myContent = document.querySelector(".product-cards");

document.querySelector("#logout-client").addEventListener("click", (e) => {
  if (confirm("Do yo want to log out? 🥹")) {
    logoutClient();
  }
});
