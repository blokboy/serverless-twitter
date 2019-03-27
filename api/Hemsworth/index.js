/* Setting things up. */
require('dotenv').config()
const path = require('path')
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const app = express()
const helpers = require(__dirname + '/helpers.js')
const twitter = require(__dirname + '/twitter.js')
const artsy = require(__dirname + '/artsy.js')
const clientID = process.env.ARTSY_CLIENT_ID
const clientSecret = process.env.ARTSY_SECRET
const axios = require('axios')

app.use(helmet())
app.use(morgan('combined'))
app.use(express.static('public'));
app.use(express.json())

app.get(`*`, function(req, res) {
  twitter.tweet("The final test (hopefully)! 👋", function(err, data, response){
    if (err){
      console.log(err);
      res.status(500).json(err);
    } else {
      console.log('tweeted');
      res.status(200).end();
    }
  });
  /*
  twitter.delete_last_tweet(function(err, data) {
    if(err) {
      console.log(err)
      res.sendStatus(500)
    } else {
      console.log('last tweet deleted...')
      res.sendStatus(200)
    }
  })


  */

  /*Get tweets will be generalized for any user you want to search for
  twitter.get_tweets(`${process.env.BOT_USERNAME}`, function(err, data) {
    if(err) {
      console.log(err)
      res.sendStatus(500)
    } else {
      console.log('tweets retrieved')
      res.status(200).json(data)
    }
  })
*/
});
/*
app.get('/artsy/artwork', async (req, res) => {
  try {
    const xAppToken = await axios.post('https://api.artsy.net/api/tokens/xapp_token', { client_id: clientID, client_secret: clientSecret })
    res.token = xAppToken.data.token

    const artwork = await axios.get('https://api.artsy.net/api/artworks?total_count=5', {
      headers: { 'X-Xapp-Token': res.token }
    })
    res.artwork = artwork.data
    const art_image = artwork.data._embedded
    console.log(art_image)

    res.status(200).json(res.artwork)
  } catch({ message }) {
    res.status(500).json({ message })
  }
})

app.get(`/artsy/artist/:artist_name`, async (req, res) => {
  try {
    const xAppToken = await axios.post('https://api.artsy.net/api/tokens/xapp_token', { client_id: clientID, client_secret: clientSecret })
    res.token = xAppToken.data.token

    const artist = await axios.get('https://api.artsy.net/api/artists/' + req.params.artist_name, {
      headers: { 'X-Xapp-Token': res.token }
    })
    res.artist = artist.data

    res.status(200).json(res.artist)
  } catch({ message }) {
    res.status(500).json(message)
  }
})
*/

module.exports = app
