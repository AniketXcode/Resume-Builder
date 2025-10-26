const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controller/authController");
const { protect } = require("../middlewares/authMiddlewares");
const upload = require('../middlewares/uploadMiddleware')

const router = express.Router();

//Auth Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);

router.post("/upload-image", (req, res) => {
  upload.single("image")(req, res, function (err) {
    if (err) return res.status(400).json({ message: err.message });
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
  });
});




module.exports = router;