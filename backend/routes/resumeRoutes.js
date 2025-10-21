const express = require("express");
const {
  createResume,
  getUserresume,
  getResumeById,
  uploadResume,
  deleteResume,
} = require("../controller/resumeController");
const { protect } = require("../middlewares/authMiddlewares");
// const { uploadResumeImages } = require("../controller/uploadImages");


const router = express.Router();

router.post("/", protect, createResume); //create Resume
router.get("/", protect, getUserresume);
router.get("/:id", protect, getResumeById);
router.put("/:id", protect, uploadResume);
// router.put("/:id/upload-images", protect, uploadResumeImages);

router.delete("/:id", protect, deleteResume);


module.exports = router;