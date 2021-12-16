const { Router } = require('express');
const router = new Router();

// ? CONTROLLERS
const categoriesCTRL = require('../controller/categoriesCTRL.js');



//* DESC all categories
//* get METHOD
router.get("/all-categories", categoriesCTRL.getAllCategories)

//* DESC create categories
//* get METHOD
router.post("/create-category", categoriesCTRL.createCategory)

//* DESC delete categories
//* get METHOD
router.delete("/delete-category/:id", categoriesCTRL.deleteCategory)

//* DESC delete categories
//* get METHOD
router.patch("/update-category/:id", categoriesCTRL.updateCategory)






module.exports = router;