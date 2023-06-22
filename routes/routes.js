const express = require('express');
const router = express.Router();
const multer = require('multer');
const UserController = require('../controller/UserController');

const upload = multer();
router.use(upload.none());

router.get("/show", UserController.show);
router.get("/show/:id", UserController.detail);
router.post("/create", UserController.create);
router.patch("/update/:id", UserController.update);
router.delete("/delete/:id", UserController.destroy);

module.exports = router;