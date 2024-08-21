"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userAuthentication_1 = require("../middleware/userAuthentication");
const router = express_1.default.Router();
/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index");
});
router.get("/services", function (req, res, next) {
    res.render("services");
});
// router.get("/user/dashboard", authenticateToken, function (req, res) {
//   const fullname = (req.session as any).fullname; 
//   res.render("userDashboard", { fullname });
// });
router.get("/user/dashboard", userAuthentication_1.authenticateToken, function (req, res) {
    const fullname = req.session.fullname;
    const email = req.session.email;
    const gender = req.session.gender;
    const phonenumber = req.session.phonenumber;
    const address = req.session.address;
    const dateofbirth = req.session.dateofbirth;
    const occupation = req.session.occupation;
    const photo = req.session.photo;
    res.render("dashboard", { fullname, email, gender, phonenumber, address, dateofbirth, occupation, photo });
});
// router.get("/cleaner/dashboard", authenticateToken, function (req, res) {
//   const fullname = (req.session as any).fullname;
//   res.render("cleanerDashboard", { fullname });
// });
router.get("/cleaner/dashboard", userAuthentication_1.authenticateToken, function (req, res) {
    const fullname = req.session.fullname;
    const email = req.session.email;
    const gender = req.session.gender;
    const phonenumber = req.session.phonenumber;
    const address = req.session.address;
    const guarantorName = req.session.guarantorName;
    const guarantorAddress = req.session.guarantorAddress;
    const guarantorPhoneNumber = req.session.guarantorPhoneNumber;
    const nextOfKinName = req.session.nextOfKinName;
    const nextOfKinPhoneNumber = req.session.nextOfKinPhoneNumber;
    res.render("cleaner", { fullname, email, gender, phonenumber, address, guarantorName, guarantorAddress, guarantorPhoneNumber, nextOfKinName, nextOfKinPhoneNumber });
});
router.get("/admin/dashboard", function (req, res, next) {
    res.render("adminDashboard");
});
router.get("/register", function (req, res, next) {
    res.render("register");
});
router.get("/login", function (req, res, next) {
    res.render("login");
});
exports.default = router;
