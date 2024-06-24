require("dotenv").config();

const fs = require("fs");
const path = require("path");

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(express.static("uploads"));

// Logger
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

app.use(morgan("short", { stream: accessLogStream }));
app.use(morgan("short"));

// Routes

// Basic GET API
app.get("/", (req, res) => {
  return res.json({ message: "Hello World" });
});

// Listener
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("\n***************************************************\n");
  console.log("Server running on PORT: " + port);
  console.log("\n***************************************************\n");
});
