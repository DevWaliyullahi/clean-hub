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
exports.loginCleaner = exports.deleteCleaner = exports.editCleaner = exports.getCleanerDetails = exports.getAllCleaners = exports.createCleaner = void 0;
const cleaners_1 = __importDefault(require("../model/cleaners"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userAuthentication_1 = require("../middleware/userAuthentication");
const createCleaner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingCleaner = yield cleaners_1.default.findOne({
            where: { email: req.body.email },
        });
        if (existingCleaner) {
            return res.status(400).json({ error: "Email is already in use" });
        }
        const password = req.body.password;
        if (!isValidPassword(password)) {
            return res
                .status(400)
                .json({
                error: "Password must be at least 5 characters long and contain at least one uppercase letter, one lowercase letter, and one special character",
            });
        }
        const hashpassword = bcrypt_1.default.hashSync(password, 10);
        const newCleaner = yield cleaners_1.default.create(Object.assign(Object.assign({}, req.body), { password: hashpassword }));
        res.redirect("/login");
        // res
        //   .status(201)
        //   .json({ message: "Cleaner Created Successfully", cleaner: newCleaner });
    }
    catch (error) {
        console.error("Error creating Cleaner");
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createCleaner = createCleaner;
const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{5,}$/;
    return passwordRegex.test(password);
};
// Get all cleaners
const getAllCleaners = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCleaners = yield cleaners_1.default.findAll();
        if (allCleaners) {
            res.status(201).json({ message: "All Cleaner's Retrieved Successfully", Cleaner: allCleaners });
        }
        else {
            res.status(404).json({ message: "No cleaners found" });
        }
    }
    catch (error) {
        console.error("Error getting all cleaners", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllCleaners = getAllCleaners;
// View details of a single cleaner
const getCleanerDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cleanerId = req.params.id;
        const cleaner = yield cleaners_1.default.findOne({ where: { id: cleanerId } });
        if (!cleaner) {
            res.status(404).json({ message: "Cleaner Data not found" });
        }
        else {
            res.status(201).json({ message: "Cleaner Retrieved successfully", Cleaner: cleaner });
        }
    }
    catch (error) {
        console.error("Error getting cleaner details", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getCleanerDetails = getCleanerDetails;
const editCleaner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cleanerId = req.params.id;
        const cleaner = yield cleaners_1.default.findOne({ where: { id: cleanerId } });
        if (!cleaner) {
            return res.status(404).json({ message: "Cleaner not found" });
        }
        Object.assign(cleaner, req.body);
        yield cleaner.save();
        return res.status(200).json({ message: "Cleaner updated successfully", cleaner });
    }
    catch (error) {
        console.error("Error updating cleaner:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.editCleaner = editCleaner;
const deleteCleaner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cleanerId = req.params.id;
        const deletedCleaner = yield cleaners_1.default.findOne({ where: { id: cleanerId } });
        if (!deletedCleaner) {
            res.status(404).json({ message: "Cleaner not found" });
        }
        else {
            yield deletedCleaner.destroy();
        }
        res.status(201).json({ message: "Cleaner deleted successfully", Cleaner: deletedCleaner });
    }
    catch (error) {
        console.error("Error deleting cleaner:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteCleaner = deleteCleaner;
const loginCleaner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return res.status(400).send({ message: "Email and password are required" });
    }
    try {
        const cleaner = yield cleaners_1.default.findOne({ where: { email: email } });
        if (!cleaner) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isPasswordValid = bcrypt_1.default.compareSync(password, cleaner.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = (0, userAuthentication_1.generateAccessToken)(cleaner);
        const cleanerId = cleaner.id;
        const fullname = cleaner.fullname;
        const gender = cleaner.gender;
        const phonenumber = cleaner.phonenumber;
        const address = cleaner.address;
        const guarantorName = cleaner.guarantorName;
        const guarantorAddress = cleaner.guarantorAddress;
        const guarantorPhoneNumber = cleaner.guarantorPhoneNumber;
        const nextOfKinName = cleaner.nextOfKinName;
        const nextOfKinPhoneNumber = cleaner.nextOfKinPhoneNumber;
        req.session.token = token;
        req.session.cleanerId = cleanerId;
        req.session.fullname = fullname;
        req.session.email = email;
        req.session.gender = gender;
        req.session.phonenumber = phonenumber;
        req.session.address = address;
        req.session.guarantorName = guarantorName;
        req.session.guarantorAddress = guarantorAddress;
        req.session.guarantorPhoneNumber = guarantorPhoneNumber;
        req.session.nextOfKinName = nextOfKinName;
        req.session.nextOfKinPhoneNumber = nextOfKinPhoneNumber;
        next();
    }
    catch (error) {
        console.error("Error logging in cleaner:", error);
        res.status(500).send({ message: "Internal server error" });
    }
    ;
});
exports.loginCleaner = loginCleaner;
