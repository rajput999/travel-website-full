const { getUser } = require("../services/auth");

async function restrictedToLoggedinUsersOnly(req, res, next) {
  const userUId = req.headers["authorization"];

  if (!userUId) {
    return res.json({message: "You have to Login First"});
    // Temporary returning message now user should render to login page
  }
  
  const token = userUId.split("Bearer ")[1];
  
  console.log("userUid:", userUId);
  console.log("token:", token);
  const user = getUser(token);
  
  if (!user) {
    return res.json({message: "You have to Login first"});
    // Temporary returning message now user should render to login page
  }

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const userUId = req.headers["authorization"];

  const token = userUId.split("Bearer ")[1];

  const user = getUser(token);

  req.user = user;
  next();
}

module.exports = {
  checkAuth,
  restrictedToLoggedinUsersOnly,
};
