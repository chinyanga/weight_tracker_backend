const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    pwd: bcrypt.hashSync(req.body.pwd, 4),
    weight: req.body.weight,
    target_weight: req.body.target_weight,
    dob: req.body.dob,
    createdAt:req.body.createdAt,
    updatedAt:req.body.updatedAt
  })
    .then(user => {
      return res.status(200).send(user);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.pwd,
        user.pwd
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id,target_weight:user.target_weight,username:user.username}, config.secret, {
        expiresIn: 86400 // 24 hours
      });
       return res.status(200).send({
          id: user.id,
          username: user.username,
          pwd: user.pwd,
          weight: user.weight,
          target_weight: user.target_weight,
          dob: user.dob,
          accessToken: token
        
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};