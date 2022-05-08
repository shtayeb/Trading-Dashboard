const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Invalid Token",
        });
      }
      req.user = decoded;
      next();
    });
  } else {
    return res.status(401).json("You are not Authenticated");
  }
};

const verifyTokenAndAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    // console.log(req.user);
    // console.log("req-user-id", req.user.id);
    // console.log("req-params-id", req.params.userId);
    // console.log("isAdmin", req.user.isAdmin);

    if (req.user.id === req.params.userId || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not Authorized to do that!");
      // console.log("req.user.id - ", req.user.id);
      // console.log("req.user.params - ", req.params);
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not Authorized to do that!");
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin };
