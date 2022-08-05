const addVehicle = async (
  model,
  type,
  seatcapacity,
  bootcapacity,
  kilometersdriven,
  availablestock,
  imgurl,
  rate
) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:3000/vehicles",
      data: {
        model,
        type,
        seatcapacity,
        bootcapacity,
        kilometersdriven,
        availablestock,
        imgurl,
        rate,
      },
    });
    if (res.data) {
      alert("Success");
    }
    location.reload(true);
  } catch (e) {
    alert("There was a problem");
    console.log(e);
  }
};

document.querySelector("#add-vehicles-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const model = document.getElementById("model").value;
  const type = document.getElementById("type").value;
  const seatcapacity = document.getElementById("seatcapacity").value;
  const bootcapacity = document.getElementById("bootcapacity").value;
  const kilometersdriven = document.getElementById("kilometersdriven").value;
  const availablestock = document.getElementById("availablestock").value;
  const imgurl = document.getElementById("image").value;
  const rate = document.getElementById("rate").value;
  addVehicle(
    model,
    type,
    seatcapacity,
    bootcapacity,
    kilometersdriven,
    availablestock,
    imgurl,
    rate
  );
});
