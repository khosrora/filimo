const { Router } = require('express');
const router = new Router;


// ? CONTROLLERS
const secureCTRL = require('../controller/secureCTRL.js');



//* DESC GET ALL USERS
//* get METHOD
router.get("/users", secureCTRL.getAllUsers)

//* DESC GET ALL payments 
//* get METHOD
router.get("/payments", secureCTRL.getAllPayments)




module.exports = router