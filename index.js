const express = require("express");

// Custom Routes
const shorten = require("./api/shortenUrl");
const redirect = require("./api/redirect");

// App
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/createShortUrl", shorten);
app.use("/", redirect);
const port = process.env.PORT ? process.env.PORT : 8000;
app.listen(port, () => console.log("Listening portNumber: 8000 "));
