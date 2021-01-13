module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "pwd@2020",
    DB: "weight_tracker",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };