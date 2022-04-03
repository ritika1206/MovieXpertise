const express = require('express');
const { check } = require('express-validator');

const movielistController = require('../controllers/movielist');

const router = express.Router();

// router.post("/:userId/create-movielist", movielistController.create);
// router.post("/add-movie/:movielistId", movielistController.addMovie);
// router.post("/remove-movie/:movielistId", movielistController.removeMovie);
// router.get("/:movielistId/:userId", movielistController.getList);
// router.delete("/delete-movielist/:movielistId/:userId", movielistController.deleteList);

module.exports = router;