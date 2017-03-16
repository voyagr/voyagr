'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user')
const OAuth = require('./oauth')
const Page = require('./page')
const Trip = require('./trip')

OAuth.belongsTo(User)
User.hasOne(OAuth)

User.belongsToMany(Trip, {through: 'UsersTrips'})

Trip.belongsToMany(User, {through: 'UsersTrips'})

Page.belongsTo(Trip)
Trip.hasMany(Page)

module.exports = {User, Page, Trip}
