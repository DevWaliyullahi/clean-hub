import { config } from "dotenv";
import createError from "http-errors";
import express from "express";
import { Request, Response, NextFunction } from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import logger from "morgan";
import sequelize from "./config/database.config";

dotenv.config();


import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import cleanerRouter from "./routes/cleaners";
import servicesRouter from "./routes/services";
import adminRouter from "./routes/admin";

config();

sequelize
  .sync()
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((err) => {
    console.log("Error synching with database");
    throw err;
  });

const app = express();

app.set("views", path.join(__dirname, "..", "views"));

app.set("view engine", "ejs");

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../", "public")));
app.use(session({
  secret: `${process.env.secret}`,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
}));

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store, must-validate");
  next();
});


app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/cleaners", cleanerRouter);
app.use("/services", servicesRouter);
app.use("/admin", adminRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

export default app;
