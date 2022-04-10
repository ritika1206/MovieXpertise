const express = require('express');
const movielistController = require('../controllers/movielist');

const router = express.Router();

router.post("/:userId/create-movielist", movielistController.create);
router.post("/add-movie/:movielistId", movielistController.addMovie);
router.post("/remove-movie/:movielistId", movielistController.removeMovie);
router.get("/:movielistId/:userId", movielistController.getList);
router.delete("/delete-movielist/:movielistId/:userId", movielistController.deleteList);
router.get("/public-movielists", movielistController.getPublicMovielists);

module.exports = router;