'use strict'

const db = require('APP/db')
const api = module.exports = require('express').Router()
const Page = require('APP/db/models/page')

api
  .get('/heartbeat', (req, res) => res.send({ok: true}))
  .use('/auth', require('./auth'))
  .use('/users', require('./users'))
  .get('/render', (req, res, next) => {
    Page.findOne({where: {
      id: 2
    }})
    .then(results => res.send(results))
  })
// No routes matched? 404.
api.use((req, res) => res.status(404).end())
