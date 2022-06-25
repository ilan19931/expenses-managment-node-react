const router = require("express").Router();
const { check } = require("express-validator");

const { adminAuthMiddleware, userAuthMiddleware } = require("../../middlewares/auth.middleware");
const { getAllCategories, addCategory, deleteCategory } = require("./categories.actions");

// @route   GET api/categories
// @desc    get all categories
// @access  Private
router.get("/", [userAuthMiddleware], (req, res) => getAllCategories(req, res));

// @route   POST api/categories/add
// @desc    add new category
// @access  Private
router.post(
  "/add",
  [adminAuthMiddleware, [check("name", "name is required").not().isEmpty()]],
  (req, res) => addCategory(req, res)
);

// @route   DELETE api/categories/:category_id
// @desc    delete category
// @access  Private
router.delete("/:expense_id", [adminAuthMiddleware], (req, res) => deleteCategory(req, res));

module.exports = router;
