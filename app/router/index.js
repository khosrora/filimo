const { Router } = require('express');
const router = new Router();

// ? CONTROLLERS
const paymentCTRL = require('../controller/paymentCTRL.js');



//* DESC payment User call back
//* get METHOD
router.get("/getAcountAcitvated", paymentCTRL.getAcountAcitvated)






module.exports = router;