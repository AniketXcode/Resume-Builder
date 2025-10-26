const express = require("express");
const {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
} = require("../controller/resumeController");
const { protect } = require("../middlewares/authMiddlewares");
const { uploadResumeImages } = require("../controller/uploadImages");

const router = express.Router();

router.post("/", protect, createResume);        // create resume
router.get("/", protect, getUserResumes);       // get all resumes
router.get("/:id", protect, getResumeById);     // get single resume
router.put("/:id", protect, updateResume);      // update resume
router.put("/:id/upload-images", protect, uploadResumeImages); // upload images to resume
router.delete("/:id", protect, deleteResume);   // delete resume

module.exports = router;