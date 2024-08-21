import express from "express";
import { authenticateToken } from "../middleware/userAuthentication";

const router = express.Router();

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

router.get("/user/dashboard", authenticateToken, function (req, res) {
  const fullname = (req.session as any).fullname;
  const email = (req.session as any).email;
  const gender = (req.session as any).gender;
  const phonenumber = (req.session as any).phonenumber;
  const address = (req.session as any).address;
  const dateofbirth = (req.session as any).dateofbirth;
  const occupation = (req.session as any).occupation;
  const photo = (req.session as any).photo;
  res.render("dashboard", { fullname, email, gender, phonenumber, address, dateofbirth, occupation, photo });
});

// router.get("/cleaner/dashboard", authenticateToken, function (req, res) {
//   const fullname = (req.session as any).fullname;
//   res.render("cleanerDashboard", { fullname });
// });

router.get("/cleaner/dashboard", authenticateToken, function (req, res) {
  const fullname = (req.session as any).fullname;
  const email = (req.session as any).email;
  const gender = (req.session as any).gender;
  const phonenumber = (req.session as any).phonenumber;
  const address = (req.session as any).address;
  const guarantorName = (req.session as any).guarantorName;
  const guarantorAddress = (req.session as any).guarantorAddress;
  const guarantorPhoneNumber = (req.session as any).guarantorPhoneNumber;
  const nextOfKinName = (req.session as any).nextOfKinName;
  const nextOfKinPhoneNumber = (req.session as any).nextOfKinPhoneNumber;
  
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
export default router;