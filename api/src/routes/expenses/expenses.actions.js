const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const moment = require("moment");

const Expense = require("../../models/expense.model");

// @route   GET api/expenses
// @desc    get all expenses
// @access  Private
const getAllExpenses = async (req, res) => {
  const userId = req.user._id;

  try {
    const expensesList = await Expense.find({ userId }).sort({
      updatedAt: "desc",
    });

    res.send(expensesList);
  } catch (err) {
    console.log(err);
  }
};

// @route   POST api/expenses/add
// @desc    add new expense
// @access  Private
const addExpense = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  const { title, price, category, description } = req.body;

  const descriptionText = description || "";
  const dateCreated = moment(new Date()).format("DD-MM-YYYY");

  // check if price is negative
  if (price < 0) {
    return res.status(400).send({ errors: [{ msg: "price can't be negative." }] });
  }

  try {
    const newExpense = new Expense({
      userId: req.user._id,
      title,
      price,
      category,
      description: descriptionText,
      dateCreated,
    });

    await newExpense.save();

    res.send(newExpense);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

// @route   DELETE api/expenses/:expense_id
// @desc    delete expense
// @access  Private
const deleteExpense = async (req, res) => {
  const expenseId = req.params.expense_id;
  if (!mongoose.isValidObjectId(expenseId)) {
    return res.status(400).send({ errors: [{ msg: "invalid expense id." }] });
  }

  try {
    await Expense.findOneAndDelete({ userId: req.user._id, _id: expenseId });

    res.send({ msg: "expense deleted." });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

// @route   GET api/expenses/report/
// @desc    get report
// @access  Private
const getReport = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  const { month, year, category } = req.query;

  try {
    const allExpenses = await Expense.find({ userId: req.user._id });

    const filteredExpenses = allExpenses.filter((expense) => {
      const [expenseDay, expenseMonth, expenseYear] = expense.dateCreated.split("-");

      if (category) {
        return month === expenseMonth && year === expenseYear && expense.category === category;
      } else {
        return month === expenseMonth && year === expenseYear;
      }
    });

    res.send(filteredExpenses);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

module.exports = { getAllExpenses, addExpense, deleteExpense, getReport };
