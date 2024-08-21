import express, { Request, Response, NextFunction } from "express";

import { getAllUsers, getUserDetails, editUser, deleteUser, loginUser } from "../controller/users";

import {getAllCleaners, getCleanerDetails, editCleaner, deleteCleaner} from "../controller/cleaners";

import { getAllServices, getAcceptedServices, getCleanerServices, getPendingServices, getRejectedServices, getServiceDetails, getUserServices, editService, deleteService } from "../controller/services";

import { authenticateToken } from "../middleware/userAuthentication";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/cleaners", getAllCleaners);
router.get("/services", getAllServices);


router.get("/:id", getUserDetails);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);
router.post("/login", loginUser, async (req, res) => {
  res.redirect("/admin/dashboard");
});

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

router.get("/cleaners/:id", getCleanerDetails);
router.put("/cleaners/:id", editCleaner);
router.delete("/cleaners/:id", deleteCleaner);

router.get("/services/:id", getServiceDetails);
router.get("/services/pending", getPendingServices);
router.get("/services/accepted", getAcceptedServices);
router.get("/services/rejected", getRejectedServices);
router.get("/services/user", getUserServices);
router.get("/services/cleaner/:id", getCleanerServices);
router.put("/services/:id", editService);
router.delete("/services/:id", deleteService);


export default router;
