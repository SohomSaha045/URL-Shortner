const express = require("express");
const { generateNewShortURL,getAnalytics } = require("../controllers/url");
const { handelUserSignup, handelUserLogin }=require('../controllers/user');
const router = express.Router();

router.post("/", generateNewShortURL);
router.get("/analytics/:shortId",getAnalytics);


module.exports = router;
