const express = require('express');
const { check } = require('express-validator');

const userController = require('../controllers/user');

const router = express.Router();

router.delete("/delete-profile/:userId", userController.deleteProfile);
router.get("/profile/:userId", userController.getUser);
router.post("/edit-profile/:userId", userController.editProfile);
router.get("/movielists/:userId", userController.getMovieLists);


module.exports = router;
