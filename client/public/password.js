class Password {
    constructor(passwordDiv) {
        this.passwordDiv = document.querySelector(passwordDiv)
        this.passwordField = this.passwordDiv.querySelector("input")
        this.toggle = this.passwordDiv.querySelector("button")
        console.log(this.toggle);
        this.toggle.addEventListener("click", this.showHide.bind(this, this.passwordField, this.toggle));

    }
    showHide(passwordField, toggle) {
        if (passwordField.type === "password") {
          passwordField.type = "text";
          toggle.innerHTML = '<ion-icon name="eye-off-outline"></ion-icon>';
        } else {
          passwordField.type = "password";
          toggle.innerHTML = '<ion-icon name="eye-outline"></ion-icon>';
        }
      }
      
}