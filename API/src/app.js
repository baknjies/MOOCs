const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("express-async-errors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/error_handler");
const app = express();

if (process.env.NODE_ENV == "dev") app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());
app.use(express.json());

require("./routes/routes_handler")(app);

app.get('/', (req, res) => {
  res.send('Welcome to Open Innovation')
})

app.use(errorHandler);
app.use((req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

module.exports = app;
