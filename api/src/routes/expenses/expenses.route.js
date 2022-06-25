const router = require("express").Router();
const { check } = require("express-validator");

const { userAuthMiddleware } = require("../../middlewares/auth.middleware");
const { getAllExpenses, addExpense, deleteExpense, getReport } = require("./expenses.actions");

// @route   GET api/expenses
// @desc    get all expenses
// @access  Private
router.get("/", [userAuthMiddleware], (req, res) => getAllExpenses(req, res));

// @route   POST api/expenses/add
// @desc    add new expense
// @access  Private
router.post(
  "/add",
  [
    userAuthMiddleware,
    [
      check("title", "title is required").not().isEmpty(),
      check("price", "price is required").not().isEmpty(),
      check("category", "category is required").not().isEmpty(),
    ],
  ],
  (req, res) => addExpense(req, res)
);

// @route   DELETE api/expenses/:expense_id
// @desc    delete expense
// @access  Private
router.delete("/:expense_id", [userAuthMiddleware], (req, res) => deleteExpense(req, res));

// @route   GET api/expenses/report/
// @desc    get report
// @access  Private
router.get(
  "/report",
  [
    userAuthMiddleware,
    [
      check("month", "month is required").not().isEmpty(),
      check("year", "year is required").not().isEmpty(),
    ],
  ],
  (req, res) => getReport(req, res)
);

module.exports = router;
