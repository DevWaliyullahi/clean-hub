import express from "express";
import {
  hireCleaner,
  getAllServices,
  acceptService,
  rejectService,
  getPendingServices,
  getAcceptedServices,
  getRejectedServices,
  getUserServices,
  getCleanerServices,
  getServiceDetails,
  editService,
  deleteService,
  getUserServiceHistory,
  rateReviewService,
} from "../controller/services";

const router = express.Router();


router.get("/history", getUserServiceHistory);
router.post("/rate-review/:id", rateReviewService);
router.post("/hire", hireCleaner);


router.get("/", getAllServices);
router.get("/:id", getServiceDetails);
router.put("/accept/:id", acceptService);
router.put("/reject/:id", rejectService);

router.get("/pending", getPendingServices);
router.get("/accepted", getAcceptedServices);
router.get("/rejected", getRejectedServices);
router.get("/user", getUserServices);
router.put("/:id", editService);
router.delete("/:id", deleteService);

export default router;
