/* eslint-disable no-unused-vars */
function checkPass(){
  let password = document.getElementById("pass").value;
  let confirm = document.getElementById("verify").value;
  let button = document.getElementById("register-button");
  let message = document.getElementById("output");

  if(password.length !== 0){
    if(password === confirm){
        message.textContent = ""
        button.type = "submit"
    } else {
      message.textContent = "Passwords don't match"
      message.style.color = '#ff4d4d'
    }
  } else {
    message.textContent = "Password can't be empty"
      message.style.color = '#ff4d4d'
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