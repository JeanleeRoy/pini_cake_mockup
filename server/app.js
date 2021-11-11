const http = require('http')
const https = require('https')
const Todo = require("./controller");
const { getReqData } = require("./utils");

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
    
    //set the request route
    if (req.url === "/api" && req.method === "GET") {
        // get the todos.
        const todos = await new Todo().getTodos();
        // set the status code, and content-type
        res.writeHead(200, { "Content-Type": "application/json" });
        // send the data
        res.end(JSON.stringify(todos));
    }

    else if (req.url === "/insta-media" && req.method === "GET") {
        // get media

        https.get('https://jsonplaceholder.typicode.com/posts', (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log(JSON.parse(data).explanation);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

        // set the status code, and content-type
        res.writeHead(200, { "Content-Type": "application/json" });
        // send the data
        res.end(JSON.stringify(todos));
    }

    // If no route present
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }

})

server.listen(PORT, (err) => {
    if (err) {
        console.log('Something went wrong', err);
    } else {
        console.log(`server started on port: ${PORT}`);
    }
})