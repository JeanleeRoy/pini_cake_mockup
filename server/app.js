const http = require('http')
const https = require('https')
const axios = require('axios')
const { Todo, baseUrl, queryUrl } = require("./controller");

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (request, response) => {

    //set the request route
    if (request.url === "/api/sample" && request.method === "GET") {
        // get posts
        const url = 'https://jsonplaceholder.typicode.com/posts';
        axios.get(url)
            .then(res => {
                response.writeHead(200, { "Content-Type": "application/json" })
                response.end(JSON.stringify(res.data));
            })
            .catch(err => {
                console.error(err);
                response.writeHead(404, { "Content-Type": "application/json" });
                response.end(JSON.stringify({ message: err.message, code: 404 }));
            })
    }

    else if (request.url === "/api/insta-media" && request.method === "GET") {
        // get instagram media
        response.writeHead(200, { "Content-Type": "application/json" })
        response.end(JSON.stringify(res.data));
    }

    // If no route present
    else {
        response.writeHead(404, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "Route not found" }));
    }

})

server.listen(PORT, (err) => {
    if (err) {
        console.log('Something went wrong', err);
    } else {
        console.log(`server started on port: ${PORT}`);
    }
})