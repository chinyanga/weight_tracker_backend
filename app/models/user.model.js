module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      username: {
        type: Sequelize.STRING
      },
      pwd: {
        type: Sequelize.STRING
      },
      weight: {
        type: Sequelize.INTEGER
      },
      target_weight: {
        type: Sequelize.INTEGER
      },
      dob: {
        type: Sequelize.STRING
      }
    });
  
    return User;
  };