const fs = require("fs");
const path = require("path");
const Resume = require("../Model/Resume");
const upload = require("../middlewares/uploadMiddleware");

// @desc Upload resume images (thumbnail + profile photo)
// @route POST /api/resumes/:id/upload
// @access Private
const uploadResumeImages = async (req, res) => {
  try {
    upload.fields([
      { name: "thumbnail" },
      { name: "profileImage" },
    ])(req, res, async (err) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "File upload failed", error: err.message });
      }

      const resumeId = req.params.id;
      const resume = await Resume.findOne({ _id: resumeId, userId: req.user._id });

      if (!resume) {
        return res
          .status(404)
          .json({ message: "Resume not found or unauthorized" });
      }

      const uploadsFolder = path.join(__dirname, "..", "uploads");
      const baseUrl = `${req.protocol}://${req.get("host")}`;

      const newThumbnail = req.files?.thumbnail?.[0];
      const newProfileImage = req.files?.profileImage?.[0];

      // Handle thumbnail upload and old file deletion
      if (newThumbnail) {
        if (resume.thumbnailLink) {
          const oldThumbnail = path.join(
            uploadsFolder,
            path.basename(resume.thumbnailLink)
          );
          if (fs.existsSync(oldThumbnail)) fs.unlinkSync(oldThumbnail);
        }

        resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`;
      }

      // Handle profile image upload and old file deletion
      if (newProfileImage) {
        // Ensure profileInfo exists
        if (!resume.profileInfo) {
          resume.profileInfo = {};
        }

        if (resume.profileInfo.profilePreviewUrl) {
          const oldProfile = path.join(
            uploadsFolder,
            path.basename(resume.profileInfo.profilePreviewUrl)
          );
          if (fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile);
        }

        resume.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`;
      }

      await resume.save();

      res.status(200).json({
        message: "Images uploaded successfully",
        thumbnailLink: resume.thumbnailLink,
        profilePreviewUrl: resume.profileInfo.profilePreviewUrl,
      });
    });
  } catch (error) {
    console.error("Error uploading images:", error);
    res
      .status(500)
      .json({ message: "Failed to upload images", error: error.message });
  }
};

module.exports = { uploadResumeImages };
