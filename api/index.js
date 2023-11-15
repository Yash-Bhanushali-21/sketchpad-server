const express = require("express");
const router = express.Router();

const registerApi = require("./register");
const loginApi = require("./login");
const dummyApi = require("./dummyProtectedRoute");

router.use(registerApi);
router.use(loginApi);
router.use(dummyApi);

module.exports = router;
