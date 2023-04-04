function redirectToProfileOrLogin() {
    fetch('http://localhost:3000/pages/check-login')
      .then((response) => {
        if (response.status === 200) {
          window.location.href = 'profile.html';
        } else {
          window.location.href = 'login.html';
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        window.location.href = 'login.html';
      });
  }