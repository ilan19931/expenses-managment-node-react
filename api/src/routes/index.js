const userRoutes = require("./auth/auth.route");
const expenseRoutes = require("./expenses/expenses.route");
const categoryRoutes = require("./categories/categories.route");

const applyAllRoutes = (app) => {
  app.use("/api/auth", userRoutes);
  app.use("/api/expenses", expenseRoutes);
  app.use("/api/categories", categoryRoutes);
};

module.exports = applyAllRoutes;
