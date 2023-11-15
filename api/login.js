const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const fs = require("fs");

router.post(
  "/login",
  [
    body("email")
      .exists()
      .withMessage("email is required")
      .isEmail()
      .withMessage("Invalid email format"),
    body("password").exists().withMessage("password is required"),
  ],
  async (req, res) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        errors: validationErrors.array(),
      });
    }

    const { email, password } = req.body;

    const userWithEmail = await User.findOne({
      where: { email },
    }).catch((err) => {
      return res.status(500).json({ message: "Something Went Wrong" });
    });

    if (!userWithEmail) {
      return res
        .status(406)
        .json({ message: "Email or Password doesn't match." });
    }
    //validate the password.

    if (userWithEmail.password !== password) {
      //incorect pass.
      return res
        .status(401)
        .json({ message: "Email or Password doesn't match." });
    }

    const privateKey = fs.readFileSync("private-key.pem");

    const jwtToken = jwt.sign(
      {
        id: userWithEmail.id,
        email: userWithEmail.email,
      },
      privateKey,
      { algorithm: "RS256" }
    );

    return res.status(201).json({ message: "Welcome Back", token: jwtToken });
  }
);
module.exports = router;
