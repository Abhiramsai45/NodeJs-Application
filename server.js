const express = require("express");
const app = express();
const { resolve } = require("path");
const port = process.env.PORT || 3000;

// importing the dotenv module to use environment variables:
require("dotenv").config();

const api_key = process.env.SECRET_KEY;

const stripe = require("stripe")(api_key);

// ------------ Imports & necessary things here ------------

// Setting up the static folder:
// app.use(express.static(resolve(__dirname, "./client")));

const staticDir = process.env.STATIC_DIR || './default-path';
const resolvedPath = resolve(__dirname, staticDir);

console.log('Resolved STATIC_DIR Path:', resolvedPath);

if (!staticDir || !require('fs').existsSync(resolvedPath)) {
  throw new Error(`Invalid STATIC_DIR: ${resolvedPath}`);
}

app.use(express.static(resolvedPath));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/index.html");
  res.sendFile(path);
});

// creating a route for success page:
app.get("/success", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/success.html");
  res.sendFile(path);
});

// creating a route for cancel page:
app.get("/cancel", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/cancel.html");
  res.sendFile(path);
});