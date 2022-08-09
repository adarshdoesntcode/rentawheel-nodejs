
const otp = document.querySelector("#otp");
const verify = document.querySelector("#verify");
const complete = document.querySelector("#complete");
const boid = document.querySelector("#boid").innerText;
const vid = document.querySelector("#boid").dataset.vid;
let otpcode="";

const verifyotp = async (otpcode) => {
  try{
    const res = await axios({
      method: "POST",
      url: `/verifyotp/${boid}`,
      data:{
        otpcode,
        vid
      }
    })

    if(res.data){
      alert("Verified Successfully !!");
      location.reload(true);
    }else{
      alert("OTP did not match !!")
    }
  }catch(e)
  {
    console.log(e);
  }
}

const completeTransaction = async () => {
  try{
    const res = await axios({
      method: "POST",
      url: `/completetransaction/${boid}`,
      data:{
        vid
      }
    })

    if(res.data){
      alert("Transaction Complete !!");
      location.reload(true);
    }else{
      alert("There was an Error!!")
    }
  }catch(e)
  {
    console.log(e);
  }
}

verify.addEventListener("click",()=>{
  otpcode = otp.value;
  verifyotp(otpcode);
})

complete.addEventListener("click",()=>{
  if(confirm("Do you want to Complete this Transaction?")){

    completeTransaction();
  }
})