const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes");

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", routes);

module.exports = app;
