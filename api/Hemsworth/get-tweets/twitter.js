require('dotenv').config()

const config = {
      twitter: {
        username: process.env.BOT_USERNAME,
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token: process.env.ACCESS_TOKEN,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
      }
    }

    Twit = require('twit')
    T = new Twit(config.twitter);

module.exports = {
  tweet: (text, cb) => {
    T.post('statuses/update', { status: text }, (e, data, response) => {
      cb(e, data, response);
    });
  },
  post_image: (text, image_base64, cb) => {
   T.post('media/upload', { media_data: image_base64 }, (e, data, response) => {
      if (e){
        console.log('eOR:\n', e);
        if (cb){
          cb(e);
        }
      }
      else{
        console.log('tweeting the image...');
        T.post('statuses/update', {
          status: text,
          media_ids: new Array(data.media_id_string)
        },
        function(e, data, response) {
          if (e){
            console.log('eOR:\n', e);
            if (cb){
              cb(e);
            }
          }
          else{
            console.log('tweeted');
            if (cb){
              cb(null);
            }
          }
        });
      }
    });
  },
  update_profile_image: (image_base64, cb) => {
    console.log('updating profile image...');
    T.post('account/update_profile_image', {
      image: image_base64
    },
     (e, data, response) => {
      if (e){
        console.log('error: ', e);
        if (cb){
          cb(e);
        }
      }
      else{
        if (cb){
          cb(null);
        }
      }
    });
  },
  delete_last_tweet: (cb) => {
    console.log('deleting last tweet...');
    T.get('statuses/user_timeline', { screen_name: process.env.BOT_USERNAME }, (e, data, response) => {
      if (e){
        if (cb){
          cb(e, data);
        }
        return false;
      }
      if (data && data.length > 0){
        var last_tweet_id = data[0].id_str;
        T.post(`statuses/destroy/${last_tweet_id}`, { id: last_tweet_id }, (e, data, response)  => {
          if (cb){
            cb(e, data);
          }
        });
      } else {
        if (cb){
          cb(e, data);
        }
      }
    });
  },
  get_tweets: (username, cb) => {
    console.log('getting user tweets...')
    T.get('statuses/user_timeline', { screen_name: username }, (e, data, response) => {
        cb(e, data, response)
    })
  }
};
