const { Router } = require('express');
const router = new Router();

// ? CONTROLLERS
const paymentCTRL = require('../controller/paymentCTRL.js');




//* DESC payment User
//* post METHOD
router.post("/buy-account", paymentCTRL.payment)

//* DESC payment User call back
//* get METHOD
router.get("/verifypayment", paymentCTRL.callbackPayment)






module.exports = router;