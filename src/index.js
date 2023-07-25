const express = require("express");
const swaggerUI = require("swagger-ui-express");
const bodyParser = require("body-parser");
const cors = require("cors");

const router = require("./router");
const swaggerDocs = require("./swagger.json");
const sequelize = require("./database/index");

sequelize
  .authenticate()
  .then(async () => {
    sequelize.sync();
    console.log("Banco de Dados conectado");
  })
  .catch(() => {
    console.log("Banco de Dados não conectado");
  });

const port = process.env.PORT || 3030;
const allowOrigin = process.ALLOW_ORIGIN;

const corsOptions = {
  origin: allowOrigin,
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type, Authorization",
};
const app = express();

app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(express.static("swagger"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);

app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});
