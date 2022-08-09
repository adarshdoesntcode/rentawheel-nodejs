const config = {
  minDate: "today",
  maxDate: new Date().fp_incr(7),
};

flatpickr("#datepicker-pick", config);
flatpickr("#datepicker-drop", {
  minDate: "today",
});

document.querySelector("#datepicker-pick").addEventListener("input", () => {
  const date1 = document.querySelector("#datepicker-drop").value;
  const date = document.querySelector("#datepicker-pick").value;
  let days = 0;

  if (date1 && date) {
    let pickupDate = new Date(date);
    let dropoffDate = new Date(date1);
    let Difference_In_Time = dropoffDate.getTime() - pickupDate.getTime();
    days = Difference_In_Time / (1000 * 3600 * 24);
    days++;

    if (days <= 0) {
      return alert("Invalid Dates.");
    }

    document.getElementById("rate").innerText = rate * days;
    document.getElementById("days").innerText = days;
  }
});
document.querySelector("#datepicker-drop").addEventListener("input", () => {
  const date1 = document.querySelector("#datepicker-drop").value;
  const date = document.querySelector("#datepicker-pick").value;
  let days = 0;
  if (date1 && date) {
    let pickupDate = new Date(date);
    let dropoffDate = new Date(date1);
    let Difference_In_Time = dropoffDate.getTime() - pickupDate.getTime();
    days = Difference_In_Time / (1000 * 3600 * 24);
    days++;
  }

  if (days <= 0) {
    alert("Invalid Dates.");
  }

  document.getElementById("rate").innerText = rate * days;
  document.getElementById("days").innerText = days;
});


document.querySelector(".submit").addEventListener("click",async (e)=>{
  e.preventDefault();
  const otp = Math.floor(1000 + Math.random() * 9000);
  
  try{
    const res = await axios({
      method: "POST",
      url: "/clients/rent/request",
      data:{
        clientname:clientName.value,
        clientcontact:clientContact.value,
        clientlicense:licenseNo.value,
        pickupdate:pickupDate.value,
        dropoffdate:dropoffDate.value,
        payableamt: price.innerText,
        otp,
        model:model.dataset.model,
        vehicleid:vehicleid.dataset.id,
        imgurl:imgurl.dataset.url,
      }
      
    })
    if(res.status === 201){
      alert("Your vehicle is successfully Booked. ✅✅ Your will receive an email and will be redirected to your Profile page")
      location.assign("/profile");
    }
  }catch(e){
    alert(e.message);
  }

})

const rate =  document.getElementById("rate").innerText;

const clientName = document.querySelector("#rent-name");
const price = document.querySelector("#rate");
const licenseNo = document.querySelector("#rent-license");
const clientContact = document.querySelector("#rent-phone");
const dropoffDate = document.querySelector("#datepicker-drop");
const pickupDate = document.querySelector("#datepicker-pick");
const model = document.querySelector("#model");
const imgurl = document.querySelector(".image");
const vehicleid = document.querySelector(".submit");


