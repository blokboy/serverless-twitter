/* Setting things up. */
require('dotenv').config()
const path = require('path')
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const app = express()
const helpers = require(__dirname + '/helpers.js')
const twitter = require(__dirname + '/twitter.js')
const axios = require('axios')

app.use(helmet())
app.use(morgan('combined'))
app.use(express.static('public'));
app.use(express.json())

app.get(`*`, function(req, res) {
  twitter.get_tweets(`${process.env.BOT_USERNAME}`, function(err, data) {
    if(err) {
      console.log(err)
      res.status(500).json(err)
    } else {
      console.log('tweets retrieved')
      res.status(200).json(data)
    }
  })
})

module.exports = app
