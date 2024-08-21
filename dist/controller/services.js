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
exports.getCleanerServiceHistory = exports.getUserServiceHistory = exports.deleteService = exports.editService = exports.getServiceDetails = exports.getCleanerServices = exports.getUserServices = exports.rateReviewService = exports.getRejectedServices = exports.getAcceptedServices = exports.getPendingServices = exports.rejectService = exports.acceptService = exports.getAllServices = exports.hireCleaner = void 0;
const services_1 = __importDefault(require("../model/services"));
const hireCleaner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cleanerId, name, address, serviceName, description, servicePrice, date, } = req.body;
        const userId = req.session.userId;
        console.log(userId);
        const newService = yield services_1.default.create({
            userId,
            cleanerId,
            name,
            address,
            serviceName,
            description,
            servicePrice,
            date,
            status: "Pending",
            serviceRating: 0,
            serviceReview: "Pending",
        });
        res.status(201).json({
            message: "Hiring request sent successfully",
            service: newService,
        });
    }
    catch (error) {
        console.error("Error hiring cleaner", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.hireCleaner = hireCleaner;
const getAllServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const services = yield services_1.default.findAll();
        res
            .status(200)
            .json({ message: "Services retrieved successfully", services });
    }
    catch (error) {
        console.error("Error getting all services", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllServices = getAllServices;
const acceptService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceId = req.params.id;
        const service = yield services_1.default.findOne({ where: { id: serviceId } });
        if (!service) {
            res.status(404).json({ message: "Service Data not found" });
        }
        else {
            service.status = "Accepted";
            yield service.save();
            res
                .status(201)
                .json({ message: "Service Accepted successfully", service });
        }
    }
    catch (error) {
        console.error("Error accepting service", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.acceptService = acceptService;
const rejectService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceId = req.params.id;
        const service = yield services_1.default.findOne({ where: { id: serviceId } });
        if (!service) {
            res.status(404).json({ message: "Service Data not found" });
        }
        else {
            service.status = "Rejected";
            yield service.save();
            res
                .status(201)
                .json({ message: "Service Rejected successfully", service });
        }
    }
    catch (error) {
        console.error("Error rejecting service", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.rejectService = rejectService;
const getPendingServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.session.userId;
        const services = yield services_1.default.findAll({
            where: { userId, status: "Pending" },
        });
        res
            .status(200)
            .json({ message: "Services retrieved successfully", services });
    }
    catch (error) {
        console.error("Error getting all services", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getPendingServices = getPendingServices;
const getAcceptedServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.session.userId;
        const services = yield services_1.default.findAll({
            where: { userId, status: "Accepted" },
        });
        res
            .status(200)
            .json({ message: "Services retrieved successfully", services });
    }
    catch (error) {
        console.error("Error getting all services", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAcceptedServices = getAcceptedServices;
const getRejectedServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.session.userId;
        const services = yield services_1.default.findAll({
            where: { userId, status: "Rejected" },
        });
        res
            .status(200)
            .json({ message: "Services retrieved successfully", services });
    }
    catch (error) {
        console.error("Error getting all services", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getRejectedServices = getRejectedServices;
const rateReviewService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("did you see me");
    try {
        const serviceId = req.params.id;
        const { rating, review } = req.body;
        const service = yield services_1.default.findOne({ where: { id: serviceId } });
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }
        // Update the service with new rating and review
        console.log("Service:", service);
        service.serviceRating = rating;
        service.serviceReview = review;
        yield service.save();
        return res
            .status(200)
            .json({ message: "Rating and review updated successfully", service });
    }
    catch (error) {
        console.error("Error updating rating and review:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.rateReviewService = rateReviewService;
const getUserServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.session.userId;
        const services = yield services_1.default.findAll({ where: { userId: userId } });
        res
            .status(200)
            .json({ message: "Services retrieved successfully", services });
    }
    catch (error) {
        console.error("Error getting all services", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getUserServices = getUserServices;
const getCleanerServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.session);
        const cleanerId = req.session.cleanerId;
        const services = yield services_1.default.findAll({ where: { cleanerId: cleanerId } });
        res
            .status(200)
            .json({ message: "Cleaner services retrieved successfully", services });
    }
    catch (error) {
        console.error("Error getting cleaner services", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getCleanerServices = getCleanerServices;
const getServiceDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceId = req.params.id;
        const service = yield services_1.default.findOne({ where: { id: serviceId } });
        if (!service) {
            res.status(404).json({ message: "Service Data not found" });
        }
        else {
            res
                .status(201)
                .json({ message: "Service Retrieved successfully", service });
        }
    }
    catch (error) {
        console.error("Error getting service details", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getServiceDetails = getServiceDetails;
const editService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceId = req.params.id;
        const service = yield services_1.default.findOne({ where: { id: serviceId } });
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }
        Object.assign(service, req.body);
        yield service.save();
        return res
            .status(200)
            .json({ message: "Service updated successfully", service });
    }
    catch (error) {
        console.error("Error updating service:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.editService = editService;
const deleteService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceId = req.params.id;
        const deletedService = yield services_1.default.findOne({ where: { id: serviceId } });
        if (!deletedService) {
            res.status(404).json({ message: "Service not found" });
        }
        else {
            yield deletedService.destroy();
        }
        res.status(201).json({
            message: "Service deleted successfully",
            Service: deletedService,
        });
    }
    catch (error) {
        console.error("Error deleting service:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteService = deleteService;
const getUserServiceHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.session.userId;
        const services = yield services_1.default.findAll({
            where: { userId },
            attributes: { exclude: ["name"] },
        });
        res.status(200).json({
            message: "User service history retrieved successfully",
            services,
        });
    }
    catch (error) {
        console.error("Error getting user service history", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getUserServiceHistory = getUserServiceHistory;
const getCleanerServiceHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cleanerId = req.session.cleanerId;
        const services = yield services_1.default.findAll({
            where: { cleanerId },
            attributes: { exclude: ["name"] },
        });
        res.status(200).json({
            message: "Cleaner service history retrieved successfully",
            services,
        });
    }
    catch (error) {
        console.error("Error getting cleaner service history", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getCleanerServiceHistory = getCleanerServiceHistory;
