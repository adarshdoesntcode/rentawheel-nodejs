const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:3000/clients/login",
      data: {
        email,
        password,
      },
    });
    if (res.data.client) {
      alert("Success");
      location.assign("/dashboard");
    }
  } catch (e) {
    alert(e);
  }
};

const signUp = async (name, email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:3000/clients/signup",
      data: {
        name,
        email,
        password,
      },
    });
    alert("Success");
    location.reload(true);
  } catch (e) {
    console.log(e);
  }
};

document.querySelector(".register-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signUp(name, email, password);
});

document.querySelector(".login-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  login(email, password);
});

$(".message a").click(function () {
  $("form").animate({ height: "toggle", opacity: "toggle" }, "slow");
});
