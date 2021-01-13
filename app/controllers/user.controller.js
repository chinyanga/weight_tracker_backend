const db = require("../models");
const Weight = db.weight;
const Op = db.Sequelize.Op;

// Create and Save a new Weight
exports.create = (req, res) => {
    if (!req.body.weight) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
    
      // Create a weight
      const newWeight = {
        weight: req.body.weight,
        date_time: req.body.date_time,
        user_id: req.body.user_id
      };
    
      // Save weight in the database
      Weight.create(newWeight)
        .then(data => {
          res.status(200).send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Weight not captured"
          });
        });
  
};

// Update weight by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

  Weight.update(req.body, {
    where: { id: req.body.id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          message: "Weight was updated successfully."
        });
      } else {
        res.status(400).send({message: `Cannot update Weight with id=${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Weight with id=" + id
      });
    });
  
};

// Delete weight by id
exports.delete = (req, res) => {
    const id = req.query.id;

    Weight.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Weight was deleted successfully!"
          });
        } else {
          res.status(400).send({
            message: `Cannot delete Weight with id=${id}`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Weight with id=" + id
        });
      });
};

// Find all weights by user
exports.findAllUserWeights = (req, res) => {
    const user_id = req.query.user_id;
    var condition = user_id ? { user_id: { [Op.like]: `%${user_id}%` } } : null;
  
    Weight.findAll({ where: condition })
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error retrieving user weights"
        });
      });
};