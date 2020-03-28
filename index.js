const http = require("http");

const path = require("path");

const fs = require("fs");

const {

    parse

} = require("querystring")



// Create file if not exist



const formTemp = fs.readFileSync(path.join(__dirname, "public", "index.html"), "utf-8");



const server = http.createServer((req, res) => {



    if (req.url === "/") {

        res.writeHead(200, {

            "Content-type": "text/html",

            "my-very-header": "custom header"

        });



        res.write(formTemp);

        res.end();

    } else if (req.method === "POST" && req.url === "/message" && req.headers["content-type"] === "application/x-www-form-urlencoded") {

        let body = "";

        req.on("data", chunk => body += chunk.toString());

        req.on("end", () => {

            const {

                message

            } = parse(body);

            fs.writeFile(path.join(__dirname, "message.txt"), message, "utf-8", err => {

                console.log("file written");

            })

        })

        res.end(`<h1> successfully submitted!</h1> <a href ="/"> <button>Back</button> </a>`);

    } else {

        res.write(formTemp);

    };

});



const PORT = 8080;

const HOSTNAME = "127.0.0.1";



server.listen(PORT, HOSTNAME, () => console.log("Server is running..."));