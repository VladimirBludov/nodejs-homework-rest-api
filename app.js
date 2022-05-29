const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { NotFound } = require("http-errors");

const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");
const { errorHandler } = require("./middlewares");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((req, res, next) => {
  next(new NotFound());
});

app.use(errorHandler);

module.exports = app;
