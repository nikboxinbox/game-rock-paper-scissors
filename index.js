// Run command: 'npx nodemon index.js'
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

app.get("/check", (req, res) => {
    res.send("Game App running...");
});

server.listen(3000, () => {
    console.log("server listening on :3000");
});
