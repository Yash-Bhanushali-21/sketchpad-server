const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get(
  "/payment-info",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      message: "the data is this.",
    });
  }
);
module.exports = router;
