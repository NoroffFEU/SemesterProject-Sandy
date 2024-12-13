import { register } from "../../auth/register.js";

 async function onRegister(event) {
  event.preventDefault();

  const username = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const avatarUrl = document.getElementById("avatar").value;
  const password = document.getElementById("password").value;

  const registerData = {
    name: username,
    email: email,
    avatar: {"url": avatarUrl},
    password: password,
  };

  try {
    const response = await register(registerData);
    console.log(response);
    // window.location.href = '/'; // Redirect to home page
  } catch (error) {
    console.error("An error occurred during registration:", error);
    alert(error.message);
  }
}

const form = document.forms.register;

form.addEventListener("submit", onRegister);
