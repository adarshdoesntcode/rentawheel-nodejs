const logoutAdmin = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://127.0.0.1:3000/logoutadmin",
    });
    location.assign("/adminlogin0069");
  } catch (e) {
    console.log(e);
  }
};

document.querySelector("#show-vehicles").addEventListener("click", (e) => {
  location.assign("/renderVehicles");
});

document.querySelector("#add-vehicles").addEventListener("click", (e) => {
  location.assign("/addVehicles");
});

document.querySelector("#all-vehicles").addEventListener("click", (e) => {
  location.assign("/allvehiclesviews");
});

document.querySelector("#logout-admin").addEventListener("click", (e) => {
  if (confirm("Do yo want to log out? 🥹")) {
    logoutAdmin();
  }
});
