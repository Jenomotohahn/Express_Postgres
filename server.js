"use strict";

require("dotenv").config();

const express = require("express");
const PORT = process.env.PORT || 8080;
const app = express();
const pg = require("pg");
const cors = require("cors");
const bodyParser = require("body-parser");
const { pool } = require("./config");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.listen(PORT, () => console.log(`Server is listening on PORT : ${PORT}`));

app.post("/add", (req, res) => {
  const { title, director } = req.body;

  console.log(title, director);

  pool.query(
    "INSERT INTO movies (title, director) VALUES ($1, $2)",
    [title, director],
    (error) => {
      if (error) {
        throw error;
      } else {
        res.status(200).json({ status: "success", message: "movie added" });
      }
    }
  );
});
app.get("/", (req, res) => console.log("this hit"));
