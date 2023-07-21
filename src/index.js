require("dotenv").config();
const express = require("express");
const swaggerUI = require("swagger-ui-express");
const bodyParser = require("body-parser");
const cors = require("cors");

const router = require("./router");
const swaggerDocs = require("./swagger.json");

const port = process.env.PORT || 3030;
const allowOrigin = process.ALLOW_ORIGIN;

const corsOptions = {
  origin: allowOrigin,
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type, Authorization",
};

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(router);

app.listen(port, () => {
  console.log(`server is running in http://localhost:${port}`);
});
