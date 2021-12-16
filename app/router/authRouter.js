const { Router } = require('express');
const router = new Router();


const authCTRL = require('../controller/authCTRL');


//* DESC REGISTER USER
//* POST METHOD
router.post("/register", authCTRL.register)

//* DESC login USER
//* POST METHOD
router.post("/login", authCTRL.login)

//* DESC refresh_token USER
//* POST METHOD
router.post("/refresh_token", authCTRL.refreshToken)

//* DESC logout USER
//* GET METHOD
router.get("/logout", authCTRL.logout)



module.exports = router;