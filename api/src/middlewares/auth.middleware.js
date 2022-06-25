const jwt = require("jsonwebtoken");

const userAuthMiddleware = (req, res, next) => {
  const token = req.headers["x-auth-token"];
  if (!token) {
    return res.status(401).send({ errors: [{ msg: "No token. auth failed." }] });
  }
  try {
    const match = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!match) {
      return res.status(401).send({ errors: [{ msg: "Invalid token. auth failed." }] });
    }

    const tokenData = jwt.decode(token);

    // add user data into request.
    req.user = tokenData.user;

    next();
  } catch (err) {
    res.status(401).send({ errors: [{ msg: "Invalid token. auth failed." }] });
  }
};

const adminAuthMiddleware = (req, res, next) => {
  const token = req.headers["x-auth-token"];
  if (!token) {
    return res.status(401).send({ errors: [{ msg: "No token. auth failed." }] });
  }
  try {
    const match = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!match) {
      return res.status(401).send({ errors: [{ msg: "Invalid token. auth failed." }] });
    }

    const tokenData = jwt.decode(token);

    if (!tokenData.user.isAdmin) {
      return res.status(401).send({ errors: [{ msg: "No admin access." }] });
    }

    // add user data into request.
    req.user = tokenData.user;

    next();
  } catch (err) {
    res.status(401).send({ errors: [{ msg: "Invalid token. auth failed." }] });
  }
};

module.exports = { userAuthMiddleware, adminAuthMiddleware };
