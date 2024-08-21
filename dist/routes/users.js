"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("../controller/users");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const extension = path_1.default.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + extension);
    },
});
const upload = (0, multer_1.default)({ storage: storage }).single("profileImage");
router.post("/reg", users_1.createUser);
router.post("/login", users_1.loginUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.isAdmin === true) {
        return res.redirect("/admin/dashboard");
    }
    else {
        return res.redirect("/user/dashboard");
    }
}));
router.post("/photo", upload, users_1.updateUserPhoto);
router.get("/info", users_1.getUserInfo);
router.get("/", users_1.getAllUsers);
router.get("/:id", users_1.getUserDetails);
router.put("/:id", users_1.editUser);
router.delete("/:id", users_1.deleteUser);
// Import necessary modules and User model
router.post("/logout", (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            const err = new Error("Internal Server Error");
            return next(err);
        }
        else {
            console.log("did you see me");
            res.redirect("/");
        }
    });
});
exports.default = router;
