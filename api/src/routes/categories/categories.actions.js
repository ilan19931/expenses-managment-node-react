const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const moment = require("moment");

const Category = require("../../models/categories.model");

// @route   GET api/categories
// @desc    get all categories
// @access  Private
const getAllCategories = async (req, res) => {
  try {
    const categoriesList = await Category.find().sort({
      updatedAt: "asc",
    });

    res.send(categoriesList);
  } catch (err) {
    console.log(err);
  }
};

// @route   POST api/categories/add
// @desc    add new category
// @access  Private
const addCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  const { name, imageUrl } = req.body;

  const imageUrlText = imageUrl || "";

  try {
    const newCategory = new Category({
      name,
      imageUrl: imageUrlText,
    });

    await newCategory.save();

    res.send(newCategory);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

// @route   DELETE api/categories/:category_id
// @desc    delete category
// @access  Private
const deleteCategory = async (req, res) => {
  const categoryId = req.params.category_id;
  if (!mongoose.isValidObjectId(categoryId)) {
    return res.status(400).send({ errors: [{ msg: "invalid category id." }] });
  }

  try {
    await Category.findOneAndDelete({ _id: categoryId });

    res.send({ msg: "category deleted." });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

module.exports = { getAllCategories, addCategory, deleteCategory };
