const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: process.env.DB_DIALECT,
  }
);

sequelize.sync().catch((err) => console.log(err));

(async () => {
  try {
    await sequelize.authenticate();
    console.log("connected to db");
  } catch (error) {
    console.error("unable to connect to db", error);
  }
})();

module.exports = sequelize;
