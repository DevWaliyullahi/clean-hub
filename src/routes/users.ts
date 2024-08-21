import express from "express";
import {
  createUser,
  getAllUsers,
  getUserDetails,
  editUser,
  deleteUser,
  loginUser,
  getUserInfo,
  updateUserPhoto,
} from "../controller/users";
import { authenticateToken } from "../middleware/userAuthentication";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});

const upload = multer({ storage: storage }).single("profileImage");

router.post("/reg", createUser);

router.post("/login", loginUser, async (req, res) => {
  if ((req.session as any).isAdmin === true) {
    return res.redirect("/admin/dashboard");
  } else {
    return res.redirect("/user/dashboard");
  }
});

router.post("/photo", upload, updateUserPhoto);

router.get("/info", getUserInfo);

router.get("/", getAllUsers);
router.get("/:id", getUserDetails);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);

// Import necessary modules and User model

router.post("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      const err = new Error("Internal Server Error");
      return next(err);
    } else {
      console.log("did you see me");
      res.redirect("/");
    }
  });
});

export default router;
