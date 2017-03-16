const Sequelize = require('sequelize')
const db = require('APP/db')

const Page = db.define('pages',
  {
    display_info: Sequelize.JSONB
})

module.exports = Page
