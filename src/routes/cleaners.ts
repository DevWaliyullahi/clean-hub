import express from 'express';
import { createCleaner, getAllCleaners, getCleanerDetails, editCleaner, deleteCleaner, loginCleaner } from '../controller/cleaners';

import { getCleanerServiceHistory, getCleanerServices } from '../controller/services';

const router = express.Router();


router.post("/reg", createCleaner);
router.post("/login", loginCleaner, async (req, res) => {
    res.redirect("/cleaner/dashboard");
});

router.get("/history", getCleanerServiceHistory);
router.get("/services", getCleanerServices);

router.get('/', getAllCleaners );
router.get('/:id', getCleanerDetails );
router.put("/:id", editCleaner);
router.delete("/:id", deleteCleaner);




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