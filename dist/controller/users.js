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
exports.loginUser = exports.deleteUser = exports.editUser = exports.getUserDetails = exports.getAllUsers = exports.getUserInfo = exports.createUser = exports.updateUserPhoto = void 0;
const users_1 = __importDefault(require("../model/users"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userAuthentication_1 = require("../middleware/userAuthentication");
const updateUserPhoto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log("did you loguser photo");
        const userId = req.session.userId;
        console.log("User ID:", userId);
        const user = yield users_1.default.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        else {
            const userPhoto = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
            console.log("User Photo:", userPhoto);
            Object.assign(user, { photo: userPhoto });
            yield user.save();
            console.log("did you save user photo");
            req.session.photo = user.photo;
            console.log("Session after update:", req.session);
            return res.redirect("/user/dashboard");
            // .status(200)
            // .json({ message: "User photo updated successfully", user })
        }
    }
    catch (error) {
        console.error("Error updating User photo:", error);
        console.log("I have err", error);
    }
});
exports.updateUserPhoto = updateUserPhoto;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield users_1.default.findOne({
            where: { email: req.body.email },
        });
        if (existingUser) {
            return res.status(400).json({ error: "Email is already in use" });
        }
        const password = req.body.password;
        if (!isValidPassword(password)) {
            return res.status(400).json({
                error: "Password must be at least 5 characters long and contain at least one uppercase letter, one lowercase letter, and one special character",
            });
        }
        const hashpassword = bcrypt_1.default.hashSync(password, 10);
        const newUser = yield users_1.default.create(Object.assign(Object.assign({}, req.body), { password: hashpassword }));
        res.redirect("/login");
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.createUser = createUser;
const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{5,}$/;
    return passwordRegex.test(password);
};
const getUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.session.userId;
        console.log("User ID:", userId);
        const user = yield users_1.default.findByPk(userId, {
            attributes: { exclude: ["password", "cleanerId", "id"] },
        });
        console.log("User Data:", user);
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        else {
            res
                .status(200)
                .json({ message: "User information retrieved successfully", user });
        }
    }
    catch (error) {
        console.error("Error getting user information", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getUserInfo = getUserInfo;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield users_1.default.findAll();
        if (allUsers) {
            res.status(201).json({
                message: "All User's Retrieved Successfully",
                User: allUsers,
            });
        }
        else {
            res.status(404).json({ message: "No User Found" });
        }
    }
    catch (error) {
        console.error("Error getting all Users", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllUsers = getAllUsers;
// View details of a single user
const getUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield users_1.default.findOne({ where: { id: userId } });
        if (!user) {
            res.status(404).json({ message: "User Data not found" });
        }
        else {
            res
                .status(201)
                .json({ message: "User Retrieved successfully", User: user });
        }
    }
    catch (error) {
        console.error("Error getting User details", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getUserDetails = getUserDetails;
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield users_1.default.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        Object.assign(user, req.body);
        yield user.save();
        return res.status(200).json({ message: "User updated successfully", user });
    }
    catch (error) {
        console.error("Error updating User:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.editUser = editUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const deletedUser = yield users_1.default.findOne({ where: { id: userId } });
    if (!deletedUser) {
        res.status(404).json({ message: "User not found" });
    }
    else {
        yield deletedUser.destroy();
    }
    res
        .status(201)
        .json({ message: "User deleted successfully", User: deletedUser });
});
exports.deleteUser = deleteUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return res.status(400).send({ message: "Email or password missing" });
    }
    try {
        const user = yield users_1.default.findOne({ where: { email: email } });
        //console.log(user)
        if (!user) {
            return res.status(404).send({ message: "Email does not Exist" });
        }
        const isPasswordValid = bcrypt_1.default.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(404).send({ message: "Invalid Password" });
        }
        // items inside of the session
        const accessToken = (0, userAuthentication_1.generateAccessToken)(user);
        const userId = user.id;
        const fullname = user.fullname;
        const gender = user.gender;
        const phonenumber = user.phonenumber;
        const address = user.address;
        const dateofbirth = user.dateofbirth;
        const occupation = user.occupation;
        const photo = user.photo;
        req.session.token = accessToken;
        req.session.userId = userId;
        req.session.isAdmin = user.isAdmin;
        req.session.fullname = fullname;
        req.session.email = email;
        req.session.gender = gender;
        req.session.phonenumber = phonenumber;
        req.session.address = address;
        req.session.dateofbirth = dateofbirth;
        req.session.occupation = occupation;
        req.session.photo = photo;
        console.log("Session after login:", req.session);
        next();
    }
    catch (error) {
        console.error("Error during login:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});
exports.loginUser = loginUser;
