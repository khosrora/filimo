const { Router } = require('express');
const router = new Router();

// ? CONTROLLERS
const movieCTRL = require('../controller/movieCRTL.js');

// ?MIDDLEWARE
const upload = require('../middleware/upload.js');

//* DESC all movies
//* get METHOD
router.get("/all-movies", movieCTRL.getAllMovies)

//* DESC REGISTER USER
//* post METHOD
router.post("/create-movie", upload.array("images", 3), movieCTRL.createMovie)

//* DESC get movie
//* get METHOD
router.get("/get-movie/:slug", movieCTRL.getMovie)

//* DESC delete movie
//* get METHOD
router.delete("/delete-movie/:id", movieCTRL.deleteMovie)





module.exports = router;