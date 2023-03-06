/* eslint-disable no-unused-vars */
function checkPass() {
  let password = document.getElementById("pass").value;
  let confirm = document.getElementById("verify").value;
  let username = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let button = document.getElementById("register-button");
  let message = document.getElementById("output");

  if (password.length !== 0) {
    if (password === confirm) {
      // Make an AJAX request to the server
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "/check-user", true);
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          let response = JSON.parse(xhr.responseText);
          if (response.exists) {
            message.textContent = "Username or email already exists";
            message.style.color = "#ff4d4d";
            button.type = "button";
          } else {
            message.textContent = "";
            button.type = "submit";
          }
        }
      };
      xhr.send(JSON.stringify({ username, email }));
    } else {
      message.textContent = "Passwords don't match";
      message.style.color = "#ff4d4d";
      button.type = "button";
    }
  } else {
    message.textContent = "Password can't be empty";
    message.style.color = "#ff4d4d";
    button.type = "button";
  }
}

function showPass(pass, icon){
  let password = document.getElementById(pass);
  let eye = document.getElementById(icon);

  if(password.type === "password"){
    password.type = "text"
    eye.name = "eye-off-outline"
  } else {
    password.type = "password"
    eye.name = "eye-outline"
  }
}