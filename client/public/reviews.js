var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://api.rawg.io/api/games?key=d6823dbd4637434998d92a3eb889e30c') 

request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)
  if  (request.status >= 200 && request.status < 400) {
    console.log(data)
  }
}

// Send request
request.send()