const db = require("../models");
const User = db.user;

checkUsernameIfExist = (req, res, next) => {
    User.findOne({
      where: {
        username: req.body.username
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Username is already exist!"
        });
        return;
      }

      next();
  });
};

const verifySignUp = {
    checkUsernameIfExist: checkUsernameIfExist
};

module.exports = verifySignUp;