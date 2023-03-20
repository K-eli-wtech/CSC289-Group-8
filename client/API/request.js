const http = require("http");
const https = require("https"); 

https
    .get("https://api.rawg.io/api/games?key=d6823dbd4637434998d92a3eb889e30c", resp => {
        let data = "";

        resp.on("data", chunk => {
            data += chunk;
        });

        resp.on("end", () => {
            let url = JSON.parse(data);
            console.log(url);
        });
    })
    .on("error", err => {
        console.log("Error" + err.message);
    });