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
const cleaners_1 = require("../controller/cleaners");
const services_1 = require("../controller/services");
const router = express_1.default.Router();
router.post("/reg", cleaners_1.createCleaner);
router.post("/login", cleaners_1.loginCleaner, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.redirect("/cleaner/dashboard");
}));
router.get("/history", services_1.getCleanerServiceHistory);
router.get("/services", services_1.getCleanerServices);
router.get('/', cleaners_1.getAllCleaners);
router.get('/:id', cleaners_1.getCleanerDetails);
router.put("/:id", cleaners_1.editCleaner);
router.delete("/:id", cleaners_1.deleteCleaner);
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
