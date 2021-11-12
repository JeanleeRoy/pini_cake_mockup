const express = require("express");
const Insta = require("./controller");

const PORT = process.env.PORT || 3000;
const app = express();

const instaApi = new Insta();


app.get("/", (request, res) => {
    res.send("GET /");
});


app.get("/api", (req, res) => {
    res.send("Say hi to the API! 👋👋👋");
});


// get instagram media

app.get('/api/insta-media', (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    instaApi.getMedia(media => {
        res.send(media.data);
    }, err => {
        console.error(err);
        res.status(err.code).json(err);
    })
})


// get instagram media by id

app.get('/api/insta-media/:id', (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    instaApi.getMediaById(req.params.id,
        media => {
            res.send(media.data);
        }, err => {
            console.error(err);
            res.status(err.code).json(err);
        })
})


app.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});
