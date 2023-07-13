require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const router = require("./router");

const app = express();
const port = process.env.PORT || 3030;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");

  next();
});
app.disable("x-powered-by");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.listen(port, () => {
  console.log(`server is running in http://localhost:${port}`);
});
