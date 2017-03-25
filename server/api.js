'use strict'

const db = require('APP/db')
const api = module.exports = require('express').Router()
const Page = require('APP/db/models/page')

api.use('/invite', require('./invite'))

// No routes matched? 404.
api.use((req, res) => res.status(404).end())
