require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const swaggerUI = require("swagger-ui-express");
const router = require("./router");
const port = process.env.PORT || 3030;

const swaggerDocs = require("./swagger.json");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(router);

app.listen(port, () => {
  console.log(`server is running in http://localhost:${port}`);
});
