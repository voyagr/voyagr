const Sequelize = require('sequelize')
const db = require('APP/db')


//Style here is for any style choices that applies to the
//whole trip. ie color themes, light vs dark etc.

const Trip = db.define('trips', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  start_date: Sequelize.DATE,
  end_date: Sequelize.DATE,
  discription: Sequelize.TEXT,
  style: Sequelize.JSONB
})


module.exports = Trip
