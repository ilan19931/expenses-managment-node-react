const jwt = require("jsonwebtoken");

const generateToken = async (user) => {
  const token = await jwt.sign(
    {
      user,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  return token;
};

module.exports = generateToken;
