const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const router = require("./router");
const mongoose = require("mongoose");
const cors = require("cors");

// DB setup
mongoose
  .connect("mongodb://localhost:27017/auth", { useNewUrlParser: true })
  .then(() => {
    console.log("connected");
  })
  .catch((e) => {
    console.log("connection failed", e);
  });

// App setup (.use middlewares any incoming requests will get pass through the middlewares)
app.use(morgan("combiner")); // loggin framework used for debugging
app.use(bodyParser.json({ type: "*/*" })); // parse the body into json
app.use(cors());

//routes
router(app);

// Server Setup
const port = process.env.PORT || 3090;
// create http server and forward all request to app
const server = http.createServer(app);
server.listen(port);
console.log("server listening on:", port);
