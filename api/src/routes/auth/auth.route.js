const router = require("express").Router();
const { check } = require("express-validator");

const { userAuthMiddleware } = require("../../middlewares/auth.middleware");
const { login, register, auth } = require("./auth.actions");

// @route   POST api/auth/
// @desc    check authentication
// @access  Private
router.get("/", [userAuthMiddleware], (req, res) => auth(req, res));

// @route   POST api/auth/login
// @desc    login to account
// @access  Private
router.post(
  "/login",
  [
    [
      check("email", "email is required").not().isEmpty(),
      check("password", "password is required").not().isEmpty(),
    ],
  ],
  (req, res) => login(req, res)
);

// @route   POST api/auth/register
// @desc    create new account
// @access  Private
router.post(
  "/register",
  [
    [
      check("email", "email is required").not().isEmpty(),
      check("password", "password is required").not().isEmpty(),
    ],
  ],
  (req, res) => register(req, res)
);

module.exports = router;
