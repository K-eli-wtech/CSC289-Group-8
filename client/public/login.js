const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const rememberMeCheckbox = document.getElementById("remember-me");
const output = document.getElementById("output");

// check if there is a cookie for the password and if so, set it as the value of the password input
if (document.cookie.indexOf("password=") !== -1) {
const passwordCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("password="));
const password = passwordCookie.split("=")[1];
passwordInput.value = password;
}

// on form submit, save password to cookie if "remember me" is checked
document.querySelector("form").addEventListener("submit", (event) => {
event.preventDefault();
const username = emailInput.value;
const password = passwordInput.value;
const rememberMe = rememberMeCheckbox.checked;
fetch("/login", {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
})
    .then((response) => response.json())
    .then((data) => {
    if (data.success) {
        if (rememberMe) {
        // set password cookie to expire in 30 days
        const expirationDate = new Date(
            new Date().getTime() + 30 * 24 * 60 * 60 * 1000
        ).toUTCString();
        document.cookie = `password=${password}; expires=${expirationDate}; path=/`;
        }
        window.location.href = "/dashboard";
    } else {
        output.textContent = "Incorrect username or password";
    }
    })
    .catch((error) => {
    console.error("Error:", error);
    });
});