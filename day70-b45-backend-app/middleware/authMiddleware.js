const jwt = require("jsonwebtoken");

const authMiddleware = (requiredRole = null) => {
  return (req, res, next) => {
    try {
      // autz logics
      const authHeaders = req.headers.authorization;

      if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
        return res.status(401).json({
          success: false,
          message: "Invalid or No Token Found",
        });
      }

      let token = authHeaders.split(" ")[1];

    //   verify token
    // asdf -> true
    // asdf -> username: narasimhan, role: admin
    const decoded = jwt.verify(token, process.env.secret_key);

    req.userId = decoded.userId;
    req.role = decoded.role;

    // authorization - check role
    if(requiredRole && req.role !== requiredRole){
        return res.status(403).json({
            success: false,
            message: "Access Denied: Admin access required"
        });
    };

    next();

    } catch (err) {
      res.status(401).json({
        success: false,
        message: "Invalid or Expired Token",
      });
      console.log(err);
    }
  };
};

module.exports = authMiddleware;