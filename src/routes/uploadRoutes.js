const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const { uploadFile } = require("../controllers/uploadController");

// Upload simples - tipo detectado automaticamente
router.post("/", upload.single("file"), uploadFile);

module.exports = router; 
