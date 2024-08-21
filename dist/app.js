"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_2 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const database_config_1 = __importDefault(require("./config/database.config"));
dotenv_2.default.config();
const index_1 = __importDefault(require("./routes/index"));
const users_1 = __importDefault(require("./routes/users"));
const cleaners_1 = __importDefault(require("./routes/cleaners"));
const services_1 = __importDefault(require("./routes/services"));
const admin_1 = __importDefault(require("./routes/admin"));
(0, dotenv_1.config)();
database_config_1.default
    .sync()
    .then(() => {
    console.log("Database & tables created!");
})
    .catch((err) => {
    console.log("Error synching with database");
    throw err;
});
const app = (0, express_1.default)();
app.set("views", path_1.default.join(__dirname, "..", "views"));
app.set("view engine", "ejs");
// app.use(logger('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "../", "public")));
app.use((0, express_session_1.default)({
    secret: `${process.env.secret}`,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
}));
app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store, must-validate");
    next();
});
app.use("/", index_1.default);
app.use("/users", users_1.default);
app.use("/cleaners", cleaners_1.default);
app.use("/services", services_1.default);
app.use("/admin", admin_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500);
    res.render("error");
});
exports.default = app;
