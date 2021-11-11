const http = require('http')
const https = require('https')
const axios = require('axios').default
const Insta = require("./controller");

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (request, response) => {

    const Instagram = new Insta();
    response.setHeader("Content-Type", "application/json");
    response.setHeader('Access-Control-Allow-Origin', '*');


    if (request.url === "/sample/posts" && request.method === "GET") {
        // get posts, for testing purposes
        const url = 'https://jsonplaceholder.typicode.com/posts';
        axios.get(url)
            .then(res => {
                response.writeHead(200)
                response.end(JSON.stringify(res.data));
            })
            .catch(err => {
                console.error(err);
                response.writeHead(404);
                response.end(JSON.stringify({ message: err.message, code: 404 }));
            })
    }

    else if (request.url === "/api/insta-media" && request.method === "GET") {
        // get instagram media
        Instagram.getMedia(media => {
            response.writeHead(200);
            response.end(JSON.stringify(media));
        }, err => {
            console.error(err);
            response.writeHead(err.code);
            response.end(JSON.stringify(err));
        })
    }

    else if (request.url.includes('/api/media-id/') && request.method === "GET") {
        const mediaId = request.url.split("/").at(-1);
        // get instagram media by id
        Instagram.getMediaById(mediaId, media => {
            response.writeHead(200);
            response.end(JSON.stringify(media));
        }, err => {
            console.error(err);
            response.writeHead(err.code);
            response.end(JSON.stringify(err));
        })
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