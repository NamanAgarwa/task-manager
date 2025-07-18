const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

const app = express();

connectDB();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
