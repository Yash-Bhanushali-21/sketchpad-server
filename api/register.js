const express = require("express");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");

const router = express.Router();

router.post(
  "/register",
  [
    body("fullName").exists().withMessage("fullName is required"),
    body("email")
      .exists()
      .withMessage("email is required")
      .isEmail()
      .withMessage("Invalid email format"),
    body("password")
      .exists()
      .withMessage("password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        errors: validationErrors.array(),
      });
    }

    const { fullName, email, password } = req.body;

    const alreadyExistingUser = await User.findOne({
      where: { email },
    }).catch((err) => {
      return res.status(500).json({ message: "Something Went Wrong" });
    });

    if (alreadyExistingUser) {
      return res.status(406).json({ message: "User already exists." });
    }

    const newUser = new User({
      fullName,
      email,
      password,
    });
    await newUser.save().catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "internal server error" });
    });
    return res.status(201).json({ message: "User Created Succesfully" });
  }
);
module.exports = router;
