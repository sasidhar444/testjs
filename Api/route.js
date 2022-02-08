const express = require('express');
const UploadController = require('./controller/upload.controller');

const router = express.Router();

// register controllers
const uploadController = new UploadController();
uploadController.register(router);

module.exports = router;
