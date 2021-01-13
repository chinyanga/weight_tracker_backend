module.exports = (sequelize, Sequelize) => {
    const Weight = sequelize.define("weights", {
      weight: {
        type: Sequelize.INTEGER
      },
      date_time: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.INTEGER
      },
    });
  
    return Weight;
  };