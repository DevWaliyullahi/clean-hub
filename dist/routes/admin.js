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
const cleaners_1 = require("../controller/cleaners");
const services_1 = require("../controller/services");
const router = express_1.default.Router();
router.get("/", users_1.getAllUsers);
router.get("/cleaners", cleaners_1.getAllCleaners);
router.get("/services", services_1.getAllServices);
router.get("/:id", users_1.getUserDetails);
router.put("/:id", users_1.editUser);
router.delete("/:id", users_1.deleteUser);
router.post("/login", users_1.loginUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.redirect("/admin/dashboard");
}));
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
router.get("/cleaners/:id", cleaners_1.getCleanerDetails);
router.put("/cleaners/:id", cleaners_1.editCleaner);
router.delete("/cleaners/:id", cleaners_1.deleteCleaner);
router.get("/services/:id", services_1.getServiceDetails);
router.get("/services/pending", services_1.getPendingServices);
router.get("/services/accepted", services_1.getAcceptedServices);
router.get("/services/rejected", services_1.getRejectedServices);
router.get("/services/user", services_1.getUserServices);
router.get("/services/cleaner/:id", services_1.getCleanerServices);
router.put("/services/:id", services_1.editService);
router.delete("/services/:id", services_1.deleteService);
exports.default = router;
